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
import TripBookingSkeleton, { SkeletonBlock } from './TripBookingSkeleton/TripBookingSkeleton';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const TripBooking = ({
    visible = true,
    onClose,
    pickup = 'Ranchi Railway Station',
    pickupSubtitle = 'Station Rd, Ranchi, Jharkhand 834001',
    destination = 'Lalpur Market',
    destinationSubtitle = 'Lalpur Chowk, Ranchi, Jharkhand 834001',
    initialVehicleId = 'SEDAN',
    onEditPickup,
    onEditDestination,
    onBookRide,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedVehicle, setSelectedVehicle] = useState(initialVehicleId || 'SEDAN');
    const isClosing = useRef(false);
    const panY = useRef(new Animated.Value(0)).current;
    const modalFadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            if (initialVehicleId) {
                setSelectedVehicle(initialVehicleId);
            }
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
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [visible, panY, modalFadeAnim, initialVehicleId]);

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

export { TripBooking, TripBookingSkeleton, SkeletonBlock };
export default TripBooking;
