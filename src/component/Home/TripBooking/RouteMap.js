import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import images from '../../../assets/images';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

// Crosshair target icon
import { GpsTargetIcon as CrosshairIcon } from '../../../assets/icons/Icons';


const RouteMap = ({ image, onCenterPress }) => {
    return (
        <View
            style={[
                styles.mh20,
                styles.mt16,
                {
                    height: 160,
                    borderRadius: 18,
                    borderWidth: 1.2,
                    borderColor: COLORS.border,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: COLORS.mapBg,
                },
            ]}
        >
            <Image
                source={image || images.routeMap}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
            />

            {/* Current location / crosshair button */}
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: COLORS.white,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: COLORS.black,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.12,
                    shadowRadius: 3,
                    elevation: 2,
                }}
                activeOpacity={0.8}
                onPress={onCenterPress}
            >
                <CrosshairIcon size={16} color={COLORS.textDark} />
            </TouchableOpacity>
        </View>
    );
};

export default RouteMap;
