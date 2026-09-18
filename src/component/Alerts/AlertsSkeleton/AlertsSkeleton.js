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
import { CarBadgeIcon } from '../../../assets/icons/Icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

const AlertsSkeleton = ({ navigation }) => {
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
        {/* ================= 1. HEADER ================= */}
        <View style={[styles.pdh20, styles.mb12]}>
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
            Alerts
          </Text>
          <Text
            style={[
              styles.ts13,
              styles.mt4,
              {
                color: COLORS.textMuted,
                fontWeight: '500',
              },
            ]}
          >
            Your notifications will appear here.
          </Text>
        </View>

        {/* ================= 2. SKELETON NOTIFICATION CARDS ================= */}
        {[1, 2, 3, 4].map((itemIndex) => (
          <View
            key={itemIndex}
            style={[
              styles.mh20,
              styles.mb12,
              styles.p16,
              {
                marginTop: 6,
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
            ]}
          >
            {/* Top Row: Icon Badge + Title + Time / Dot */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              {/* Yellow Icon Badge with Car Silhouette */}
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  backgroundColor: COLORS.yellow,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CarBadgeIcon size={18} color={COLORS.textDark} />
              </View>

              {/* Notification Title Shimmer */}
              <View style={[styles.ml12, { flex: 1, paddingTop: 2 }]}>
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
              <View
                style={[
                  styles.ml8,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 3,
                  },
                ]}
              >
                <View
                  style={[
                    styles.mr8,
                    {
                      width: 7,
                      height: 7,
                      borderRadius: 3.5,
                      backgroundColor: COLORS.yellow,
                    },
                  ]}
                />
                <ShimmerBlock
                  width={42}
                  height={11}
                  borderRadius={4}
                  shimmerAnim={shimmerAnim}
                />
              </View>
            </View>

            {/* Subtitle / Details Shimmer Lines */}
            <View style={[styles.mt12, { paddingLeft: 50 }]}>
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
                style={styles.mt4}
                shimmerAnim={shimmerAnim}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export { AlertsSkeleton };
export default AlertsSkeleton;
