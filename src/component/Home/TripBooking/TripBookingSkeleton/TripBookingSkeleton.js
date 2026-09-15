import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import COLORS from '../../../../assets/colors';
import styles from '../../../../assets/styles';

// Pulsing Animated Skeleton Block
export const SkeletonBlock = ({ style, width, height, borderRadius = 8 }) => {
    const pulseAnim = useRef(new Animated.Value(0.35)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.85,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.35,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();
        return () => pulse.stop();
    }, [pulseAnim]);

    return (
        <Animated.View
            style={[
                {
                    width,
                    height,
                    borderRadius,
                    backgroundColor: COLORS.border,
                    opacity: pulseAnim,
                },
                style,
            ]}
        />
    );
};

// Skeleton Placeholder for TripBooking lazy load
export const TripBookingSkeleton = () => {
    return (
        <View>
            {/* Location Card Skeleton */}
            <View
                style={[
                    styles.mh20,
                    styles.pdh16,
                    styles.pdv16,
                    {
                        backgroundColor: COLORS.cardBg,
                        borderRadius: 18,
                        borderWidth: 1.2,
                        borderColor: COLORS.border,
                    },
                ]}
            >
                {/* Pickup Row */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SkeletonBlock width={22} height={22} borderRadius={11} />
                    <View style={[styles.ml12, { flex: 1 }]}>
                        <SkeletonBlock width="38%" height={11} borderRadius={4} />
                        <SkeletonBlock width="70%" height={15} borderRadius={4} style={styles.mt4} />
                        <SkeletonBlock width="55%" height={11} borderRadius={4} style={styles.mt4} />
                    </View>
                    <SkeletonBlock width={30} height={30} borderRadius={15} />
                </View>

                {/* Divider */}
                <View
                    style={[
                        styles.mv12,
                        styles.ml36,
                        { height: 1, backgroundColor: COLORS.divider },
                    ]}
                />

                {/* Drop Row */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SkeletonBlock width={20} height={20} borderRadius={10} />
                    <View style={[styles.ml12, { flex: 1 }]}>
                        <SkeletonBlock width="35%" height={11} borderRadius={4} />
                        <SkeletonBlock width="65%" height={15} borderRadius={4} style={styles.mt4} />
                        <SkeletonBlock width="50%" height={11} borderRadius={4} style={styles.mt4} />
                    </View>
                    <SkeletonBlock width={30} height={30} borderRadius={15} />
                </View>
            </View>

            {/* Route Map Skeleton */}
            <View
                style={[
                    styles.mh20,
                    styles.mt16,
                    {
                        height: 160,
                        borderRadius: 18,
                        borderWidth: 1.2,
                        borderColor: COLORS.border,
                        overflow: 'hidden',
                    },
                ]}
            >
                <SkeletonBlock width="100%" height={160} borderRadius={18} />
            </View>

            {/* Vehicle Options Skeleton */}
            <View
                style={[
                    styles.pdh20,
                    styles.mt16,
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    },
                ]}
            >
                {[1, 2, 3].map((item) => (
                    <View
                        key={item}
                        style={[
                            styles.mh4,
                            styles.pdh8,
                            styles.pdv12,
                            {
                                flex: 1,
                                borderRadius: 14,
                                backgroundColor: COLORS.cardBg,
                                borderWidth: 1.2,
                                borderColor: COLORS.border,
                                alignItems: 'center',
                                height: 118,
                                justifyContent: 'space-between',
                            },
                        ]}
                    >
                        <SkeletonBlock width={48} height={28} borderRadius={6} style={styles.mt4} />
                        <SkeletonBlock width={42} height={12} borderRadius={4} style={styles.mt4} />
                        <SkeletonBlock width={32} height={14} borderRadius={4} style={styles.mt4} />
                        <SkeletonBlock width={28} height={10} borderRadius={4} style={styles.mt4} />
                    </View>
                ))}
            </View>

            {/* Book Button Skeleton */}
            <View style={[styles.mh20, styles.mt16]}>
                <SkeletonBlock
                    width="100%"
                    height={50}
                    borderRadius={14}
                    style={{ backgroundColor: COLORS.yellowLight }}
                />
            </View>

            {/* Features Footer Skeleton */}
            <View
                style={[
                    styles.pdh20,
                    styles.mt20,
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    },
                ]}
            >
                {[1, 2, 3].map((item) => (
                    <View
                        key={item}
                        style={[
                            styles.mh4,
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                flex: 1,
                            },
                        ]}
                    >
                        <SkeletonBlock width={32} height={32} borderRadius={16} />
                        <View style={[styles.ml8, { flex: 1 }]}>
                            <SkeletonBlock width="75%" height={10} borderRadius={3} />
                            <SkeletonBlock width="50%" height={8} borderRadius={3} style={styles.mt4} />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default TripBookingSkeleton;
