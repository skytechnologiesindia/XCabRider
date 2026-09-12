import React, { useState, useRef, useEffect } from 'react';
import {
    Modal,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
    Animated,
    PanResponder,
    StyleSheet,
} from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import TripHeader from './TripHeader';
import LocationDetails from './LocationDetails';
import RouteMap from './RouteMap';
import RideOptions, { DEFAULT_VEHICLES } from './RideOptions';
import BookRideButton from './BookRideButton';
import TripFeatures from './TripFeatures';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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

const TripBooking = ({
    visible = true,
    onClose,
    pickup = 'Ranchi Railway Station',
    pickupSubtitle = 'Station Rd, Ranchi, Jharkhand 834001',
    destination = 'Lalpur Market',
    destinationSubtitle = 'Lalpur Chowk, Ranchi, Jharkhand 834001',
    onEditPickup,
    onEditDestination,
    onBookRide,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedVehicle, setSelectedVehicle] = useState('SEDAN');
    const isClosing = useRef(false);
    const panY = useRef(new Animated.Value(0)).current;
    const modalFadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            setIsLoading(true);
            isClosing.current = false;
            panY.setValue(0);
            modalFadeAnim.setValue(0);

            Animated.timing(modalFadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1200);

            return () => clearTimeout(timer);
        }
    }, [visible, panY, modalFadeAnim]);

    const handleClose = () => {
        if (isClosing.current) return;
        isClosing.current = true;
        Animated.timing(panY, {
            toValue: SCREEN_HEIGHT,
            duration: 220,
            useNativeDriver: true,
        }).start(() => {
            onClose?.();
            isClosing.current = false;
        });
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return gestureState.dy > 3 || Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    panY.setValue(gestureState.dy);
                } else {
                    panY.setValue(gestureState.dy * 0.1);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 60 || gestureState.vy > 0.35) {
                    handleClose();
                } else {
                    Animated.spring(panY, {
                        toValue: 0,
                        bounciness: 4,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    const backdropOpacity = panY.interpolate({
        inputRange: [0, SCREEN_HEIGHT * 0.6],
        outputRange: [0.45, 0],
        extrapolate: 'clamp',
    });

    const currentVehicleObj = DEFAULT_VEHICLES.find(v => v.id === selectedVehicle) || DEFAULT_VEHICLES[1];

    const handleBookRide = () => {
        onBookRide?.({
            pickup,
            destination,
            vehicle: currentVehicleObj,
        });
    };

    return (
        <Modal
            visible={visible}
            animationType="none"
            transparent={true}
            onRequestClose={handleClose}
        >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                {/* Backdrop touchable to close */}
                <TouchableWithoutFeedback onPress={handleClose}>
                    <Animated.View
                        style={[
                            StyleSheet.absoluteFillObject,
                            {
                                backgroundColor: COLORS.black,
                                opacity: backdropOpacity,
                            },
                        ]}
                    />
                </TouchableWithoutFeedback>

                {/* Bottom Sheet Modal Container */}
                <Animated.View
                    style={[
                        styles.pdt8,
                        {
                            backgroundColor: COLORS.cardBg,
                            borderTopLeftRadius: 28,
                            borderTopRightRadius: 28,
                            maxHeight: SCREEN_HEIGHT * 0.9,
                            shadowColor: COLORS.black,
                            shadowOffset: { width: 0, height: -4 },
                            shadowOpacity: 0.15,
                            shadowRadius: 12,
                            elevation: 10,
                            transform: [{ translateY: panY }],
                            opacity: modalFadeAnim,
                        },
                    ]}
                >
                    {/* Top Drag Handle */}
                    <View
                        {...panResponder.panHandlers}
                        style={[
                            styles.pdt8,
                            styles.pdb12,
                            {
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                            },
                        ]}
                    >
                        <View
                            style={{
                                width: 48,
                                height: 5,
                                borderRadius: 2.5,
                                backgroundColor: COLORS.dragHandle,
                            }}
                        />
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.pdb32}
                    >
                        {/* Header: Your Trip + Close Button */}
                        <TripHeader onClose={handleClose} />

                        {isLoading ? (
                            <TripBookingSkeleton />
                        ) : (
                            <>
                                {/* Pickup & Drop Locations Card */}
                                <LocationDetails
                                    pickup={pickup}
                                    pickupSubtitle={pickupSubtitle}
                                    destination={destination}
                                    destinationSubtitle={destinationSubtitle}
                                    onEditPickup={onEditPickup || handleClose}
                                    onEditDestination={onEditDestination || handleClose}
                                />

                                {/* Route Map Preview */}
                                <RouteMap />

                                {/* Vehicle Selection (MINI, SEDAN, XL) */}
                                <RideOptions
                                    vehicles={DEFAULT_VEHICLES}
                                    selectedVehicleId={selectedVehicle}
                                    onSelectVehicle={setSelectedVehicle}
                                />

                                {/* Book Button */}
                                <BookRideButton
                                    vehicle={currentVehicleObj}
                                    onPress={handleBookRide}
                                />

                                {/* Trust & Safety Footer */}
                                <TripFeatures />
                            </>
                        )}
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

export { TripBooking };
export default TripBooking;
