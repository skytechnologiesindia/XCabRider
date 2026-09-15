import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import COLORS from '../../../assets/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// 1. Vector Icon: User / Personal Details
const UserIcon = ({ size = 18, color = COLORS.textLight }) => (
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

// 2. Vector Icon: Location Pin
const LocationPinIcon = ({ size = 18, color = COLORS.textLight }) => (
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

// 3. Vector Icon: Receipts & Invoices
const ReceiptIcon = ({ size = 18, color = COLORS.textLight }) => (
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

// 4. Vector Icon: Emergency Contacts
const EmergencyIcon = ({ size = 18, color = COLORS.textLight }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
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

// 5. Vector Icon: Help & Safety
const HelpIcon = ({ size = 18, color = COLORS.textLight }) => (
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

// 6. Vector Icon: Settings
const SettingsIcon = ({ size = 18, color = COLORS.textLight }) => (
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

const SKELETON_MENU_ITEMS = [
  { id: '1', titleWidth: 115, icon: <UserIcon /> },
  { id: '2', titleWidth: 95, icon: <LocationPinIcon /> },
  { id: '3', titleWidth: 135, icon: <ReceiptIcon /> },
  { id: '4', titleWidth: 145, icon: <EmergencyIcon /> },
  { id: '5', titleWidth: 100, icon: <HelpIcon /> },
  { id: '6', titleWidth: 70, icon: <SettingsIcon /> },
];

/**
 * Sweeping Shimmer placeholder component
 */
const ShimmerBlock = ({
  width = '100%',
  height = 14,
  borderRadius = 6,
  style,
  shimmerAnim,
}) => {
  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
  });

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: '#EDE7DC',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: SCREEN_WIDTH,
          backgroundColor: '#FFFFFF',
          opacity: 0.55,
          transform: [{ translateX }],
        }}
      />
    </View>
  );
};

const ProfileSkeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    // 1. Sweeping horizontal light beam (1300ms loop)
    const sweep = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1300,
        useNativeDriver: true,
      })
    );

    // 2. Gentle ambient pulse
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.82,
          duration: 650,
          useNativeDriver: true,
        }),
      ])
    );

    sweep.start();
    pulse.start();

    return () => {
      sweep.stop();
      pulse.stop();
    };
  }, [shimmerAnim, pulseAnim]);

  return (
    <View style={uiStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={uiStyles.scrollContent}
      >
        {/* ================= PAGE TITLE ================= */}
        <View style={uiStyles.titleContainer}>
          <Text style={uiStyles.pageTitle}>Profile</Text>
        </View>

        {/* ================= 1. PROFILE INFO CARD (1:1 with Profile.js) ================= */}
        <View style={uiStyles.profileCard}>
          <View style={uiStyles.profileCardLeft}>
            {/* Avatar with yellow ring */}
            <View style={uiStyles.avatarWrapper}>
              <ShimmerBlock
                width="100%"
                height="100%"
                borderRadius={31}
                style={{ backgroundColor: '#EAE5D8' }}
                shimmerAnim={shimmerAnim}
              />
            </View>

            {/* User Details */}
            <View style={uiStyles.userDetails}>
              {/* Name Line */}
              <ShimmerBlock
                width={115}
                height={16}
                borderRadius={6}
                shimmerAnim={shimmerAnim}
              />
              {/* Phone Line */}
              <ShimmerBlock
                width={95}
                height={11}
                borderRadius={5}
                style={uiStyles.mt6}
                shimmerAnim={shimmerAnim}
              />
              {/* Rating Badge */}
              <View style={uiStyles.ratingBadge}>
                <Text style={uiStyles.starIcon}>★</Text>
                <Text style={uiStyles.ratingValue}>4.9</Text>
                <Text style={uiStyles.ratingLabel}>Rating</Text>
              </View>
            </View>
          </View>

          {/* Stat: Rides Completed */}
          <View style={uiStyles.ridesStatColumn}>
            <ShimmerBlock
              width={32}
              height={22}
              borderRadius={5}
              shimmerAnim={shimmerAnim}
            />
            <Text style={uiStyles.ridesStatLabel}>Rides Completed</Text>
          </View>
        </View>

        {/* ================= 2. MENU LIST CARD (1:1 with Profile.js) ================= */}
        <View style={uiStyles.menuCard}>
          {SKELETON_MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.id}>
              <View style={uiStyles.menuRow}>
                <View style={uiStyles.menuRowLeft}>
                  {/* Icon in soft cream rounded box */}
                  <View style={uiStyles.menuIconBox}>
                    {item.icon}
                  </View>

                  {/* Title & Subtitle lines */}
                  <View style={uiStyles.menuTextWrap}>
                    <ShimmerBlock
                      width={item.titleWidth}
                      height={13.5}
                      borderRadius={6}
                      shimmerAnim={shimmerAnim}
                    />
                    <ShimmerBlock
                      width={item.titleWidth * 0.75}
                      height={9}
                      borderRadius={4}
                      style={uiStyles.mt6}
                      shimmerAnim={shimmerAnim}
                    />
                  </View>
                </View>

                {/* Right Arrow */}
                <Text style={uiStyles.menuChevron}>›</Text>
              </View>

              {/* Divider between rows */}
              {index < SKELETON_MENU_ITEMS.length - 1 && (
                <View style={uiStyles.menuDivider} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* ================= 3. LOG OUT BUTTON ================= */}
        <View style={uiStyles.logoutContainer}>
          <Text style={uiStyles.logoutText}>Log out</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const uiStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  titleContainer: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  mt6: {
    marginTop: 6,
  },

  // 1. Profile Info Card (1:1 with Profile.js)
  profileCard: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    padding: 16,
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
  profileCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrapper: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2.2,
    borderColor: COLORS.yellow,
    overflow: 'hidden',
    backgroundColor: '#EAE5D8',
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  ratingBadge: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLORS.iconBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  starIcon: {
    fontSize: 12,
    color: COLORS.yellowAccent,
    marginRight: 4,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  ratingLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  ridesStatColumn: {
    alignItems: 'center',
    paddingLeft: 8,
  },
  ridesStatLabel: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
    textAlign: 'center',
  },

  // 2. Menu List Card (1:1 with Profile.js)
  menuCard: {
    marginHorizontal: 20,
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
  menuRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FAF6ED',
    borderWidth: 1,
    borderColor: '#EFEAE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextWrap: {
    marginLeft: 12,
    flex: 1,
  },
  menuChevron: {
    fontSize: 18,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  menuDivider: {
    marginHorizontal: 16,
    height: 1,
    backgroundColor: COLORS.divider,
  },

  // 3. Logout Button
  logoutContainer: {
    marginTop: 12,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  logoutText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
});

export default ProfileSkeleton;
