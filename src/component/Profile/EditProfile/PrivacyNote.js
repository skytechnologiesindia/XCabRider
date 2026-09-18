import React from 'react';
import { View, Text } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

import { LockIcon } from '../../../assets/icons/Icons';


const PrivacyNote = ({
  text = 'Your information stays private and is used only to manage your XCAB account.',
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
      <LockIcon size={14} color={COLORS.textMuted} />
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
