import React from 'react';
import { Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import COLORS from '../../assets/colors';
import icons from '../../assets/icons';

export function GoogleButton({ onPress, disabled = false }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderLight || COLORS.border,
        borderRadius: 14,
        paddingVertical: 15,
        marginTop: 20,
        backgroundColor: COLORS.white,
        opacity: disabled ? 0.6 : 1,
      }}
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
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

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: isDisabled ? '#E5DECA' : COLORS.yellow,
          borderRadius: 14,
          paddingVertical: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          opacity: isDisabled ? 0.8 : 1,
        },
        style,
      ]}
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.textDark} />
      ) : (
        <Text
          style={[
            {
              fontSize: 16,
              fontWeight: '700',
              color: COLORS.textDark,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default GoogleButton;
