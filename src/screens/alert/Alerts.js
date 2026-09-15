import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';

// Circular Back Arrow Icon
const BackArrowIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        position: 'absolute',
        width: size * 0.75,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        position: 'absolute',
        left: 2,
        width: size * 0.45,
        height: size * 0.45,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
      }}
    />
  </View>
);

// Mini Yellow Car Icon for Notification Badge
const CarBadgeIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size * 0.75, alignItems: 'center', justifyContent: 'center' }}>
    {/* Roof */}
    <View
      style={{
        width: size * 0.6,
        height: size * 0.32,
        backgroundColor: color,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
      }}
    />
    {/* Main Body */}
    <View
      style={{
        width: size,
        height: size * 0.36,
        backgroundColor: color,
        borderRadius: 2.5,
        marginTop: 1,
      }}
    />
    {/* Wheels */}
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: size * 0.75,
        marginTop: -1,
      }}
    >
      <View
        style={{
          width: 3.5,
          height: 2.5,
          borderRadius: 1.2,
          backgroundColor: COLORS.textDark,
        }}
      />
      <View
        style={{
          width: 3.5,
          height: 2.5,
          borderRadius: 1.2,
          backgroundColor: COLORS.textDark,
        }}
      />
    </View>
  </View>
);

const Notification = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    } else if (navigation?.navigate) {
      navigation.navigate('Home');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: insets.top,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Top Header */}
      <View
        style={[
          styles.pdh20,
          styles.pdv12,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}
      >
        {/* Circular Back Button */}
        <TouchableOpacity
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: COLORS.white,
            borderWidth: 1.2,
            borderColor: COLORS.border,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 3,
            elevation: 1,
          }}
          activeOpacity={0.7}
          onPress={handleBack}
        >
          <BackArrowIcon size={18} color={COLORS.textDark} />
        </TouchableOpacity>

        {/* Title */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            color: COLORS.textDark,
            letterSpacing: -0.3,
          }}
        >
          Notifications
        </Text>

        {/* Invisible Spacer for perfect centering */}
        <View style={{ width: 42, height: 42 }} />
      </View>

      {/* Single Dummy Notification Card */}
      <View
        style={[
          styles.mh20,
          styles.mt16,
          styles.pdh16,
          styles.pdv16,
          {
            backgroundColor: COLORS.white,
            borderRadius: 20,
            borderWidth: 1.2,
            borderColor: COLORS.border,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 6,
            elevation: 2,
          },
        ]}
      >
        {/* Top Row: Icon + Title + Status Dot & Time */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          {/* Yellow Badge Icon */}
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: COLORS.yellow,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CarBadgeIcon size={18} color={COLORS.textDark} />
          </View>

          {/* Title */}
          <View style={[styles.ml12, { flex: 1 }]}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '800',
                color: COLORS.textDark,
                lineHeight: 22,
              }}
            >
              Driver Raj Kumar is arriving
            </Text>
          </View>

          {/* Timestamp & Unread Dot */}
          <View
            style={[
              styles.ml8,
              {
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 3,
              },
            ]}
          >
            <View
              style={{
                width: 7,
                height: 7,
                borderRadius: 3.5,
                backgroundColor: COLORS.yellow,
                marginRight: 6,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: COLORS.mediumGrey,
              }}
            >
              2m ago
            </Text>
          </View>
        </View>

        {/* Subtitle / Details */}
        <Text
          style={[
            styles.mt8,
            {
              fontSize: 13,
              fontWeight: '500',
              color: COLORS.textSecondary,
              lineHeight: 18,
              paddingLeft: 50,
            },
          ]}
        >
          White Swift Dzire • JH 01 AB 4821 is 2 mins away
        </Text>
      </View>
    </View>
  );
};

export default Notification;
