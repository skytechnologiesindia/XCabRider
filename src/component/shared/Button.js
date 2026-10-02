import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import COLORS from '../../assets/colors';
import icons from '../../assets/icons';

export function GoogleButton({ onPress }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 14,
        paddingVertical: 15,
        marginTop: 20,
        backgroundColor: COLORS.white,
      }}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Image source={icons.google} style={[{ width: 20, height: 20 }, { marginRight: 10 }]} resizeMode="contain" />
      <Text
        style={{
          fontSize: 15,
          fontWeight: '600',
          color: COLORS.textDark,
        }}
      >
        Continue with Google
      </Text>
    </TouchableOpacity>
  );
}

export function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.yellow,
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: COLORS.textDark,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default GoogleButton;
