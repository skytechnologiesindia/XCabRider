import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../../assets/colors';
import images from '../../../assets/images';
import Footer from '../../Footer/Footer';

// ================= VECTOR ICONS (INLINE STYLES) =================

// Back Arrow (<) Icon
const ChevronLeftIcon = ({ size = 20, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.44,
        height: size * 0.44,
        borderLeftWidth: 2.2,
        borderBottomWidth: 2.2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        marginLeft: 3,
      }}
    />
  </View>
);

// Forward Chevron (>) Icon
const ChevronRightIcon = ({ size = 14, color = '#C4BEB2' }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.46,
        height: size * 0.46,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        marginRight: 2,
      }}
    />
  </View>
);

// User Icon (Personal Information)
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
        width: size * 0.76,
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

// Lock Icon (Change Password)
const LockIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.5,
        height: size * 0.4,
        borderTopLeftRadius: size * 0.25,
        borderTopRightRadius: size * 0.25,
        borderWidth: 1.6,
        borderColor: color,
        borderBottomWidth: 0,
        marginBottom: -1,
      }}
    />
    <View
      style={{
        width: size * 0.7,
        height: size * 0.5,
        borderRadius: 3,
        borderWidth: 1.6,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: 2, height: 3.5, backgroundColor: color, borderRadius: 1 }} />
    </View>
  </View>
);

// Bell Icon (Notifications)
const BellIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.65,
        height: size * 0.58,
        borderTopLeftRadius: size * 0.35,
        borderTopRightRadius: size * 0.35,
        borderWidth: 1.6,
        borderColor: color,
        borderBottomWidth: 0,
      }}
    />
    <View
      style={{
        width: size * 0.8,
        height: 1.8,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        width: size * 0.22,
        height: 2.2,
        backgroundColor: color,
        borderRadius: 1.1,
        marginTop: 1,
      }}
    />
  </View>
);

// Location Pin Icon (Location Services)
const LocationIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.62,
        height: size * 0.62,
        borderRadius: (size * 0.62) / 2,
        borderWidth: 1.6,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.2,
          height: size * 0.2,
          borderRadius: (size * 0.2) / 2,
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

// Globe Icon (Language)
const GlobeIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.82,
      height: size * 0.82,
      borderRadius: (size * 0.82) / 2,
      borderWidth: 1.6,
      borderColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View
      style={{
        width: size * 0.44,
        height: '100%',
        borderRadius: size * 0.4,
        borderWidth: 1.2,
        borderColor: color,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: 1.2,
        backgroundColor: color,
      }}
    />
  </View>
);

// Payment Card Icon (Payment Methods)
const PaymentCardIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.84,
      height: size * 0.62,
      borderRadius: 3.5,
      borderWidth: 1.6,
      borderColor: color,
      justifyContent: 'flex-start',
      paddingTop: 3,
    }}
  >
    <View style={{ width: '100%', height: 2, backgroundColor: color }} />
    <View
      style={{
        width: 4,
        height: 2.5,
        backgroundColor: color,
        borderRadius: 0.8,
        marginTop: 3,
        marginLeft: 2.5,
      }}
    />
  </View>
);

// Appearance / Palette Icon (Appearance)
const AppearanceIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.82,
      height: size * 0.82,
      borderRadius: (size * 0.82) / 2,
      borderWidth: 1.6,
      borderColor: color,
      padding: 2,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%', marginBottom: 2 }}>
      <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: color }} />
      <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: color }} />
    </View>
    <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: color }} />
  </View>
);

// Mobile Device Icon (App Preferences)
const MobileDeviceIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.58,
      height: size * 0.84,
      borderRadius: 3.5,
      borderWidth: 1.6,
      borderColor: color,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 2,
    }}
  >
    <View style={{ width: 4, height: 1.2, backgroundColor: color, borderRadius: 0.6 }} />
    <View style={{ width: 3, height: 3, borderRadius: 1.5, borderWidth: 0.8, borderColor: color }} />
  </View>
);

// Help Circle Icon (Help & Support)
const HelpCircleIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.82,
      height: size * 0.82,
      borderRadius: (size * 0.82) / 2,
      borderWidth: 1.6,
      borderColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ fontSize: 11, fontWeight: '900', color, marginTop: -1 }}>?</Text>
  </View>
);

// Message Chat Icon (Contact Us)
const MessageChatIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.78,
        height: size * 0.6,
        borderRadius: 4,
        borderWidth: 1.6,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ width: '50%', height: 1.2, backgroundColor: color, borderRadius: 0.6, marginBottom: 1.5 }} />
      <View style={{ width: '35%', height: 1.2, backgroundColor: color, borderRadius: 0.6 }} />
    </View>
    <View
      style={{
        width: 0,
        height: 0,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderTopColor: color,
        borderRightColor: 'transparent',
        alignSelf: 'flex-start',
        marginLeft: 4,
        marginTop: -0.5,
      }}
    />
  </View>
);

// Info Circle Icon (About XCAB)
const InfoCircleIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.82,
      height: size * 0.82,
      borderRadius: (size * 0.82) / 2,
      borderWidth: 1.6,
      borderColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ fontSize: 11, fontWeight: '900', color, marginTop: -1 }}>i</Text>
  </View>
);

// Logout Icon
const LogoutIcon = ({ size = 18, color = '#D89A00' }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    {/* Door frame */}
    <View
      style={{
        position: 'absolute',
        left: 1,
        top: 2,
        bottom: 2,
        width: size * 0.48,
        borderTopWidth: 1.8,
        borderBottomWidth: 1.8,
        borderLeftWidth: 1.8,
        borderColor: color,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
      }}
    />
    {/* Exit arrow */}
    <View
      style={{
        position: 'absolute',
        right: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View style={{ width: size * 0.44, height: 1.8, backgroundColor: color }} />
      <View
        style={{
          width: 5,
          height: 5,
          borderTopWidth: 1.8,
          borderRightWidth: 1.8,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginLeft: -3,
        }}
      />
    </View>
  </View>
);

// Icon Helper Dispatcher
const renderSettingIcon = (type) => {
  switch (type) {
    case 'user':
      return <UserIcon size={18} color={COLORS.textDark} />;
    case 'lock':
      return <LockIcon size={18} color={COLORS.textDark} />;
    case 'bell':
      return <BellIcon size={18} color={COLORS.textDark} />;
    case 'location':
      return <LocationIcon size={18} color={COLORS.textDark} />;
    case 'globe':
      return <GlobeIcon size={18} color={COLORS.textDark} />;
    case 'payment':
      return <PaymentCardIcon size={18} color={COLORS.textDark} />;
    case 'palette':
      return <AppearanceIcon size={18} color={COLORS.textDark} />;
    case 'mobile':
      return <MobileDeviceIcon size={18} color={COLORS.textDark} />;
    case 'help':
      return <HelpCircleIcon size={18} color={COLORS.textDark} />;
    case 'contact':
      return <MessageChatIcon size={18} color={COLORS.textDark} />;
    case 'info':
      return <InfoCircleIcon size={18} color={COLORS.textDark} />;
    default:
      return null;
  }
};

// ================= MAIN SETTING COMPONENT =================

const Setting = ({
  navigation,
  onBack,
  onLogout,
  showFooter = true,
  userName = 'Yasir Khan',
  userPhone = '+91 98765 43210',
  userAvatar = images.avatar,
}) => {
  const insets = useSafeAreaInsets();
  const topInset = Math.max(
    insets?.top || 0,
    Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
    12,
  );

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.goBack) {
      navigation.goBack();
    } else if (navigation?.navigate) {
      navigation.navigate('Profile');
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else if (navigation?.navigate) {
      navigation.navigate('Login');
    }
  };

  const SECTIONS = [
    {
      id: 'account',
      title: 'Account',
      items: [
        {
          id: 'personal_info',
          title: 'Personal Information',
          subtitle: 'Name, phone, email',
          iconType: 'user',
          onPress: () => navigation?.navigate?.('EditProfile'),
        },
        {
          id: 'change_password',
          title: 'Change Password',
          subtitle: 'Update your password',
          iconType: 'lock',
          onPress: () => {},
        },
      ],
    },
    {
      id: 'preferences',
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          title: 'Notifications',
          subtitle: 'Ride updates and alerts',
          iconType: 'bell',
          onPress: () => navigation?.navigate?.('Alerts'),
        },
        {
          id: 'location_services',
          title: 'Location Services',
          subtitle: 'Allow location access',
          iconType: 'location',
          onPress: () => {},
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'English',
          iconType: 'globe',
          onPress: () => {},
        },
        {
          id: 'payment_methods',
          title: 'Payment Methods',
          subtitle: 'Manage your payment options',
          iconType: 'payment',
          onPress: () => {},
        },
      ],
    },
    {
      id: 'app',
      title: 'App',
      items: [
        {
          id: 'appearance',
          title: 'Appearance',
          subtitle: 'Light mode',
          iconType: 'palette',
          onPress: () => {},
        },
        {
          id: 'app_preferences',
          title: 'App Preferences',
          subtitle: 'Default settings',
          iconType: 'mobile',
          onPress: () => {},
        },
      ],
    },
    {
      id: 'support',
      title: 'Support',
      items: [
        {
          id: 'help_support',
          title: 'Help & Support',
          subtitle: 'Get help with your issues',
          iconType: 'help',
          onPress: () => {},
        },
        {
          id: 'contact_us',
          title: 'Contact Us',
          subtitle: "We're here to help",
          iconType: 'contact',
          onPress: () => {},
        },
        {
          id: 'about_xcab',
          title: 'About XCAB',
          subtitle: 'App version 1.0.0',
          iconType: 'info',
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: topInset,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* ================= SCROLLABLE CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 28,
        }}
      >
        {/* Top Back Button (<) */}
        <TouchableOpacity
          onPress={handleBack}
          activeOpacity={0.7}
          style={{
            width: 36,
            height: 36,
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginBottom: 6,
          }}
        >
          <ChevronLeftIcon size={22} color={COLORS.textDark} />
        </TouchableOpacity>

        {/* Page Title */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: '900',
            color: COLORS.textDark,
            letterSpacing: -0.6,
            marginBottom: 16,
          }}
        >
          Settings
        </Text>

        {/* User Profile Banner Row */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation?.navigate?.('EditProfile')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 4,
            marginBottom: 18,
          }}
        >
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              overflow: 'hidden',
              borderWidth: 1.5,
              borderColor: COLORS.border,
              marginRight: 14,
              backgroundColor: '#FFF2C6',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={userAvatar}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16.5,
                fontWeight: '800',
                color: COLORS.textDark,
                marginBottom: 3,
              }}
            >
              {userName}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '500',
                color: COLORS.textMuted,
              }}
            >
              {userPhone}
            </Text>
          </View>

          <ChevronRightIcon size={14} color="#B8B2A6" />
        </TouchableOpacity>

        {/* Sections List */}
        {SECTIONS.map((section) => (
          <View key={section.id} style={{ marginBottom: 20 }}>
            {/* Section Header Label */}
            <Text
              style={{
                fontSize: 13.5,
                fontWeight: '700',
                color: '#7E7A70',
                marginLeft: 4,
                marginBottom: 8,
              }}
            >
              {section.title}
            </Text>

            {/* Section Card Container */}
            <View
              style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: 18,
                borderWidth: 1.2,
                borderColor: COLORS.border,
                paddingHorizontal: 16,
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.03,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              {section.items.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={item.onPress}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 14,
                    }}
                  >
                    {/* Left Icon Badge */}
                    <View
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 19,
                        backgroundColor: '#FAF6ED',
                        borderWidth: 1,
                        borderColor: '#EFEAE0',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 14,
                      }}
                    >
                      {renderSettingIcon(item.iconType)}
                    </View>

                    {/* Middle Title & Subtitle */}
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: COLORS.textDark,
                          marginBottom: 2,
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '500',
                          color: COLORS.textMuted,
                        }}
                      >
                        {item.subtitle}
                      </Text>
                    </View>

                    {/* Right Chevron */}
                    <ChevronRightIcon size={14} color="#C4BEB2" />
                  </TouchableOpacity>

                  {/* Divider line between items */}
                  {index < section.items.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: COLORS.divider,
                        marginLeft: 52,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* ================= LOG OUT BUTTON ================= */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handleLogout}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 48,
            borderRadius: 14,
            backgroundColor: '#FFFDF5',
            borderWidth: 1.2,
            borderColor: '#F5C842',
            marginTop: 4,
            marginBottom: 20,
          }}
        >
          <LogoutIcon size={18} color="#D89A00" />
          <Text
            style={{
              fontSize: 15,
              fontWeight: '800',
              color: '#D89A00',
              marginLeft: 8,
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ================= FOOTER COMPONENT ================= */}
      {showFooter && (
        <Footer
          activeTab="PROFILE"
          navigation={navigation}
          isAbsolute={false}
        />
      )}
    </View>
  );
};

export default Setting;
