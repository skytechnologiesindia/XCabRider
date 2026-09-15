import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import COLORS from '../../assets/colors';
import {
  SearchIcon,
  GpsTargetIcon,
  PromoDiscountIcon,
} from '../../component/Home/Icons';
import { AddHome, AddWork, Favorites } from '../../component/Home/QuickPlaces';
import GoogleMap from '../../component/Home/GoogleMap';
import RecentSearch from '../../component/Home/recentSearch';
import { LocationSearch } from '../../component/Home/LocationSearch';
import { TripBooking } from '../../component/Home/TripBooking';
import { DriverSearching } from '../../component/Home/DriverSearching';
import { CancelRide } from '../../component/Home/CancelRide';
import { HomeSkeleton } from '../../component/Home/HomeSkeleton';

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
  const [searchQuery, setSearchQuery] = useState('');
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
    }, 1500);
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

  const recentSearches = [
    {
      id: '1',
      title: 'Lalpur Market',
      subtitle: 'Lalpur, Ranchi, Jharkhand',
    },
    {
      id: '2',
      title: 'Kanke Road',
      subtitle: 'Kanke, Ranchi, Jharkhand',
    },
    {
      id: '3',
      title: 'Harmu Chowk',
      subtitle: 'Harmu, Ranchi, Jharkhand',
    },
  ];

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
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 14,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsLocationModalVisible(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.cardBg,
              borderRadius: 15,
              borderWidth: 1.2,
              borderColor: COLORS.border,
              paddingHorizontal: 16,
              height: 54,
              shadowColor: COLORS.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <SearchIcon size={19} color={COLORS.iconDark} />
            <View style={{ flex: 1, paddingHorizontal: 12 }}>
              <Text
                style={{
                  fontSize: 15.5,
                  color: searchQuery ? COLORS.textDark : COLORS.textMuted,
                }}
              >
                {searchQuery || 'Where are you going?'}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: COLORS.iconBg,
                borderWidth: 1,
                borderColor: COLORS.borderSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.7}
              onPress={() => setIsLocationModalVisible(true)}
            >
              <GpsTargetIcon size={18} color={COLORS.iconDark} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* ================= QUICK DESTINATIONS ================= */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginBottom: 14,
          }}
        >
          <AddHome onPress={() => console.log('Add home')} />
          <AddWork onPress={() => console.log('Add work')} />
          <Favorites onPress={() => console.log('Saved places')} />
        </View>

        {/* ================= CURRENT LOCATION MAP CARD ================= */}
        <GoogleMap />

        {/* ================= RECENT SEARCHES ================= */}
        <RecentSearch
          data={recentSearches}
          onItemPress={item => console.log('Selected:', item.title)}
          onSeeAllPress={() => console.log('See all')}
        />

        {/* ================= PROMO BANNER ================= */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            marginBottom: 16,
            backgroundColor: COLORS.promoBg,
            borderWidth: 1.2,
            borderColor: COLORS.promoBorder,
            borderRadius: 16,
            padding: 13,
          }}
        >
          <PromoDiscountIcon size={38} />

          <View
            style={{
              flex: 1,
              marginLeft: 12,
              marginRight: 8,
            }}
          >
            <Text
              style={{
                fontSize: 13.5,
                fontWeight: '800',
                color: COLORS.textDark,
              }}
            >
              Ride More, Save More!
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: COLORS.mediumGrey,
                marginTop: 2.5,
                lineHeight: 15,
              }}
            >
              Get up to ₹150 off on your next 3 rides
            </Text>
          </View>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.textDark,
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
            activeOpacity={0.85}
            onPress={() => console.log('View Offers')}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: COLORS.white,
              }}
            >
              View Offers
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: COLORS.white,
                marginLeft: 4,
                marginTop: -1,
              }}
            >
              ›
            </Text>
          </TouchableOpacity>
        </View>
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
