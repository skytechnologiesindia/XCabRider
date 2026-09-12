import React from 'react';
import { View, Text } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

// Slashed Circle / Cancel Ride Icon
const CancelIconBadge = ({ size = 42 }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: COLORS.yellow,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View
      style={{
        width: size * 0.52,
        height: size * 0.52,
        borderRadius: (size * 0.52) / 2,
        borderWidth: 2.2,
        borderColor: COLORS.textDark,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 2.2,
          height: size * 0.52,
          backgroundColor: COLORS.textDark,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  </View>
);

const CancelWarningCard = ({
  driverName = 'Raj Kumar',
  feeWarning = 'A cancellation fee may apply.',
}) => {
  return (
    <View
      style={[
        styles.mh20,
        styles.mt8,
        styles.pdh16,
        styles.pdv16,
        {
          backgroundColor: COLORS.warningCardBg,
          borderRadius: 18,
          borderWidth: 1.2,
          borderColor: COLORS.warningBorder,
          flexDirection: 'row',
          alignItems: 'flex-start',
        },
      ]}
    >
      {/* Warning Icon Badge */}
      <CancelIconBadge size={42} />

      {/* Texts */}
      <View style={[styles.ml12, { flex: 1 }]}>
        <Text
          style={{
            fontSize: 10.5,
            fontWeight: '800',
            color: COLORS.warningTag,
            letterSpacing: 0.8,
            textTransform: 'uppercase',
          }}
        >
          DRIVER MATCHED
        </Text>

        <Text
          style={[
            styles.mt4,
            {
              fontSize: 21,
              fontWeight: '800',
              color: COLORS.textDark,
              letterSpacing: -0.3,
            },
          ]}
        >
          Cancel this ride?
        </Text>

        <Text
          style={[
            styles.mt4,
            {
              fontSize: 12.5,
              fontWeight: '500',
              color: COLORS.mediumGrey,
              lineHeight: 17,
            },
          ]}
        >
          {driverName} is on the way. {feeWarning}
        </Text>
      </View>
    </View>
  );
};

export default CancelWarningCard;
