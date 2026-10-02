import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import icons from '../../../assets/icons';

const SettingsHeader = ({
  title = 'Settings',
  onBack,
  style,
}) => {
  return (
    <View
      style={[
        styles.mb16,
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}
    >
      {/* Circular Back Button (matching EditProfile style) */}
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        style={[
          styles.mr12,
          {
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: COLORS.white,
            borderWidth: 1.2,
            borderColor: COLORS.border,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 3,
            elevation: 1,
          },
        ]}
      >
        <Image source={icons.backArrow} style={{ width: 16, height: 16, tintColor: COLORS.textDark }} resizeMode="contain" />
      </TouchableOpacity>

      {/* Page Title */}
      <Text
        style={[
          styles.ts20,
          {
            fontWeight: '800',
            color: COLORS.textDark,
            letterSpacing: -0.3,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default SettingsHeader;
