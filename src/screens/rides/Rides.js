import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../assets/colors';
import Footer from '../../component/Footer/Footer';
import RidesCards, { DEFAULT_RIDES_DATA } from '../../component/Rides/RidesCards/RidesCards';
import RidesNoData from '../../component/Rides/NoData/RidesNoData';
import { RidesSkeleton } from '../../component/Rides/RidesSkeleton/RidesSkeleton';

const Rides = ({
  navigation,
  initialRides = DEFAULT_RIDES_DATA,
  showHeaderFooter = false, // When mounted in App.js shell, Header and Footer are already provided
}) => {
  const insets = useSafeAreaInsets();
  const [ridesList, setRidesList] = useState(initialRides);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial lazy loading / fetch ride history
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRebook = (ride) => {
    if (navigation?.navigate) {
      navigation.navigate('Home', {
        rebookTrip: ride,
        openTripBooking: true,
      });
    }
  };

  if (isLoading) {
    return (
      <RidesSkeleton
        navigation={navigation}
        showHeaderFooter={showHeaderFooter}
      />
    );
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

      {/* Main Scrollable Trips List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 12,
          paddingBottom: 28,
        }}
      >
        {/* Page Title & Subtitle */}
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: '900',
              color: COLORS.textDark,
              letterSpacing: -0.4,
            }}
          >
            Ride History
          </Text>
          <Text
            style={{
              fontSize: 12.5,
              fontWeight: '600',
              color: COLORS.textMuted,
              marginTop: 2,
            }}
          >
            Past trips & activity
          </Text>
        </View>

        {/* List of Ride History Cards or Empty State */}
        {ridesList.length === 0 ? (
          <RidesNoData
            navigation={navigation}
            onBookRide={() => navigation?.navigate?.('Home')}
          />
        ) : (
          <RidesCards rides={ridesList} onRebook={handleRebook} />
        )}
      </ScrollView>

      {/* Optional Bottom Footer if used standalone */}
      {showHeaderFooter && (
        <Footer
          activeTab="RIDES"
          navigation={navigation}
          isAbsolute={false}
        />
      )}
    </View>
  );
};

export default Rides;
