import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';
import {
  UserIcon,
  LocationPinIcon,
  ReceiptIcon,
  EmergencyIcon,
  HelpIcon,
  SettingsIcon,
} from './Icons';

export const DEFAULT_MENU_ITEMS = [
  {
    id: 'personal_details',
    title: 'Personal details',
    subtitle: 'Personal details',
    icon: (color) => <UserIcon size={18} color={color} />,
  },
  {
    id: 'saved_places',
    title: 'Saved places',
    subtitle: 'Saved places',
    icon: (color) => <LocationPinIcon size={18} color={color} />,
  },
  {
    id: 'receipts_invoices',
    title: 'Receipts & invoices',
    subtitle: 'Receipts & invoices',
    icon: (color) => <ReceiptIcon size={18} color={color} />,
  },
  {
    id: 'emergency_contacts',
    title: 'Emergency contacts',
    subtitle: 'Emergency contacts',
    icon: (color) => <EmergencyIcon size={18} color={color} />,
  },
  {
    id: 'help_safety',
    title: 'Help & safety',
    subtitle: 'Help & safety',
    icon: (color) => <HelpIcon size={18} color={color} />,
  },
  {
    id: 'settings',
    title: 'Settings',
    subtitle: 'Settings',
    icon: (color) => <SettingsIcon size={18} color={color} />,
  },
];

/**
 * ProfileMenuList component
 * Displays list of profile navigation items (Personal Details, Saved Places, etc.)
 */
const ProfileMenuList = ({
  items = DEFAULT_MENU_ITEMS,
  onItemPress,
  containerStyle,
}) => {
  return (
    <View
      style={[
        styles.mh20,
        {
          backgroundColor: COLORS.cardBg,
          borderRadius: 18,
          borderWidth: 1.2,
          borderColor: COLORS.border,
          overflow: 'hidden',
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
          elevation: 2,
        },
        containerStyle,
      ]}
    >
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pdh16,
              styles.pdv12,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
            onPress={() => onItemPress && onItemPress(item)}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}
            >
              {/* Icon box */}
              <View
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
              >
                {item.icon(COLORS.textDark)}
              </View>

              {/* Title & Subtitle */}
              <View style={styles.ml12}>
                <Text
                  style={[
                    styles.ts15,
                    {
                      fontWeight: '700',
                      color: COLORS.textDark,
                    },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.ts11,
                    {
                      color: COLORS.textMuted,
                      marginTop: 2,
                    },
                  ]}
                >
                  {item.subtitle}
                </Text>
              </View>
            </View>

            {/* Right Arrow */}
            <Text
              style={[
                styles.ts18,
                {
                  color: COLORS.textMuted,
                  fontWeight: '600',
                },
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>

          {/* Divider between rows */}
          {index < items.length - 1 && (
            <View
              style={[
                styles.mh16,
                {
                  height: 1,
                  backgroundColor: COLORS.divider,
                },
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

export { ProfileMenuList };
export default ProfileMenuList;
