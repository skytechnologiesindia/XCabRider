import React from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import Footer from '../../Footer/Footer';

// Modular Setting Components
import SettingsHeader from './SettingsHeader';
import Personal from './Personal';
import Nofication from './Nofication';
import LocationService from './LocationService';
import Language from './Language/Language';
import HelpSupport from './HelpSupport/HelpSupport';
import ContactUs from './ContactUs/ContactUs';
import About from './About/About';

const Setting = ({
  navigation,
  onBack,
  onLogout,
  showFooter = true,
}) => {
  const insets = useSafeAreaInsets();
  const topInset = Math.max(
    insets?.top || 0,
    Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
    12,
  );

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.goBack) {
      navigation.goBack();
    } else if (navigation?.navigate) {
      navigation.navigate('Profile');
    }
  };

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: COLORS.background,
          paddingTop: topInset,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* ================= SCROLLABLE CONTENT ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.pdh20,
          styles.pdt8,
          styles.pdb28,
        ]}
      >
        {/* Settings Header (Back Button + Page Title) */}
        <SettingsHeader onBack={handleBack} />

        {/* ================= SETTINGS MENU LIST (LINE BY LINE) ================= */}
        <View
          style={[
            styles.pdh16,
            styles.mb20,
            {
              backgroundColor: COLORS.cardBg,
              borderRadius: 18,
              borderWidth: 1.2,
              borderColor: COLORS.border,
              shadowColor: COLORS.black,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.03,
              shadowRadius: 4,
              elevation: 1,
            },
          ]}
        >
          <Personal
            onPress={() => navigation?.navigate?.('EditProfile')}
            showDivider={true}
          />
          <Nofication
            onPress={() => navigation?.navigate?.('Alerts')}
            showDivider={true}
          />
          <LocationService
            onPress={() => {}}
            showDivider={true}
          />
          <Language
            showDivider={true}
          />
          <HelpSupport
            showDivider={true}
          />
          <ContactUs
            showDivider={true}
          />
          <About
            showDivider={false}
          />
        </View>
      </ScrollView>

      {/* ================= FOOTER COMPONENT ================= */}
      {showFooter && (
        <Footer
          activeTab="PROFILE"
          navigation={navigation}
          isAbsolute={false}
        />
      )}
    </View>
  );
};

export default Setting;
