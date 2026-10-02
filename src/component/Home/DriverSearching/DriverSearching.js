import React, { useRef, useEffect } from 'react';
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
import {
  TripLocations,
  TripMap,
  DriverSearchStatus,
  CancelRequest,
  TripBottomNav,
} from './index';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const DriverSearching = ({
  visible = false,
  pickup = 'Albert Ekka Chowk, Ranchi',
  destination = 'Harmu Chowk, Ranchi',
  onCancel,
  onClose,
  onCancelRequest,
  onPickupPress,
  onDropPress,
  onCenterMap,
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
      onCancel?.();
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

        {/* Bottom Sheet Modal Container with Drag down animation */}
        <Animated.View
          style={[
            styles.pdt8,
            {
              backgroundColor: COLORS.cardBg,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              maxHeight: SCREEN_HEIGHT * 0.92,
              shadowColor: COLORS.black,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 10,
              transform: [{ translateY: panY }],
            },
          ]}
        >
          {/* Top Drag Handle (Drag down to close) */}
          <View
            {...panResponder.panHandlers}
            style={[
              styles.pdt12,
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

          {/* Main Scrollable Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.pdb32}
          >
            {/* ================= PICKUP & DROP LOCATIONS CARD ================= */}
            <TripLocations
              pickup={pickup}
              destination={destination}
              onPickupPress={onPickupPress}
              onDropPress={onDropPress}
            />

            {/* ================= ACTIVE ROUTE MAP ================= */}
            <TripMap onCenterPress={onCenterMap} />

            {/* ================= DRIVER SEARCH STATUS & TIMELINE ================= */}
            <DriverSearchStatus />

            {/* ================= CANCEL REQUEST BUTTON ================= */}
            <CancelRequest onCancel={onCancelRequest || handleClose} />
          </ScrollView>

          {/* ================= BOTTOM NAVIGATION ================= */}
          <TripBottomNav />
        </Animated.View>
      </View>
    </Modal>
  );
};

export { DriverSearching };
export default DriverSearching;
