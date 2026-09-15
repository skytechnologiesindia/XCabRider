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
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

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

const RidesSkeleton = ({
  navigation,
  showHeaderFooter = false,
}) => {
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
    <View style={uiStyles.screenContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Optional Top Header if used standalone */}
      {showHeaderFooter && <Header navigation={navigation} safeAreaTop />}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={uiStyles.scrollContent}
      >
        {/* ================= 1. PAGE TITLE & SUBTITLE ================= */}
        <View style={uiStyles.titleSection}>
          <Text style={uiStyles.pageTitle}>Ride History</Text>
          <Text style={uiStyles.pageSubtitle}>Past trips & activity</Text>
        </View>

        {/* ================= 2. SKELETON RIDE CARDS (Matches RidesCards.js 1:1) ================= */}
        {[1, 2, 3].map((cardId) => (
          <View key={cardId} style={uiStyles.cardContainer}>
            {/* Card Header: Vehicle Thumbnail + Name/Date + Status Tag */}
            <View style={uiStyles.cardTopRow}>
              <View style={uiStyles.vehicleInfoGroup}>
                {/* Car Thumbnail Placeholder */}
                <View style={uiStyles.vehicleThumbnailWrapper}>
                  <ShimmerBlock
                    width="100%"
                    height="100%"
                    borderRadius={8}
                    style={{ backgroundColor: '#F0EBE0' }}
                    shimmerAnim={shimmerAnim}
                  />
                </View>

                {/* Car Name & Date */}
                <View style={uiStyles.vehicleTextGroup}>
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
                    style={uiStyles.mt6}
                    shimmerAnim={shimmerAnim}
                  />
                </View>
              </View>

              {/* Status Pill Badge (Completed / Cancelled pill) */}
              <View style={uiStyles.statusBadgeWrap}>
                <ShimmerBlock
                  width={78}
                  height={24}
                  borderRadius={12}
                  style={{ backgroundColor: '#EFE8DC' }}
                  shimmerAnim={shimmerAnim}
                />
              </View>
            </View>

            {/* Card Divider */}
            <View style={uiStyles.cardDivider} />

            {/* Route Path (Pickup -> Dashed Line -> Drop-off) */}
            <View style={uiStyles.routeContainer}>
              <View style={uiStyles.routeTimelineColumn}>
                {/* Green Pickup Dot */}
                <View style={uiStyles.greenPickupDot} />
                {/* Dashed Line */}
                <View style={uiStyles.dashedLine} />
                {/* Red Drop Pin */}
                <View style={uiStyles.redDropPin} />
              </View>

              <View style={uiStyles.routeAddressesColumn}>
                {/* Pickup Row */}
                <View style={uiStyles.addressRow}>
                  <Text style={uiStyles.addressLabel}>Pickup:</Text>
                  <View style={uiStyles.shimmerAddressWrap}>
                    <ShimmerBlock
                      width={cardId === 1 ? '75%' : cardId === 2 ? '68%' : '80%'}
                      height={12}
                      borderRadius={5}
                      shimmerAnim={shimmerAnim}
                    />
                  </View>
                </View>

                {/* Drop-off Row */}
                <View style={[uiStyles.addressRow, uiStyles.mt6]}>
                  <Text style={uiStyles.addressLabel}>Drop-off:</Text>
                  <View style={uiStyles.shimmerAddressWrap}>
                    <ShimmerBlock
                      width={cardId === 1 ? '82%' : cardId === 2 ? '72%' : '85%'}
                      height={12}
                      borderRadius={5}
                      shimmerAnim={shimmerAnim}
                    />
                  </View>
                </View>

                {/* Metrics Line */}
                <View style={uiStyles.mt6}>
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
            <View style={uiStyles.cardBottomRow}>
              {/* Payment & Stars */}
              <View style={uiStyles.paymentAndRatingGroup}>
                <ShimmerBlock
                  width={88}
                  height={22}
                  borderRadius={10}
                  style={{ backgroundColor: '#F2ECE2' }}
                  shimmerAnim={shimmerAnim}
                />
                <View style={uiStyles.starPlaceholderRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Text key={star} style={uiStyles.starPlaceholder}>
                      ★
                    </Text>
                  ))}
                </View>
              </View>

              {/* Fare & Button Column */}
              <View style={uiStyles.fareActionColumn}>
                <View style={uiStyles.farePriceRow}>
                  <Text style={uiStyles.fareLabel}>Fare</Text>
                  <ShimmerBlock
                    width={48}
                    height={16}
                    borderRadius={5}
                    style={{ marginLeft: 6 }}
                    shimmerAnim={shimmerAnim}
                  />
                </View>

                {/* Rebook CTA Button */}
                <View style={uiStyles.actionButton}>
                  <Text style={uiStyles.actionButtonText}>Rebook</Text>
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

const uiStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingTop: 14,
    paddingBottom: 28,
  },
  titleSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.3,
  },
  pageSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  mt6: {
    marginTop: 6,
  },

  // Ride Card Container (1:1 with RidesCards.js)
  cardContainer: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vehicleInfoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleThumbnailWrapper: {
    width: 48,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#F7F4EC',
    marginRight: 10,
    overflow: 'hidden',
  },
  vehicleTextGroup: {
    flex: 1,
  },
  statusBadgeWrap: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  cardDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: 12,
  },

  // Route Timeline
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  routeTimelineColumn: {
    alignItems: 'center',
    width: 14,
    marginRight: 10,
    paddingTop: 3,
  },
  greenPickupDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#2E7D32',
  },
  dashedLine: {
    width: 1.5,
    height: 26,
    backgroundColor: COLORS.borderDash || '#D6D0C5',
    marginVertical: 2.5,
  },
  redDropPin: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: COLORS.redPin || '#EB5757',
  },
  routeAddressesColumn: {
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
    width: 60,
  },
  shimmerAddressWrap: {
    flex: 1,
  },

  // Card Bottom Row
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  paymentAndRatingGroup: {
    justifyContent: 'center',
  },
  starPlaceholderRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  starPlaceholder: {
    fontSize: 14,
    color: '#E0D9CC',
    marginRight: 2,
  },
  fareActionColumn: {
    alignItems: 'flex-end',
  },
  farePriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  fareLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: COLORS.yellow,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
});

export default RidesSkeleton;
