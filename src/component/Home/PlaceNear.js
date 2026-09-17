import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';

const DEFAULT_NEARBY_PLACES = [
  {
    id: 'near_1',
    title: 'Nucleus Mall',
    subtitle: 'Circular Road, Lalpur, Ranchi, Jharkhand 834001',
    // distance: '0.8 km',
    category: 'Mall',
    categoryIcon: '🛍️',
  },
  {
    id: 'near_2',
    title: 'Albert Ekka Chowk',
    subtitle: 'Main Road, Upper Bazar, Ranchi, Jharkhand 834001',
    // distance: '1.2 km',
    category: 'Landmark',
    categoryIcon: '🏛️',
  },
  {
    id: 'near_3',
    title: 'Lalpur Chowk Market',
    subtitle: 'Circular Road, Lalpur, Ranchi, Jharkhand 834001',
    // distance: '1.5 km',
    category: 'Market',
    categoryIcon: '🛒',
  },
  {
    id: 'near_4',
    title: 'Ranchi Railway Station',
    subtitle: 'Station Road, Gosaintola, Ranchi, Jharkhand 834001',
    // distance: '2.1 km',
    category: 'Station',
    categoryIcon: '🚆',
  },
  {
    id: 'near_5',
    title: 'Morabadi Ground',
    subtitle: 'Morabadi, Ranchi, Jharkhand 834008',
    // distance: '2.8 km',
    category: 'Park',
    categoryIcon: '🌳',
  },
  {
    id: 'near_6',
    title: 'Birsa Munda Airport',
    subtitle: 'Airport Road, Hinoo, Ranchi, Jharkhand 834002',
    // distance: '5.6 km',
    category: 'Airport',
    categoryIcon: '✈️',
  },
];

const PlaceNear = ({
  data = DEFAULT_NEARBY_PLACES,
  onPlacePress,
  onItemPress,
  onSeeAllPress,
}) => {
  const handleItemPress = (place) => {
    if (onPlacePress) {
      onPlacePress(place);
    } else if (onItemPress) {
      onItemPress(place);
    }
  };

  return (
    <View style={styles.mb20}>
      {/* Section Header */}
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              styles.ts16,
              {
                fontWeight: '800',
                color: COLORS.textDark,
                letterSpacing: -0.2,
              },
            ]}
          >
            Places Near You
          </Text>
          <View
            style={{
              backgroundColor: COLORS.yellowLight,
              borderWidth: 1,
              borderColor: COLORS.promoBorder,
              borderRadius: 10,
              paddingHorizontal: 7,
              paddingVertical: 2,
              marginLeft: 8,
            }}
          >
            <Text
              style={[
                styles.ts10,
                {
                  fontWeight: '700',
                  color: COLORS.yellowAccent,
                },
              ]}
            >
              Nearby
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSeeAllPress}
        >
          <Text
            style={[
              styles.ts13,
              {
                fontWeight: '700',
                color: COLORS.yellowAccent,
              },
            ]}
          >
            See all
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card Container */}
      <View
        style={[
          styles.mh20,
          {
            backgroundColor: COLORS.cardBg,
            borderRadius: 18,
            borderWidth: 1.2,
            borderColor: COLORS.border,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 6,
            elevation: 2,
            overflow: 'hidden',
          },
        ]}
      >
        {data.map((place, index) => (
          <React.Fragment key={place.id}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleItemPress(place)}
              style={[
                styles.pdh16,
                styles.pdv12,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}
            >
              {/* Category Icon Container */}
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  backgroundColor: COLORS.iconBg,
                  borderWidth: 1,
                  borderColor: COLORS.borderSoft,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Text style={{ fontSize: 17 }}>{place.categoryIcon || '📍'}</Text>
              </View>

              {/* Title, Subtitle & Category Tag */}
              <View style={{ flex: 1, marginRight: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={[
                      styles.ts14,
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
                  {place.category && (
                    <View
                      style={{
                        backgroundColor: COLORS.pillBg,
                        borderRadius: 5,
                        paddingHorizontal: 5,
                        paddingVertical: 1,
                        marginLeft: 6,
                      }}
                    >
                      <Text
                        style={[
                          styles.ts10,
                          {
                            color: COLORS.textSecondary,
                            fontWeight: '600',
                          },
                        ]}
                      >
                        {place.category}
                      </Text>
                    </View>
                  )}
                </View>

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

              {/* Distance Pill & Chevron */}
              <View style={{ alignItems: 'flex-end' }}>
                {place.distance && (
                  <View
                    style={{
                      backgroundColor: COLORS.yellowLight,
                      borderWidth: 1,
                      borderColor: COLORS.promoBorder,
                      borderRadius: 10,
                      paddingHorizontal: 7,
                      paddingVertical: 2,
                      marginBottom: 2,
                    }}
                  >
                    <Text
                      style={[
                        styles.ts10,
                        {
                          fontWeight: '700',
                          color: COLORS.yellowAccent,
                        },
                      ]}
                    >
                      {place.distance}
                    </Text>
                  </View>
                )}
                <Text style={[styles.ts14, { color: COLORS.textLight, fontWeight: '700' }]}>
                  ›
                </Text>
              </View>
            </TouchableOpacity>

            {index < data.length - 1 && (
              <View
                style={[
                  styles.mr16,
                  {
                    height: 1,
                    backgroundColor: COLORS.divider,
                    marginLeft: 66,
                  },
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export { PlaceNear };
export default PlaceNear;
