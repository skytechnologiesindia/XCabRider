import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import COLORS from './src/assets/colors';
import Header from './src/component/Header/Header';
import Footer from './src/component/Footer/Footer';
import OnBoarding from './src/screens/onboarding/OnBoarding';
import Login from './src/screens/auth/Login';
import Otp from './src/screens/auth/Otp';
import Home from './src/screens/home/Home';
import Rides from './src/screens/rides/Rides';
import Alerts from './src/screens/alert/Alerts';
import Profile from './src/screens/profile/Profile';
import EditProfile from './src/component/Profile/EditProfile/EditProfile';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('OnBoarding');
  const [screenParams, setScreenParams] = useState(null);
  const [phone, setPhone] = useState('');

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
      else if (currentScreen === 'EditProfile') setCurrentScreen('Profile');
      else if (currentScreen === 'Profile') setCurrentScreen('Home');
      else if (currentScreen === 'Home') setCurrentScreen('Otp');
      else if (currentScreen === 'Otp') setCurrentScreen('Login');
      else if (currentScreen === 'Login') setCurrentScreen('OnBoarding');
    },
  };

  const isAuthScreen =
    currentScreen === 'OnBoarding' ||
    currentScreen === 'FirstOnBoarding' ||
    currentScreen === 'Login' ||
    currentScreen === 'Otp';

  const getActiveTab = screen => {
    switch (screen) {
      case 'Home':
        return 'HOME';
      case 'Rides':
        return 'RIDES';
      case 'Alerts':
        return 'ALERTS';
      case 'Profile':
      case 'EditProfile':
        return 'PROFILE';
      default:
        return 'HOME';
    }
  };

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
              onContinue={enteredPhone => {
                if (enteredPhone) setPhone(enteredPhone);
                setCurrentScreen('Otp');
              }}
              navigation={navigation}
            />
          )}

          {currentScreen === 'Otp' && (
            <Otp
              phone={phone || '9876504821'}
              onBack={() => setCurrentScreen('Login')}
              onEditPhone={() => setCurrentScreen('Login')}
              onVerify={() => setCurrentScreen('Home')}
              navigation={navigation}
            />
          )}
        </>
      ) : (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
          {/* ================= FIXED STATIC HEADER ================= */}
          <Header
            navigation={navigation}
            safeAreaTop
          />

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
          </View>

          {/* ================= FIXED STATIC FOOTER ================= */}
          <Footer
            activeTab={getActiveTab(currentScreen)}
            onTabPress={tab => {
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
