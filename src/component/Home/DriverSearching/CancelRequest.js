import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

const CancelRequest = ({
  onCancel,
  title = 'Cancel request',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.mh20,
        styles.mt16,
        styles.mb16,
        {
          height: 48,
          borderRadius: 14,
          borderWidth: 1.4,
          borderColor: '#FF4D4D',
          backgroundColor: COLORS.white,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
      activeOpacity={0.8}
      onPress={onCancel}
    >
      <Text
        style={[
          styles.ts15,
          {
            fontWeight: '800',
            color: '#FF4D4D',
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CancelRequest;
