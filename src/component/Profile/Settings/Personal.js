import React from 'react';
import COLORS from '../../../assets/colors';
import { UserIcon } from './SettingIcons';
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
      icon={<UserIcon size={18} color={COLORS.textDark} />}
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
