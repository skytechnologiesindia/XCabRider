import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';
import {
  ProfileSkeleton,
  SavedPlace,
  EmergencyContact,
  ProfileCard,
  ProfileMenuList,
} from '../../component/Profile';

const Profile = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  const [isSavedPlacesVisible, setIsSavedPlacesVisible] = useState(false);
  const [isEmergencyContactsVisible, setIsEmergencyContactsVisible] = useState(false);

  // Simulate initial lazy loading / fetch user profile data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  const handleMenuItemPress = (item) => {
    if (item.id === 'personal_details') {
      navigation?.navigate?.('EditProfile');
    } else if (item.id === 'saved_places') {
      setIsSavedPlacesVisible(true);
    } else if (item.id === 'emergency_contacts') {
      setIsEmergencyContactsVisible(true);
    } else if (item.id === 'settings') {
      navigation?.navigate?.('Setting');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: Math.max(insets.top, 14),
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* ================= MAIN CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: 24,
        }}
      >
        {/* Page Title */}
        <View style={[styles.mh20, styles.mb12]}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: COLORS.textDark }}>
            Profile
          </Text>
        </View>


        {/* ================= PROFILE CARD ================= */}
        <ProfileCard />

        {/* ================= MENU LIST CARD ================= */}
        <ProfileMenuList onItemPress={handleMenuItemPress} />

        {/* ================= LOGOUT BUTTON ================= */}
        <TouchableOpacity
          style={[
            styles.mt12,
            styles.mb24,
            {
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
            },
          ]}
          activeOpacity={0.7}
          onPress={() => navigation?.navigate?.('Login')}
        >
          <Text
            style={{
              fontSize: 13.5,
              fontWeight: '700',
              color: COLORS.textMuted,
            }}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ================= SAVED PLACES MODAL ================= */}
      <SavedPlace
        visible={isSavedPlacesVisible}
        navigation={navigation}
        onClose={() => setIsSavedPlacesVisible(false)}
        onSelectPlace={(place) => {
          setIsSavedPlacesVisible(false);
          navigation?.navigate('TripBooking', {
            destination: place.title,
            destinationSubtitle: place.address,
            savedPlace: place,
          });
        }}
        onSave={(place) => {
          setIsSavedPlacesVisible(false);
          navigation?.navigate('TripBooking', {
            destination: place.title,
            destinationSubtitle: place.address,
            savedPlace: place,
          });
        }}
      />

      {/* ================= EMERGENCY CONTACTS MODAL ================= */}
      <EmergencyContact
        visible={isEmergencyContactsVisible}
        onClose={() => setIsEmergencyContactsVisible(false)}
        onSave={(data) => {
          console.log('Saved emergency contacts:', data);
          setIsEmergencyContactsVisible(false);
        }}
      />
    </View>
  );
};

export default Profile;
