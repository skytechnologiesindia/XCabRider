import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import images from '../../assets/images';
import COLORS from '../../assets/colors';
import { GpsTargetIcon, RefreshIcon } from './Icons';

/**
 * GoogleMap component
 * Displays current user location header with update button and live map graphic
 */
const GoogleMap = ({
  title = 'Current location',
  subtitle = 'Detecting your location...',
  onUpdateLocation,
  onPressMap,
  style,
}) => {
  const handleUpdate = () => {
    if (onUpdateLocation) {
      onUpdateLocation();
    } else {
      console.log('Updating location...');
    }
  };

  return (
    <View style={[styles.card, style]}>
      {/* Header inside Map Card */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconCircle}>
            <GpsTargetIcon size={17} color={COLORS.textDark} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.updateButton}
          activeOpacity={0.7}
          onPress={handleUpdate}
        >
          <RefreshIcon size={12} color={COLORS.textDark} />
          <Text style={styles.updateText}>Update location</Text>
        </TouchableOpacity>
      </View>

      {/* Map Preview Graphic */}
      <TouchableOpacity
        activeOpacity={onPressMap ? 0.85 : 1}
        onPress={onPressMap}
        disabled={!onPressMap}
        style={styles.mapContainer}
      >
        <Image
          source={images.mapPreview}
          style={styles.mapImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 18,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 13.5,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.promoBg,
    borderWidth: 1,
    borderColor: COLORS.promoBorder,
    paddingHorizontal: 10,
    paddingVertical: 6.5,
    borderRadius: 20,
  },
  updateText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDark,
    marginLeft: 5,
  },
  mapContainer: {
    width: '100%',
    height: 155,
    backgroundColor: COLORS.mapDarkBg,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});

export default GoogleMap;
