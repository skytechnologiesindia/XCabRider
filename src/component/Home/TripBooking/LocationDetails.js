import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

// Destination pin component
const DestinationPin = ({ size = 18 }) => (
    <View style={{ width: size, height: size * 1.35, alignItems: 'center', justifyContent: 'flex-start' }}>
        <View
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: COLORS.redPin,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: COLORS.redPin,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.35,
                shadowRadius: 3,
                elevation: 3,
            }}
        >
            <View
                style={{
                    width: size * 0.36,
                    height: size * 0.36,
                    borderRadius: (size * 0.36) / 2,
                    backgroundColor: COLORS.white,
                }}
            />
        </View>
        <View
            style={{
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: size * 0.28,
                borderRightWidth: size * 0.28,
                borderTopWidth: size * 0.38,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderTopColor: COLORS.redPin,
                marginTop: -2,
            }}
        />
    </View>
);

// Pickup GPS yellow circle dot
const PickupIndicator = ({ size = 22 }) => (
    <View
        style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: COLORS.yellow,
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <View
            style={{
                width: size * 0.38,
                height: size * 0.38,
                borderRadius: (size * 0.38) / 2,
                backgroundColor: COLORS.textDark,
            }}
        />
    </View>
);

// Edit pencil icon
const EditPencilIcon = ({ size = 14, color = COLORS.textDark }) => (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[styles.ts14, { color: color, transform: [{ rotate: '45deg' }] }]}>✎</Text>
    </View>
);

const LocationDetails = ({
    pickup = 'Ranchi Railway Station',
    pickupSubtitle = 'Station Rd, Ranchi, Jharkhand 834001',
    destination = 'Lalpur Market',
    destinationSubtitle = 'Lalpur Chowk, Ranchi, Jharkhand 834001',
    onEditPickup,
    onEditDestination,
}) => {
    return (
        <View
            style={[
                styles.mh20,
                styles.pdh16,
                styles.pdv16,
                {
                    backgroundColor: COLORS.cardBg,
                    borderRadius: 18,
                    borderWidth: 1.2,
                    borderColor: COLORS.border,
                    shadowColor: COLORS.black,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.04,
                    shadowRadius: 6,
                    elevation: 2,
                    position: 'relative',
                },
            ]}
        >
            {/* Connecting vertical dashed line */}
            <View
                style={{
                    position: 'absolute',
                    left: 26,
                    top: 36,
                    bottom: 36,
                    width: 2,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1,
                }}
            >
                <View
                    style={{
                        width: 1.8,
                        height: 4,
                        backgroundColor: COLORS.borderDash,
                        borderRadius: 1,
                    }}
                />
                <View
                    style={{
                        width: 1.8,
                        height: 4,
                        backgroundColor: COLORS.borderDash,
                        borderRadius: 1,
                    }}
                />
                <View
                    style={{
                        width: 1.8,
                        height: 4,
                        backgroundColor: COLORS.borderDash,
                        borderRadius: 1,
                    }}
                />
            </View>

            {/* Row 1: Pickup Location */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <PickupIndicator size={22} />
                <View style={[styles.ml12, styles.pdr8, { flex: 1 }]}>
                    <Text style={[styles.ts12, { color: COLORS.textMuted, fontWeight: '500' }]}>
                        Pickup location
                    </Text>
                    <Text
                        style={[
                            styles.ts15,
                            styles.mt4,
                            {
                                fontWeight: '700',
                                color: COLORS.textDark,
                            },
                        ]}
                        numberOfLines={1}
                    >
                        {pickup}
                    </Text>
                    <Text
                        style={[
                            styles.ts12,
                            styles.mt4,
                            {
                                color: COLORS.textMuted,
                            },
                        ]}
                        numberOfLines={1}
                    >
                        {pickupSubtitle}
                    </Text>
                </View>

                {/* Edit Button */}
                <TouchableOpacity
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        borderWidth: 1.2,
                        borderColor: COLORS.border,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.white,
                    }}
                    activeOpacity={0.7}
                    onPress={onEditPickup}
                >
                    <EditPencilIcon size={13} color={COLORS.textDark} />
                </TouchableOpacity>
            </View>

            {/* Divider */}
            <View
                style={[
                    styles.mv12,
                    styles.ml36,
                    {
                        height: 1,
                        backgroundColor: COLORS.divider,
                    },
                ]}
            />

            {/* Row 2: Drop Location */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <DestinationPin size={18} />
                <View style={[styles.ml12, styles.pdr8, { flex: 1 }]}>
                    <Text style={[styles.ts12, { color: COLORS.textMuted, fontWeight: '500' }]}>
                        Drop location
                    </Text>
                    <Text
                        style={[
                            styles.ts15,
                            styles.mt4,
                            {
                                fontWeight: '700',
                                color: COLORS.textDark,
                            },
                        ]}
                        numberOfLines={1}
                    >
                        {destination}
                    </Text>
                    <Text
                        style={[
                            styles.ts12,
                            styles.mt4,
                            {
                                color: COLORS.textMuted,
                            },
                        ]}
                        numberOfLines={1}
                    >
                        {destinationSubtitle}
                    </Text>
                </View>

                {/* Edit Button */}
                <TouchableOpacity
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        borderWidth: 1.2,
                        borderColor: COLORS.border,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.white,
                    }}
                    activeOpacity={0.7}
                    onPress={onEditDestination}
                >
                    <EditPencilIcon size={13} color={COLORS.textDark} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LocationDetails;
