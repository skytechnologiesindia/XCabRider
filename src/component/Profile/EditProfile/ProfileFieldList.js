import React from 'react';
import { View } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import ProfileField from './ProfileField';

const ProfileFieldList = ({
  fields = [],
  onFieldPress,
}) => {
  return (
    <View
      style={[
        styles.mh20,
        {
          backgroundColor: COLORS.cardBg,
          borderRadius: 18,
          borderWidth: 1.2,
          borderColor: COLORS.border,
          overflow: 'hidden',
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
          elevation: 2,
        },
      ]}
    >
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <ProfileField
            icon={field.icon}
            label={field.label}
            value={field.value}
            isVerified={field.isVerified}
            isFixed={field.isFixed}
            onPress={() => onFieldPress?.(field)}
          />

          {/* Divider between fields */}
          {index < fields.length - 1 && (
            <View
              style={[
                styles.mh16,
                {
                  height: 1,
                  backgroundColor: COLORS.divider,
                },
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

export default ProfileFieldList;
