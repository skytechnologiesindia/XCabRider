import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

const ProfileField = ({
  icon,
  label,
  value,
  isVerified = false,
  isFixed = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={isFixed ? 1 : 0.7}
      style={[
        styles.pdh16,
        styles.pdv12,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      ]}
      onPress={isFixed ? undefined : onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        {/* Soft cream square icon container */}
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            backgroundColor: '#FAF6ED',
            borderWidth: 1,
            borderColor: '#EFEAE0',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon ? icon(COLORS.textDark) : null}
        </View>

        {/* Label & Value */}
        <View style={styles.ml12}>
          <Text
            style={{
              fontSize: 11,
              color: COLORS.textMuted,
            }}
          >
            {label}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <Text
              style={{
                fontSize: 14.5,
                fontWeight: '700',
                color: COLORS.textDark,
              }}
            >
              {value}
            </Text>

            {isVerified && (
              <View
                style={{
                  marginLeft: 8,
                  backgroundColor: '#E8F5E9',
                  borderWidth: 1,
                  borderColor: '#C8E6C9',
                  borderRadius: 6,
                  paddingHorizontal: 6,
                  paddingVertical: 1.5,
                }}
              >
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: '800',
                    color: '#2E7D32',
                    letterSpacing: 0.5,
                  }}
                >
                  VERIFIED
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Right Arrow (Only for editable fields) */}
      {!isFixed ? (
        <Text
          style={{
            fontSize: 18,
            color: COLORS.textMuted,
            fontWeight: '600',
          }}
        >
          ›
        </Text>
      ) : (
        <View style={{ width: 12 }} />
      )}
    </TouchableOpacity>
  );
};

export default ProfileField;
