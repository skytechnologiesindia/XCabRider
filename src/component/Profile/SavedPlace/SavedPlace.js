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
} from 'react-native';
import COLORS from '../../../assets/colors';
import { AddNewPlaceView } from './AddNewPlace';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

import {
  HomeIcon as HouseIcon,
  WorkIcon as BriefcaseIcon,
  PlusIcon,
  CloseIcon,
} from '../../../assets/icons/Icons';


// 5. Vector Icon: Location Pin
const StarOrPinIcon = ({ size = 18, color = COLORS.yellowAccent }) => (
  <Text style={{ fontSize: size, color }}>★</Text>
);

const DEFAULT_SAVED_PLACES = [
  {
    id: 'home',
    type: 'HOME',
    title: 'Home',
    address: 'Station Rd, Ranchi, Jharkhand 834001',
    isPrimary: true,
  },
  {
    id: 'work',
    type: 'WORK',
    title: 'Work',
    address: 'Lalpur Chowk, Ranchi, Jharkhand 834001',
    isPrimary: true,
  },
];

const SavedPlace = ({
  visible = false,
  places = DEFAULT_SAVED_PLACES,
  onClose,
  onSelectPlace,
  onAddPlace,
  onSave,
  navigation,
}) => {
  const [savedList, setSavedList] = useState(places);
  const [selectedId, setSelectedId] = useState('home');
  const [viewMode, setViewMode] = useState('LIST'); // 'LIST' or 'ADD'

  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const isClosing = useRef(false);

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
      setViewMode('LIST');
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

  const handlePlacePress = (place) => {
    setSelectedId(place.id);
    handleClose(() => {
      onSelectPlace?.(place);
      onSave?.(place);
      navigation?.navigate?.('TripBooking', {
        destination: place.title,
        destinationSubtitle: place.address,
        savedPlace: place,
      });
    });
  };

  const handleSaveAndContinue = () => {
    const chosenPlace = savedList.find((p) => p.id === selectedId) || savedList[0];
    handleClose(() => {
      onSelectPlace?.(chosenPlace);
      onSave?.(chosenPlace);
      navigation?.navigate?.('TripBooking', {
        destination: chosenPlace.title,
        destinationSubtitle: chosenPlace.address,
        savedPlace: chosenPlace,
      });
    });
  };

  // Switch to Add New Place screen within the same bottom sheet
  const handleOpenAddForm = () => {
    setViewMode('ADD');
  };

  // Save new place to list
  const handleSaveNewPlace = (placeData) => {
    const finalTitle = placeData?.title || 'Custom Place';
    const finalAddress = placeData?.address || 'Selected Location, Ranchi';

    const newItem = {
      id: `place_${Date.now()}`,
      type: 'OTHER',
      title: finalTitle,
      address: finalAddress,
      isPrimary: false,
    };

    setSavedList((prev) => [...prev, newItem]);
    setSelectedId(newItem.id);
    setViewMode('LIST');
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={() => {
        if (viewMode === 'ADD') {
          setViewMode('LIST');
        } else {
          handleClose();
        }
      }}
    >
      <View
        style={[
          modalStyles.modalOverlay,
          {
            paddingBottom:
              keyboardOffset > 0
                ? keyboardOffset + (Platform.OS === 'android' ? 52 : 12)
                : (Platform.OS === 'ios' ? 24 : 48),
          },
        ]}
      >
        {/* Semi-transparent Dimmed Backdrop (Tap to dismiss keyboard or close) */}
        <TouchableWithoutFeedback
          onPress={() => {
            if (keyboardOffset > 0) {
              Keyboard.dismiss();
            } else {
              handleClose();
            }
          }}
        >
          <View style={modalStyles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Slide-Up Bottom Sheet Modal Container */}
        <Animated.View
          style={[
            modalStyles.sheetContainer,
            keyboardOffset > 0 && {
              maxHeight: Math.max(
                280,
                SCREEN_HEIGHT - (keyboardOffset + (Platform.OS === 'android' ? 52 : 12)) - 20
              ),
            },
            {
              transform: [{ translateY: panY }],
            },
          ]}
        >
          {/* Top Drag Handle */}
          <View style={modalStyles.dragHandleWrap}>
            <View style={modalStyles.dragHandle} />
          </View>

          {/* ================= VIEW 1: SAVED PLACES LIST ================= */}
          {viewMode === 'LIST' ? (
            <View style={modalStyles.contentWrapper}>
              {/* Header: Title + Close (X) Button */}
              <View style={modalStyles.headerRow}>
                <Text style={modalStyles.headerTitle}>Saved Places</Text>
                <TouchableOpacity
                  style={modalStyles.closeButton}
                  activeOpacity={0.7}
                  onPress={() => handleClose()}
                >
                  <CloseIcon size={12} color={COLORS.textDark} />
                </TouchableOpacity>
              </View>

              {/* Compact List of Saved Places (flexGrow: 0 prevents bottom gap) */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                style={modalStyles.scrollContainer}
                contentContainerStyle={modalStyles.listContent}
              >
                {/* 1. Home Item */}
                {savedList
                  .filter((item) => item.type === 'HOME')
                  .map((homeItem) => (
                    <View key={homeItem.id}>
                      <TouchableOpacity
                        style={[
                          modalStyles.placeRow,
                          selectedId === homeItem.id && modalStyles.activeRow,
                        ]}
                        activeOpacity={0.7}
                        onPress={() => handlePlacePress(homeItem)}
                      >
                        <View style={modalStyles.homeBadge}>
                          <HouseIcon size={20} color={COLORS.textDark} />
                        </View>
                        <View style={modalStyles.placeTextContainer}>
                          <Text style={modalStyles.placeTitle}>{homeItem.title}</Text>
                          <Text style={modalStyles.placeAddress} numberOfLines={1}>
                            {homeItem.address}
                          </Text>
                        </View>
                        <Text style={modalStyles.chevron}>›</Text>
                      </TouchableOpacity>
                      <View style={modalStyles.divider} />
                    </View>
                  ))}

                {/* 2. Work Item */}
                {savedList
                  .filter((item) => item.type === 'WORK')
                  .map((workItem) => (
                    <View key={workItem.id}>
                      <TouchableOpacity
                        style={[
                          modalStyles.placeRow,
                          selectedId === workItem.id && modalStyles.activeRow,
                        ]}
                        activeOpacity={0.7}
                        onPress={() => handlePlacePress(workItem)}
                      >
                        <View style={modalStyles.workBadge}>
                          <BriefcaseIcon size={20} color={COLORS.textDark} />
                        </View>
                        <View style={modalStyles.placeTextContainer}>
                          <Text style={modalStyles.placeTitle}>{workItem.title}</Text>
                          <Text style={modalStyles.placeAddress} numberOfLines={1}>
                            {workItem.address}
                          </Text>
                        </View>
                        <Text style={modalStyles.chevron}>›</Text>
                      </TouchableOpacity>
                      <View style={modalStyles.divider} />
                    </View>
                  ))}

                {/* 3. Other Saved Places (Gym, Cafe, etc.) */}
                {savedList
                  .filter((item) => item.type !== 'HOME' && item.type !== 'WORK')
                  .map((otherItem) => (
                    <View key={otherItem.id}>
                      <TouchableOpacity
                        style={[
                          modalStyles.placeRow,
                          selectedId === otherItem.id && modalStyles.activeRow,
                        ]}
                        activeOpacity={0.7}
                        onPress={() => handlePlacePress(otherItem)}
                      >
                        <View style={modalStyles.otherBadge}>
                          <StarOrPinIcon size={18} color={COLORS.yellowAccent} />
                        </View>
                        <View style={modalStyles.placeTextContainer}>
                          <Text style={modalStyles.placeTitle}>{otherItem.title}</Text>
                          <Text style={modalStyles.placeAddress} numberOfLines={1}>
                            {otherItem.address}
                          </Text>
                        </View>
                        <Text style={modalStyles.chevron}>›</Text>
                      </TouchableOpacity>
                      <View style={modalStyles.divider} />
                    </View>
                  ))}

                {/* 4. Add New Place Row */}
                <TouchableOpacity
                  style={modalStyles.placeRow}
                  activeOpacity={0.7}
                  onPress={handleOpenAddForm}
                >
                  <View style={modalStyles.addBadge}>
                    <PlusIcon size={18} color={COLORS.textDark} />
                  </View>
                  <View style={modalStyles.placeTextContainer}>
                    <Text style={modalStyles.placeTitle}>Add New Place</Text>
                    <Text style={modalStyles.addSubtitle}>Tap to add address</Text>
                  </View>
                  <Text style={modalStyles.chevron}>›</Text>
                </TouchableOpacity>
              </ScrollView>

              {/* Save & Continue Button immediately below items */}
              <View style={modalStyles.footerContainer}>
                <TouchableOpacity
                  style={modalStyles.saveButton}
                  activeOpacity={0.85}
                  onPress={handleSaveAndContinue}
                >
                  <Text style={modalStyles.saveButtonText}>Save & Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* ================= VIEW 2: ADD NEW PLACE FORM ================= */
            <AddNewPlaceView
              onBack={() => setViewMode('LIST')}
              onClose={() => handleClose()}
              onSave={handleSaveNewPlace}
              keyboardHeight={keyboardOffset}
              showDragHandle={false}
            />
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
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
    paddingBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  contentWrapper: {
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

  // ScrollContainer (flexGrow: 0 wraps tight around items, no empty void)
  scrollContainer: {
    flexGrow: 0,
    maxHeight: SCREEN_HEIGHT * 0.44,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 2,
  },
  addFormContent: {
    paddingHorizontal: 20,
    paddingBottom: 4,
  },

  // Place Item Rows
  placeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  activeRow: {
    backgroundColor: '#FAF7F0',
  },
  homeBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FAF6ED',
    borderWidth: 1.2,
    borderColor: '#ECE6D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFDF0',
    borderWidth: 1.2,
    borderColor: '#F2E8CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F2ECE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeTextContainer: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },
  placeTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  placeAddress: {
    fontSize: 12.5,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  addSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  chevron: {
    fontSize: 19,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: 6,
  },

  // Footer Button Container
  footerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
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
    fontSize: 15.5,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: 0.2,
  },
});

export default SavedPlace;
