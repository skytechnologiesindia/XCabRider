import React from 'react';
import { View, Text } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

import { ClockIcon as QuickClockIcon } from '../../../assets/icons/Icons';


const TripFeatures = () => {
    return (
        <View
            style={[
                styles.pdh20,
                styles.mt20,
                {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                },
            ]}
        >
            {/* Safe Rides */}
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        borderWidth: 1.2,
                        borderColor: COLORS.border,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.grey50,
                    }}
                >
                    <Text style={{ fontSize: 13 }}>🛡️</Text>
                </View>
                <View style={[styles.ml8, { flex: 1 }]}>
                    <Text style={[styles.ts11, { fontWeight: '700', color: COLORS.textDark }]}>
                        Safe Rides
                    </Text>
                    <Text
                        style={[styles.ts10, styles.mt4, { color: COLORS.textMuted }]}
                        numberOfLines={1}
                    >
                        Your safety first
                    </Text>
                </View>
            </View>

            {/* Quick Pickup */}
            <View
                style={[
                    styles.mh4,
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                    },
                ]}
            >
                <View
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        borderWidth: 1.2,
                        borderColor: COLORS.border,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.grey50,
                    }}
                >
                    <QuickClockIcon size={15} color={COLORS.textDark} />
                </View>
                <View style={[styles.ml8, { flex: 1 }]}>
                    <Text style={[styles.ts11, { fontWeight: '700', color: COLORS.textDark }]}>
                        Quick Pickup
                    </Text>
                    <Text
                        style={[styles.ts10, styles.mt4, { color: COLORS.textMuted }]}
                        numberOfLines={1}
                    >
                        Arrive on time
                    </Text>
                </View>
            </View>

            {/* Verified Drivers */}
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        borderWidth: 1.2,
                        borderColor: COLORS.border,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.grey50,
                    }}
                >
                    <Text style={{ fontSize: 13 }}>⭐</Text>
                </View>
                <View style={[styles.ml8, { flex: 1 }]}>
                    <Text style={[styles.ts11, { fontWeight: '700', color: COLORS.textDark }]}>
                        Verified Drivers
                    </Text>
                    <Text
                        style={[styles.ts10, styles.mt4, { color: COLORS.textMuted }]}
                        numberOfLines={1}
                    >
                        Trusted & verified
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default TripFeatures;
