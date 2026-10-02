import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

const SaveChangesButton = ({
  onPress,
  title = 'Save Changes',
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.mh20,
        styles.mt20,
        {
          height: 50,
          borderRadius: 14,
          backgroundColor: disabled ? COLORS.border : COLORS.yellow,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: COLORS.yellow,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: disabled ? 0 : 0.25,
          shadowRadius: 5,
          elevation: disabled ? 0 : 3,
        },
      ]}
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: '800',
          color: COLORS.textDark,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SaveChangesButton;
