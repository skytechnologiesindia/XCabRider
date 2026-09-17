import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../../assets/colors';
import { SearchIcon, GpsTargetIcon } from './Icons';

/**
 * SearchTop component
 * Displays the top search bar trigger to open location search
 */
const SearchTop = ({
  searchQuery = '',
  placeholder = 'Where are you going?',
  onPress,
  onGpsPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={styles.searchBar}
      >
        <SearchIcon size={19} color={COLORS.iconDark} />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.searchText,
              {
                color: searchQuery ? COLORS.textDark : COLORS.textMuted,
              },
            ]}
          >
            {searchQuery || placeholder}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.gpsButton}
          activeOpacity={0.7}
          onPress={onGpsPress || onPress}
        >
          <GpsTargetIcon size={18} color={COLORS.iconDark} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 15,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    height: 54,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  searchText: {
    fontSize: 15.5,
  },
  gpsButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.iconBg,
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { SearchTop };
export default SearchTop;
