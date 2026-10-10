import { Image } from 'react-native';
import React from 'react';
import COLORS from '../../../../assets/colors';
import icons from '../../../../assets/icons';
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
      icon={<Image source={icons.infoCircle} style={{ width: 18, height: 18, tintColor: COLORS.textDark }} resizeMode="contain" />}
      title={title}
      subtitle={subtitle}
      onPress={onPress}
      showDivider={showDivider}
      style={style}
    />
  );
};

export const AboutTreeps = About;
export const AboutXcab = About;
export default About;
