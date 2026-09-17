import React from 'react';
import { View, Text } from 'react-native';
import COLORS from '../../assets/colors';

// Vector Icon: Personal Details (User)
export const UserIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.44,
        height: size * 0.44,
        borderRadius: (size * 0.44) / 2,
        borderWidth: 1.6,
        borderColor: color,
      }}
    />
    <View
      style={{
        width: size * 0.78,
        height: size * 0.38,
        borderTopLeftRadius: size * 0.38,
        borderTopRightRadius: size * 0.38,
        borderWidth: 1.6,
        borderColor: color,
        borderBottomWidth: 0,
        marginTop: 1.5,
      }}
    />
  </View>
);

// Vector Icon: Location Pin
export const LocationPinIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.65,
        height: size * 0.65,
        borderRadius: (size * 0.65) / 2,
        borderWidth: 1.6,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.22,
          height: size * 0.22,
          borderRadius: (size * 0.22) / 2,
          backgroundColor: color,
        }}
      />
    </View>
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderTopWidth: 4,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
        marginTop: -0.5,
      }}
    />
  </View>
);

// Vector Icon: Receipts & Invoices
export const ReceiptIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.7,
      height: size * 0.85,
      borderWidth: 1.6,
      borderColor: color,
      borderRadius: 3,
      paddingHorizontal: 2.5,
      paddingVertical: 3,
      justifyContent: 'space-between',
    }}
  >
    <View style={{ width: '80%', height: 1.4, backgroundColor: color, borderRadius: 0.7 }} />
    <View style={{ width: '60%', height: 1.4, backgroundColor: color, borderRadius: 0.7 }} />
    <View style={{ width: '70%', height: 1.4, backgroundColor: color, borderRadius: 0.7 }} />
  </View>
);

// Vector Icon: Emergency Contacts
export const EmergencyIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.75,
        height: size * 0.65,
        borderWidth: 1.6,
        borderColor: color,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: size * 0.35, height: 1.4, backgroundColor: color, borderRadius: 0.7 }} />
    </View>
  </View>
);

// Vector Icon: Help & Safety (Info / Shield)
export const HelpIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.8,
      height: size * 0.8,
      borderRadius: (size * 0.8) / 2,
      borderWidth: 1.6,
      borderColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ fontSize: 11, fontWeight: '800', color: color, marginTop: -1 }}>!</Text>
  </View>
);

// Vector Icon: Settings (Gear)
export const SettingsIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size * 0.8,
      height: size * 0.8,
      borderRadius: (size * 0.8) / 2,
      borderWidth: 1.8,
      borderColor: color,
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View
      style={{
        width: size * 0.28,
        height: size * 0.28,
        borderRadius: (size * 0.28) / 2,
        backgroundColor: color,
      }}
    />
  </View>
);
