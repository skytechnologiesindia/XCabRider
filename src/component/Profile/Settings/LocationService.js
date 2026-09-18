import React from 'react';
import COLORS from '../../../assets/colors';
import { LocationIcon } from './SettingIcons';
import SettingItemRow from './SettingItemRow';

const LocationService = ({
  title = 'Location Services',
  subtitle = 'Allow location access',
  onPress,
  showDivider = true,
  style,
}) => {
  return (
    <SettingItemRow
      icon={<LocationIcon size={18} color={COLORS.textDark} />}
      title={title}
      subtitle={subtitle}
      onPress={onPress}
      showDivider={showDivider}
      style={style}
    />
  );
};

export const LocationServices = LocationService;
export default LocationService;
