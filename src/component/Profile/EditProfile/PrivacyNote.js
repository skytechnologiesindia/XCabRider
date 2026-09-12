import React from 'react';
import { View, Text } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

// Small Lock Icon for Privacy Note
const LockIcon = ({ size = 14, color = COLORS.textMuted }) => (
  <View style={{ width: size, height: size * 1.15, alignItems: 'center', justifyContent: 'flex-end' }}>
    <View
      style={{
        width: size * 0.55,
        height: size * 0.45,
        borderTopLeftRadius: size * 0.28,
        borderTopRightRadius: size * 0.28,
        borderWidth: 1.4,
        borderColor: color,
        borderBottomWidth: 0,
        marginBottom: -1,
      }}
    />
    <View
      style={{
        width: size * 0.85,
        height: size * 0.6,
        borderRadius: 2.5,
        borderWidth: 1.4,
        borderColor: color,
      }}
    />
  </View>
);

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
