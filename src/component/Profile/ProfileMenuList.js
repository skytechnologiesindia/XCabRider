import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
    <View style={[styles.mh20, listStyles.card, containerStyle]}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.pdh16, styles.pdv12, listStyles.row]}
            onPress={() => onItemPress && onItemPress(item)}
          >
            <View style={listStyles.itemLeft}>
              {/* Icon box */}
              <View style={listStyles.iconBox}>
                {item.icon(COLORS.textDark)}
              </View>

              {/* Title & Subtitle */}
              <View style={styles.ml12}>
                <Text style={listStyles.titleText}>
                  {item.title}
                </Text>
                <Text style={listStyles.subtitleText}>
                  {item.subtitle}
                </Text>
              </View>
            </View>

            {/* Right Arrow */}
            <Text style={listStyles.arrowText}>
              ›
            </Text>
          </TouchableOpacity>

          {/* Divider between rows */}
          {index < items.length - 1 && (
            <View style={[styles.mh16, listStyles.divider]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const listStyles = StyleSheet.create({
  card: {
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FAF6ED',
    borderWidth: 1,
    borderColor: '#EFEAE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  subtitleText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  arrowText: {
    fontSize: 18,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
});

export { ProfileMenuList };
export default ProfileMenuList;
