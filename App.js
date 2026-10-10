import React, { useState, useEffect } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import COLORS from './src/assets/colors';
import Header from './src/component/Header/Header';
import Footer from './src/component/Footer/Footer';
import OnBoarding from './src/screens/onboarding/OnBoarding';
import Login from './src/screens/auth/Login';
import Otp from './src/screens/auth/Otp';
import ProfileSetup from './src/screens/auth/ProfileSetup';
import Home from './src/screens/home/Home';
import Rides from './src/screens/rides/Rides';
import Alerts from './src/screens/alert/Alerts';
import Profile from './src/screens/profile/Profile';
import EditProfile from './src/component/Profile/EditProfile/EditProfile';
import Setting from './src/component/Profile/Settings/Setting';
import { storage, STORAGE_KEYS, clearAuthData, getStoredAuthData } from './src/utils/storage';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('OnBoarding');
  const [screenParams, setScreenParams] = useState(null);
  const [phone, setPhone] = useState('');
  const [otpData, setOtpData] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Check persisted session on app startup
  useEffect(() => {
    const checkPersistedAuth = async () => {
      try {
        const authData = await getStoredAuthData();
        if (authData?.isLoggedIn) {
          if (authData?.rider && authData?.rider?.isProfileComplete === false) {
            setCurrentScreen('ProfileSetup');
          } else {
            setCurrentScreen('Home');
          }
        }
      } catch (err) {
        console.error('Failed to load persisted auth state:', err);
      } finally {
        setIsInitializing(false);
      }
    };

    checkPersistedAuth();
  }, []);

  const navigation = {
    navigate: (screenName, params = null) => {
      if (screenName === 'TripBooking') {
        setScreenParams({ ...(params || {}), openTripBooking: true, _timestamp: Date.now() });
        setCurrentScreen('Home');
      } else {
        setScreenParams(params);
        setCurrentScreen(screenName);
      }
    },
    goBack: () => {
      setScreenParams(null);
      if (currentScreen === 'Rides' || currentScreen === 'Alerts') setCurrentScreen('Home');
      else if (currentScreen === 'EditProfile' || currentScreen === 'Setting') setCurrentScreen('Profile');
      else if (currentScreen === 'Profile') setCurrentScreen('Home');
      else if (currentScreen === 'Home') setCurrentScreen('Otp');
      else if (currentScreen === 'ProfileSetup') setCurrentScreen('Otp');
      else if (currentScreen === 'Otp') setCurrentScreen('Login');
      else if (currentScreen === 'Login') setCurrentScreen('OnBoarding');
    },
  };

  const isAuthScreen =
    currentScreen === 'OnBoarding' ||
    currentScreen === 'FirstOnBoarding' ||
    currentScreen === 'Login' ||
    currentScreen === 'Otp' ||
    currentScreen === 'ProfileSetup';

  const getActiveTab = (screen) => {
    switch (screen) {
      case 'Home':
        return 'HOME';
      case 'Rides':
        return 'RIDES';
      case 'Alerts':
        return 'ALERTS';
      case 'Profile':
      case 'EditProfile':
      case 'Setting':
        return 'PROFILE';
      default:
        return 'HOME';
    }
  };

  if (isInitializing) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.cream, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.statusBar} />
        <ActivityIndicator size="large" color={COLORS.yellow} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={currentScreen === 'OnBoarding' || currentScreen === 'FirstOnBoarding' ? '#F4F1E2' : COLORS.background}
      />

      {isAuthScreen ? (
        <>
          {(currentScreen === 'OnBoarding' || currentScreen === 'FirstOnBoarding') && (
            <OnBoarding
              navigation={navigation}
              onFinish={() => setCurrentScreen('Login')}
            />
          )}

          {currentScreen === 'Login' && (
            <Login
              onContinue={(params) => {
                const phoneNumber = typeof params === 'string' ? params : params?.phoneNumber;
                if (phoneNumber) setPhone(phoneNumber);
                if (typeof params === 'object') setOtpData(params);
                setCurrentScreen('Otp');
              }}
              navigation={navigation}
            />
          )}

          {currentScreen === 'Otp' && (
            <Otp
              phone={otpData?.phoneNumber || phone || '+919477172214'}
              expiresInSeconds={otpData?.expiresInSeconds ?? 300}
              resendAfterSeconds={otpData?.resendAfterSeconds ?? 30}
              onBack={() => setCurrentScreen('Login')}
              onEditPhone={() => setCurrentScreen('Login')}
              onVerify={(rider) => {
                if (rider && rider.isProfileComplete === false) {
                  setCurrentScreen('ProfileSetup');
                } else {
                  setCurrentScreen('Home');
                }
              }}
              navigation={navigation}
              route={{ params: otpData }}
            />
          )}

          {currentScreen === 'ProfileSetup' && (
            <ProfileSetup
              navigation={navigation}
              onComplete={() => setCurrentScreen('Home')}
            />
          )}
        </>
      ) : (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
          {/* ================= FIXED STATIC HEADER ================= */}
          {currentScreen === 'Home' && (
            <Header
              navigation={navigation}
              safeAreaTop
            />
          )}

          {/* ================= DYNAMIC MIDDLE SCREEN ================= */}
          <View style={{ flex: 1 }}>
            {currentScreen === 'Home' && (
              <Home
                navigation={navigation}
                route={{ params: screenParams }}
                initialParams={screenParams}
              />
            )}

            {currentScreen === 'Rides' && (
              <Rides navigation={navigation} />
            )}

            {currentScreen === 'Alerts' && (
              <Alerts navigation={navigation} />
            )}

            {currentScreen === 'Profile' && (
              <Profile navigation={navigation} />
            )}

            {currentScreen === 'EditProfile' && (
              <EditProfile
                navigation={navigation}
                onBack={() => setCurrentScreen('Profile')}
              />
            )}

            {currentScreen === 'Setting' && (
              <Setting
                navigation={navigation}
                onBack={() => setCurrentScreen('Profile')}
                onLogout={async () => {
                  await storage.clearAuth();
                  setOtpData(null);
                  setCurrentScreen('Login');
                }}
                showFooter={false}
              />
            )}
          </View>

          {/* ================= FIXED STATIC FOOTER ================= */}
          <Footer
            activeTab={getActiveTab(currentScreen)}
            onTabPress={(tab) => {
              setScreenParams(null);
              if (tab === 'HOME' || tab === 'BOOK') {
                setCurrentScreen('Home');
              } else if (tab === 'RIDES') {
                setCurrentScreen('Rides');
              } else if (tab === 'ALERTS') {
                setCurrentScreen('Alerts');
              } else if (tab === 'PROFILE') {
                setCurrentScreen('Profile');
              }
            }}
            navigation={navigation}
            isAbsolute={false}
          />
        </View>
      )}
    </SafeAreaProvider>
  );
};

export default App;
