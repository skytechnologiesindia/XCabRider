import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { storage, STORAGE_KEYS } from '../../utils/storage';
import { post, extractErrorMessage } from '../../utils/requestBuilder';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';
import icons from '../../assets/icons';
import { PrimaryButton } from '../../component/shared/Button';

// Name validation: letters, spaces, . ' - only. 2 to 50 chars. No digits.
const NAME_REGEX = /^[a-zA-Z\s.'-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ProfileSetup = ({ navigation, onComplete, route }) => {
  const initialRider = route?.params?.rider || null;
  const [fullName, setFullName] = useState(initialRider?.fullName || '');
  const [email, setEmail] = useState(initialRider?.email || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveProfile = async () => {
    if (isLoading) return;

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    // 1. Full Name Validation (2 to 50 chars, no digits, letters and allowed special chars only)
    if (!trimmedName) {
      Alert.alert('Required Field', 'Please enter your full name.');
      return;
    }

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      Alert.alert('Invalid Name', 'Full name must be between 2 and 50 characters.');
      return;
    }

    if (!NAME_REGEX.test(trimmedName)) {
      Alert.alert(
        'Invalid Name',
        "Full name can only contain letters, spaces, dots (.), apostrophes ('), and hyphens (-). Numbers are not allowed."
      );
      return;
    }

    // 2. Email Validation (Optional, but if entered must be valid format)
    if (trimmedEmail && !EMAIL_REGEX.test(trimmedEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address or leave it blank.');
      return;
    }

    // 3. Construct Payload - ONLY include fields provided. Never send extra keys to avoid 400 UNKNOWN_FIELD
    const payload = {
      fullName: trimmedName,
    };

    if (trimmedEmail) {
      payload.email = trimmedEmail;
    }

    setIsLoading(true);
    try {
      const url = 'rider/auth/register';
      const data = payload;
      const accessToken = await storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const response = await post(url, data, accessToken);
      console.log('Rider Registration Response:', response);

      const registeredRider = response?.data?.rider || response?.data;

      // 4. Update Local Storage Persistence
      await storage.setItem(STORAGE_KEYS.RIDER_DATA, registeredRider);
      await storage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');

      console.log('✅ ================= RIDER REGISTER SUCCESS =================');
      console.log('📦 Rider ID        :', registeredRider?.id);
      console.log('📦 Name            :', registeredRider?.fullName);
      console.log('📦 Email           :', registeredRider?.email || 'N/A');
      console.log('📦 Status          :', registeredRider?.status);
      console.log('📦 ProfileComplete :', registeredRider?.isProfileComplete);
      console.log('🚀 Routing To      : Home');
      console.log('===========================================================');

      // 5. Route the user to Home
      if (onComplete) {
        onComplete(registeredRider);
      } else if (navigation?.navigate) {
        navigation.navigate('Home', { rider: registeredRider });
      }
    } catch (error) {
      console.error('Registration Error:', error?.response?.data || error.message);

      // Handle 409 EMAIL_IN_USE
      if (error?.response?.status === 409 || error?.response?.data?.error?.code === 'EMAIL_IN_USE') {
        Alert.alert(
          'Email Already in Use',
          'This email address is already registered with another account. Please use a different email or leave it empty.'
        );
      } else if (error?.response?.status === 401) {
        Alert.alert('Session Expired', 'Your session has expired. Please log in again.');
        await storage.clearAuth();
        if (navigation?.navigate) {
          navigation.navigate('Login');
        }
      } else {
        const errorMsg = extractErrorMessage(error);
        Alert.alert('Registration Failed', errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.cream }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.statusBar} />

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
          <Image
            source={icons.xcabXLogo}
            style={{ width: 20, height: 20, tintColor: COLORS.yellow, marginRight: 8 }}
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
          PROFILE SETUP • 03
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.pdh20, styles.pdt32, styles.pdb32]}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: '800',
            color: COLORS.textDark,
            letterSpacing: -0.5,
          }}
        >
          Welcome to treeps!
        </Text>

        <Text
          style={[
            styles.ts15,
            styles.mt12,
            styles.mb24,
            {
              color: COLORS.muted,
              lineHeight: 22,
            },
          ]}
        >
          Tell us your name so drivers know who they’re picking up.
        </Text>

        {/* Full Name Input */}
        <View style={styles.mb16}>
          <Text style={[styles.ts13, styles.mb8, { fontWeight: '600', color: COLORS.textDark }]}>
            Full Name *
          </Text>
          <View
            style={[
              styles.pdh16,
              {
                height: 54,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: COLORS.border,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
              },
            ]}
          >
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="e.g. Rahul Sharma"
              placeholderTextColor={COLORS.placeholder}
              style={[styles.ts16, { color: COLORS.textDark }]}
              autoCapitalize="words"
              maxLength={50}
              editable={!isLoading}
            />
          </View>
        </View>

        {/* Email Input (Optional) */}
        <View style={styles.mb24}>
          <Text style={[styles.ts13, styles.mb8, { fontWeight: '600', color: COLORS.textDark }]}>
            Email Address (Optional)
          </Text>
          <View
            style={[
              styles.pdh16,
              {
                height: 54,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: COLORS.border,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
              },
            ]}
          >
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="e.g. rahul@example.com"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.ts16, { color: COLORS.textDark }]}
              maxLength={80}
              editable={!isLoading}
            />
          </View>
        </View>

        {/* Submit Button */}
        <PrimaryButton
          title="Get Started"
          onPress={handleSaveProfile}
          disabled={isLoading || !fullName.trim()}
          loading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSetup;
