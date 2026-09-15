import React, { useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  StyleSheet,
} from 'react-native';
import images from '../../../assets/images';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import RecentSearch from './RecentSearch';
import PickDrop from './PickDrop';
import { AddHome, AddWork, Favorites } from '../QuickPlaces';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Promo tag icon
const PromoTagIcon = ({ size = 17, color = COLORS.yellow }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: 3,
      borderWidth: 1.8,
      borderColor: color,
      transform: [{ rotate: '-45deg' }],
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View
      style={{
        width: size * 0.28,
        height: size * 0.28,
        borderRadius: (size * 0.28) / 2,
        backgroundColor: color,
        position: 'absolute',
        top: 2,
      }}
    />
  </View>
);

const LocationSearch = ({
  visible,
  onClose,
  onSelectPickup,
  onSelectDestination,
  onSelectRecent,
  recentSearches,
  onPressHome,
  onPressWork,
  onPressFavourites,
  onProceedToTrip,
}) => {
  const isClosing = useRef(false);
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      isClosing.current = false;
      panY.setValue(SCREEN_HEIGHT);
      Animated.spring(panY, {
        toValue: 0,
        damping: 24,
        mass: 0.85,
        stiffness: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, panY]);

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
        } else if (Math.abs(gestureState.dy) < 5 && Math.abs(gestureState.dx) < 5) {
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

  const handleConfirmTrip = (data) => {
    const p = data?.pickup || 'Ranchi Railway Station';
    const d = data?.destination || 'Lalpur Market';
    const pSub = data?.pickupSubtitle || (p === 'Current location' ? 'Ranchi Railway Station, Jharkhand' : 'Station Rd, Ranchi, Jharkhand 834001');
    const dSub = data?.destinationSubtitle || 'Lalpur Chowk, Ranchi, Jharkhand 834001';

    onProceedToTrip?.({
      pickup: p,
      pickupSubtitle: pSub,
      destination: d,
      destinationSubtitle: dSub,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        {/* Backdrop touchable to close */}
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: COLORS.black,
              opacity: backdropOpacity,
            }}
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
              maxHeight: SCREEN_HEIGHT * 0.88,
              shadowColor: COLORS.black,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 10,
              transform: [{ translateY: panY }],
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
            contentContainerStyle={styles.pdb36}
          >
            {/* Title */}
            <Text
              style={[
                styles.pdh20,
                styles.mt8,
                styles.mb16,
                styles.ts25,
                {
                  fontSize: 26,
                  fontWeight: '800',
                  color: COLORS.textDark,
                  letterSpacing: -0.5,
                },
              ]}
            >
              Where are you going?
            </Text>

            {/* ================= PICKUP & DESTINATION CARD ================= */}
            <PickDrop
              pickup="Current location"
              destination=""
              onSelectPickup={onSelectPickup}
              onSelectDestination={onSelectDestination}
              onConfirmTrip={handleConfirmTrip}
            />

            {/* ================= QUICK DESTINATIONS ================= */}
            <View
              style={[
                styles.pdh20,
                styles.mt16,
                styles.mb20,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              ]}
            >
              <AddHome onPress={onPressHome} />
              <AddWork onPress={onPressWork} />
              <Favorites onPress={onPressFavourites} />
            </View>

            {/* ================= RECENT SEARCHES ================= */}
            <RecentSearch
              data={recentSearches}
              onSelectRecent={(item) => {
                onSelectRecent?.(item);
                handleConfirmTrip({
                  pickup: 'Ranchi Railway Station',
                  destination: item.title,
                  destinationSubtitle: item.subtitle,
                });
              }}
              onSeeAllPress={() => console.log('See all')}
            />

            {/* ================= PROMO BANNER ================= */}
            <View
              style={[
                styles.mh20,
                styles.pdh16,
                styles.pdv12,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLORS.promoBg,
                  borderWidth: 1.2,
                  borderColor: COLORS.promoBorder,
                  borderRadius: 18,
                  overflow: 'hidden',
                },
              ]}
            >
              {/* Black circle with yellow tag */}
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  backgroundColor: COLORS.textDark,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PromoTagIcon size={17} color={COLORS.yellow} />
              </View>

              <View
                style={[
                  styles.ml12,
                  styles.mr8,
                  {
                    flex: 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.ts14,
                    {
                      fontWeight: '800',
                      color: COLORS.textDark,
                    },
                  ]}
                >
                  Ride More, Save More!
                </Text>
                <Text
                  style={[
                    styles.ts11,
                    styles.mt4,
                    styles.mb8,
                    {
                      color: COLORS.mediumGrey,
                      lineHeight: 15,
                    },
                  ]}
                >
                  Get up to ₹150 off on your next 3 rides
                </Text>

                <TouchableOpacity
                  style={[
                    styles.pdh12,
                    styles.pdv8,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: COLORS.textDark,
                      borderRadius: 16,
                      alignSelf: 'flex-start',
                    },
                  ]}
                  activeOpacity={0.85}
                  onPress={() => console.log('View Offers')}
                >
                  <Text
                    style={[
                      styles.ts11,
                      {
                        fontWeight: '700',
                        color: COLORS.white,
                      },
                    ]}
                  >
                    View Offers
                  </Text>
                  <Text
                    style={[
                      styles.ts13,
                      styles.ml4,
                      {
                        fontWeight: '700',
                        color: COLORS.white,
                      },
                    ]}
                  >
                    ›
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 3D Gift box image */}
              <Image
                source={images.giftBox}
                style={{
                  width: 86,
                  height: 86,
                  marginRight: -4,
                }}
                resizeMode="contain"
              />
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export { LocationSearch };
export default LocationSearch;
