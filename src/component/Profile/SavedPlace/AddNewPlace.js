import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
  Platform,
  Keyboard,
} from 'react-native';
import COLORS from '../../../assets/colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export {
  BackArrowIcon,
  CloseIcon,
  SearchIcon,
  NavigationArrowIcon,
} from '../../../assets/icons/Icons';


// Pure Form View (can be rendered standalone or embedded)
export const AddNewPlaceView = ({
  onBack,
  onClose,
  onSave,
  initialPlaceName = '',
  initialAddress = '',
  keyboardHeight = 0,
  showDragHandle = true,
}) => {
  const [placeName, setPlaceName] = useState(initialPlaceName);
  const [address, setAddress] = useState(initialAddress);
  const [isDetecting, setIsDetecting] = useState(false);
  const addressInputRef = useRef(null);

  const isKeyboardOpen = keyboardHeight > 0;
  const effectiveKeyboardOffset = isKeyboardOpen
    ? keyboardHeight + (Platform.OS === 'android' ? 52 : 12)
    : 0;
  // Calculate maximum height allowed for scroll content when keyboard is active
  const maxScrollHeight = isKeyboardOpen
    ? Math.max(130, SCREEN_HEIGHT - effectiveKeyboardOffset - 175)
    : SCREEN_HEIGHT * 0.52;

  const handleUseCurrentLocation = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setAddress('Lalpur Chowk, Circular Road, Ranchi 834001');
      if (!placeName) {
        setPlaceName('Current Location');
      }
      setIsDetecting(false);
    }, 400);
  };

  const handleSave = () => {
    Keyboard.dismiss();
    const finalTitle = placeName.trim() || 'Custom Place';
    const finalAddress = address.trim() || 'Selected Location, Ranchi';
    onSave?.({
      title: finalTitle,
      address: finalAddress,
    });
  };

  return (
    <View style={styles.viewWrapper}>
      {/* Top Drag Handle Indicator */}
      {showDragHandle && (
        <View style={styles.dragHandleWrap}>
          <View style={styles.dragHandle} />
        </View>
      )}

      {/* Header Row: Back Arrow + Title + Close (X) Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.headerIconBtn}
          activeOpacity={0.7}
          onPress={() => {
            Keyboard.dismiss();
            onBack?.();
          }}
        >
          <BackArrowIcon size={16} color={COLORS.textDark} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add New Place</Text>

        <TouchableOpacity
          style={styles.headerIconBtn}
          activeOpacity={0.7}
          onPress={() => {
            Keyboard.dismiss();
            onClose?.();
          }}
        >
          <CloseIcon size={13} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      {/* Form Fields ScrollView */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        style={{ maxHeight: maxScrollHeight }}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ================= 1. PLACE NAME FIELD ================= */}
        <View style={styles.fieldSection}>
          <Text style={styles.fieldLabel}>Place Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter place name (e.g., Gym, Cafe, Mom's House)"
              placeholderTextColor={COLORS.textMuted}
              value={placeName}
              onChangeText={setPlaceName}
              returnKeyType="next"
              onSubmitEditing={() => addressInputRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>
        </View>

        {/* ================= 2. ADDRESS SEARCH FIELD ================= */}
        <View style={styles.fieldSection}>
          <Text style={styles.fieldLabel}>Address</Text>
          <View style={styles.searchInputContainer}>
            <SearchIcon size={18} color={COLORS.textMuted} />
            <TextInput
              ref={addressInputRef}
              style={styles.searchTextInput}
              placeholder="Search address or location..."
              placeholderTextColor={COLORS.textMuted}
              value={address}
              onChangeText={setAddress}
              returnKeyType="done"
              onSubmitEditing={handleSave}
            />
          </View>
        </View>

        {/* ================= 3. USE CURRENT LOCATION CARD ================= */}
        <TouchableOpacity
          style={styles.currentLocationCard}
          activeOpacity={0.8}
          onPress={handleUseCurrentLocation}
        >
          <View style={styles.locationIconBox}>
            <NavigationArrowIcon size={18} color="#2563EB" />
          </View>
          <View style={styles.locationTextWrap}>
            <Text style={styles.locationTitle}>Use Current Location</Text>
            <Text style={styles.locationSubtitle}>
              {isDetecting ? 'Detecting your location...' : 'Tap to detect your current location'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* ================= 4. FIXED SAVE PLACE CTA BUTTON ================= */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Place</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AddNewPlace = ({
  visible = false,
  onClose,
  onBack,
  onSave,
  initialPlaceName = '',
  initialAddress = '',
}) => {
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const isClosing = useRef(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Dynamic keyboard listeners for both Android and iOS
  useEffect(() => {
    const onShow = (e) => {
      const h = e?.endCoordinates?.height || 280;
      setKeyboardHeight(h);
    };
    const onHide = () => {
      setKeyboardHeight(0);
    };

    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      onShow
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      onHide
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

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
    Keyboard.dismiss();
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

  if (!visible) return null;

  const isKeyboardOpen = keyboardHeight > 0;
  const bottomOffset = isKeyboardOpen
    ? keyboardHeight + (Platform.OS === 'android' ? 52 : 12)
    : (Platform.OS === 'ios' ? 24 : 48);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={() => handleClose(onBack || onClose)}
    >
      <View
        style={[
          styles.modalOverlay,
          { paddingBottom: bottomOffset },
        ]}
      >
        {/* Semi-transparent Dimmed Backdrop (Tap to dismiss keyboard or close) */}
        <TouchableWithoutFeedback
          onPress={() => {
            if (isKeyboardOpen) {
              Keyboard.dismiss();
            } else {
              handleClose(onBack || onClose);
            }
          }}
        >
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Slide-Up Bottom Sheet Modal Container */}
        <Animated.View
          style={[
            styles.sheetContainer,
            isKeyboardOpen && {
              maxHeight: Math.max(
                280,
                SCREEN_HEIGHT - bottomOffset - 20
              ),
            },
            {
              transform: [{ translateY: panY }],
            },
          ]}
        >
          <AddNewPlaceView
            onBack={() => handleClose(onBack || onClose)}
            onClose={() => handleClose(onClose)}
            onSave={(place) => {
              handleClose(() => onSave?.(place));
            }}
            initialPlaceName={initialPlaceName}
            initialAddress={initialAddress}
            keyboardHeight={keyboardHeight}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheetContainer: {
    backgroundColor: '#FAF8F4',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 6,
    paddingBottom: 6,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  viewWrapper: {
    width: '100%',
  },

  // Drag Handle
  dragHandleWrap: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  dragHandle: {
    width: 44,
    height: 4.5,
    borderRadius: 2.5,
    backgroundColor: '#D1CDBF',
  },

  // Header Row
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.3,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2EFE8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Form Content
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  fieldSection: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#E8E3D8',
    paddingHorizontal: 14,
    height: 50,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 14,
    color: COLORS.textDark,
    padding: 0,
  },
  searchInputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#E8E3D8',
    paddingHorizontal: 14,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchTextInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
    marginLeft: 10,
    padding: 0,
  },

  // Current Location Card
  currentLocationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#E8E3D8',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  locationIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EBF2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationTextWrap: {
    marginLeft: 12,
    flex: 1,
  },
  locationTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  locationSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  // Footer Button (Placed cleanly below ScrollView)
  footerContainer: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 8,
  },
  saveButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: 0.2,
  },
});

export default AddNewPlace;
