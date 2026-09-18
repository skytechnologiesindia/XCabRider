import { useEffect, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';
import { ClockIcon, PencilIcon } from '../../assets/icons/Icons';

const RESEND_SECONDS = 30;

const maskPhone = phone => {
  if (!phone || phone.length < 4) return phone || '';
  return `${phone.slice(0, 2)}•••${phone.slice(-4)}`;
};

const Otp = ({ phone = '9876504821', onBack, onEditPhone, onVerify }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleChange = (text, index) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);

    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
  };

  const timerLabel = `00:${String(secondsLeft).padStart(2, '0')}`;
  const otpValue = code.join('');

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
            <Text style={[styles.ts18, { color: COLORS.textDark }]}>←</Text>
          </TouchableOpacity>

          <Text style={[styles.ts16, styles.mr4, { color: COLORS.yellow }]}>➤</Text>
          <Text style={[styles.ts20, { fontWeight: '800', color: COLORS.textDark }]}>
            XCAB
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
          Enter the 4-digit code sent to{'\n'}+91 {maskPhone(phone)}.
        </Text>

        {/* OTP boxes */}
        <View
          style={[
            styles.mt28,
            {
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          ]}
        >
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              style={[
                styles.ts20,
                {
                  width: 48,
                  height: 56,
                  borderWidth: 1,
                  borderColor: digit ? COLORS.textDark : COLORS.border,
                  textAlign: 'center',
                  fontWeight: '700',
                  color: COLORS.textDark,
                },
              ]}
            />
          ))}
        </View>

        {/* Status pill */}
        <View
          style={[
            styles.pdv12,
            styles.pdh16,
            styles.mt24,
            {
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.pillBg,
            },
          ]}
        >
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
            <Text style={[styles.ts12, { color: COLORS.white }]}>✓</Text>
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

        {/* Verify button */}
        <TouchableOpacity
          onPress={() => onVerify?.(otpValue)}
          activeOpacity={0.85}
          style={[
            styles.pdv16,
            styles.mt24,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.yellow,
            },
          ]}
        >
          <Text style={[styles.ts16, { fontWeight: '700', color: COLORS.textDark }]}>
            Verify and continue
          </Text>
          <Text style={[styles.ts18, styles.ml8, { color: COLORS.textDark }]}>
            ›
          </Text>
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
          disabled={secondsLeft > 0}
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
            },
          ]}
        >
          <ClockIcon size={16} style={styles.mr8} />
          <Text style={[styles.ts15, { fontWeight: '600', color: COLORS.textDark }]}>
            {secondsLeft > 0 ? `Resend code in ${timerLabel}` : 'Resend code'}
          </Text>
        </TouchableOpacity>

        {/* Edit phone number */}
        <TouchableOpacity
          onPress={onEditPhone}
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
            },
          ]}
        >
          <PencilIcon size={16} style={styles.mr8} />
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
          By continuing, you agree to XCAB's{' '}
          <Text style={{ color: COLORS.textDark, textDecorationLine: 'underline' }}>
            Terms
          </Text>{' '}
          and{' '}
          <Text style={{ color: COLORS.textDark, textDecorationLine: 'underline' }}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
