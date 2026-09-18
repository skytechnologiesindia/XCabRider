import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import { DestinationPin, PencilIcon as EditPencilIcon, PickupIndicator } from '../../../assets/icons/Icons';



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
