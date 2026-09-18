import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../../../assets/colors';
import styles from '../../../../assets/styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

import {
  CloseIcon,
  MaleIcon,
  FemaleIcon,
  OtherIcon,
} from '../../../../assets/icons/Icons';


const GENDER_OPTIONS = [
  {
    id: 'Male',
    label: 'Male',
    renderIcon: (color) => <MaleIcon size={20} color={color} />,
  },
  {
    id: 'Female',
    label: 'Female',
    renderIcon: (color) => <FemaleIcon size={20} color={color} />,
  },
  {
    id: 'Other',
    label: 'Other / Prefer not to say',
    renderIcon: (color) => <OtherIcon size={20} color={color} />,
  },
];

const EditGender = ({
  visible = false,
  currentGender = 'Male',
  onClose,
  onSave,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedGender, setSelectedGender] = useState(currentGender);

  const isClosing = useRef(false);
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Sync selected gender when visible or prop changes
  useEffect(() => {
    if (visible) {
      setSelectedGender(currentGender || 'Male');
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
  }, [visible, currentGender, panY]);

  const handleClose = (callback) => {
    if (isClosing.current) return;
    isClosing.current = true;
    Animated.timing(panY, {
      toValue: SCREEN_HEIGHT,
      duration: 200,
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

  const handleSave = () => {
    handleClose(() => {
      onSave?.(selectedGender);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 4 || Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
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
    inputRange: [0, SCREEN_HEIGHT * 0.5],
    outputRange: [0.45, 0],
    extrapolate: 'clamp',
  });

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={() => handleClose()}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {/* Semi-transparent Dimmed Backdrop */}
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

        {/* Bottom Sheet Card */}
        <Animated.View
          style={[
            styles.pdh20,
            styles.pdt8,
            {
              backgroundColor: COLORS.cardBg,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              paddingBottom: Math.max(insets.bottom, 20) + 8,
              shadowColor: COLORS.black,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.12,
              shadowRadius: 10,
              elevation: 10,
              transform: [{ translateY: panY }],
            },
          ]}
        >
          {/* Drag Handle Bar */}
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
                width: 44,
                height: 4.5,
                borderRadius: 2.5,
                backgroundColor: COLORS.dragHandle,
              }}
            />
          </View>

          {/* Header Row: Title & Close Button */}
          <View
            style={[
              styles.mb8,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '800',
                color: COLORS.textDark,
              }}
            >
              Select Gender
            </Text>

            <TouchableOpacity
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: COLORS.closeBtnBg,
                borderWidth: 1,
                borderColor: COLORS.border,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              activeOpacity={0.7}
              onPress={() => handleClose()}
            >
              <CloseIcon size={12} color={COLORS.textDark} />
            </TouchableOpacity>
          </View>

          {/* Helper Caption */}
          <Text
            style={[
              styles.mb16,
              {
                fontSize: 12.5,
                color: COLORS.textMuted,
                lineHeight: 17,
              },
            ]}
          >
            Choose your gender for a personalized ride experience
          </Text>

          {/* Gender Option Cards */}
          {GENDER_OPTIONS.map((option) => {
            const isSelected = selectedGender === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                activeOpacity={0.75}
                onPress={() => setSelectedGender(option.id)}
                style={[
                  styles.mb12,
                  styles.pdh16,
                  styles.pdv12,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 16,
                    borderWidth: isSelected ? 1.8 : 1.2,
                    borderColor: isSelected ? COLORS.yellowAccent : COLORS.border,
                    backgroundColor: isSelected ? '#FFFDF5' : COLORS.cardBg,
                    shadowColor: isSelected ? COLORS.yellow : COLORS.black,
                    shadowOffset: { width: 0, height: isSelected ? 2 : 1 },
                    shadowOpacity: isSelected ? 0.08 : 0.02,
                    shadowRadius: 4,
                    elevation: isSelected ? 2 : 1,
                  },
                ]}
              >
                {/* Left: Icon in soft cream rounded box + Label */}
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <View
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      backgroundColor: '#FAF6ED',
                      borderWidth: 1,
                      borderColor: '#EFEAE0',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 14,
                    }}
                  >
                    {option.renderIcon(COLORS.textDark)}
                  </View>

                  <Text
                    style={{
                      fontSize: 15.5,
                      fontWeight: '700',
                      color: COLORS.textDark,
                    }}
                  >
                    {option.label}
                  </Text>
                </View>

                {/* Right: Radio Button Circle */}
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    borderWidth: isSelected ? 2 : 1.6,
                    borderColor: isSelected ? COLORS.yellowAccent : COLORS.borderLight,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSelected && (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: COLORS.yellowAccent,
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Save Gender Button */}
          <TouchableOpacity
            style={[
              styles.mt8,
              {
                height: 50,
                borderRadius: 14,
                backgroundColor: COLORS.yellow,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: COLORS.yellow,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.25,
                shadowRadius: 5,
                elevation: 3,
              },
            ]}
            activeOpacity={0.8}
            onPress={handleSave}
          >
            <Text
              style={{
                fontSize: 15.5,
                fontWeight: '800',
                color: COLORS.textDark,
              }}
            >
              Save Gender
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default EditGender;
