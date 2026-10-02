/**
 * XCAB Centralized Images Registry
 * All images in the application are registered here with clean, camelCase keys.
 */
export const images = {
  // ==========================================
  // Brand & Logos
  // ==========================================
  xcabLogo: require('./image/xcab_brand_logo.png'),
  xcabBrandTransparent: require('./image/xcab_brand_transparent.png'),
  xcabLogoSimple: require('./image/xcab_logo.png'),

  // ==========================================
  // Onboarding Illustrations
  // ==========================================
  onboardingImage: require('./image/HomePage.webp'),
  onboardingTaxi: require('./image/onboarding_taxi.jpg'),
  onboardingRideWay: require('./image/onboarding_ride_way.png'),
  onboardingSafeRides: require('./image/onboarding_safe_rides.png'),
  onboardingLiveTracking: require('./image/onboarding_live_tracking.png'),

  // ==========================================
  // Profile & User
  // ==========================================
  avatar: require('./image/avatar.jpg'),

  // ==========================================
  // Maps & Location
  // ==========================================
  mapPreview: require('./image/map_preview.jpg'),
  routeMap: require('./image/route_map.jpg'),
  driverSearchMap: require('./image/driver_search_map.jpg'),

  // ==========================================
  // Vehicles
  // ==========================================
  carMini: require('./image/car_mini.jpg'),
  carSedan: require('./image/car_sedan.jpg'),
  carXl: require('./image/car_xl.jpg'),

  // ==========================================
  // Empty States & Placeholders
  // ==========================================
  alertsEmptyBell: require('./image/alerts_empty_bell.jpg'),
  noRidesIllustration: require('./image/no_rides_illustration.jpg'),
  giftBox: require('./image/gift_box.jpg'),
};

export default images;
