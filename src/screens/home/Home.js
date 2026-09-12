import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../assets/images';
import COLORS from '../../assets/colors';
import {
  HeaderBell,
  SearchIcon,
  GpsTargetIcon,
  HomeIcon,
  WorkIcon,
  StarIcon,
  RefreshIcon,
  PromoDiscountIcon,
} from '../../component/Home/Icons';
import RecentSearch from '../../component/Home/recentSearch';
import { LocationSearch } from '../../component/Home/LocationSearch';
import { TripBooking } from '../../component/Home/TripBooking';
import { DriverSearching } from '../../component/Home/DriverSearching';
import { CancelRide } from '../../component/Home/CancelRide';
import Footer from '../../component/Footer';

const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('HOME');
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isTripBookingVisible, setIsTripBookingVisible] = useState(false);
  const [isDriverSearchingVisible, setIsDriverSearchingVisible] = useState(false);
  const [isCancelRideVisible, setIsCancelRideVisible] = useState(false);
  const [tripDetails, setTripDetails] = useState({
    pickup: 'Ranchi Railway Station',
    pickupSubtitle: 'Station Rd, Ranchi, Jharkhand 834001',
    destination: 'Lalpur Market',
    destinationSubtitle: 'Lalpur Chowk, Ranchi, Jharkhand 834001',
  });

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: insets.top,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Main Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: insets.bottom + 95,
        }}
      >
        {/* ================= HEADER ================= */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          {/* Left: Brand + Divider + Location */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: '900',
                color: COLORS.textDark,
                letterSpacing: 0.8,
              }}
            >
              XCAB
            </Text>
          </View>

          {/* Right: Notification Bell + Avatar */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                padding: 6,
                marginRight: 10,
              }}
              activeOpacity={0.7}
              onPress={() => navigation?.navigate('Notification')}
            >
              <HeaderBell size={21} color={COLORS.textDark} hasBadge />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                borderWidth: 1.2,
                borderColor: '#E2DDD0',
                overflow: 'hidden',
                backgroundColor: '#EAE5D8',
              }}
              activeOpacity={0.8}
              onPress={() => {
                navigation?.navigate?.('Profile');
              }}
            >
              <Image
                source={images.avatar}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>

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
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <SearchIcon size={19} color="#2B2B2B" />
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
                backgroundColor: '#FAF6ED',
                borderWidth: 1,
                borderColor: '#EFEAE0',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.7}
              onPress={() => setIsLocationModalVisible(true)}
            >
              <GpsTargetIcon size={18} color="#2B2B2B" />
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
          {/* Home */}
          <TouchableOpacity
            style={{
              flex: 1,
              marginHorizontal: 3.5,
              backgroundColor: COLORS.cardBg,
              borderRadius: 14,
              borderWidth: 1.2,
              borderColor: COLORS.border,
              paddingVertical: 10,
              paddingHorizontal: 8,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.03,
              shadowRadius: 5,
              elevation: 1,
            }}
            activeOpacity={0.8}
            onPress={() => console.log('Add home')}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                backgroundColor: '#F9F5EC',
                borderWidth: 1,
                borderColor: '#ECE6D9',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HomeIcon size={19} color={COLORS.textDark} />
            </View>
            <View style={{ marginLeft: 7, flex: 1 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: COLORS.textDark,
                }}
              >
                Home
              </Text>
              <Text
                style={{
                  fontSize: 10.5,
                  color: COLORS.textMuted,
                  marginTop: 1,
                }}
              >
                Add home
              </Text>
            </View>
          </TouchableOpacity>

          {/* Work */}
          <TouchableOpacity
            style={{
              flex: 1,
              marginHorizontal: 3.5,
              backgroundColor: COLORS.cardBg,
              borderRadius: 14,
              borderWidth: 1.2,
              borderColor: COLORS.border,
              paddingVertical: 10,
              paddingHorizontal: 8,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.03,
              shadowRadius: 5,
              elevation: 1,
            }}
            activeOpacity={0.8}
            onPress={() => console.log('Add work')}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                backgroundColor: '#F9F5EC',
                borderWidth: 1,
                borderColor: '#ECE6D9',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <WorkIcon size={19} color={COLORS.textDark} />
            </View>
            <View style={{ marginLeft: 7, flex: 1 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: COLORS.textDark,
                }}
              >
                Work
              </Text>
              <Text
                style={{
                  fontSize: 10.5,
                  color: COLORS.textMuted,
                  marginTop: 1,
                }}
              >
                Add work
              </Text>
            </View>
          </TouchableOpacity>

          {/* Favorites */}
          <TouchableOpacity
            style={{
              flex: 1,
              marginHorizontal: 3.5,
              backgroundColor: COLORS.cardBg,
              borderRadius: 14,
              borderWidth: 1.2,
              borderColor: COLORS.border,
              paddingVertical: 10,
              paddingHorizontal: 8,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.03,
              shadowRadius: 5,
              elevation: 1,
            }}
            activeOpacity={0.8}
            onPress={() => console.log('Saved places')}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                backgroundColor: '#F9F5EC',
                borderWidth: 1,
                borderColor: '#ECE6D9',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StarIcon size={19} color={COLORS.textDark} />
            </View>
            <View style={{ marginLeft: 7, flex: 1 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: COLORS.textDark,
                }}
              >
                Favorites
              </Text>
              <Text
                style={{
                  fontSize: 10.5,
                  color: COLORS.textMuted,
                  marginTop: 1,
                }}
              >
                Saved places
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ================= CURRENT LOCATION MAP CARD ================= */}
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 18,
            backgroundColor: COLORS.cardBg,
            borderRadius: 16,
            borderWidth: 1.2,
            borderColor: COLORS.border,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          {/* Header inside Map Card */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#F8F4EA',
                  borderWidth: 1,
                  borderColor: '#EDE7D9',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GpsTargetIcon size={17} color={COLORS.textDark} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 13.5,
                    fontWeight: '700',
                    color: COLORS.textDark,
                  }}
                >
                  Current location
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: COLORS.textMuted,
                    marginTop: 2,
                  }}
                >
                  Detecting your location...
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FCF5DF',
                borderWidth: 1,
                borderColor: '#EFE0B5',
                paddingHorizontal: 10,
                paddingVertical: 6.5,
                borderRadius: 20,
              }}
              activeOpacity={0.7}
              onPress={() => console.log('Updating location...')}
            >
              <RefreshIcon size={12} color={COLORS.textDark} />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: COLORS.textDark,
                  marginLeft: 5,
                }}
              >
                Update location
              </Text>
            </TouchableOpacity>
          </View>

          {/* Map Preview Graphic */}
          <View
            style={{
              width: '100%',
              height: 155,
              backgroundColor: '#121417',
              overflow: 'hidden',
            }}
          >
            <Image
              source={images.mapPreview}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            />
          </View>
        </View>

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
                color: '#656056',
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
              backgroundColor: '#121314',
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
                color: '#FFFFFF',
              }}
            >
              View Offers
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: '#FFFFFF',
                marginLeft: 4,
                marginTop: -1,
              }}
            >
              ›
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ================= FIXED BOTTOM NAVIGATION ================= */}
      <Footer
        activeTab={activeTab}
        onTabPress={(tab) => {
          if (tab === 'ALERTS') {
            navigation?.navigate('Notification');
          } else if (tab === 'PROFILE') {
            navigation?.navigate('Profile');
          } else {
            setActiveTab(tab);
          }
        }}
        navigation={navigation}
      />

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
