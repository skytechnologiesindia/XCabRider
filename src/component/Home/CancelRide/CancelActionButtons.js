import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

// Chevron Right for Cancel Button
const ChevronRight = ({ size = 15, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.55,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        width: size * 0.45,
        height: size * 0.45,
        borderTopWidth: 2.2,
        borderRightWidth: 2.2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
      }}
    />
  </View>
);

// Circled Cross (X) Icon for Keep My Ride Button
const CrossCircleIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 1.8,
      borderColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View
      style={{
        position: 'absolute',
        width: size * 0.5,
        height: 1.6,
        backgroundColor: color,
        transform: [{ rotate: '45deg' }],
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: size * 0.5,
        height: 1.6,
        backgroundColor: color,
        transform: [{ rotate: '-45deg' }],
      }}
    />
  </View>
);

const CancelActionButtons = ({
  onCancelRide,
  onKeepRide,
}) => {
  return (
    <View style={styles.mt12}>
      {/* Primary: Cancel Ride */}
      <TouchableOpacity
        style={[
          styles.mh20,
          styles.pdh20,
          {
            height: 50,
            borderRadius: 14,
            backgroundColor: COLORS.yellow,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: COLORS.yellow,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 3,
          },
        ]}
        activeOpacity={0.8}
        onPress={onCancelRide}
      >
        <View style={{ width: 15 }} />
        <Text
          style={{
            fontSize: 15,
            fontWeight: '800',
            color: COLORS.textDark,
            textAlign: 'center',
          }}
        >
          Cancel Ride
        </Text>
        <ChevronRight size={15} color={COLORS.textDark} />
      </TouchableOpacity>

      {/* Secondary: Keep My Ride */}
      <TouchableOpacity
        style={[
          styles.mh20,
          styles.mt12,
          styles.mb16,
          {
            height: 48,
            borderRadius: 14,
            backgroundColor: COLORS.white,
            borderWidth: 1.4,
            borderColor: COLORS.borderLight,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
        activeOpacity={0.8}
        onPress={onKeepRide}
      >
        <Text
          style={[
            styles.ml8,
            {
              fontSize: 14.5,
              fontWeight: '800',
              color: COLORS.textDark,
            },
          ]}
        >
          Keep my Ride
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CancelActionButtons;
