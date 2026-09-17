import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import {
  UserIcon,
  LocationPinIcon,
  ReceiptIcon,
  EmergencyIcon,
  HelpIcon,
  SettingsIcon,
} from '../Icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SKELETON_MENU_ITEMS = [
  { id: '1', titleWidth: 115, icon: <UserIcon size={18} color={COLORS.textLight} /> },
  { id: '2', titleWidth: 95, icon: <LocationPinIcon size={18} color={COLORS.textLight} /> },
  { id: '3', titleWidth: 135, icon: <ReceiptIcon size={18} color={COLORS.textLight} /> },
  { id: '4', titleWidth: 145, icon: <EmergencyIcon size={18} color={COLORS.textLight} /> },
  { id: '5', titleWidth: 100, icon: <HelpIcon size={18} color={COLORS.textLight} /> },
  { id: '6', titleWidth: 70, icon: <SettingsIcon size={18} color={COLORS.textLight} /> },
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
          backgroundColor: COLORS.pillBg,
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
          backgroundColor: COLORS.white,
          opacity: 0.55,
          transform: [{ translateX }],
        }}
      />
    </View>
  );
};

const ProfileSkeleton = () => {
  const insets = useSafeAreaInsets();
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
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: Math.max(insets.top, 14),
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.pdt12, styles.pdb24]}
      >
        {/* ================= PAGE TITLE ================= */}
        <View style={[styles.mh20, styles.mb12]}>
          <Text style={[styles.ts22, { fontWeight: '800', color: COLORS.textDark }]}>
            Profile
          </Text>
        </View>

        {/* ================= 1. PROFILE INFO CARD (1:1 with Profile.js) ================= */}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}
          >
            {/* Avatar with yellow ring */}
            <View
              style={{
                width: 62,
                height: 62,
                borderRadius: 31,
                borderWidth: 2.2,
                borderColor: COLORS.yellow,
                overflow: 'hidden',
                backgroundColor: COLORS.pillBg,
              }}
            >
              <ShimmerBlock
                width="100%"
                height="100%"
                borderRadius={31}
                style={{ backgroundColor: COLORS.pillBg }}
                shimmerAnim={shimmerAnim}
              />
            </View>

            {/* User Details */}
            <View style={[styles.ml12, { flex: 1 }]}>
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
                style={styles.mt4}
                shimmerAnim={shimmerAnim}
              />
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
                <Text style={[styles.ts12, { color: COLORS.yellowAccent, marginRight: 4 }]}>★</Text>
                <Text style={[styles.ts12, { fontWeight: '800', color: COLORS.textDark }]}>4.9</Text>
                <Text style={[styles.ts11, styles.ml4, { fontWeight: '600', color: COLORS.textMuted }]}>Rating</Text>
              </View>
            </View>
          </View>

          {/* Stat: Rides Completed */}
          <View style={{ alignItems: 'center', paddingLeft: 8 }}>
            <ShimmerBlock
              width={32}
              height={22}
              borderRadius={5}
              shimmerAnim={shimmerAnim}
            />
            <Text
              style={[
                styles.mt4,
                styles.ts10,
                {
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

        {/* ================= 2. MENU LIST CARD (1:1 with Profile.js) ================= */}
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
          {SKELETON_MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.id}>
              <View
                style={[
                  styles.pdh16,
                  styles.pdv12,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  {/* Icon in soft cream rounded box */}
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: COLORS.creamLight,
                      borderWidth: 1,
                      borderColor: COLORS.borderSoft,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </View>

                  {/* Title & Subtitle lines */}
                  <View style={[styles.ml12, { flex: 1 }]}>
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
                      style={styles.mt4}
                      shimmerAnim={shimmerAnim}
                    />
                  </View>
                </View>

                {/* Right Arrow */}
                <Text
                  style={[
                    styles.ts18,
                    {
                      color: COLORS.textMuted,
                      fontWeight: '600',
                    },
                  ]}
                >
                  ›
                </Text>
              </View>

              {/* Divider between rows */}
              {index < SKELETON_MENU_ITEMS.length - 1 && (
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

        {/* ================= 3. LOG OUT BUTTON ================= */}
        <View
          style={[
            styles.mt12,
            styles.mb24,
            styles.pdv8,
            {
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <Text
            style={[
              styles.ts14,
              {
                fontWeight: '700',
                color: COLORS.textMuted,
              },
            ]}
          >
            Log out
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export { ProfileSkeleton };
export default ProfileSkeleton;
