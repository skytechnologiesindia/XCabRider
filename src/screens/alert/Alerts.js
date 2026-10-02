import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';
import AlertsCards from '../../component/Alerts/AlertsCards';
import AlertsNoData from '../../component/Alerts/NoData/AlertsNoData';
import { AlertsSkeleton } from '../../component/Alerts/AlertsSkeleton/AlertsSkeleton';

const Alerts = ({ navigation, initialNotifications = [] }) => {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial lazy loading / fetch notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AlertsSkeleton navigation={navigation} />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: Math.max(insets.top, 14),
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 14,
          paddingBottom: 24,
        }}
      >
        {/* ================= SECTION HEADER ================= */}
        <View
          style={[
            styles.pdh20,
            styles.mb16,
          ]}
        >
          <Text
            style={[
              styles.ts22,
              {
                fontWeight: '800',
                color: COLORS.textDark,
                letterSpacing: -0.3,
              },
            ]}
          >
            Alerts
          </Text>
          <Text
            style={[
              styles.ts13,
              styles.mt4,
              {
                color: COLORS.textMuted,
                fontWeight: '500',
              },
            ]}
          >
            Your notifications will appear here.
          </Text>
        </View>

        {/* ================= EMPTY STATE OR CARDS ================= */}
        {notifications.length === 0 ? (
          <AlertsNoData />
        ) : (
          notifications.map((item, index) => (
            <AlertsCards
              key={item.id || index}
              title={item.title}
              time={item.time}
              description={item.description}
              isUnread={item.isUnread}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Alerts;
