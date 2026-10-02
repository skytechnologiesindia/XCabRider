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
import {
  CancelWarningCard,
  CancellationReasons,
  CancelActionButtons,
} from './index';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CancelRide = ({
  visible = false,
  driverName = 'Raj Kumar',
  feeWarning = 'A cancellation fee may apply.',
  carName = 'Swift Dzire',
  carType = 'WHITE  •  PETROL',
  plateNumber = 'JH 01 AB 4821',
  eta = '3 min away',
  category = 'White Sedan',
  carImage,
  status = 'On the way',
  onClose,
  onKeepRide,
  onConfirmCancel,
}) => {
  const [selectedReason, setSelectedReason] = useState('1');
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

  const handleClose = (callback) => {
    if (isClosing.current) return;
    isClosing.current = true;
    Animated.timing(panY, {
      toValue: SCREEN_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      if (callback) {
        callback();
      } else {
        onClose?.();
      }
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

  const handleKeep = () => {
    handleClose(() => {
      onKeepRide?.();
    });
  };

  const handleCancel = () => {
    handleClose(() => {
      onConfirmCancel?.(selectedReason);
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={() => handleClose()}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {/* Backdrop touchable to close */}
        <TouchableWithoutFeedback onPress={() => handleClose()}>
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
            {/* Warning / Driver Matched Card */}
            <CancelWarningCard
              driverName={driverName}
              feeWarning={feeWarning}
            />

            {/* Your Ride Card */}
            {/* <YourRideCard
              carName={carName}
              carType={carType}
              plateNumber={plateNumber}
              eta={eta}
              category={category}
              carImage={carImage}
              status={status}
            /> */}

            {/* Reason Selection */}
            <CancellationReasons
              selectedReason={selectedReason}
              onSelectReason={setSelectedReason}
            />

            {/* Action Buttons */}
            <CancelActionButtons
              onCancelRide={handleCancel}
              onKeepRide={handleKeep}
            />
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export { CancelRide };
export default CancelRide;
