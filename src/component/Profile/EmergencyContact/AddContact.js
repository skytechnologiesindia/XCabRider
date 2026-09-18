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
  Alert,
} from 'react-native';
import COLORS from '../../../assets/colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export { BackArrowIcon, CloseIcon } from '../../../assets/icons/Icons';


const RELATION_OPTIONS = ['Dad', 'Mom', 'Spouse', 'Sister', 'Brother', 'Friend', 'Other'];

// Pure View: Can be rendered inside EmergencyContact or standalone
export const AddContactView = ({
  onBack,
  onClose,
  onSave,
  keyboardHeight = 0,
  showDragHandle = true,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('Friend');
  const phoneInputRef = useRef(null);

  const isKeyboardOpen = keyboardHeight > 0;
  const effectiveKeyboardOffset = isKeyboardOpen
    ? keyboardHeight + (Platform.OS === 'android' ? 52 : 12)
    : 0;

  const maxScrollHeight = isKeyboardOpen
    ? Math.max(140, SCREEN_HEIGHT - effectiveKeyboardOffset - 175)
    : SCREEN_HEIGHT * 0.55;

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Name Required', 'Please enter a contact name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 6) {
      Alert.alert('Phone Required', 'Please enter a valid phone number.');
      return;
    }

    Keyboard.dismiss();
    const formattedPhone = phone.trim().startsWith('+') ? phone.trim() : `+91 ${phone.trim()}`;
    onSave?.({
      name: name.trim(),
      phone: formattedPhone,
      relation,
    });
  };

  return (
    <View style={styles.viewWrapper}>
      {/* Top Drag Handle */}
      {showDragHandle && (
        <View style={styles.dragHandleWrap}>
          <View style={styles.dragHandle} />
        </View>
      )}

      {/* Header: Back Arrow + Title + Close Button */}
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

        <Text style={styles.headerTitle}>Add Contact</Text>

        <TouchableOpacity
          style={styles.headerIconBtn}
          activeOpacity={0.7}
          onPress={() => {
            Keyboard.dismiss();
            onClose?.();
          }}
        >
          <CloseIcon size={12} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Form Fields */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        style={{ maxHeight: maxScrollHeight }}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Contact Name */}
        <View style={styles.fieldSection}>
          <Text style={styles.fieldLabel}>Contact Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Papa, Priya Sharma, Rahul"
              placeholderTextColor={COLORS.textMuted}
              value={name}
              onChangeText={setName}
              returnKeyType="next"
              onSubmitEditing={() => phoneInputRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>
        </View>

        {/* Mobile Number */}
        <View style={styles.fieldSection}>
          <Text style={styles.fieldLabel}>Mobile Number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              ref={phoneInputRef}
              style={styles.textInput}
              placeholder="+91 98765 43210"
              placeholderTextColor={COLORS.textMuted}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              returnKeyType="done"
              onSubmitEditing={handleSave}
            />
          </View>
        </View>

        {/* Relationship Quick Select Chips */}
        <View style={styles.fieldSection}>
          <Text style={styles.fieldLabel}>Relationship</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relationRow}
          >
            {RELATION_OPTIONS.map((opt) => {
              const isSelected = relation === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.relationChip,
                    isSelected && styles.relationChipActive,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setRelation(opt)}
                >
                  <Text
                    style={[
                      styles.relationChipText,
                      isSelected && styles.relationChipTextActive,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Fixed Save Contact CTA Button */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AddContact = ({
  visible = false,
  onClose,
  onBack,
  onSave,
}) => {
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const isClosing = useRef(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const onShow = (e) => {
      setKeyboardHeight(e?.endCoordinates?.height || 280);
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
      <View style={[styles.modalOverlay, { paddingBottom: bottomOffset }]}>
        {/* Dimmed Backdrop */}
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
          <AddContactView
            onBack={() => handleClose(onBack || onClose)}
            onClose={() => handleClose(onClose)}
            onSave={(contactData) => {
              handleClose(() => onSave?.(contactData));
            }}
            keyboardHeight={keyboardHeight}
            showDragHandle={true}
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
    backgroundColor: COLORS.white,
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
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F2EFE8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Form Fields
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  fieldSection: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 13.5,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  inputContainer: {
    backgroundColor: '#FAF8F4',
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

  // Relationship Chips
  relationRow: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  relationChip: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: '#FAF6ED',
    borderWidth: 1,
    borderColor: '#ECE6D8',
    marginRight: 8,
  },
  relationChipActive: {
    backgroundColor: COLORS.yellow,
    borderColor: COLORS.yellow,
  },
  relationChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  relationChipTextActive: {
    color: COLORS.textDark,
  },

  // Footer Button
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

export default AddContact;
