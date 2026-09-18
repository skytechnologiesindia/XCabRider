import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleButton, PrimaryButton } from '../../component/shared/Button';
import { IndiaFlagIcon } from '../../assets/icons/Icons';
import images from '../../assets/images';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_TABLET = SCREEN_WIDTH >= 600;

const Login = ({ onContinue }) => {
  const [phone, setPhone] = useState('');

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
            <IndiaFlagIcon size={22} style={styles.mr8} />
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
            onChangeText={setPhone}
            placeholder="Enter your mobile number"
            placeholderTextColor={COLORS.placeholder}
            keyboardType="phone-pad"
            style={[
              styles.ts16,
              styles.pdv12,
              styles.pdl12,
              {
                flex: 1,
                color: COLORS.textDark,
              },
            ]}
            maxLength={15}
          />
        </View>

        {/* Continue button */}
        <PrimaryButton
          title="Continue"
          onPress={() => onContinue?.(phone)}
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
        <GoogleButton onPress={() => console.log('Google button pressed')} />

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
          By continuing, you agree to XCAB's{' '}
          <Text style={{ color: COLORS.textDark, textDecorationLine: 'underline' }}>
            Terms
          </Text>{' '}
          and{' '}
          <Text style={{ color: COLORS.textDark, textDecorationLine: 'underline' }}>
            Privacy Policy
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
