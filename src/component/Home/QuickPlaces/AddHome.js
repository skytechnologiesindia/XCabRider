import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import { HomeIcon } from '../../../assets/icons/Icons';

/**
 * AddHome quick destination card component
 */
const AddHome = ({
  title = 'Home',
  subtitle = 'Add home',
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.pdv12,
        styles.pdh8,
        styles.mh4,
        {
          flex: 1,
          backgroundColor: COLORS.cardBg,
          borderRadius: 14,
          borderWidth: 1.2,
          borderColor: COLORS.border,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.03,
          shadowRadius: 5,
          elevation: 1,
        },
        style,
      ]}
      activeOpacity={0.8}
      onPress={onPress || (() => console.log('Add home'))}
    >
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          backgroundColor: COLORS.background,
          borderWidth: 1,
          borderColor: COLORS.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <HomeIcon size={19} color={COLORS.textDark} />
      </View>
      <View
        style={[
          styles.ml8,
          {
            flex: 1,
          },
        ]}
      >
        <Text
          style={[
            styles.ts13,
            {
              fontWeight: '700',
              color: COLORS.textDark,
            },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.ts11,
            {
              color: COLORS.textMuted,
              marginTop: 1,
            },
          ]}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddHome;
