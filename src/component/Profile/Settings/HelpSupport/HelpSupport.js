import React from 'react';
import COLORS from '../../../../assets/colors';
import { HelpCircleIcon } from '../SettingIcons';
import SettingItemRow from '../SettingItemRow';

const HelpSupport = ({
  title = 'Help & Support',
  subtitle = 'Get help with your issues',
  onPress,
  showDivider = true,
  style,
}) => {
  return (
    <SettingItemRow
      icon={<HelpCircleIcon size={18} color={COLORS.textDark} />}
      title={title}
      subtitle={subtitle}
      onPress={onPress}
      showDivider={showDivider}
      style={style}
    />
  );
};

export default HelpSupport;
