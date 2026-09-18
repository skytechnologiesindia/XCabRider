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
import Footer from '../../Footer/Footer';
import { GreenPickupDot, RedDropPin } from '../../../assets/icons/Icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Reusable sweeping shimmer block matching XCab UI design
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

const RidesSkeleton = ({
  navigation,
  showHeaderFooter = false,
}) => {
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
        contentContainerStyle={[styles.pdt16, styles.pdb28]}
      >
        {/* ================= 1. PAGE TITLE & SUBTITLE ================= */}
        <View style={[styles.pdh20, styles.mb16]}>
          <Text
            style={[
              styles.ts22,
              {
                fontWeight: '800',
                color: COLORS.textDark,
                letterSpacing: -0.3,
              },
            ]}
          >
            Ride History
          </Text>
          <Text
            style={[
              styles.ts13,
              {
                color: COLORS.textMuted,
                marginTop: 2,
              },
            ]}
          >
            Past trips & activity
          </Text>
        </View>

        {/* ================= 2. SKELETON RIDE CARDS (Matches RidesCards.js 1:1) ================= */}
        {[1, 2, 3].map((cardId) => (
          <View
            key={cardId}
            style={[
              styles.mh20,
              styles.mb16,
              styles.p16,
              {
                backgroundColor: COLORS.cardBg,
                borderRadius: 18,
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
            {/* Card Header: Vehicle Thumbnail + Name/Date + Status Tag */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                {/* Car Thumbnail Placeholder */}
                <View
                  style={[
                    styles.mr12,
                    {
                      width: 48,
                      height: 38,
                      borderRadius: 8,
                      backgroundColor: COLORS.inputBg,
                      overflow: 'hidden',
                    },
                  ]}
                >
                  <ShimmerBlock
                    width="100%"
                    height="100%"
                    borderRadius={8}
                    style={{ backgroundColor: COLORS.pillBg }}
                    shimmerAnim={shimmerAnim}
                  />
                </View>

                {/* Car Name & Date */}
                <View style={{ flex: 1 }}>
                  <ShimmerBlock
                    width={cardId === 1 ? 95 : cardId === 2 ? 80 : 110}
                    height={14}
                    borderRadius={6}
                    shimmerAnim={shimmerAnim}
                  />
                  <ShimmerBlock
                    width={115}
                    height={10}
                    borderRadius={5}
                    style={styles.mt4}
                    shimmerAnim={shimmerAnim}
                  />
                </View>
              </View>

              {/* Status Pill Badge (Completed / Cancelled pill) */}
              <View style={{ borderRadius: 12, overflow: 'hidden' }}>
                <ShimmerBlock
                  width={78}
                  height={24}
                  borderRadius={12}
                  style={{ backgroundColor: COLORS.pillBg }}
                  shimmerAnim={shimmerAnim}
                />
              </View>
            </View>

            {/* Card Divider */}
            <View
              style={[
                styles.mv12,
                {
                  height: 1,
                  backgroundColor: COLORS.divider,
                },
              ]}
            />

            {/* Route Path (Pickup -> Dashed Line -> Drop-off) */}
            <View
              style={[
                styles.mb12,
                {
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                },
              ]}
            >
              <View
                style={[
                  styles.mr12,
                  {
                    alignItems: 'center',
                    width: 14,
                    paddingTop: 3,
                  },
                ]}
              >
                {/* Green Pickup Dot */}
                <GreenPickupDot size={10} />
                {/* Dashed Line */}
                <View
                  style={{
                    width: 1.5,
                    height: 26,
                    backgroundColor: COLORS.borderDash,
                    marginVertical: 2.5,
                  }}
                />
                {/* Red Drop Pin */}
                <RedDropPin size={12} />
              </View>

              <View style={{ flex: 1 }}>
                {/* Pickup Row */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={[
                      styles.ts12,
                      {
                        fontWeight: '700',
                        color: COLORS.textDark,
                        width: 60,
                      },
                    ]}
                  >
                    Pickup:
                  </Text>
                  <View style={{ flex: 1 }}>
                    <ShimmerBlock
                      width={cardId === 1 ? '75%' : cardId === 2 ? '68%' : '80%'}
                      height={12}
                      borderRadius={5}
                      shimmerAnim={shimmerAnim}
                    />
                  </View>
                </View>

                {/* Drop-off Row */}
                <View
                  style={[
                    styles.mt4,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.ts12,
                      {
                        fontWeight: '700',
                        color: COLORS.textDark,
                        width: 60,
                      },
                    ]}
                  >
                    Drop-off:
                  </Text>
                  <View style={{ flex: 1 }}>
                    <ShimmerBlock
                      width={cardId === 1 ? '82%' : cardId === 2 ? '72%' : '85%'}
                      height={12}
                      borderRadius={5}
                      shimmerAnim={shimmerAnim}
                    />
                  </View>
                </View>

                {/* Metrics Line */}
                <View style={styles.mt4}>
                  <ShimmerBlock
                    width={90}
                    height={10}
                    borderRadius={4}
                    shimmerAnim={shimmerAnim}
                  />
                </View>
              </View>
            </View>

            {/* Card Bottom Row: Payment Info / Rating + Fare + Rebook Button */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 4,
              }}
            >
              {/* Payment & Stars */}
              <View style={{ justifyContent: 'center' }}>
                <ShimmerBlock
                  width={88}
                  height={22}
                  borderRadius={10}
                  style={{ backgroundColor: COLORS.pillBg }}
                  shimmerAnim={shimmerAnim}
                />
                <View style={[styles.mt4, { flexDirection: 'row' }]}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Text
                      key={star}
                      style={[
                        styles.mr4,
                        styles.ts14,
                        {
                          color: COLORS.border,
                        },
                      ]}
                    >
                      ★
                    </Text>
                  ))}
                </View>
              </View>

              {/* Fare & Button Column */}
              <View style={{ alignItems: 'flex-end' }}>
                <View
                  style={[
                    styles.mb4,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.ts11,
                      {
                        color: COLORS.textMuted,
                        fontWeight: '600',
                      },
                    ]}
                  >
                    Fare
                  </Text>
                  <ShimmerBlock
                    width={48}
                    height={16}
                    borderRadius={5}
                    style={styles.ml8}
                    shimmerAnim={shimmerAnim}
                  />
                </View>

                {/* Rebook CTA Button */}
                <View
                  style={[
                    styles.pdh16,
                    styles.pdv8,
                    {
                      backgroundColor: COLORS.yellow,
                      borderRadius: 18,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.ts12,
                      {
                        fontWeight: '800',
                        color: COLORS.textDark,
                      },
                    ]}
                  >
                    Rebook
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Optional Bottom Footer if used standalone */}
      {showHeaderFooter && (
        <Footer
          activeTab="RIDES"
          navigation={navigation}
          isAbsolute={false}
        />
      )}
    </View>
  );
};

export { RidesSkeleton };
export default RidesSkeleton;
