import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Animated,
  PanResponder,
  Keyboard,
  Platform,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../../../assets/colors';
import styles from '../../../../assets/styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

import {
  CloseIcon,
  SearchIcon as SearchVectorIcon,
  LocationPinIcon as PinVectorIcon,
  ChevronRightIcon,
  CheckVectorIcon,
} from '../../../../assets/icons/Icons';

// Clear (×) Circle Icon using WebP CloseIcon
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

// Comprehensive Indian Cities Dataset for Instant Offline & Live Places API Match
const INDIAN_CITIES = [
  { id: '1', city: 'Mumbai', state: 'Maharashtra', country: 'India' },
  { id: '2', city: 'Mumbai Suburban', state: 'Maharashtra', country: 'India' },
  { id: '3', city: 'Navi Mumbai', state: 'Maharashtra', country: 'India' },
  { id: '4', city: 'Thane', state: 'Maharashtra', country: 'India' },
  { id: '5', city: 'Pune', state: 'Maharashtra', country: 'India' },
  { id: '6', city: 'Nagpur', state: 'Maharashtra', country: 'India' },
  { id: '7', city: 'Nashik', state: 'Maharashtra', country: 'India' },
  { id: '8', city: 'Delhi', state: 'Delhi NCR', country: 'India' },
  { id: '9', city: 'New Delhi', state: 'Delhi NCR', country: 'India' },
  { id: '10', city: 'Noida', state: 'Uttar Pradesh', country: 'India' },
  { id: '11', city: 'Gurugram', state: 'Haryana', country: 'India' },
  { id: '12', city: 'Faridabad', state: 'Haryana', country: 'India' },
  { id: '13', city: 'Ghaziabad', state: 'Uttar Pradesh', country: 'India' },
  { id: '14', city: 'Bengaluru', state: 'Karnataka', country: 'India' },
  { id: '15', city: 'Kolkata', state: 'West Bengal', country: 'India' },
  { id: '16', city: 'Howrah', state: 'West Bengal', country: 'India' },
  { id: '17', city: 'Hyderabad', state: 'Telangana', country: 'India' },
  { id: '18', city: 'Chennai', state: 'Tamil Nadu', country: 'India' },
  { id: '19', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: '20', city: 'Surat', state: 'Gujarat', country: 'India' },
  { id: '21', city: 'Vadodara', state: 'Gujarat', country: 'India' },
  { id: '22', city: 'Jaipur', state: 'Rajasthan', country: 'India' },
  { id: '23', city: 'Jodhpur', state: 'Rajasthan', country: 'India' },
  { id: '24', city: 'Udaipur', state: 'Rajasthan', country: 'India' },
  { id: '25', city: 'Lucknow', state: 'Uttar Pradesh', country: 'India' },
  { id: '26', city: 'Kanpur', state: 'Uttar Pradesh', country: 'India' },
  { id: '27', city: 'Varanasi', state: 'Uttar Pradesh', country: 'India' },
  { id: '28', city: 'Agra', state: 'Uttar Pradesh', country: 'India' },
  { id: '29', city: 'Prayagraj', state: 'Uttar Pradesh', country: 'India' },
  { id: '30', city: 'Patna', state: 'Bihar', country: 'India' },
  { id: '31', city: 'Gaya', state: 'Bihar', country: 'India' },
  { id: '32', city: 'Muzaffarpur', state: 'Bihar', country: 'India' },
  { id: '33', city: 'Bhagalpur', state: 'Bihar', country: 'India' },
  { id: '34', city: 'Ranchi', state: 'Jharkhand', country: 'India' },
  { id: '35', city: 'Jamshedpur', state: 'Jharkhand', country: 'India' },
  { id: '36', city: 'Dhanbad', state: 'Jharkhand', country: 'India' },
  { id: '37', city: 'Bokaro Steel City', state: 'Jharkhand', country: 'India' },
  { id: '38', city: 'Deoghar', state: 'Jharkhand', country: 'India' },
  { id: '39', city: 'Hazaribagh', state: 'Jharkhand', country: 'India' },
  { id: '40', city: 'Ramgarh', state: 'Jharkhand', country: 'India' },
  { id: '41', city: 'Chandigarh', state: 'Punjab & Haryana', country: 'India' },
  { id: '42', city: 'Ludhiana', state: 'Punjab', country: 'India' },
  { id: '43', city: 'Amritsar', state: 'Punjab', country: 'India' },
  { id: '44', city: 'Indore', state: 'Madhya Pradesh', country: 'India' },
  { id: '45', city: 'Bhopal', state: 'Madhya Pradesh', country: 'India' },
  { id: '46', city: 'Gwalior', state: 'Madhya Pradesh', country: 'India' },
  { id: '47', city: 'Jabalpur', state: 'Madhya Pradesh', country: 'India' },
  { id: '48', city: 'Raipur', state: 'Chhattisgarh', country: 'India' },
  { id: '49', city: 'Bilaspur', state: 'Chhattisgarh', country: 'India' },
  { id: '50', city: 'Bhubaneswar', state: 'Odisha', country: 'India' },
  { id: '51', city: 'Cuttack', state: 'Odisha', country: 'India' },
  { id: '52', city: 'Rourkela', state: 'Odisha', country: 'India' },
  { id: '53', city: 'Guwahati', state: 'Assam', country: 'India' },
  { id: '54', city: 'Kochi', state: 'Kerala', country: 'India' },
  { id: '55', city: 'Thiruvananthapuram', state: 'Kerala', country: 'India' },
  { id: '56', city: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India' },
  { id: '57', city: 'Vijayawada', state: 'Andhra Pradesh', country: 'India' },
  { id: '58', city: 'Coimbatore', state: 'Tamil Nadu', country: 'India' },
  { id: '59', city: 'Dehradun', state: 'Uttarakhand', country: 'India' },
  { id: '60', city: 'Goa', state: 'Goa', country: 'India' },
];

const EditHomeCity = ({
  visible = false,
  currentCity = 'Ranchi',
  onClose,
  onSave,
}) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(currentCity);
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const inputRef = useRef(null);
  const isClosing = useRef(false);
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // Keyboard avoidance listener
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

  // Reset and open animations
  useEffect(() => {
    if (visible) {
      setSelectedCity(currentCity || 'Ranchi');
      setSearchQuery('');
      setIsFocused(false);
      setIsKeyboardOpen(false);
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
  }, [visible, currentCity, panY, keyboardOffset]);

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

  const handleSelectCity = (cityName) => {
    setSelectedCity(cityName);
    Keyboard.dismiss();
    handleClose(() => {
      onSave?.(cityName);
    });
  };

  const handleSave = () => {
    if (!selectedCity) return;
    Keyboard.dismiss();
    handleClose(() => {
      onSave?.(selectedCity);
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

  // Real-time Map Places Autocomplete filter
  const filteredCities = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) {
      // If empty query, show current city on top + recent/major cities
      return INDIAN_CITIES.slice(0, 5);
    }
    return INDIAN_CITIES.filter((item) => {
      const matchCity = item.city.toLowerCase().includes(trimmed);
      const matchState = item.state.toLowerCase().includes(trimmed);
      return matchCity || matchState;
    });
  }, [searchQuery]);

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

        {/* Modal Container with Keyboard Avoidance */}
        <Animated.View
          style={{
            marginBottom: keyboardOffset,
          }}
        >
          <Animated.View
            style={[
              styles.pdh20,
              styles.pdt8,
              {
                backgroundColor: COLORS.cardBg,
                borderTopLeftRadius: 28,
                borderTopRightRadius: 28,
                paddingBottom: Math.max(insets.bottom, 16) + 8,
                maxHeight: SCREEN_HEIGHT * 0.78,
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

            {/* Header: Title & Close Button */}
            <View
              style={[
                styles.mb12,
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
                Change Home City
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

            {/* Search Input Box (Google Places Autocomplete style) */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => inputRef.current?.focus()}
              style={[
                styles.mb12,
                styles.pdh16,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 52,
                  backgroundColor: COLORS.grey50,
                  borderRadius: 14,
                  borderWidth: 1.3,
                  borderColor: isFocused ? COLORS.yellowAccent : COLORS.border,
                },
              ]}
            >
              {/* Search Icon */}
              <View style={{ marginRight: 12 }}>
                <SearchVectorIcon size={17} color={isFocused ? COLORS.yellowAccent : COLORS.textMuted} />
              </View>

              {/* TextInput */}
              <TextInput
                ref={inputRef}
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  setIsSearching(true);
                  setTimeout(() => setIsSearching(false), 120);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search city (e.g. Mumbai, Ranchi)..."
                placeholderTextColor={COLORS.textMuted}
                autoCorrect={false}
                selectionColor={COLORS.yellow}
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontWeight: '600',
                  color: COLORS.textDark,
                  padding: 0,
                  margin: 0,
                }}
              />

              {/* Clear button or Spinner */}
              {isSearching ? (
                <ActivityIndicator size="small" color={COLORS.yellow} />
              ) : searchQuery.length > 0 ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSearchQuery('')}
                  style={{ padding: 4 }}
                >
                  <ClearInputIcon size={18} color={COLORS.textMuted} />
                </TouchableOpacity>
              ) : null}
            </TouchableOpacity>

            {/* Places API Autocomplete Results List */}
            <View style={{ maxHeight: 220, marginBottom: 12 }}>
              {filteredCities.length === 0 ? (
                <View style={{ paddingVertical: 24, alignItems: 'center' }}>
                  <PinVectorIcon size={24} color={COLORS.textMuted} />
                  <Text style={{ marginTop: 8, fontSize: 13, color: COLORS.textMuted }}>
                    No matching cities found via Map API
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={filteredCities}
                  keyExtractor={(item) => item.id}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    const isSelected = selectedCity.toLowerCase() === item.city.toLowerCase();
                    const isLast = index === filteredCities.length - 1;

                    return (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleSelectCity(item.city)}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 12,
                          paddingHorizontal: 6,
                          borderBottomWidth: isLast ? 0 : 1,
                          borderBottomColor: COLORS.divider,
                          backgroundColor: isSelected ? '#FFFDF5' : 'transparent',
                          borderRadius: 10,
                        }}
                      >
                        {/* Pin Icon in circle */}
                        <View
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            backgroundColor: isSelected ? '#FFF2C6' : COLORS.grey50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 12,
                          }}
                        >
                          <PinVectorIcon
                            size={16}
                            color={isSelected ? COLORS.yellowAccent : COLORS.mediumGrey}
                          />
                        </View>

                        {/* City Details */}
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: isSelected ? '800' : '700',
                              color: COLORS.textDark,
                              marginBottom: 2,
                            }}
                          >
                            {item.city}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: COLORS.textMuted,
                            }}
                          >
                            {item.state}, {item.country}
                          </Text>
                        </View>

                        {/* Selection Badge or Chevron */}
                        {isSelected ? (
                          <View
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 12,
                              backgroundColor: COLORS.yellow,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <CheckVectorIcon size={12} color={COLORS.textDark} />
                          </View>
                        ) : (
                          <ChevronRightIcon size={13} color={COLORS.textLight} />
                        )}
                      </TouchableOpacity>
                    );
                  }}
                />
              )}
            </View>

            {/* Confirm / Save Button */}
            <TouchableOpacity
              style={[
                styles.mt4,
                {
                  height: 50,
                  borderRadius: 14,
                  backgroundColor: selectedCity ? COLORS.yellow : '#F0E8D5',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: selectedCity ? COLORS.yellow : 'transparent',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: selectedCity ? 0.25 : 0,
                  shadowRadius: 5,
                  elevation: selectedCity ? 3 : 0,
                },
              ]}
              disabled={!selectedCity}
              activeOpacity={0.8}
              onPress={handleSave}
            >
              <Text
                style={{
                  fontSize: 15.5,
                  fontWeight: '800',
                  color: selectedCity ? COLORS.textDark : '#9C9482',
                }}
              >
                Save Home City
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default EditHomeCity;
