import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

// Crosshair GPS Target Icon
const CrosshairIcon = ({ size = 16, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.72,
        height: size * 0.72,
        borderRadius: (size * 0.72) / 2,
        borderWidth: 1.5,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 3,
          height: 3,
          borderRadius: 1.5,
          backgroundColor: color,
        }}
      />
    </View>
    <View style={{ position: 'absolute', width: 1.5, height: size, backgroundColor: color }} />
    <View style={{ position: 'absolute', width: size, height: 1.5, backgroundColor: color }} />
  </View>
);

const TripMap = ({ image, onCenterPress }) => {
  return (
    <View
      style={[
        styles.mh20,
        styles.mt16,
        {
          height: 220,
          borderRadius: 18,
          borderWidth: 1.2,
          borderColor: COLORS.border,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: COLORS.mapBg,
        },
      ]}
    >
      <Image
        source={image || images.driverSearchMap || images.routeMap}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />

      {/* Floating GPS Target Recenter Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: COLORS.white,
          borderWidth: 1,
          borderColor: COLORS.border,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 3,
          elevation: 3,
        }}
        activeOpacity={0.8}
        onPress={onCenterPress}
      >
        <CrosshairIcon size={16} color={COLORS.textDark} />
      </TouchableOpacity>
    </View>
  );
};

export default TripMap;
