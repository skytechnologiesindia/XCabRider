import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import COLORS from '../../../assets/colors';
import {
  SearchIcon,
  GpsTargetIcon,
  HomeIcon,
  WorkIcon,
  StarIcon,
  RefreshIcon,
  PromoDiscountIcon,
  ClockIcon,
  LocationPin,
} from '../Icons';

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

const HomeSkeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.88)).current;

  useEffect(() => {
    // 1. Sweeping horizontal light beam (1200ms loop)
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={uiStyles.scrollContent}
      >
        {/* ================= 1. SEARCH BAR (Exact Home.js card style) ================= */}
        <View style={uiStyles.searchContainer}>
          <View style={uiStyles.searchCard}>
            {/* Search Icon */}
            <View style={uiStyles.searchIconWrap}>
              <SearchIcon size={19} color={COLORS.textLight} />
            </View>

            {/* Input placeholder line */}
            <View style={uiStyles.searchPlaceholderWrap}>
              <ShimmerBlock
                width="65%"
                height={14}
                borderRadius={7}
                shimmerAnim={shimmerAnim}
              />
            </View>

            {/* Right GPS Target Icon Button */}
            <View style={uiStyles.gpsButton}>
              <GpsTargetIcon size={18} color={COLORS.textLight} />
            </View>
          </View>
        </View>

        {/* ================= 2. QUICK DESTINATIONS (Home, Work, Favorites) ================= */}
        <View style={uiStyles.quickDestRow}>
          {/* Home */}
          <View style={uiStyles.quickCard}>
            <View style={uiStyles.quickIconWrap}>
              <HomeIcon size={19} color={COLORS.textLight} />
            </View>
            <View style={uiStyles.quickCardText}>
              <Text style={uiStyles.quickCardTitle}>Home</Text>
              <ShimmerBlock
                width={50}
                height={8}
                borderRadius={4}
                style={uiStyles.mt4}
                shimmerAnim={shimmerAnim}
              />
            </View>
          </View>

          {/* Work */}
          <View style={uiStyles.quickCard}>
            <View style={uiStyles.quickIconWrap}>
              <WorkIcon size={19} color={COLORS.textLight} />
            </View>
            <View style={uiStyles.quickCardText}>
              <Text style={uiStyles.quickCardTitle}>Work</Text>
              <ShimmerBlock
                width={50}
                height={8}
                borderRadius={4}
                style={uiStyles.mt4}
                shimmerAnim={shimmerAnim}
              />
            </View>
          </View>

          {/* Favorites */}
          <View style={uiStyles.quickCard}>
            <View style={uiStyles.quickIconWrap}>
              <StarIcon size={19} color={COLORS.textLight} />
            </View>
            <View style={uiStyles.quickCardText}>
              <Text style={uiStyles.quickCardTitle}>Favorites</Text>
              <ShimmerBlock
                width={55}
                height={8}
                borderRadius={4}
                style={uiStyles.mt4}
                shimmerAnim={shimmerAnim}
              />
            </View>
          </View>
        </View>

        {/* ================= 3. CURRENT LOCATION & MAP CARD ================= */}
        <View style={uiStyles.mapCard}>
          {/* Header inside Map Card */}
          <View style={uiStyles.mapCardHeader}>
            <View style={uiStyles.mapCardLeft}>
              <View style={uiStyles.locationGpsWrap}>
                <GpsTargetIcon size={17} color={COLORS.textDark} />
              </View>
              <View style={uiStyles.mapCardHeaderText}>
                <Text style={uiStyles.mapCardTitle}>Current location</Text>
                <ShimmerBlock
                  width={130}
                  height={9}
                  borderRadius={4}
                  style={uiStyles.mt4}
                  shimmerAnim={shimmerAnim}
                />
              </View>
            </View>

            {/* Update location pill button */}
            <View style={uiStyles.updateLocationPill}>
              <RefreshIcon size={12} color={COLORS.textDark} />
              <Text style={uiStyles.updateLocationText}>Update location</Text>
            </View>
          </View>

          {/* Map Canvas Placeholder with route shimmer */}
          <View style={uiStyles.mapCanvas}>
            {/* Shimmering map background */}
            <ShimmerBlock
              width="100%"
              height={155}
              borderRadius={0}
              style={{ backgroundColor: '#EBE5D9' }}
              shimmerAnim={shimmerAnim}
            />

            {/* Subtle route polyline sketch */}
            <View style={uiStyles.mapRouteOverlay}>
              <View style={uiStyles.mapGridLineH} />
              <View style={uiStyles.mapGridLineV} />
              <Animated.View
                style={[
                  uiStyles.mapPinMarker,
                  {
                    opacity: pulseAnim,
                  },
                ]}
              >
                <LocationPin size={22} color={COLORS.redPin} />
              </Animated.View>
            </View>
          </View>
        </View>

        {/* ================= 4. RECENT SEARCHES (Exact Home.js & recentSearch.js style) ================= */}
        <View style={uiStyles.recentContainer}>
          {/* Section Header */}
          <View style={uiStyles.recentHeader}>
            <Text style={uiStyles.recentHeaderTitle}>Recent Searches</Text>
            <Text style={uiStyles.recentSeeAll}>See all</Text>
          </View>

          {/* Card Container */}
          <View style={uiStyles.recentCard}>
            {[1, 2, 3].map((item, index) => (
              <React.Fragment key={item}>
                <View style={uiStyles.recentRow}>
                  {/* Clock Icon container */}
                  <View style={uiStyles.recentIconWrap}>
                    <ClockIcon size={15} color={COLORS.textLight} />
                  </View>

                  {/* Place text placeholders */}
                  <View style={uiStyles.recentTextWrap}>
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
                      style={uiStyles.mt6}
                      shimmerAnim={shimmerAnim}
                    />
                  </View>

                  {/* Right chevron indicator */}
                  <Text style={uiStyles.recentChevron}>›</Text>
                </View>

                {/* Divider between items */}
                {index < 2 && <View style={uiStyles.recentDivider} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* ================= 5. PROMO BANNER (Exact Home.js promoBg & promoBorder style) ================= */}
        <View style={uiStyles.promoBanner}>
          <PromoDiscountIcon size={38} />

          <View style={uiStyles.promoTextWrap}>
            <Text style={uiStyles.promoTitle}>Ride More, Save More!</Text>
            <ShimmerBlock
              width="85%"
              height={9}
              borderRadius={4}
              style={uiStyles.mt4}
              shimmerAnim={shimmerAnim}
            />
          </View>

          {/* View Offers button */}
          <View style={uiStyles.promoButton}>
            <Text style={uiStyles.promoButtonText}>View Offers</Text>
            <Text style={uiStyles.promoButtonArrow}>›</Text>
          </View>
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
    paddingTop: 14,
    paddingBottom: 24,
  },
  mt4: {
    marginTop: 4,
  },
  mt6: {
    marginTop: 6,
  },

  // 1. Search Bar Styles (1:1 with Home.js)
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 15,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    height: 54,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIconWrap: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchPlaceholderWrap: {
    flex: 1,
    paddingHorizontal: 12,
  },
  gpsButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.iconBg,
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 2. Quick Destinations (1:1 with Home.js)
  quickDestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  quickCard: {
    flex: 1,
    marginHorizontal: 3.5,
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  quickIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickCardText: {
    marginLeft: 7,
    flex: 1,
  },
  quickCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },

  // 3. Current Location Map Card (1:1 with Home.js)
  mapCard: {
    marginHorizontal: 20,
    marginBottom: 18,
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
  mapCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  mapCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationGpsWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapCardHeaderText: {
    marginLeft: 10,
  },
  mapCardTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  updateLocationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.promoBg,
    borderWidth: 1,
    borderColor: COLORS.promoBorder,
    paddingHorizontal: 10,
    paddingVertical: 6.5,
    borderRadius: 20,
  },
  updateLocationText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDark,
    marginLeft: 5,
  },
  mapCanvas: {
    width: '100%',
    height: 155,
    position: 'relative',
    overflow: 'hidden',
  },
  mapRouteOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapGridLineH: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 1.5,
    backgroundColor: 'rgba(215, 207, 192, 0.4)',
  },
  mapGridLineV: {
    position: 'absolute',
    top: 15,
    bottom: 15,
    width: 1.5,
    backgroundColor: 'rgba(215, 207, 192, 0.4)',
  },
  mapPinMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 4. Recent Searches (1:1 with recentSearch.js)
  recentContainer: {
    marginBottom: 16,
  },
  recentHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recentHeaderTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  recentSeeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.yellowAccent,
  },
  recentCard: {
    marginHorizontal: 20,
    paddingVertical: 4,
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
  recentRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.iconBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentTextWrap: {
    marginLeft: 12,
    flex: 1,
  },
  recentChevron: {
    fontSize: 18,
    color: COLORS.borderLight,
    fontWeight: '400',
    marginLeft: 8,
  },
  recentDivider: {
    marginHorizontal: 16,
    height: 1,
    backgroundColor: COLORS.divider,
  },

  // 5. Promo Banner (1:1 with Home.js)
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: COLORS.promoBg,
    borderWidth: 1.2,
    borderColor: COLORS.promoBorder,
    borderRadius: 16,
    padding: 13,
  },
  promoTextWrap: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  promoTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  promoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.textDark,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  promoButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.white,
  },
  promoButtonArrow: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginLeft: 4,
    marginTop: -1,
  },
});

export default HomeSkeleton;
