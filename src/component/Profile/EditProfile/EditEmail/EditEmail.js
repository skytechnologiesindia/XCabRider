import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Keyboard,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../../../assets/colors';
import styles from '../../../../assets/styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Close (×) Vector Icon
const CloseIcon = ({ size = 12, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        position: 'absolute',
        width: size,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: size,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
        transform: [{ rotate: '-45deg' }],
      }}
    />
  </View>
);


// Clear Circle Icon
const ClearInputIcon = ({ size = 16, color = COLORS.textMuted }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#EAE5D9',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CloseIcon size={8} color={color} />
  </View>
);

const EditEmail = ({
  visible = false,
  currentEmail = 'yasir.boss@email.com',
  onClose,
  onSave,
}) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState(currentEmail);
  const [isFocused, setIsFocused] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const inputRef = useRef(null);
  const isClosing = useRef(false);
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // Keyboard offset listener for smooth avoidance
  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      setIsKeyboardOpen(true);
      Animated.timing(keyboardOffset, {
        toValue: Platform.OS === 'ios' ? e.endCoordinates.height : e.endCoordinates.height + 28,
        duration: Platform.OS === 'ios' ? e.duration : 180,
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

  // Sync email when modal opens
  useEffect(() => {
    if (visible) {
      setEmail(currentEmail || '');
      setIsFocused(false);
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
  }, [visible, currentEmail, panY, keyboardOffset]);

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
    const trimmedEmail = email.trim();
    handleClose(() => {
      onSave?.(trimmedEmail || currentEmail);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (isKeyboardOpen) return false;
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

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={() => handleClose()}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {/* Dimmed Backdrop */}
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

        {/* Animated Wrapper with dynamic Keyboard Offset */}
        <Animated.View
          style={{
            marginBottom: keyboardOffset,
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
                Edit Email
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

            {/* Subtitle Caption */}
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
              We'll send your ride receipts and trip updates here
            </Text>

            {/* Email Input Field - Simple & Professional */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => inputRef.current?.focus()}
              style={[
                styles.mb12,
                styles.pdh16,
                styles.pdv8,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLORS.grey50,
                  borderRadius: 14,
                  borderWidth: 1.3,
                  borderColor: isFocused ? COLORS.yellowAccent : COLORS.border,
                },
              ]}
            >
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color: isFocused ? COLORS.yellowAccent : COLORS.textMuted,
                    marginBottom: 2,
                  }}
                >
                  Email Address
                </Text>
                <TextInput
                  ref={inputRef}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter email address"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  selectionColor={COLORS.yellow}
                  style={{
                    fontSize: 15.5,
                    fontWeight: '700',
                    color: COLORS.textDark,
                    padding: 0,
                    margin: 0,
                  }}
                />
              </View>

              {/* Clear Button (if text present) */}
              {email.length > 0 && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setEmail('')}
                  style={{ padding: 4 }}
                >
                  <ClearInputIcon size={18} color={COLORS.textMuted} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {/* Subtle Helper Note */}
            <View
              style={[
                styles.mb20,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 4,
                },
              ]}
            >
              <View
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: COLORS.textMuted,
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 12,
                  color: COLORS.textMuted,
                  lineHeight: 16,
                }}
              >
                A verification link will be sent to confirm this email
              </Text>
            </View>

            {/* Save Email Button */}
            <TouchableOpacity
              style={[
                styles.mt4,
                {
                  height: 50,
                  borderRadius: 14,
                  backgroundColor: isValidEmail ? COLORS.yellow : '#F0E8D5',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: isValidEmail ? COLORS.yellow : 'transparent',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: isValidEmail ? 0.25 : 0,
                  shadowRadius: 5,
                  elevation: isValidEmail ? 3 : 0,
                },
              ]}
              disabled={!isValidEmail}
              activeOpacity={0.8}
              onPress={handleSave}
            >
              <Text
                style={{
                  fontSize: 15.5,
                  fontWeight: '800',
                  color: isValidEmail ? COLORS.textDark : '#9C9482',
                }}
              >
                Save Email
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default EditEmail;
