import React from 'react';
import COLORS from '../../../../assets/colors';
import { InfoCircleIcon } from '../SettingIcons';
import SettingItemRow from '../SettingItemRow';

const About = ({
  title = 'About',
  subtitle = 'App version 1.0.0',
  onPress,
  showDivider = false,
  style,
}) => {
  return (
    <SettingItemRow
      icon={<InfoCircleIcon size={18} color={COLORS.textDark} />}
      title={title}
      subtitle={subtitle}
      onPress={onPress}
      showDivider={showDivider}
      style={style}
    />
  );
};

export const AboutXcab = About;
export default About;
