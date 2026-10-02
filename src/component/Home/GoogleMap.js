import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import images from '../../assets/images';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';
import icons from '../../assets/icons';

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
    <View
      style={[
        styles.mh20,
        styles.mb20,
        {
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
        style,
      ]}
    >
      {/* Header inside Map Card */}
      <View
        style={[
          styles.pdh16,
          styles.pdv12,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: COLORS.background,
              borderWidth: 1,
              borderColor: COLORS.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image source={icons.gpsTarget} style={{ width: 17, height: 17, tintColor: COLORS.textDark }} resizeMode="contain" />
          </View>
          <View style={styles.ml12}>
            <Text
              style={[
                styles.ts14,
                {
                  fontWeight: '700',
                  color: COLORS.textDark,
                },
              ]}
            >
              {title}
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
              {subtitle}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.pdh12,
            {
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.promoBg,
              borderWidth: 1,
              borderColor: COLORS.promoBorder,
              paddingVertical: 6.5,
              borderRadius: 20,
            },
          ]}
          activeOpacity={0.7}
          onPress={handleUpdate}
        >
          <Image source={icons.refreshIcon} style={{ width: 12, height: 12, tintColor: COLORS.textDark }} resizeMode="contain" />
          <Text
            style={[
              styles.ts11,
              styles.ml4,
              {
                fontWeight: '700',
                color: COLORS.textDark,
              },
            ]}
          >
            Update location
          </Text>
        </TouchableOpacity>
      </View>

      {/* Map Preview Graphic */}
      <TouchableOpacity
        activeOpacity={onPressMap ? 0.85 : 1}
        onPress={onPressMap}
        disabled={!onPressMap}
        style={{
          width: '100%',
          height: 155,
          backgroundColor: COLORS.mapDarkBg,
          overflow: 'hidden',
        }}
      >
        <Image
          source={images.mapPreview}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default GoogleMap;
