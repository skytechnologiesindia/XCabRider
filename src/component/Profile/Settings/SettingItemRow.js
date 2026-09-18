import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import { ChevronRightIcon } from './SettingIcons';

/**
 * Reusable row item for Settings screens
 */
const SettingItemRow = ({
  icon,
  title,
  subtitle,
  onPress,
  showDivider = false,
  style,
}) => {
  return (
    <View style={style}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[
          styles.pdv16,
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
      >
        {/* Left Icon Badge */}
        <View
          style={[
            styles.mr16,
            {
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: '#FAF6ED',
              borderWidth: 1,
              borderColor: '#EFEAE0',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          {icon}
        </View>

        {/* Middle Title & Subtitle */}
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.ts15,
              styles.mb4,
              {
                fontWeight: '700',
                color: COLORS.textDark,
              },
            ]}
          >
            {title}
          </Text>
          {!!subtitle && (
            <Text
              style={[
                styles.ts12,
                {
                  fontWeight: '500',
                  color: COLORS.textMuted,
                },
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right Chevron */}
        <ChevronRightIcon size={14} color="#C4BEB2" />
      </TouchableOpacity>

      {/* Divider line between items */}
      {showDivider && (
        <View
          style={[
            styles.ml48,
            {
              height: 1,
              backgroundColor: COLORS.divider,
            },
          ]}
        />
      )}
    </View>
  );
};

export default SettingItemRow;
