import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../assets/colors';
import AlertsCards from '../../component/Alerts/AlertsCards';
import { AlertsSkeleton } from '../../component/Alerts/AlertsSkeleton/AlertsSkeleton';

const Alerts = ({ navigation }) => {
  const insets = useSafeAreaInsets();
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
          paddingTop: 12,
          paddingBottom: 24,
        }}
      >
        {/* Section Header */}
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              color: COLORS.textDark,
              letterSpacing: -0.3,
            }}
          >
            Alerts
          </Text>
        </View>

        {/* Notification Card Component */}
        <AlertsCards
          title="Driver Raj Kumar is arriving"
          time="2m ago"
          description="White Swift Dzire • JH 01 AB 4821 is 2 mins away"
          isUnread={true}
        />
      </ScrollView>
    </View>
  );
};

export default Alerts;
