import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

/**
 * RidesNoData component
 * Displays empty state messaging when user has no past rides or ride history
 */
const RidesNoData = ({
  title = "No ride history yet",
  subtitle = "You haven’t taken any rides with XCab yet.\nYour completed trips will appear here.",
  onBookRide,
  navigation,
  style,
}) => {
  const handleBook = () => {
    if (onBookRide) {
      onBookRide();
    } else if (navigation?.navigate) {
      navigation.navigate('Home');
    }
  };

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 28,
          paddingVertical: 40,
        },
        style,
      ]}
    >
      {/* ================= 1. TITLE ================= */}
      <Text
        style={[
          styles.ts22,
          {
            fontWeight: '800',
            color: COLORS.textDark,
            textAlign: 'center',
            letterSpacing: -0.3,
          },
        ]}
      >
        {title}
      </Text>

      {/* ================= 2. SUBTITLE ================= */}
      <Text
        style={[
          styles.ts14,
          styles.mt8,
          {
            fontWeight: '500',
            color: COLORS.textMuted,
            textAlign: 'center',
            lineHeight: 22,
          },
        ]}
      >
        {subtitle}
      </Text>

      {/* ================= 3. OPTIONAL BOOK RIDE CTA ================= */}
      {(onBookRide || navigation) && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBook}
          style={[
            styles.mt24,
            styles.pdh24,
            {
              height: 46,
              backgroundColor: COLORS.yellow,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: COLORS.yellow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 2,
            },
          ]}
        >
          <Text
            style={[
              styles.ts14,
              {
                fontWeight: '800',
                color: COLORS.textDark,
              },
            ]}
          >
            Book a Ride
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export { RidesNoData };
export default RidesNoData;
