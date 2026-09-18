import React from 'react';
import COLORS from '../../../assets/colors';
import { BellIcon } from './SettingIcons';
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
      icon={<BellIcon size={18} color={COLORS.textDark} />}
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
