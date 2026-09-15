import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';
import images from '../../assets/images';
import { ProfileSkeleton } from '../../component/Profile/ProfileSkeleton';
import { SavedPlace } from '../../component/Profile/SavedPlace';
import { EmergencyContact } from '../../component/Profile/EmergencyContact';

// Vector Icon: Personal Details (User)
const UserIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.44,
        height: size * 0.44,
        borderRadius: (size * 0.44) / 2,
        borderWidth: 1.6,
        borderColor: color,
      }}
    />
    <View
      style={{
        width: size * 0.78,
        height: size * 0.38,
        borderTopLeftRadius: size * 0.38,
        borderTopRightRadius: size * 0.38,
        borderWidth: 1.6,
        borderColor: color,
        borderBottomWidth: 0,
        marginTop: 1.5,
      }}
    />
  </View>
);

// Vector Icon: Location Pin
const LocationPinIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.65,
        height: size * 0.65,
        borderRadius: (size * 0.65) / 2,
        borderWidth: 1.6,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.22,
          height: size * 0.22,
          borderRadius: (size * 0.22) / 2,
          backgroundColor: color,
        }}
      />
    </View>
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderTopWidth: 4,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
        marginTop: -0.5,
      }}
    />
  </View>
);

// Vector Icon: Receipts & Invoices
const ReceiptIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.7,
      height: size * 0.85,
      borderWidth: 1.6,
      borderColor: color,
      borderRadius: 3,
      paddingHorizontal: 2.5,
      paddingVertical: 3,
      justifyContent: 'space-between',
    }}
  >
    <View style={{ width: '80%', height: 1.4, backgroundColor: color, borderRadius: 0.7 }} />
    <View style={{ width: '60%', height: 1.4, backgroundColor: color, borderRadius: 0.7 }} />
    <View style={{ width: '70%', height: 1.4, backgroundColor: color, borderRadius: 0.7 }} />
  </View>
);

// Vector Icon: Emergency Contacts
const EmergencyIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    {/* Telephone receiver shape */}
    <View
      style={{
        width: size * 0.75,
        height: size * 0.65,
        borderWidth: 1.6,
        borderColor: color,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: size * 0.35, height: 1.4, backgroundColor: color, borderRadius: 0.7 }} />
    </View>
  </View>
);

// Vector Icon: Help & Safety (Info / Shield)
const HelpIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.8,
      height: size * 0.8,
      borderRadius: (size * 0.8) / 2,
      borderWidth: 1.6,
      borderColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ fontSize: 11, fontWeight: '800', color: color, marginTop: -1 }}>!</Text>
  </View>
);

// Vector Icon: Settings (Gear)
const SettingsIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.8,
      height: size * 0.8,
      borderRadius: (size * 0.8) / 2,
      borderWidth: 1.8,
      borderColor: color,
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View
      style={{
        width: size * 0.28,
        height: size * 0.28,
        borderRadius: (size * 0.28) / 2,
        backgroundColor: color,
      }}
    />
  </View>
);

const MENU_ITEMS = [
  {
    id: 'personal_details',
    title: 'Personal details',
    subtitle: 'Personal details',
    icon: (color) => <UserIcon size={18} color={color} />,
  },
  {
    id: 'saved_places',
    title: 'Saved places',
    subtitle: 'Saved places',
    icon: (color) => <LocationPinIcon size={18} color={color} />,
  },
  {
    id: 'receipts_invoices',
    title: 'Receipts & invoices',
    subtitle: 'Receipts & invoices',
    icon: (color) => <ReceiptIcon size={18} color={color} />,
  },
  {
    id: 'emergency_contacts',
    title: 'Emergency contacts',
    subtitle: 'Emergency contacts',
    icon: (color) => <EmergencyIcon size={18} color={color} />,
  },
  {
    id: 'help_safety',
    title: 'Help & safety',
    subtitle: 'Help & safety',
    icon: (color) => <HelpIcon size={18} color={color} />,
  },
  {
    id: 'settings',
    title: 'Settings',
    subtitle: 'Settings',
    icon: (color) => <SettingsIcon size={18} color={color} />,
  },
];

const Profile = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSavedPlacesVisible, setIsSavedPlacesVisible] = useState(false);
  const [isEmergencyContactsVisible, setIsEmergencyContactsVisible] = useState(false);

  // Simulate initial lazy loading / fetch user profile data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
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
          <Text style={{ fontSize: 20, fontWeight: '800', color: COLORS.textDark }}>
            Profile
          </Text>
        </View>

        {/* ================= PROFILE CARD ================= */}
        <View
          style={[
            styles.mh20,
            styles.mt8,
            styles.mb16,
            styles.p16,
            {
              backgroundColor: COLORS.cardBg,
              borderRadius: 18,
              borderWidth: 1.2,
              borderColor: COLORS.border,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              shadowColor: COLORS.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 6,
              elevation: 2,
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            {/* Avatar with yellow ring */}
            <View
              style={{
                width: 62,
                height: 62,
                borderRadius: 31,
                borderWidth: 2.2,
                borderColor: COLORS.yellow,
                overflow: 'hidden',
                backgroundColor: '#EAE5D8',
              }}
            >
              <Image
                source={images.avatar}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            {/* User Details */}
            <View style={styles.ml12}>
              <Text
                style={{
                  fontSize: 16.5,
                  fontWeight: '800',
                  color: COLORS.textDark,
                }}
              >
                Yasir Boss
              </Text>
              <Text
                style={[
                  styles.mt4,
                  {
                    fontSize: 12.5,
                    color: COLORS.textMuted,
                  },
                ]}
              >
                +91 98••• 4821
              </Text>
              {/* Rating Badge */}
              <View
                style={[
                  styles.mt8,
                  styles.pdh8,
                  styles.pdv4,
                  {
                    backgroundColor: COLORS.iconBg,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.yellowAccent,
                    marginRight: 4,
                  }}
                >
                  ★
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '800',
                    color: COLORS.textDark,
                  }}
                >
                  4.9
                </Text>
                <Text
                  style={{
                    fontSize: 10.5,
                    fontWeight: '600',
                    color: COLORS.textMuted,
                    marginLeft: 4,
                  }}
                >
                  Rating
                </Text>
              </View>
            </View>
          </View>

          {/* Stat: Rides Completed */}
          <View style={{ alignItems: 'center', paddingLeft: 8 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '900',
                color: COLORS.textDark,
              }}
            >
              08
            </Text>
            <Text
              style={[
                styles.mt4,
                {
                  fontSize: 10,
                  fontWeight: '600',
                  color: COLORS.textMuted,
                  textAlign: 'center',
                },
              ]}
            >
              Rides Completed
            </Text>
          </View>
        </View>

        {/* ================= MENU LIST CARD ================= */}
        <View
          style={[
            styles.mh20,
            {
              backgroundColor: COLORS.cardBg,
              borderRadius: 18,
              borderWidth: 1.2,
              borderColor: COLORS.border,
              overflow: 'hidden',
              shadowColor: COLORS.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 6,
              elevation: 2,
            },
          ]}
        >
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.pdh16,
                  styles.pdv12,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                ]}
                onPress={() => {
                  if (item.id === 'personal_details') {
                    navigation?.navigate?.('EditProfile');
                  } else if (item.id === 'saved_places') {
                    setIsSavedPlacesVisible(true);
                  } else if (item.id === 'emergency_contacts') {
                    setIsEmergencyContactsVisible(true);
                  }
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  {/* Icon in soft cream rounded box */}
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: '#FAF6ED',
                      borderWidth: 1,
                      borderColor: '#EFEAE0',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon(COLORS.textDark)}
                  </View>

                  {/* Title & Subtitle */}
                  <View style={styles.ml12}>
                    <Text
                      style={{
                        fontSize: 14.5,
                        fontWeight: '700',
                        color: COLORS.textDark,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: COLORS.textMuted,
                        marginTop: 2,
                      }}
                    >
                      {item.subtitle}
                    </Text>
                  </View>
                </View>

                {/* Right Arrow */}
                <Text
                  style={{
                    fontSize: 18,
                    color: COLORS.textMuted,
                    fontWeight: '600',
                  }}
                >
                  ›
                </Text>
              </TouchableOpacity>

              {/* Divider between rows */}
              {index < MENU_ITEMS.length - 1 && (
                <View
                  style={[
                    styles.mh16,
                    {
                      height: 1,
                      backgroundColor: COLORS.divider,
                    },
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </View>

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
