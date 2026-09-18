import React from 'react';
import COLORS from '../../../../assets/colors';
import { MessageChatIcon } from '../SettingIcons';
import SettingItemRow from '../SettingItemRow';

const ContactUs = ({
  title = 'Contact Us',
  subtitle = "We're here to help",
  onPress,
  showDivider = true,
  style,
}) => {
  return (
    <SettingItemRow
      icon={<MessageChatIcon size={18} color={COLORS.textDark} />}
      title={title}
      subtitle={subtitle}
      onPress={onPress}
      showDivider={showDivider}
      style={style}
    />
  );
};

export default ContactUs;
