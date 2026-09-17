import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  PanResponder,
  StyleSheet,
} from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import { ClockIcon } from '../Icons';
import PickDrop from './PickDrop';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.8;

// Recent searches history data
const RECENT_SEARCHES = [
  {
    id: 'rec_1',
    title: 'Lalpur Market',
    subtitle: 'Circular Road, Lalpur, Ranchi, Jharkhand 834001',
    time: 'Yesterday',
  },
  {
    id: 'rec_2',
    title: 'Kanke Road',
    subtitle: 'Near Rock Garden, Kanke, Ranchi, Jharkhand 834008',
    time: '2 days ago',
  },
  {
    id: 'rec_3',
    title: 'Harmu Chowk',
    subtitle: 'Harmu Housing Colony, Ranchi, Jharkhand 834002',
    time: '3 days ago',
  },
  {
    id: 'rec_4',
    title: 'Ranchi Railway Station',
    subtitle: 'Station Road, Gosaintola, Ranchi, Jharkhand 834001',
    time: '4 days ago',
  },
  {
    id: 'rec_5',
    title: 'Nucleus Mall',
    subtitle: 'Circular Road, Lalpur, Ranchi, Jharkhand 834001',
    time: 'Last week',
  },
  {
    id: 'rec_6',
    title: 'Birsa Munda Airport',
    subtitle: 'Airport Road, Hinoo, Ranchi, Jharkhand 834002',
    time: 'Last week',
  },
  {
    id: 'rec_7',
    title: 'Albert Ekka Chowk',
    subtitle: 'Main Road, Upper Bazar, Ranchi, Jharkhand 834001',
    time: '2 weeks ago',
  },
  {
    id: 'rec_8',
    title: 'RIMS Hospital',
    subtitle: 'Bariatu Road, Ranchi, Jharkhand 834009',
    time: '2 weeks ago',
  },
  {
    id: 'rec_9',
    title: 'Morabadi Ground',
    subtitle: 'Morabadi, Ranchi, Jharkhand 834008',
    time: '3 weeks ago',
  },
  {
    id: 'rec_10',
    title: 'Doranda Market',
    subtitle: 'Doranda, Ranchi, Jharkhand 834002',
    time: 'Last month',
  },
];

// Additional searchable locations in Ranchi
const ADDITIONAL_PLACES = [
  {
    id: 'place_1',
    title: 'Rock Garden & Kanke Dam',
    subtitle: 'Kanke Road, Gonda Town, Ranchi, Jharkhand 834008',
    category: 'Scenic',
    categoryIcon: '🏞️',
  },
  {
    id: 'place_2',
    title: 'Hatia Railway Station',
    subtitle: 'Hatia, Ranchi, Jharkhand 834003',
    category: 'Station',
    categoryIcon: '🚆',
  },
  {
    id: 'place_3',
    title: 'Firayalal Chowk',
    subtitle: 'Main Road, Ranchi, Jharkhand 834001',
    category: 'Landmark',
    categoryIcon: '🏛️',
  },
  {
    id: 'place_4',
    title: 'Jagannath Temple Dhurwa',
    subtitle: 'Jagannathpur, Dhurwa, Ranchi, Jharkhand 834004',
    category: 'Temple',
    categoryIcon: '🛕',
  },
  {
    id: 'place_5',
    title: 'JSCA International Stadium',
    subtitle: 'Sector 2, Dhurwa, Ranchi, Jharkhand 834004',
    category: 'Stadium',
    categoryIcon: '🏏',
  },
  {
    id: 'place_6',
    title: 'BIT Mesra Campus',
    subtitle: 'Mesra, Ranchi, Jharkhand 835215',
    category: 'Campus',
    categoryIcon: '🎓',
  },
];

const ALL_SEARCHABLE_PLACES = [...RECENT_SEARCHES, ...ADDITIONAL_PLACES];

const LocationSearch = ({
  visible,
  onClose,
  onSelectPickup,
  onSelectDestination,
  onProceedToTrip,
  userLocation = 'Ranchi Railway Station',
  userLocationSubtitle = 'Station Rd, Ranchi, Jharkhand 834001',
}) => {
  const isClosing = useRef(false);
  const panY = useRef(new Animated.Value(MODAL_HEIGHT)).current;

  // Search States
  const [pickup, setPickup] = useState('Current location');
  const [destination, setDestination] = useState('');
  const [activeField, setActiveField] = useState('destination');

  useEffect(() => {
    if (visible) {
      isClosing.current = false;
      setDestination('');
      setActiveField('destination');
      panY.setValue(MODAL_HEIGHT);
      Animated.spring(panY, {
        toValue: 0,
        damping: 24,
        mass: 0.85,
        stiffness: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, panY]);

  const handleClose = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;
    Animated.timing(panY, {
      toValue: MODAL_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      onClose?.();
      isClosing.current = false;
    });
  }, [panY, onClose]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return gestureState.dy > 5;
        },
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy > 0) {
            panY.setValue(gestureState.dy);
          } else {
            panY.setValue(gestureState.dy * 0.1);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dy > 80 || gestureState.vy > 0.4) {
            handleClose();
          } else {
            Animated.spring(panY, {
              toValue: 0,
              bounciness: 4,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    [panY, handleClose]
  );

  const backdropOpacity = panY.interpolate({
    inputRange: [0, MODAL_HEIGHT * 0.7],
    outputRange: [0.5, 0],
    extrapolate: 'clamp',
  });

  // Determine current active search query string
  const activeSearchQuery = activeField === 'pickup'
    ? (pickup === 'Current location' ? '' : pickup)
    : destination;

  const cleanQuery = activeSearchQuery.trim().toLowerCase();

  // Filter places dynamically when user is typing
  const filteredPlaces = useMemo(() => {
    if (!cleanQuery) return [];
    const seenTitles = new Set();
    return ALL_SEARCHABLE_PLACES.filter((place) => {
      if (seenTitles.has(place.title)) return false;
      const matches =
        place.title.toLowerCase().includes(cleanQuery) ||
        place.subtitle.toLowerCase().includes(cleanQuery) ||
        (place.category && place.category.toLowerCase().includes(cleanQuery));
      if (matches) {
        seenTitles.add(place.title);
        return true;
      }
      return false;
    });
  }, [cleanQuery]);

  const handleConfirmTrip = (data) => {
    const p = data?.pickup || (pickup === 'Current location' ? userLocation : pickup);
    const d = data?.destination || destination || 'Lalpur Market';
    const pSub = data?.pickupSubtitle || userLocationSubtitle;
    const dSub = data?.destinationSubtitle || 'Lalpur Chowk, Ranchi, Jharkhand 834001';

    handleClose();
    setTimeout(() => {
      onProceedToTrip?.({
        pickup: p,
        pickupSubtitle: pSub,
        destination: d,
        destinationSubtitle: dSub,
      });
    }, 240);
  };

  const handleSelectPlace = (place) => {
    const title = place.title;
    const subtitle = place.subtitle;

    if (activeField === 'pickup') {
      setPickup(title);
      setActiveField('destination');
    } else {
      setDestination(title);
      handleConfirmTrip({
        pickup: pickup === 'Current location' ? userLocation : pickup,
        pickupSubtitle: userLocationSubtitle,
        destination: title,
        destinationSubtitle: subtitle,
      });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        {/* Backdrop touchable to close */}
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: COLORS.black,
              opacity: backdropOpacity,
            }}
          />
        </TouchableWithoutFeedback>

        {/* Bottom Sheet Modal Container - Fixed 80% Screen Height */}
        <Animated.View
          style={[
            styles.pdt8,
            {
              backgroundColor: COLORS.cardBg,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              height: MODAL_HEIGHT,
              shadowColor: COLORS.black,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 10,
              transform: [{ translateY: panY }],
            },
          ]}
        >
          {/* Top Drag Handle */}
          <View
            {...(panResponder?.panHandlers || {})}
            style={[
              styles.pdt8,
              styles.pdb8,
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

          {/* Header row with Title and Close button */}
          <View
            style={[
              styles.pdh20,
              styles.mb12,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            <Text
              style={[
                styles.ts22,
                {
                  fontWeight: '800',
                  color: COLORS.textDark,
                  letterSpacing: -0.4,
                },
              ]}
            >
              Where are you going?
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: COLORS.closeBtnBg,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={[styles.ts14, { color: COLORS.closeIcon, fontWeight: '700' }]}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* ================= PICKUP & DESTINATION INPUT CARD ================= */}
          <PickDrop
            pickup={pickup}
            destination={destination}
            activeField={activeField}
            onFocusField={(field) => setActiveField(field)}
            onChangePickup={(text) => setPickup(text)}
            onChangeDestination={(text) => setDestination(text)}
            onSelectPickup={onSelectPickup}
            onSelectDestination={onSelectDestination}
            onConfirmTrip={handleConfirmTrip}
          />

          {/* ================= RECENT SEARCHES OR SEARCH SUGGESTIONS ================= */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[styles.pdb40, styles.pdt8]}
            style={{ flex: 1 }}
          >
            {/* Section Header */}
            <View
              style={[
                styles.pdh20,
                styles.pdv8,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}
            >
              <Text
                style={[
                  styles.ts12,
                  {
                    fontWeight: '800',
                    color: COLORS.textMuted,
                    letterSpacing: 0.6,
                  },
                ]}
              >
                {cleanQuery ? 'SEARCH SUGGESTIONS' : 'RECENT SEARCHES'}
              </Text>

              <Text
                style={[
                  styles.ts11,
                  {
                    color: COLORS.textMuted,
                    fontWeight: '600',
                  },
                ]}
              >
                {cleanQuery ? `${filteredPlaces.length} found` : 'Recent'}
              </Text>
            </View>

            {/* When user typed a search query: Top Direct Match Card */}
            {cleanQuery.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  handleSelectPlace({
                    id: 'custom_search',
                    title: activeSearchQuery.trim(),
                    subtitle: `${activeSearchQuery.trim()}, Ranchi, Jharkhand`,
                    category: 'Search',
                    categoryIcon: '🔍',
                  })
                }
                style={[
                  styles.pdh20,
                  styles.pdv12,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: COLORS.yellowLight,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.promoBorder,
                  },
                ]}
              >
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    backgroundColor: COLORS.yellow,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 14,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>🔍</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.ts15,
                      {
                        fontWeight: '800',
                        color: COLORS.textDark,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    Search "{activeSearchQuery.trim()}"
                  </Text>
                  <Text
                    style={[
                      styles.ts12,
                      {
                        color: COLORS.textMuted,
                        marginTop: 2,
                      },
                    ]}
                  >
                    Tap to select this exact destination
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: COLORS.yellow,
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                  }}
                >
                  <Text style={[styles.ts11, { fontWeight: '800', color: COLORS.textDark }]}>
                    Select
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {/* Search Query Results */}
            {cleanQuery.length > 0 &&
              filteredPlaces.map((place) => (
                <TouchableOpacity
                  key={place.id}
                  activeOpacity={0.7}
                  onPress={() => handleSelectPlace(place)}
                  style={[
                    styles.pdh20,
                    styles.pdv12,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.divider,
                    },
                  ]}
                >
                  <View
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      backgroundColor: COLORS.iconBg,
                      borderWidth: 1,
                      borderColor: COLORS.borderSoft,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 14,
                    }}
                  >
                    {place.categoryIcon ? (
                      <Text style={{ fontSize: 18 }}>{place.categoryIcon}</Text>
                    ) : (
                      <ClockIcon size={19} color={COLORS.iconDark} />
                    )}
                  </View>

                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text
                      style={[
                        styles.ts15,
                        {
                          fontWeight: '700',
                          color: COLORS.textDark,
                          flexShrink: 1,
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {place.title}
                    </Text>
                    <Text
                      style={[
                        styles.ts12,
                        {
                          color: COLORS.textMuted,
                          marginTop: 2,
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {place.subtitle}
                    </Text>
                  </View>

                  <Text style={[styles.ts14, { color: COLORS.textLight, fontWeight: '700' }]}>
                    ›
                  </Text>
                </TouchableOpacity>
              ))}

            {/* Search Query: No other match message */}
            {cleanQuery.length > 0 && filteredPlaces.length === 0 && (
              <View style={[styles.pdh20, styles.pdv20, { alignItems: 'center' }]}>
                <Text style={[styles.ts14, { color: COLORS.textMuted, textAlign: 'center' }]}>
                  No other places matching "{activeSearchQuery.trim()}".
                </Text>
                <Text
                  style={[
                    styles.ts12,
                    {
                      color: COLORS.textMuted,
                      textAlign: 'center',
                      marginTop: 4,
                    },
                  ]}
                >
                  Tap the search card above to confirm this destination.
                </Text>
              </View>
            )}

            {/* When NO search query: Render RECENT SEARCHES */}
            {!cleanQuery &&
              RECENT_SEARCHES.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  onPress={() => handleSelectPlace(item)}
                  style={[
                    styles.pdh20,
                    styles.pdv12,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.divider,
                    },
                  ]}
                >
                  {/* Clock / Recent Icon */}
                  <View
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      backgroundColor: COLORS.iconBg,
                      borderWidth: 1,
                      borderColor: COLORS.borderSoft,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 14,
                    }}
                  >
                    <ClockIcon size={19} color={COLORS.iconDark} />
                  </View>

                  {/* Title & Subtitle */}
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text
                      style={[
                        styles.ts15,
                        {
                          fontWeight: '700',
                          color: COLORS.textDark,
                          flexShrink: 1,
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.ts12,
                        {
                          color: COLORS.textMuted,
                          marginTop: 2,
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {item.subtitle}
                    </Text>
                  </View>

                  {/* Time badge and arrow */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {item.time && (
                      <Text
                        style={[
                          styles.ts11,
                          {
                            color: COLORS.textMuted,
                            fontWeight: '500',
                            marginRight: 8,
                          },
                        ]}
                      >
                        {item.time}
                      </Text>
                    )}
                    <Text style={[styles.ts14, { color: COLORS.textLight, fontWeight: '700' }]}>
                      ›
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export { LocationSearch };
export default LocationSearch;
