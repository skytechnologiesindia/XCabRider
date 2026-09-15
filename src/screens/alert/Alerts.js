import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';
import AlertsCards from '../../component/Alerts/AlertsCards';
import { AlertsSkeleton } from '../../component/Alerts/AlertsSkeleton';

// Circular Back Arrow Icon
const BackArrowIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        position: 'absolute',
        width: size * 0.75,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        position: 'absolute',
        left: 2,
        width: size * 0.45,
        height: size * 0.45,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
      }}
    />
  </View>
);

const Alerts = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial lazy loading / fetch notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    } else if (navigation?.navigate) {
      navigation.navigate('Home');
    }
  };

  if (isLoading) {
    return <AlertsSkeleton navigation={navigation} />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
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
        {/* Section Header with Back Button */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: 12,
          }}
        >
          <TouchableOpacity
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: COLORS.white,
              borderWidth: 1.2,
              borderColor: COLORS.border,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
              shadowColor: COLORS.black,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 3,
              elevation: 1,
            }}
            activeOpacity={0.7}
            onPress={handleBack}
          >
            <BackArrowIcon size={16} color={COLORS.textDark} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 20,
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
