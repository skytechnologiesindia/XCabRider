import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import { HeaderBell } from '../../Home/Icons';

// Circular Back Arrow Icon
const BackArrowIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        position: 'absolute',
        width: size * 0.75,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        position: 'absolute',
        left: 2,
        width: size * 0.45,
        height: size * 0.45,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
      }}
    />
  </View>
);

const EditProfileHeader = ({
  onBack,
  onNotificationPress,
  title = 'Edit Profile',
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.pdh20,
        styles.pdv12,
        {
          paddingTop: Math.max(insets.top, 14),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      ]}
    >
      {/* Circular Back Button */}
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: COLORS.white,
          borderWidth: 1.2,
          borderColor: COLORS.border,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 5,
          elevation: 2,
        }}
        activeOpacity={0.7}
        onPress={onBack}
      >
        <BackArrowIcon size={18} color={COLORS.textDark} />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          fontWeight: '800',
          color: COLORS.textDark,
        }}
      >
        {title}
      </Text>

      {/* Notification Bell */}
      <TouchableOpacity
        style={styles.p4}
        activeOpacity={0.7}
        onPress={onNotificationPress}
      >
        <HeaderBell size={21} color={COLORS.textDark} hasBadge />
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileHeader;
