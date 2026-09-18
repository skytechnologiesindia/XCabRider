import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import { ChevronRight } from '../../../assets/icons/Icons';


export const DEFAULT_REASONS = [
  { id: '1', label: 'Driver is taking too long' },
  { id: '2', label: 'I changed my plans' },
  { id: '3', label: 'Wrong pickup location' },
  { id: '4', label: 'Other' },
];

const CancellationReasons = ({
  reasons = DEFAULT_REASONS,
  selectedReason = '1',
  onSelectReason,
}) => {
  return (
    <View style={styles.mt20}>
      {/* Section Header */}
      <Text
        style={[
          styles.mh20,
          styles.mb8,
          {
            fontSize: 11,
            fontWeight: '800',
            color: COLORS.textMuted,
            letterSpacing: 0.9,
            textTransform: 'uppercase',
          },
        ]}
      >
        TELL US WHY
      </Text>

      {/* Options List */}
      {reasons.map((item) => {
        const isSelected = selectedReason === item.id || selectedReason === item.label;

        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.mh20,
              styles.mb8,
              styles.pdh16,
              styles.pdv12,
              {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: isSelected ? COLORS.reasonActiveBg : COLORS.white,
                borderRadius: 14,
                borderWidth: 1.2,
                borderColor: isSelected ? COLORS.yellow : COLORS.border,
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.02,
                shadowRadius: 3,
                elevation: 1,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => onSelectReason?.(item.id)}
          >
            {/* Radio Circle */}
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: isSelected ? 1.8 : 1.6,
                borderColor: isSelected ? COLORS.textDark : COLORS.textLight,
                backgroundColor: isSelected ? COLORS.yellow : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isSelected && (
                <View
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 3.5,
                    backgroundColor: COLORS.textDark,
                  }}
                />
              )}
            </View>

            {/* Label */}
            <Text
              style={[
                styles.ml12,
                {
                  flex: 1,
                  fontSize: 13.5,
                  fontWeight: isSelected ? '700' : '600',
                  color: COLORS.textDark,
                },
              ]}
            >
              {item.label}
            </Text>

            {/* Right Chevron */}
            <ChevronRight
              size={14}
              color={isSelected ? COLORS.textDark : COLORS.textLight}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CancellationReasons;
