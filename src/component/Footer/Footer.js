import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';
import {
  CarNavIcon,
  CalendarRidesIcon,
  AlertsNavIcon,
  ProfileNavIcon,
} from '../Home/Icons';

const Footer = ({
  activeTab = 'HOME',
  onTabPress,
  navigation,
  isAbsolute = false,
  firstTabLabel,
  alertsBadge = 2,
  style,
}) => {
  const insets = useSafeAreaInsets();

  const handleTabPress = (tabName) => {
    if (onTabPress) {
      onTabPress(tabName);
      return;
    }
    if ((tabName === 'HOME' || tabName === 'BOOK') && navigation) {
      navigation.navigate('Home');
    } else if (tabName === 'RIDES' && navigation) {
      navigation.navigate('Rides');
    } else if (tabName === 'ALERTS' && navigation) {
      navigation.navigate('Alerts');
    } else if (tabName === 'PROFILE' && navigation) {
      navigation.navigate('Profile');
    }
  };

  const label1 = firstTabLabel || (activeTab === 'BOOK' ? 'BOOK' : 'HOME');
  const isTab1Active = activeTab === 'HOME' || activeTab === 'BOOK';
  const isTab2Active = activeTab === 'RIDES';
  const isTab3Active = activeTab === 'ALERTS';
  const isTab4Active = activeTab === 'PROFILE';

  return (
    <View
      style={[
        styles.pdt12,
        {
          backgroundColor: COLORS.darkNav,
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
          paddingBottom: Math.max(insets?.bottom || 0, 14),
        },
        isAbsolute
          ? {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }
          : null,
        style,
      ]}
    >
      {/* Tab 1: HOME / BOOK */}
      <TouchableOpacity
        style={[
          styles.pdv4,
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
        activeOpacity={0.8}
        onPress={() => handleTabPress(label1)}
      >
        <View
          style={
            isTab1Active
              ? [
                  styles.pdh12,
                  styles.pdv4,
                  {
                    borderRadius: 12,
                  },
                ]
              : null
          }
        >
          <CarNavIcon
            size={23}
            color={isTab1Active ? COLORS.yellow : COLORS.navMuted}
          />
        </View>
        <Text
          style={[
            styles.mt4,
            {
              fontSize: 9.5,
              fontWeight: isTab1Active ? '800' : '700',
              color: isTab1Active ? COLORS.yellow : COLORS.navMuted,
              letterSpacing: 0.5,
            },
          ]}
        >
          {label1}
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View
        style={{
          width: 1,
          height: 22,
          backgroundColor: COLORS.navDivider,
        }}
      />

      {/* Tab 2: RIDES */}
      <TouchableOpacity
        style={[
          styles.pdv4,
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
        activeOpacity={0.8}
        onPress={() => handleTabPress('RIDES')}
      >
        <CalendarRidesIcon
          size={21}
          color={isTab2Active ? COLORS.yellow : COLORS.navMuted}
        />
        <Text
          style={[
            styles.mt4,
            {
              fontSize: 9.5,
              fontWeight: isTab2Active ? '800' : '700',
              color: isTab2Active ? COLORS.yellow : COLORS.navMuted,
              letterSpacing: 0.5,
            },
          ]}
        >
          RIDES
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View
        style={{
          width: 1,
          height: 22,
          backgroundColor: COLORS.navDivider,
        }}
      />

      {/* Tab 3: ALERTS */}
      <TouchableOpacity
        style={[
          styles.pdv4,
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
        activeOpacity={0.8}
        onPress={() => handleTabPress('ALERTS')}
      >
        <AlertsNavIcon
          size={21}
          color={isTab3Active ? COLORS.yellow : COLORS.navMuted}
          badge={alertsBadge}
        />
        <Text
          style={[
            styles.mt4,
            {
              fontSize: 9.5,
              fontWeight: isTab3Active ? '800' : '700',
              color: isTab3Active ? COLORS.yellow : COLORS.navMuted,
              letterSpacing: 0.5,
            },
          ]}
        >
          ALERTS
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View
        style={{
          width: 1,
          height: 22,
          backgroundColor: COLORS.navDivider,
        }}
      />

      {/* Tab 4: PROFILE */}
      <TouchableOpacity
        style={[
          styles.pdv4,
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
        activeOpacity={0.8}
        onPress={() => handleTabPress('PROFILE')}
      >
        <ProfileNavIcon
          size={21}
          color={isTab4Active ? COLORS.yellow : COLORS.navMuted}
        />
        <Text
          style={[
            styles.mt4,
            {
              fontSize: 9.5,
              fontWeight: isTab4Active ? '800' : '700',
              color: isTab4Active ? COLORS.yellow : COLORS.navMuted,
              letterSpacing: 0.5,
            },
          ]}
        >
          PROFILE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
