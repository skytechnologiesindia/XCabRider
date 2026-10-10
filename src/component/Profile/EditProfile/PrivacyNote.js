import React from 'react';
import { Image, View, Text } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

import icons from '../../../assets/icons';


const PrivacyNote = ({
  text = 'Your information stays private and is used only to manage your treeps account.',
}) => {
  return (
    <View
      style={[
        styles.mh24,
        styles.mt16,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      <Image source={icons.lockPrivacy} style={{ width: 14, height: 14, tintColor: COLORS.textMuted }} resizeMode="contain" />
      <Text
        style={[
          styles.ml8,
          {
            fontSize: 11.5,
            color: COLORS.textMuted,
            lineHeight: 16,
            flex: 1,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default PrivacyNote;
