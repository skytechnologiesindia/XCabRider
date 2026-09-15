import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import COLORS from '../../../assets/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Circular Back Arrow Icon
const BackArrowIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        position: 'absolute',
        width: size * 0.75,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        position: 'absolute',
        left: 2,
        width: size * 0.45,
        height: size * 0.45,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
      }}
    />
  </View>
);

// Mini Car Icon Silhouette for Notification Badge
const CarBadgeIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size * 0.75, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.6,
        height: size * 0.32,
        backgroundColor: color,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
      }}
    />
    <View
      style={{
        width: size,
        height: size * 0.36,
        backgroundColor: color,
        borderRadius: 2.5,
        marginTop: 1,
      }}
    />
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: size * 0.75,
        marginTop: -1,
      }}
    >
      <View
        style={{
          width: 3.5,
          height: 2.5,
          borderRadius: 1.2,
          backgroundColor: COLORS.textDark,
        }}
      />
      <View
        style={{
          width: 3.5,
          height: 2.5,
          borderRadius: 1.2,
          backgroundColor: COLORS.textDark,
        }}
      />
    </View>
  </View>
);

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

const AlertsSkeleton = ({ navigation }) => {
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

  const handleBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    } else if (navigation?.navigate) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={uiStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={uiStyles.scrollContent}
      >
        {/* ================= 1. HEADER WITH BACK BUTTON ================= */}
        <View style={uiStyles.headerRow}>
          <TouchableOpacity
            style={uiStyles.backButton}
            activeOpacity={0.7}
            onPress={handleBack}
          >
            <BackArrowIcon size={16} color={COLORS.textDark} />
          </TouchableOpacity>

          <Text style={uiStyles.headerTitle}>Alerts</Text>
        </View>

        {/* ================= 2. SKELETON NOTIFICATION CARDS (Matches AlertsCards.js 1:1) ================= */}
        {[1, 2, 3, 4].map((itemIndex) => (
          <View key={itemIndex} style={uiStyles.cardContainer}>
            {/* Top Row: Icon Badge + Title + Time / Dot */}
            <View style={uiStyles.cardTopRow}>
              {/* Yellow Icon Badge with Car Silhouette */}
              <View style={uiStyles.iconBadge}>
                <CarBadgeIcon size={18} color={COLORS.textDark} />
              </View>

              {/* Notification Title Shimmer */}
              <View style={uiStyles.titleContainer}>
                <ShimmerBlock
                  width={
                    itemIndex === 1
                      ? '90%'
                      : itemIndex === 2
                      ? '75%'
                      : itemIndex === 3
                      ? '85%'
                      : '80%'
                  }
                  height={16}
                  borderRadius={6}
                  shimmerAnim={shimmerAnim}
                />
              </View>

              {/* Time & Unread Status Dot */}
              <View style={uiStyles.timeContainer}>
                <View style={uiStyles.unreadDot} />
                <ShimmerBlock
                  width={42}
                  height={11}
                  borderRadius={4}
                  shimmerAnim={shimmerAnim}
                />
              </View>
            </View>

            {/* Subtitle / Details Shimmer Lines */}
            <View style={uiStyles.descriptionContainer}>
              <ShimmerBlock
                width={
                  itemIndex === 1
                    ? '95%'
                    : itemIndex === 2
                    ? '80%'
                    : itemIndex === 3
                    ? '90%'
                    : '85%'
                }
                height={12}
                borderRadius={5}
                shimmerAnim={shimmerAnim}
              />
              <ShimmerBlock
                width={
                  itemIndex === 1
                    ? '65%'
                    : itemIndex === 2
                    ? '50%'
                    : itemIndex === 3
                    ? '70%'
                    : '60%'
                }
                height={10}
                borderRadius={4}
                style={uiStyles.mt6}
                shimmerAnim={shimmerAnim}
              />
            </View>
          </View>
        ))}
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
  mt6: {
    marginTop: 6,
  },

  // Header Row (1:1 with Alerts.js)
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.white,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.3,
  },

  // Notification Card Container (1:1 with AlertsCards.js)
  cardContainer: {
    marginHorizontal: 20,
    marginTop: 6,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginLeft: 12,
    flex: 1,
    paddingTop: 2,
  },
  timeContainer: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.yellow,
    marginRight: 6,
  },
  descriptionContainer: {
    marginTop: 10,
    paddingLeft: 50,
  },
});

export default AlertsSkeleton;
