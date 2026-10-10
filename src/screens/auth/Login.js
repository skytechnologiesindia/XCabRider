import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleButton, PrimaryButton } from '../../component/shared/Button';
import icons from '../../assets/icons';
import images from '../../assets/images';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';
import { post, extractErrorMessage } from '../../utils/requestBuilder';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_TABLET = SCREEN_WIDTH >= 600;

export const formatIndianPhone = (rawPhone) => {
  if (!rawPhone) return '';
  const digits = rawPhone.replace(/\D/g, '');
  const tenDigits = digits.length >= 10 ? digits.slice(-10) : digits;
  return tenDigits ? `+91${tenDigits}` : '';
};

const Login = ({ onContinue, navigation }) => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenTerms = () => {
    Linking.openURL('https://treeps.in/terms').catch(() => {
      Alert.alert('Terms of Service', 'By continuing, you agree to treeps Terms of Service.');
    });
  };

  const handleOpenPrivacy = () => {
    Linking.openURL('https://treeps.in/privacy').catch(() => {
      Alert.alert('Privacy Policy', 'By continuing, you agree to treeps Privacy Policy.');
    });
  };

  const handleSendOtp = async () => {
    if (isLoading) return;
    const url = 'rider/auth/send-otp';
    const data = { phoneNumber: formatIndianPhone(phone), };
    setIsLoading(true);
    try {
      const response = await post(url, data);
      console.log('Send OTP Success Response:', response);

      const expiresInSeconds = response?.data?.expiresInSeconds ?? 300;
      const resendAfterSeconds = response?.data?.resendAfterSeconds ?? 30;

      const otpParams = {
        phoneNumber: formatIndianPhone(phone),
        phone: formatIndianPhone(phone),
        expiresInSeconds,
        resendAfterSeconds,
      };

      if (onContinue) {
        onContinue(otpParams);
      } else if (navigation?.navigate) {
        navigation.navigate('Otp', otpParams);
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      console.error('Send OTP Error:', errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.cream }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.statusBar} />

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.cream,
        }}
      >
        <Image
          source={images.onboardingImage}
          style={{ width: '100%', maxHeight: 400 }}
          resizeMode="contain"
        />
      </View>

      {/* Card */}
      <ScrollView
        style={[
          styles.pdh20,
          styles.pdt16,
          styles.pdb32,
          {
            backgroundColor: COLORS.cardBg,
            marginTop: -24,
            width: '100%',
            maxWidth: IS_TABLET ? 480 : undefined,
            alignSelf: 'center',
          },
        ]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pdb20}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: '700',
            color: COLORS.textDark,
            lineHeight: 36,
          }}
        >
          Move through{'\n'}
          the{' '}
          <Text
            style={{
              textDecorationLine: 'underline',
              textDecorationColor: COLORS.yellow,
            }}
          >
            city.
          </Text>
        </Text>

        <Text
          style={[
            styles.ts14,
            styles.mt12,
            styles.mb12,
            {
              color: COLORS.muted,
              lineHeight: 20,
            },
          ]}
        >
          Sign in to book rides, track drivers, and keep every trip in one
          place.
        </Text>

        {/* Phone number field: country selector + input */}
        <View
          style={[
            styles.pdh12,
            {
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLORS.border,
              borderRadius: 14,
              backgroundColor: COLORS.inputBg,
              minHeight: 56,
              opacity: isLoading ? 0.7 : 1,
            },
          ]}
        >
          <View
            style={[
              styles.pdv12,
              styles.pdr12,
              {
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}
          >
            <Image source={icons.indiaFlag} style={[{ width: 22, height: 22 }, styles.mr8]} resizeMode="contain" />
            <Text style={[styles.ts16, { fontWeight: '600', color: COLORS.textDark }]}>
              +91
            </Text>
          </View>

          <View
            style={[
              styles.mv12,
              {
                width: 1,
                alignSelf: 'stretch',
                backgroundColor: COLORS.border,
              },
            ]}
          />

          <TextInput
            value={phone}
            onChangeText={(text) => {
              const digitsOnly = text.replace(/\D/g, '').slice(0, 10);
              setPhone(digitsOnly);
            }}
            placeholder="Enter your mobile number"
            placeholderTextColor={COLORS.placeholder}
            keyboardType="phone-pad"
            editable={!isLoading}
            style={[
              styles.ts16,
              styles.pdv12,
              styles.pdl12,
              {
                flex: 1,
                color: COLORS.textDark,
              },
            ]}
            maxLength={10}
          />
        </View>

        {/* Continue button */}
        <PrimaryButton
          title="Continue"
          onPress={handleSendOtp}
          disabled={isLoading || phone.replace(/\D/g, '').length !== 10}
          loading={isLoading}
        />

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

        {/* Google button */}
        <GoogleButton
          onPress={() => console.log('Google button pressed')}
          disabled={isLoading}
        />

        {/* Footer */}
        <Text
          style={[
            styles.ts11,
            styles.mt24,
            styles.mb20,
            {
              color: COLORS.muted,
              textAlign: 'center',
              lineHeight: 16,
            },
          ]}
        >
          By continuing, you agree to our{' '}
          <Text
            onPress={handleOpenTerms}
            style={{ color: COLORS.textDark, textDecorationLine: 'underline' }}
          >
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text
            onPress={handleOpenPrivacy}
            style={{ color: COLORS.textDark, textDecorationLine: 'underline' }}
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
