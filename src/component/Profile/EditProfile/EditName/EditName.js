import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../../../assets/colors';
import styles from '../../../../assets/styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

import { CloseIcon } from '../../../../assets/icons/Icons';


const EditName = ({
  visible = false,
  initialFirstName = 'Yasir',
  initialLastName = 'Boss',
  onClose,
  onSave,
}) => {
  const insets = useSafeAreaInsets();
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [focusedField, setFocusedField] = useState(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const isClosing = useRef(false);
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // Listen to keyboard show/hide to smoothly shift modal above the keyboard
  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      setIsKeyboardOpen(true);
      const extraGap = Platform.OS === 'android' ? 36 : 16;
      Animated.timing(keyboardOffset, {
        toValue: (e?.endCoordinates?.height || 0) + extraGap,
        duration: Platform.OS === 'ios' ? e.duration : 160,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener(hideEvent, (e) => {
      setIsKeyboardOpen(false);
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: Platform.OS === 'ios' ? e.duration : 160,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardOffset]);

  // Sync inputs when visible or props change
  useEffect(() => {
    if (visible) {
      setFirstName(initialFirstName);
      setLastName(initialLastName);
      setFocusedField(null);
      isClosing.current = false;
      panY.setValue(SCREEN_HEIGHT);
      Animated.spring(panY, {
        toValue: 0,
        damping: 24,
        mass: 0.85,
        stiffness: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Keyboard.dismiss();
      keyboardOffset.setValue(0);
      setIsKeyboardOpen(false);
    }
  }, [visible, initialFirstName, initialLastName, panY, keyboardOffset]);

  const handleClose = (callback) => {
    Keyboard.dismiss();
    if (isClosing.current) return;
    isClosing.current = true;
    Animated.parallel([
      Animated.timing(panY, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }),
    ]).start(() => {
      if (callback) {
        callback();
      } else {
        onClose?.();
      }
      isClosing.current = false;
    });
  };

  const handleSave = () => {
    Keyboard.dismiss();
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const fullName = `${trimmedFirst} ${trimmedLast}`.trim() || `${initialFirstName} ${initialLastName}`;

    handleClose(() => {
      onSave?.({
        firstName: trimmedFirst,
        lastName: trimmedLast,
        fullName,
      });
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

        {/* Keyboard Offset Animated Container */}
        <Animated.View
          style={{
            width: '100%',
            marginBottom: keyboardOffset,
            zIndex: 20,
          }}
        >
          {/* Bottom Sheet Card */}
          <Animated.View
            style={[
              styles.pdh20,
              styles.pdt8,
              {
                backgroundColor: COLORS.cardBg,
                borderTopLeftRadius: 28,
                borderTopRightRadius: 28,
                paddingBottom: isKeyboardOpen ? 18 : Math.max(insets.bottom, 20) + 8,
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
                Edit Name
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
              Make sure this matches the name on your official ID
            </Text>

            {/* First Name Input Field */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => firstNameInputRef.current?.focus()}
              style={[
                styles.mb12,
                styles.pdh16,
                styles.pdv8,
                {
                  backgroundColor: COLORS.grey50,
                  borderRadius: 14,
                  borderWidth: 1.3,
                  borderColor: focusedField === 'first' ? COLORS.yellowAccent : COLORS.border,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: focusedField === 'first' ? COLORS.yellowAccent : COLORS.textMuted,
                  marginBottom: 2,
                }}
              >
                First Name
              </Text>
              <TextInput
                ref={firstNameInputRef}
                style={{
                  fontSize: 15.5,
                  fontWeight: '700',
                  color: COLORS.textDark,
                  padding: 0,
                }}
                value={firstName}
                onChangeText={setFirstName}
                onFocus={() => setFocusedField('first')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter first name"
                placeholderTextColor={COLORS.placeholder}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => lastNameInputRef.current?.focus()}
                blurOnSubmit={false}
              />
            </TouchableOpacity>

            {/* Last Name Input Field */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => lastNameInputRef.current?.focus()}
              style={[
                styles.mb16,
                styles.pdh16,
                styles.pdv8,
                {
                  backgroundColor: COLORS.grey50,
                  borderRadius: 14,
                  borderWidth: 1.3,
                  borderColor: focusedField === 'last' ? COLORS.yellowAccent : COLORS.border,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: focusedField === 'last' ? COLORS.yellowAccent : COLORS.textMuted,
                  marginBottom: 2,
                }}
              >
                Last Name
              </Text>
              <TextInput
                ref={lastNameInputRef}
                style={{
                  fontSize: 15.5,
                  fontWeight: '700',
                  color: COLORS.textDark,
                  padding: 0,
                }}
                value={lastName}
                onChangeText={setLastName}
                onFocus={() => setFocusedField('last')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter last name"
                placeholderTextColor={COLORS.placeholder}
                autoCapitalize="words"
                returnKeyType="done"
                onSubmitEditing={handleSave}
              />
            </TouchableOpacity>

            {/* Save Name Button */}
            <TouchableOpacity
              style={[
                styles.mt4,
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
                Save Name
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default EditName;
