import React from 'react';
import COLORS from '../../../../assets/colors';
import { GlobeIcon } from '../SettingIcons';
import SettingItemRow from '../SettingItemRow';

const Language = ({
  title = 'Language',
  subtitle = 'English',
  onPress,
  showDivider = true,
  style,
}) => {
  return (
    <SettingItemRow
      icon={<GlobeIcon size={18} color={COLORS.textDark} />}
      title={title}
      subtitle={subtitle}
      onPress={onPress}
      showDivider={showDivider}
      style={style}
    />
  );
};

export default Language;
