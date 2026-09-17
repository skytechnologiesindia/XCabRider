import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import COLORS from '../../assets/colors';
import QuickPlaces from '../../component/Home/QuickPlaces';
import GoogleMap from '../../component/Home/GoogleMap';
import PlaceNear from '../../component/Home/PlaceNear';
import SearchTop from '../../component/Home/searchTop';
import { LocationSearch } from '../../component/Home/LocationSearch';
import { TripBooking } from '../../component/Home/TripBooking';
import { DriverSearching } from '../../component/Home/DriverSearching';
import { CancelRide } from '../../component/Home/CancelRide';
import { HomeSkeleton } from '../../component/Home/HomeSkeleton/HomeSkeleton';

const parseLocation = (locStr, fallbackTitle, fallbackSubtitle) => {
  if (!locStr) {
    return { title: fallbackTitle, subtitle: fallbackSubtitle };
  }
  const parts = locStr.split(',');
  const title = parts[0]?.trim() || fallbackTitle;
  const subtitle = parts.length > 1
    ? parts.slice(1).join(',').trim()
    : fallbackSubtitle;
  return { title, subtitle };
};

const Home = ({ navigation, route, initialParams }) => {
  const params = route?.params || initialParams;
  const [isLoading, setIsLoading] = useState(true);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isTripBookingVisible, setIsTripBookingVisible] = useState(false);
  const [isDriverSearchingVisible, setIsDriverSearchingVisible] = useState(false);
  const [isCancelRideVisible, setIsCancelRideVisible] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState('SEDAN');
  const [tripDetails, setTripDetails] = useState({
    pickup: 'Ranchi Railway Station',
    pickupSubtitle: 'Station Rd, Ranchi, Jharkhand 834001',
    destination: 'Lalpur Market',
    destinationSubtitle: 'Lalpur Chowk, Ranchi, Jharkhand 834001',
  });

  // Simulate initial lazy loading / data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle rebook request coming from Rides.js
  useEffect(() => {
    if (params?.rebookTrip || params?.openTripBooking) {
      if (params.rebookTrip) {
        const ride = params.rebookTrip;
        const pickupInfo = parseLocation(
          ride.pickup,
          'Ranchi Railway Station',
          'Station Rd, Ranchi, Jharkhand 834001'
        );
        const dropoffInfo = parseLocation(
          ride.dropoff,
          'Lalpur Market',
          'Lalpur Chowk, Ranchi, Jharkhand 834001'
        );

        setTripDetails({
          pickup: pickupInfo.title,
          pickupSubtitle: pickupInfo.subtitle,
          destination: dropoffInfo.title,
          destinationSubtitle: dropoffInfo.subtitle,
        });

        const typeUpper = (ride.carType || '').toUpperCase();
        if (typeUpper.includes('MINI') || typeUpper.includes('AUTO')) {
          setSelectedVehicleId('MINI');
        } else if (typeUpper.includes('XL')) {
          setSelectedVehicleId('XL');
        } else {
          setSelectedVehicleId('SEDAN');
        }
      } else if (params.savedPlace || params.destination) {
        const destTitle = params.savedPlace?.title || params.destination || 'Home';
        const destSubtitle =
          params.savedPlace?.address ||
          params.destinationSubtitle ||
          'Station Rd, Ranchi, Jharkhand 834001';

        setTripDetails({
          pickup: 'Current Location',
          pickupSubtitle: 'Lalpur Chowk, Circular Road, Ranchi 834001',
          destination: destTitle,
          destinationSubtitle: destSubtitle,
        });
      }
      setIsTripBookingVisible(true);
    }
  }, [params]);

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Main Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 14,
          paddingBottom: 24,
        }}
      >
        {/* ================= SEARCH BAR ================= */}
        <SearchTop
          onPress={() => setIsLocationModalVisible(true)}
        />

        {/* ================= QUICK DESTINATIONS ================= */}
        <QuickPlaces />

        {/* ================= CURRENT LOCATION MAP CARD ================= */}
        <GoogleMap />

        {/* ================= PLACES NEAR YOU ================= */}
        <PlaceNear
          onPlacePress={(place) => {
            setTripDetails((prev) => ({
              ...prev,
              destination: place.title,
              destinationSubtitle: place.subtitle,
            }));
            setIsTripBookingVisible(true);
          }}
          onSeeAllPress={() => setIsLocationModalVisible(true)}
        />

      </ScrollView>

      {/* Find Location Modal */}
      <LocationSearch
        visible={isLocationModalVisible}
        onClose={() => setIsLocationModalVisible(false)}
        onProceedToTrip={(tripData) => {
          setIsLocationModalVisible(false);
          setTripDetails((prev) => ({
            ...prev,
            pickup: tripData?.pickup || prev.pickup,
            destination: tripData?.destination || prev.destination,
            destinationSubtitle: tripData?.destinationSubtitle || prev.destinationSubtitle,
          }));
          setIsTripBookingVisible(true);
        }}
      />

      {/* Trip Booking Modal */}
      <TripBooking
        visible={isTripBookingVisible}
        onClose={() => setIsTripBookingVisible(false)}
        pickup={tripDetails.pickup}
        pickupSubtitle={tripDetails.pickupSubtitle}
        destination={tripDetails.destination}
        destinationSubtitle={tripDetails.destinationSubtitle}
        initialVehicleId={selectedVehicleId}
        onEditPickup={() => {
          setIsTripBookingVisible(false);
          setIsLocationModalVisible(true);
        }}
        onEditDestination={() => {
          setIsTripBookingVisible(false);
          setIsLocationModalVisible(true);
        }}
        onBookRide={(booking) => {
          console.log('Book ride confirmed:', booking);
          setIsTripBookingVisible(false);
          setIsDriverSearchingVisible(true);
        }}
      />

      {/* Driver Searching Modal */}
      <DriverSearching
        visible={isDriverSearchingVisible}
        pickup={tripDetails.pickup}
        destination={tripDetails.destination}
        onCancelRequest={() => {
          setIsDriverSearchingVisible(false);
          setIsCancelRideVisible(true);
        }}
        onCancel={() => setIsDriverSearchingVisible(false)}
        onClose={() => setIsDriverSearchingVisible(false)}
      />

      {/* Cancel Ride Modal */}
      <CancelRide
        visible={isCancelRideVisible}
        onClose={() => setIsCancelRideVisible(false)}
        onKeepRide={() => {
          setIsCancelRideVisible(false);
          setIsDriverSearchingVisible(true);
        }}
        onConfirmCancel={(reason) => {
          console.log('Ride cancelled with reason:', reason);
          setIsCancelRideVisible(false);
        }}
      />
    </View>
  );
};

export default Home;
