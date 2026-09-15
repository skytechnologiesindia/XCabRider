import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import COLORS from '../../assets/colors';
import images from '../../assets/images';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import RidesCards from '../../component/Rides/RidesCards/RidesCards';
import { RidesSkeleton } from '../../component/Rides/RidesSkeleton';

// 5 Diverse Ride History Conditions
const RIDE_HISTORY_DATA = [
  {
    id: 'ride_1',
    status: 'COMPLETED',
    date: 'Today, 02:15 PM',
    carName: 'Swift Dzire',
    carType: 'Sedan',
    carImage: images.carSedan,
    pickup: 'Ranchi Railway Station, Station Rd',
    dropoff: 'Lalpur Market, Lalpur Chowk',
    metrics: '6.5 km • 20 mins',
    paymentType: 'CASH',
    fare: '₹190',
    rating: 5,
    cancellationReason: null,
  },
  {
    id: 'ride_2',
    status: 'CANCELLED',
    date: 'Yesterday, 07:45 PM',
    carName: 'WagonR',
    carType: 'Mini',
    carImage: images.carMini,
    pickup: 'Harmu Housing Colony, Harmu',
    dropoff: 'Kanke Road, Ranchi',
    metrics: '8.2 km',
    paymentType: null,
    fare: '₹0',
    rating: null,
    cancellationReason: 'Cancelled by rider',
  },
  {
    id: 'ride_3',
    status: 'COMPLETED',
    date: '11 Sep, 10:30 AM',
    carName: 'Honda City',
    carType: 'Prime Sedan',
    carImage: images.carSedan,
    pickup: 'Birsa Munda Airport (IXR), Hinoo',
    dropoff: 'Doranda Bazar, Ranchi',
    metrics: '11.4 km • 32 mins',
    paymentType: 'UPI',
    fare: '₹345',
    rating: 5,
    cancellationReason: null,
  },
  {
    id: 'ride_4',
    status: 'COMPLETED',
    date: '09 Sep, 08:15 PM',
    carName: 'XCAB Auto',
    carType: 'Auto Rickshaw',
    carImage: images.carMini,
    pickup: 'Main Road, Overbridge',
    dropoff: 'Ratu Road Chowk',
    metrics: '4.1 km • 15 mins',
    paymentType: 'CASH',
    fare: '₹85',
    rating: 4,
    cancellationReason: null,
  },
  {
    id: 'ride_5',
    status: 'CANCELLED',
    date: '06 Sep, 01:20 PM',
    carName: 'Hyundai Aura',
    carType: 'Sedan',
    carImage: images.carSedan,
    pickup: 'Nucleus Mall, Circular Road',
    dropoff: 'Morabadi Ground, Morabadi',
    metrics: '5.0 km',
    paymentType: null,
    fare: '₹0',
    rating: null,
    cancellationReason: 'Driver was unable to arrive',
  },
];

const Rides = ({
  navigation,
  showHeaderFooter = false, // When mounted in App.js shell, Header and Footer are already provided
}) => {
  const [ridesList] = useState(RIDE_HISTORY_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial lazy loading / fetch ride history
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
    <View style={styles.screenContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Optional Top Header if used standalone */}
      {showHeaderFooter && <Header navigation={navigation} safeAreaTop />}

      {/* Main Scrollable Trips List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Page Title & Subtitle */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Ride History</Text>
          <Text style={styles.pageSubtitle}>Past trips & activity</Text>
        </View>

        {/* List of 5 Ride History Cards rendered via RidesCards component */}
        {ridesList.map((ride) => (
          <RidesCards
            key={ride.id}
            ride={ride}
            onRebook={handleRebook}
          />
        ))}
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

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingTop: 12,
    paddingBottom: 28,
  },
  titleSection: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textDark,
    letterSpacing: -0.4,
  },
  pageSubtitle: {
    fontSize: 12.5,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 2,
  },
});

export default Rides;
