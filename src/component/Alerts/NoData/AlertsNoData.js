import React from 'react';
import { View, Text } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

/**
 * AlertsNoData component
 * Displays empty state messaging when user has no active alerts or notifications
 */
const AlertsNoData = ({
  title = "You’re all caught up!",
  subtitle = "You don’t have any new alerts or\nnotifications right now.",
  style,
}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 28,
          paddingVertical: 40,
        },
        style,
      ]}
    >
      {/* ================= 1. TITLE ================= */}
      <Text
        style={[
          styles.ts22,
          {
            fontWeight: '800',
            color: COLORS.textDark,
            textAlign: 'center',
            letterSpacing: -0.3,
          },
        ]}
      >
        {title}
      </Text>

      {/* ================= 2. SUBTITLE ================= */}
      <Text
        style={[
          styles.ts14,
          styles.mt8,
          {
            fontWeight: '500',
            color: COLORS.textMuted,
            textAlign: 'center',
            lineHeight: 22,
          },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export { AlertsNoData };
export default AlertsNoData;
