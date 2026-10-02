import { Image } from 'react-native';
import React from 'react';
import COLORS from '../../../assets/colors';
import icons from '../../../assets/icons';
import SettingItemRow from './SettingItemRow';

const Nofication = ({
  title = 'Notifications',
  subtitle = 'Ride updates and alerts',
  onPress,
  showDivider = true,
  style,
}) => {
  return (
    <SettingItemRow
      icon={<Image source={icons.bellIcon} style={{ width: 18, height: 18, tintColor: COLORS.textDark }} resizeMode="contain" />}
      title={title}
      subtitle={subtitle}
      onPress={onPress}
      showDivider={showDivider}
      style={style}
    />
  );
};

export const Notifications = Nofication;
export default Nofication;
