import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

// Red Destination Pin
const RedPin = ({ size = 18 }) => (
  <View style={{ width: size, height: size * 1.35, alignItems: 'center', justifyContent: 'flex-start' }}>
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: COLORS.redPin,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.redPin,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 3,
        elevation: 3,
      }}
    >
      <View
        style={{
          width: size * 0.36,
          height: size * 0.36,
          borderRadius: (size * 0.36) / 2,
          backgroundColor: COLORS.white,
        }}
      />
    </View>
    <View
      style={{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: size * 0.28,
        borderRightWidth: size * 0.28,
        borderTopWidth: size * 0.38,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: COLORS.redPin,
        marginTop: -2,
      }}
    />
  </View>
);

const TripLocations = ({
  pickup = 'Albert Ekka Chowk, Ranchi',
  destination = 'Harmu Chowk, Ranchi',
  onPickupPress,
  onDropPress,
}) => {
  return (
    <View
      style={[
        styles.mh20,
        styles.mt8,
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
        },
      ]}
    >
      {/* Row 1: Pickup */}
      <TouchableOpacity
        style={[
          styles.pdh16,
          styles.pdv12,
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
        activeOpacity={0.7}
        onPress={onPickupPress}
      >
        <View style={{ alignItems: 'center', width: 28 }}>
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: COLORS.yellow,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: COLORS.textDark,
              }}
            />
          </View>
          <Text style={{ fontSize: 10, color: COLORS.textMuted, marginTop: -2 }}>
            ⌄
          </Text>
        </View>

        <View style={[styles.ml12, { flex: 1 }]}>
          <Text
            style={[
              styles.ts10,
              {
                fontWeight: '700',
                color: COLORS.textLight,
                letterSpacing: 0.6,
              },
            ]}
          >
            PICKUP
          </Text>
          <Text
            style={[
              styles.ts14,
              styles.mt4,
              {
                fontWeight: '800',
                color: COLORS.textDark,
              },
            ]}
            numberOfLines={1}
          >
            {pickup}
          </Text>
        </View>

        <Text style={[styles.ts18, { color: COLORS.textDark, fontWeight: '400' }]}>
          ›
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View
        style={[
          styles.mh16,
          {
            height: 1,
            backgroundColor: COLORS.divider,
          },
        ]}
      />

      {/* Row 2: Drop */}
      <TouchableOpacity
        style={[
          styles.pdh16,
          styles.pdv12,
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
        activeOpacity={0.7}
        onPress={onDropPress}
      >
        <View style={{ alignItems: 'center', width: 28 }}>
          <RedPin size={18} />
          <Text style={{ fontSize: 10, color: COLORS.textMuted, marginTop: -2 }}>
            ⌄
          </Text>
        </View>

        <View style={[styles.ml12, { flex: 1 }]}>
          <Text
            style={[
              styles.ts10,
              {
                fontWeight: '700',
                color: COLORS.textLight,
                letterSpacing: 0.6,
              },
            ]}
          >
            DROP
          </Text>
          <Text
            style={[
              styles.ts14,
              styles.mt4,
              {
                fontWeight: '800',
                color: COLORS.textDark,
              },
            ]}
            numberOfLines={1}
          >
            {destination}
          </Text>
        </View>

        <Text style={[styles.ts18, { color: COLORS.textDark, fontWeight: '400' }]}>
          ›
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TripLocations;
