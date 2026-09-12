import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './src/screens/auth/Login';
import Otp from './src/screens/auth/Otp';
import Home from './src/screens/home/Home';
import Notification from './src/screens/notification/Notification';
import Profile from './src/screens/profile/Profile';
import EditProfile from './src/component/Profile/EditProfile/EditProfile';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('EditProfile');
  const [phone, setPhone] = useState('');

  const navigation = {
    navigate: screenName => setCurrentScreen(screenName),
    goBack: () => {
      if (currentScreen === 'Notification') setCurrentScreen('Home');
      else if (currentScreen === 'EditProfile') setCurrentScreen('Profile');
      else if (currentScreen === 'Profile') setCurrentScreen('Home');
      else if (currentScreen === 'Home') setCurrentScreen('Otp');
      else if (currentScreen === 'Otp') setCurrentScreen('Login');
    },
  };

  return (
    <SafeAreaProvider>
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

      {currentScreen === 'Home' && (
        <Home
          navigation={navigation}
        />
      )}

      {currentScreen === 'Notification' && (
        <Notification
          navigation={navigation}
        />
      )}

      {currentScreen === 'Profile' && (
        <Profile
          navigation={navigation}
        />
      )}

      {currentScreen === 'EditProfile' && (
        <EditProfile
          navigation={navigation}
          onBack={() => setCurrentScreen('Profile')}
        />
      )}

    </SafeAreaProvider>
  );
};

export default App;
