import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
  Platform,
  Keyboard,
  Switch,
  Linking,
  Alert,
} from 'react-native';
import COLORS from '../../../assets/colors';
import { AddContactView } from './AddContact';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// 1. Vector Icon: Close Cross (X)
const CloseIcon = ({ size = 13, color = COLORS.textDark }) => (
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

// 2. Vector Icon: Phone Receiver
const PhoneIcon = ({ size = 15, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.72,
        height: size * 0.72,
        borderWidth: 1.8,
        borderColor: color,
        borderRadius: 3,
        transform: [{ rotate: '15deg' }],
      }}
    />
  </View>
);

// 3. Vector Icon: SOS Shield
const ShieldSosIcon = ({ size = 20, color = '#DC2626' }) => (
  <View
    style={{
      width: size,
      height: size * 1.15,
      backgroundColor: '#DC2626',
      borderRadius: size * 0.35,
      borderBottomLeftRadius: size * 0.5,
      borderBottomRightRadius: size * 0.5,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ color: '#FFFFFF', fontSize: 7.5, fontWeight: '900', letterSpacing: -0.3 }}>
      SOS
    </Text>
  </View>
);

// 4. Vector Icon: Lock / Night Moon Icon
const MoonOrLockIcon = ({ size = 15, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.7,
        height: size * 0.7,
        borderRadius: (size * 0.7) / 2,
        borderWidth: 1.6,
        borderColor: color,
        borderLeftWidth: 0,
        transform: [{ rotate: '-40deg' }],
      }}
    />
  </View>
);

// 5. Vector Icon: Plus Icon
const PlusIcon = ({ size = 16, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ position: 'absolute', width: size * 0.75, height: 2, backgroundColor: color, borderRadius: 1 }} />
    <View style={{ position: 'absolute', width: 2, height: size * 0.75, backgroundColor: color, borderRadius: 1 }} />
  </View>
);

// 6. Vector Icon: Trash / Delete Icon
const TrashIcon = ({ size = 14, color = '#EF4444' }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ width: size * 0.65, height: 2, backgroundColor: color, borderRadius: 1 }} />
    <View
      style={{
        width: size * 0.55,
        height: size * 0.65,
        borderWidth: 1.4,
        borderColor: color,
        borderTopWidth: 0,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        marginTop: 1,
      }}
    />
  </View>
);

const DEFAULT_CONTACTS = [
  {
    id: 'c1',
    name: 'Ramesh Kumar',
    relation: 'Dad',
    phone: '+91 98765 43210',
    isPrimary: true,
  },
  {
    id: 'c2',
    name: 'Priya Sharma',
    relation: 'Sister',
    phone: '+91 94311 88204',
    isPrimary: false,
  },
];

const EmergencyContact = ({
  visible = false,
  onClose,
  onSave,
  initialContacts = DEFAULT_CONTACTS,
}) => {
  const [contacts, setContacts] = useState(initialContacts);
  const [isNightShareEnabled, setIsNightShareEnabled] = useState(true);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const isClosing = useRef(false);

  // Dynamic keyboard handling for Android & iOS
  useEffect(() => {
    const onShow = (e) => {
      setKeyboardOffset(e?.endCoordinates?.height || 280);
    };
    const onHide = () => {
      setKeyboardOffset(0);
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
      setIsAddingNew(false);
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

  const handleCall = (phoneNumber) => {
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${cleanNumber}`).catch(() => {
      Alert.alert('Unable to Call', `Could not dial ${phoneNumber}`);
    });
  };

  const handleSetPrimary = (contactId) => {
    setContacts((prev) =>
      prev.map((c) => ({
        ...c,
        isPrimary: c.id === contactId,
      }))
    );
  };

  const handleDeleteContact = (contactId) => {
    setContacts((prev) => {
      const filtered = prev.filter((c) => c.id !== contactId);
      if (filtered.length > 0 && !filtered.some((c) => c.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  const handleSaveAll = () => {
    Keyboard.dismiss();
    handleClose(() => {
      onSave?.({
        contacts,
        autoNightShare: isNightShareEnabled,
      });
    });
  };

  if (!visible) return null;

  const isKeyboardOpen = keyboardOffset > 0;
  const bottomOffset = isKeyboardOpen
    ? keyboardOffset + (Platform.OS === 'android' ? 52 : 12)
    : (Platform.OS === 'ios' ? 24 : 48);

  const maxScrollHeight = isKeyboardOpen
    ? Math.max(130, SCREEN_HEIGHT - bottomOffset - 175)
    : SCREEN_HEIGHT * 0.58;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={() => {
        if (isAddingNew) {
          setIsAddingNew(false);
        } else {
          handleClose();
        }
      }}
    >
      <View style={[styles.modalOverlay, { paddingBottom: bottomOffset }]}>
        {/* Semi-transparent Dimmed Backdrop (Tap to dismiss keyboard or close) */}
        <TouchableWithoutFeedback
          onPress={() => {
            if (isKeyboardOpen) {
              Keyboard.dismiss();
            } else {
              handleClose();
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
              maxHeight: Math.max(280, SCREEN_HEIGHT - bottomOffset - 20),
            },
            {
              transform: [{ translateY: panY }],
            },
          ]}
        >
          {/* Top Drag Handle Indicator */}
          <View style={styles.dragHandleWrap}>
            <View style={styles.dragHandle} />
          </View>

          {/* ================= VIEW 1: CONTACTS LIST ================= */}
          {!isAddingNew ? (
            <View style={styles.viewWrapper}>
              {/* Header Row: Title + Close (X) Button */}
              <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Emergency Contacts</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  activeOpacity={0.7}
                  onPress={() => handleClose()}
                >
                  <CloseIcon size={12} color={COLORS.textDark} />
                </TouchableOpacity>
              </View>

              {/* Main Scroll Content */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                style={{ maxHeight: maxScrollHeight }}
                contentContainerStyle={styles.scrollContent}
              >
                {/* 1. Safety Notice Banner */}
                <View style={styles.safetyBanner}>
                  <View style={styles.safetyIconWrap}>
                    <ShieldSosIcon size={20} />
                  </View>
                  <View style={styles.safetyTextWrap}>
                    <Text style={styles.safetyBannerText}>
                      In case of emergency, XCab can automatically share your live ride location with
                      your trusted contacts.
                    </Text>
                  </View>
                </View>

                {/* 2. Contacts List */}
                {contacts.map((contact) => (
                  <View key={contact.id} style={styles.contactCard}>
                    {/* Left: Avatar with Phone Symbol */}
                    <TouchableOpacity
                      style={styles.contactAvatar}
                      activeOpacity={0.7}
                      onPress={() => handleCall(contact.phone)}
                    >
                      <PhoneIcon size={16} color={COLORS.textDark} />
                    </TouchableOpacity>

                    {/* Middle: Details */}
                    <View style={styles.contactDetails}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Text style={styles.contactName} numberOfLines={1}>
                          {contact.name} {contact.relation ? `(${contact.relation})` : ''}
                        </Text>
                        {contact.isPrimary && (
                          <View style={styles.primaryBadge}>
                            <Text style={styles.primaryBadgeText}>Primary</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.contactPhone}>{contact.phone}</Text>
                    </View>

                    {/* Right: Actions */}
                    <View style={styles.actionButtonsRow}>
                      <TouchableOpacity
                        style={styles.callButton}
                        activeOpacity={0.75}
                        onPress={() => handleCall(contact.phone)}
                      >
                        <PhoneIcon size={13} color={COLORS.textDark} />
                      </TouchableOpacity>

                      {!contact.isPrimary ? (
                        <TouchableOpacity
                          style={styles.makePrimaryBtn}
                          activeOpacity={0.7}
                          onPress={() => handleSetPrimary(contact.id)}
                        >
                          <Text style={styles.makePrimaryText}>Make Primary</Text>
                        </TouchableOpacity>
                      ) : null}

                      <TouchableOpacity
                        style={styles.deleteButton}
                        activeOpacity={0.7}
                        onPress={() => handleDeleteContact(contact.id)}
                      >
                        <TrashIcon size={13} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {/* + Add Emergency Contact Card Slot */}
                {contacts.length < 5 && (
                  <TouchableOpacity
                    style={styles.addContactCard}
                    activeOpacity={0.75}
                    onPress={() => setIsAddingNew(true)}
                  >
                    <View style={styles.addIconCircle}>
                      <PlusIcon size={15} color={COLORS.textDark} />
                    </View>
                    <View style={{ marginLeft: 12, flex: 1 }}>
                      <Text style={styles.addCardTitle}>+ Add Emergency Contact</Text>
                      <Text style={styles.addCardSubtitle}>Tap to add trusted family or friend</Text>
                    </View>
                  </TouchableOpacity>
                )}

                {/* 3. Auto-share night trips toggle */}
                <View style={styles.nightShareRow}>
                  <View style={styles.nightIconWrap}>
                    <MoonOrLockIcon size={16} color={COLORS.textDark} />
                  </View>
                  <Text style={styles.nightShareText}>
                    Auto-share night trips (after 10 PM)
                  </Text>
                  <Switch
                    value={isNightShareEnabled}
                    onValueChange={setIsNightShareEnabled}
                    trackColor={{ false: '#E5E7EB', true: COLORS.yellow }}
                    thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : COLORS.white}
                    style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                  />
                </View>
              </ScrollView>

              {/* Fixed Bottom CTA Button */}
              <View style={styles.footerContainer}>
                <TouchableOpacity
                  style={styles.saveButton}
                  activeOpacity={0.85}
                  onPress={handleSaveAll}
                >
                  <Text style={styles.saveButtonText}>Save Contacts</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* ================= VIEW 2: ADD CONTACT (from AddContact.js) ================= */
            <AddContactView
              onBack={() => setIsAddingNew(false)}
              onClose={() => handleClose()}
              onSave={(newContactData) => {
                const newContact = {
                  id: `contact_${Date.now()}`,
                  name: newContactData.name,
                  phone: newContactData.phone,
                  relation: newContactData.relation,
                  isPrimary: contacts.length === 0,
                };
                setContacts((prev) => [...prev, newContact]);
                setIsAddingNew(false);
              }}
              keyboardHeight={keyboardOffset}
              showDragHandle={false}
            />
          )}
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
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.3,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F2EFE8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Scroll Content
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 6,
  },

  // Safety Alert Banner
  safetyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1.2,
    borderColor: '#FEE2E2',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  safetyIconWrap: {
    marginRight: 10,
  },
  safetyTextWrap: {
    flex: 1,
  },
  safetyBannerText: {
    fontSize: 12,
    color: '#991B1B',
    lineHeight: 16.5,
    fontWeight: '500',
  },

  // Contact Card
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#ECE6D8',
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FAF6ED',
    borderWidth: 1,
    borderColor: '#ECE6D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDetails: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  contactName: {
    fontSize: 14.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  contactPhone: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  primaryBadge: {
    backgroundColor: '#FEF9C3',
    borderWidth: 1,
    borderColor: '#FDE047',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    marginLeft: 6,
  },
  primaryBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#854D0E',
  },

  // Actions on right
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FAF6ED',
    borderWidth: 1,
    borderColor: '#ECE6D8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  makePrimaryBtn: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    marginRight: 6,
  },
  makePrimaryText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // + Add Contact Slot Card
  addContactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF9',
    borderRadius: 16,
    borderWidth: 1.4,
    borderColor: '#E8DEC8',
    borderStyle: 'dashed',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  addIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FAF6ED',
    borderWidth: 1.2,
    borderColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  addCardSubtitle: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  // Night Share Row
  nightShareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F0',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 6,
  },
  nightIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  nightShareText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
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

export default EmergencyContact;
