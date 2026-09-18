import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import {
  SearchIcon,
  GpsTargetIcon,
  HomeIcon,
  WorkIcon,
  StarIcon,
  RefreshIcon,
  ClockIcon,
  LocationPin,
} from '../../../assets/icons/Icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Sweeping Shimmer placeholder component
 * Matches the warm cream & off-white aesthetic of XCab UI
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

const HomeSkeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.88)).current;

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
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.pdt16, styles.pdb24]}
      >
        {/* ================= 1. SEARCH BAR ================= */}
        <View style={[styles.pdh20, styles.mb16]}>
          <View
            style={[
              styles.pdh16,
              {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.cardBg,
                borderRadius: 15,
                borderWidth: 1.2,
                borderColor: COLORS.border,
                height: 54,
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
                elevation: 2,
              },
            ]}
          >
            {/* Search Icon */}
            <View style={{ width: 24, alignItems: 'center', justifyContent: 'center' }}>
              <SearchIcon size={19} color={COLORS.textLight} />
            </View>

            {/* Input placeholder line */}
            <View style={[styles.pdh12, { flex: 1 }]}>
              <ShimmerBlock
                width="65%"
                height={14}
                borderRadius={7}
                shimmerAnim={shimmerAnim}
              />
            </View>

            {/* Right GPS Target Icon Button */}
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: COLORS.iconBg,
                borderWidth: 1,
                borderColor: COLORS.borderSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GpsTargetIcon size={18} color={COLORS.textLight} />
            </View>
          </View>
        </View>

        {/* ================= 2. QUICK DESTINATIONS ================= */}
        <View
          style={[
            styles.pdh20,
            styles.mb16,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}
        >
          {/* Home */}
          <View
            style={[
              styles.pdv8,
              styles.pdh8,
              styles.mh4,
              {
                flex: 1,
                backgroundColor: COLORS.cardBg,
                borderRadius: 14,
                borderWidth: 1.2,
                borderColor: COLORS.border,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 5,
                elevation: 1,
              },
            ]}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                backgroundColor: COLORS.background,
                borderWidth: 1,
                borderColor: COLORS.border,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HomeIcon size={19} color={COLORS.textLight} />
            </View>
            <View style={[styles.ml8, { flex: 1 }]}>
              <Text style={[styles.ts13, { fontWeight: '700', color: COLORS.textDark }]}>
                Home
              </Text>
              <ShimmerBlock
                width={50}
                height={8}
                borderRadius={4}
                style={styles.mt4}
                shimmerAnim={shimmerAnim}
              />
            </View>
          </View>

          {/* Work */}
          <View
            style={[
              styles.pdv8,
              styles.pdh8,
              styles.mh4,
              {
                flex: 1,
                backgroundColor: COLORS.cardBg,
                borderRadius: 14,
                borderWidth: 1.2,
                borderColor: COLORS.border,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 5,
                elevation: 1,
              },
            ]}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                backgroundColor: COLORS.background,
                borderWidth: 1,
                borderColor: COLORS.border,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <WorkIcon size={19} color={COLORS.textLight} />
            </View>
            <View style={[styles.ml8, { flex: 1 }]}>
              <Text style={[styles.ts13, { fontWeight: '700', color: COLORS.textDark }]}>
                Work
              </Text>
              <ShimmerBlock
                width={50}
                height={8}
                borderRadius={4}
                style={styles.mt4}
                shimmerAnim={shimmerAnim}
              />
            </View>
          </View>

          {/* Favorites */}
          <View
            style={[
              styles.pdv8,
              styles.pdh8,
              styles.mh4,
              {
                flex: 1,
                backgroundColor: COLORS.cardBg,
                borderRadius: 14,
                borderWidth: 1.2,
                borderColor: COLORS.border,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 5,
                elevation: 1,
              },
            ]}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                backgroundColor: COLORS.background,
                borderWidth: 1,
                borderColor: COLORS.border,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StarIcon size={19} color={COLORS.textLight} />
            </View>
            <View style={[styles.ml8, { flex: 1 }]}>
              <Text style={[styles.ts13, { fontWeight: '700', color: COLORS.textDark }]}>
                Favorites
              </Text>
              <ShimmerBlock
                width={55}
                height={8}
                borderRadius={4}
                style={styles.mt4}
                shimmerAnim={shimmerAnim}
              />
            </View>
          </View>
        </View>

        {/* ================= 3. CURRENT LOCATION & MAP CARD ================= */}
        <View
          style={[
            styles.mh20,
            styles.mb16,
            {
              backgroundColor: COLORS.cardBg,
              borderRadius: 16,
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
          {/* Header inside Map Card */}
          <View
            style={[
              styles.pdh12,
              styles.pdv12,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: COLORS.background,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GpsTargetIcon size={17} color={COLORS.textDark} />
              </View>
              <View style={styles.ml12}>
                <Text style={[styles.ts14, { fontWeight: '700', color: COLORS.textDark }]}>
                  Current location
                </Text>
                <ShimmerBlock
                  width={130}
                  height={9}
                  borderRadius={4}
                  style={styles.mt4}
                  shimmerAnim={shimmerAnim}
                />
              </View>
            </View>

            {/* Update location pill button */}
            <View
              style={[
                styles.pdh8,
                styles.pdv4,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLORS.promoBg,
                  borderWidth: 1,
                  borderColor: COLORS.promoBorder,
                  borderRadius: 20,
                },
              ]}
            >
              <RefreshIcon size={12} color={COLORS.textDark} />
              <Text
                style={[
                  styles.ml4,
                  styles.ts11,
                  {
                    fontWeight: '700',
                    color: COLORS.textDark,
                  },
                ]}
              >
                Update location
              </Text>
            </View>
          </View>

          {/* Map Canvas Placeholder with route shimmer */}
          <View
            style={{
              width: '100%',
              height: 155,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Shimmering map background */}
            <ShimmerBlock
              width="100%"
              height={155}
              borderRadius={0}
              style={{ backgroundColor: COLORS.mapBg }}
              shimmerAnim={shimmerAnim}
            />

            {/* Subtle route polyline sketch */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  left: 20,
                  right: 20,
                  height: 1.5,
                  backgroundColor: COLORS.borderLight,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 15,
                  bottom: 15,
                  width: 1.5,
                  backgroundColor: COLORS.borderLight,
                }}
              />
              <Animated.View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pulseAnim,
                }}
              >
                <LocationPin size={22} color={COLORS.redPin} />
              </Animated.View>
            </View>
          </View>
        </View>

        {/* ================= 4. RECENT SEARCHES ================= */}
        <View style={styles.mb16}>
          {/* Section Header */}
          <View
            style={[
              styles.pdh20,
              styles.mb12,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            <Text style={[styles.ts15, { fontWeight: '800', color: COLORS.textDark }]}>
              Recent Searches
            </Text>
            <Text style={[styles.ts13, { fontWeight: '700', color: COLORS.yellowAccent }]}>
              See all
            </Text>
          </View>

          {/* Card Container */}
          <View
            style={[
              styles.mh20,
              styles.pdv4,
              {
                backgroundColor: COLORS.cardBg,
                borderRadius: 16,
                borderWidth: 1.2,
                borderColor: COLORS.border,
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
                elevation: 2,
              },
            ]}
          >
            {[1, 2, 3].map((item, index) => (
              <React.Fragment key={item}>
                <View
                  style={[
                    styles.pdh16,
                    styles.pdv12,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}
                >
                  {/* Clock Icon container */}
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: COLORS.iconBg,
                      borderWidth: 1,
                      borderColor: COLORS.border,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ClockIcon size={15} color={COLORS.textLight} />
                  </View>

                  {/* Place text placeholders */}
                  <View style={[styles.ml12, { flex: 1 }]}>
                    <ShimmerBlock
                      width={index === 0 ? '55%' : index === 1 ? '45%' : '60%'}
                      height={13}
                      borderRadius={6}
                      shimmerAnim={shimmerAnim}
                    />
                    <ShimmerBlock
                      width={index === 0 ? '78%' : index === 1 ? '68%' : '74%'}
                      height={9}
                      borderRadius={4}
                      style={styles.mt4}
                      shimmerAnim={shimmerAnim}
                    />
                  </View>

                  {/* Right chevron indicator */}
                  <Text
                    style={[
                      styles.ml8,
                      styles.ts18,
                      {
                        color: COLORS.borderLight,
                        fontWeight: '400',
                      },
                    ]}
                  >
                    ›
                  </Text>
                </View>

                {/* Divider between items */}
                {index < 2 && (
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
        </View>
      </ScrollView>
    </View>
  );
};

export { HomeSkeleton };
export default HomeSkeleton;
