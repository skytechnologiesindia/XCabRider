import { Image } from 'react-native';
import React from 'react';
import COLORS from '../../../assets/colors';
import icons from '../../../assets/icons';
import SettingItemRow from './SettingItemRow';

const Personal = ({
  title = 'Personal Information',
  subtitle = 'Name, phone, email',
  onPress,
  showDivider = true,
  style,
}) => {
  return (
    <SettingItemRow
      icon={<Image source={icons.userIcon} style={{ width: 18, height: 18, tintColor: COLORS.textDark }} resizeMode="contain" />}
      title={title}
      subtitle={subtitle}
      onPress={onPress}
      showDivider={showDivider}
      style={style}
    />
  );
};

export const PersonalInformation = Personal;
export default Personal;
