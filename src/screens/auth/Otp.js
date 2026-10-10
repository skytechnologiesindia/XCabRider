import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { storage, STORAGE_KEYS } from '../../utils/storage';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';
import icons from '../../assets/icons';
import { post, extractErrorMessage } from '../../utils/requestBuilder';
import { getDeviceInfo } from '../../utils/device';

const maskPhone = (raw) => {
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');
  const tenDigits = digits.length >= 10 ? digits.slice(-10) : digits;
  if (tenDigits.length < 4) return tenDigits;
  return `${tenDigits.slice(0, 2)}•••${tenDigits.slice(-4)}`;
};

const formatTime = (totalSeconds) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const Otp = ({
  phone = '+919477172214',
  expiresInSeconds = 300,
  resendAfterSeconds = 30,
  onBack,
  onEditPhone,
  onVerify,
  navigation,
  route,
}) => {
  // Extract initial values from props or navigation route params
  const initialPhone = route?.params?.phoneNumber || route?.params?.phone || phone;
  const rawDigits = initialPhone ? initialPhone.replace(/\D/g, '') : '';
  const tenDigits = rawDigits.length >= 10 ? rawDigits.slice(-10) : rawDigits;
  const formattedPhone = tenDigits ? `+91${tenDigits}` : '+919477172214';

  const initialExpires = route?.params?.expiresInSeconds ?? expiresInSeconds ?? 300;
  const initialResend = route?.params?.resendAfterSeconds ?? resendAfterSeconds ?? 30;

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [resendCooldown, setResendCooldown] = useState(initialResend);
  const [expiresSeconds, setExpiresSeconds] = useState(initialExpires);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef([]);

  // Active countdown timers
  useEffect(() => {
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      setExpiresSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (text, index) => {
    const cleanDigits = text.replace(/[^0-9]/g, '');

    // Support paste of entire 6-digit OTP
    if (cleanDigits.length > 1) {
      const next = [...code];
      for (let i = 0; i < 6; i++) {
        next[i] = cleanDigits[i] || '';
      }
      setCode(next);
      const targetFocus = Math.min(cleanDigits.length - 1, 5);
      inputRefs.current[targetFocus]?.focus();
      return;
    }

    const digit = cleanDigits.slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!code[index] && index > 0) {
        const next = [...code];
        next[index - 1] = '';
        setCode(next);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending || isLoading) return;
    const url = 'rider/auth/send-otp';
    const data = { phoneNumber: formattedPhone };
    setIsResending(true);
    try {
      const response = await post(url, data);
      console.log('Resend OTP Success Response:', response);

      const newExpires = response?.data?.expiresInSeconds ?? 300;
      const newResend = response?.data?.resendAfterSeconds ?? 30;

      // Reset cooldown and expiry timers
      setResendCooldown(newResend);
      setExpiresSeconds(newExpires);

      // Reset input fields
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();

      Alert.alert('Code Resent', 'A new 6-digit verification code has been sent to your phone number.');
    } catch (error) {
      const errorMsg = extractErrorMessage(error);
      console.error('Resend OTP Error:', errorMsg);
      Alert.alert('Resend Failed', errorMsg);
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async () => {
    if (isLoading) return;
    const otpValue = code.join('');
    // Ensure OTP has all 6 digits entered
    if (otpValue.length !== 6) {
      Alert.alert('Incomplete Code', 'Please enter the complete 6-digit OTP sent to your phone.');
      return;
    }
    setIsLoading(true);
    try {
      const device = await getDeviceInfo();
      const url = 'rider/auth/verify-otp';
      const data = {
        phoneNumber: formattedPhone,
        otp: otpValue,
        device,
      };

      const response = await post(url, data);
      console.log('Verify OTP Success Response:', response);

      const resData = response?.data;
      const rider = resData?.rider;
      const tokens = resData?.tokens;
      console.log('this is user details', rider);

      // 2. Local Storage Persistence (storage helper)
      await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens?.accessToken || '');
      await storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens?.refreshToken || '');
      await storage.setItem(STORAGE_KEYS.PHONE, formattedPhone);
      await storage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
      await storage.setItem(STORAGE_KEYS.RIDER_DATA, rider || {});

      // 3. Storage Verification & Logging (MANDATORY EXACT DIAGNOSTIC BOX)
      const savedAccessToken = await storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const savedRefreshToken = await storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      const savedPhone = await storage.getItem(STORAGE_KEYS.PHONE);
      const savedStatus = await storage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      const savedRider = await storage.getItem(STORAGE_KEYS.RIDER_DATA, true);
      console.log('✅ ================= RIDER AUTH & STORAGE VERIFICATION =================');
      console.log('📦 Access Token :', savedAccessToken ? 'SAVED (OK)' : 'MISSING ❌');
      console.log('📦 Refresh Token:', savedRefreshToken ? 'SAVED (OK)' : 'MISSING ❌');
      console.log('📦 Phone Number :', savedPhone || 'MISSING ❌');
      console.log('📦 Is Logged In :', savedStatus || 'MISSING ❌');
      console.log('📦 Rider Profile:', savedRider ? `ID: ${savedRider.id}, Name: ${savedRider.fullName}, ProfileComplete: ${savedRider.isProfileComplete}` : 'MISSING ❌');
      console.log('🚀 Next Screen   :', rider?.isProfileComplete ? 'Home / Dashboard' : 'Name / Profile Screen');
      console.log('========================================================================');

      // 4. Conditional Navigation Logic
      const isProfileComplete = Boolean(rider?.isProfileComplete);

      if (onVerify) {
        onVerify(rider);
      } else if (navigation?.navigate) {
        if (!isProfileComplete) {
          navigation.navigate('ProfileSetup', { rider });
        } else {
          navigation.navigate('Home', { rider });
        }
      }
    } catch (error) {
      const errorMsg = extractErrorMessage(error);
      console.error('Verify OTP Error:', errorMsg);
      Alert.alert('Verification Failed', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const otpValue = code.join('');
  const isSubmitDisabled = isLoading || otpValue.length !== 6;
  const resendLabel =
    resendCooldown > 0
      ? `Resend code in 00:${String(resendCooldown).padStart(2, '0')}`
      : 'Resend code';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.cream }}>
      {/* Header */}
      <View
        style={[
          styles.pdh20,
          styles.pdt12,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={onBack}
            disabled={isLoading}
            style={[
              styles.mr12,
              {
                width: 36,
                height: 36,
                borderWidth: 1,
                borderColor: COLORS.border,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          >
            <Image
              source={icons.backArrow}
              style={{ width: 16, height: 16, tintColor: COLORS.textDark }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Image
            source={icons.xcabXLogo}
            style={{ width: 18, height: 18, tintColor: COLORS.yellow, marginRight: 6 }}
            resizeMode="contain"
          />
          <Text style={[styles.ts20, { fontWeight: '800', color: COLORS.textDark }]}>
            TREEPS
          </Text>
        </View>

        <Text
          style={[
            styles.ts10,
            {
              fontWeight: '600',
              color: COLORS.muted,
              letterSpacing: 0.5,
            },
          ]}
        >
          RIDER ACCESS • OTP / 02
        </Text>
      </View>

      <View style={[styles.pdh20, { flex: 1, paddingTop: 50 }]}>
        <Text
          style={{
            fontSize: 34,
            fontWeight: '800',
            color: COLORS.textDark,
          }}
        >
          Verify your number
        </Text>

        <Text
          style={[
            styles.ts15,
            styles.mt16,
            {
              color: COLORS.muted,
              lineHeight: 21,
            },
          ]}
        >
          Enter the 6-digit code sent to{'\n'}+91 {maskPhone(formattedPhone)}.
        </Text>

        {/* 6 OTP boxes */}
        <View
          style={[
            styles.mt28,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}
        >
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              editable={!isLoading}
              selectTextOnFocus
              style={[
                styles.ts20,
                {
                  width: 46,
                  height: 54,
                  borderWidth: 1.5,
                  borderRadius: 10,
                  borderColor: digit ? COLORS.textDark : COLORS.border,
                  backgroundColor: COLORS.white,
                  textAlign: 'center',
                  fontWeight: '700',
                  color: COLORS.textDark,
                },
              ]}
            />
          ))}
        </View>

        {/* Status pill with Expiration Countdown */}
        <View
          style={[
            styles.pdv12,
            styles.pdh16,
            styles.mt24,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: COLORS.pillBg,
              borderRadius: 10,
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={[
                styles.mr12,
                {
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: COLORS.textDark,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <Image
                source={icons.checkMark}
                style={{ width: 10, height: 10, tintColor: COLORS.white }}
                resizeMode="contain"
              />
            </View>
            <Text
              style={[
                styles.ts12,
                {
                  fontWeight: '600',
                  color: COLORS.textDark,
                  letterSpacing: 0.5,
                },
              ]}
            >
              CODE SENT • INDIA +91
            </Text>
          </View>

          <Text
            style={[
              styles.ts12,
              {
                fontWeight: '700',
                color: expiresSeconds <= 30 ? (COLORS.cancelRed || '#E53935') : COLORS.muted,
              },
            ]}
          >
            {expiresSeconds > 0 ? `Expires in ${formatTime(expiresSeconds)}` : 'Expired'}
          </Text>
        </View>

        {/* Verify button */}
        <TouchableOpacity
          onPress={handleVerify}
          disabled={isSubmitDisabled}
          activeOpacity={0.85}
          style={[
            styles.pdv16,
            styles.mt24,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isSubmitDisabled ? '#E5DECA' : COLORS.yellow,
              borderRadius: 14,
              opacity: isSubmitDisabled ? 0.75 : 1,
            },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={COLORS.textDark} />
          ) : (
            <>
              <Text style={[styles.ts16, { fontWeight: '700', color: COLORS.textDark }]}>
                Verify and continue
              </Text>
              <Image
                source={icons.arrowRight}
                style={{ width: 14, height: 14, tintColor: COLORS.textDark, marginLeft: 8 }}
                resizeMode="contain"
              />
            </>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View
          style={[
            styles.mt20,
            { flexDirection: 'row', alignItems: 'center' },
          ]}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: COLORS.border }} />
          <Text style={[styles.ts12, styles.mh12, { color: COLORS.muted }]}>
            OR
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: COLORS.border }} />
        </View>

        {/* Resend code */}
        <TouchableOpacity
          onPress={handleResend}
          disabled={resendCooldown > 0 || isResending || isLoading}
          activeOpacity={0.7}
          style={[
            styles.pdv16,
            styles.mt20,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: COLORS.border,
              borderRadius: 14,
              backgroundColor: COLORS.white,
              opacity: (resendCooldown > 0 || isResending || isLoading) ? 0.6 : 1,
            },
          ]}
        >
          {isResending ? (
            <ActivityIndicator size="small" color={COLORS.textDark} />
          ) : (
            <>
              <Image
                source={icons.clock}
                style={[styles.mr8, { width: 16, height: 16, tintColor: COLORS.textDark }]}
                resizeMode="contain"
              />
              <Text style={[styles.ts15, { fontWeight: '600', color: COLORS.textDark }]}>
                {resendLabel}
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Edit phone number */}
        <TouchableOpacity
          onPress={onEditPhone}
          disabled={isLoading || isResending}
          activeOpacity={0.7}
          style={[
            styles.pdv16,
            styles.mt12,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: COLORS.border,
              borderRadius: 14,
              backgroundColor: COLORS.white,
            },
          ]}
        >
          <Image
            source={icons.pencil}
            style={[styles.mr8, { width: 16, height: 16, tintColor: COLORS.textDark }]}
            resizeMode="contain"
          />
          <Text style={[styles.ts15, { fontWeight: '600', color: COLORS.textDark }]}>
            Edit phone number
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text
          style={[
            styles.ts11,
            styles.mt24,
            {
              color: COLORS.muted,
              textAlign: 'center',
              lineHeight: 16,
            },
          ]}
        >
          By continuing, you agree to our{' '}
          <Text
            onPress={() => Linking.openURL('https://treeps.in/terms').catch(() => Alert.alert('Terms of Service', 'Terms of Service details will be available soon.'))}
            style={{ color: COLORS.textDark, textDecorationLine: 'underline' }}
          >
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text
            onPress={() => Linking.openURL('https://treeps.in/privacy').catch(() => Alert.alert('Privacy Policy', 'Privacy Policy details will be available soon.'))}
            style={{ color: COLORS.textDark, textDecorationLine: 'underline' }}
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
