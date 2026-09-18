import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import { PersonIcon } from '../../../assets/icons/Icons';


const RideCard = ({ vehicle, isSelected, onSelect }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onSelect}
            style={[
                styles.mh4,
                styles.pdh8,
                styles.pdv8,
                {
                    flex: 1,
                    borderRadius: 14,
                    alignItems: 'center',
                    position: 'relative',
                    shadowColor: COLORS.black,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.03,
                    shadowRadius: 4,
                    elevation: 1,
                    backgroundColor: isSelected ? COLORS.yellowLight : COLORS.cardBg,
                    borderWidth: isSelected ? 1.8 : 1.2,
                    borderColor: isSelected ? COLORS.yellow : COLORS.border,
                },
            ]}
        >
            {/* Popular Badge */}
            {vehicle.isPopular && (
                <View
                    style={{
                        position: 'absolute',
                        top: -1,
                        right: -1,
                        backgroundColor: COLORS.yellow,
                        borderTopRightRadius: 13,
                        borderBottomLeftRadius: 8,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                    }}
                >
                    <Text
                        style={[
                            styles.ts10,
                            {
                                fontWeight: '800',
                                color: COLORS.textDark,
                                letterSpacing: 0.2,
                                fontSize: 8,
                            },
                        ]}
                    >
                        POPULAR
                    </Text>
                </View>
            )}

            {/* Car Image */}
            <View
                style={[
                    styles.mt4,
                    styles.mb4,
                    {
                        height: 38,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                ]}
            >
                <Image
                    source={vehicle.image}
                    style={{ width: '90%', height: 34 }}
                    resizeMode="contain"
                />
            </View>

            {/* Car Name & Capacity */}
            <View
                style={[
                    styles.mb4,
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                ]}
            >
                <Text
                    style={[
                        styles.ts12,
                        {
                            fontWeight: '800',
                            color: COLORS.textDark,
                            letterSpacing: 0.3,
                        },
                    ]}
                >
                    {vehicle.name}
                </Text>
                <Text style={[styles.ts10, styles.mh4, { color: COLORS.textMuted }]}>•</Text>
                <PersonIcon size={10} color={COLORS.mediumGrey} />
                <Text
                    style={[
                        styles.ts11,
                        styles.ml4,
                        {
                            fontWeight: '700',
                            color: COLORS.mediumGrey,
                        },
                    ]}
                >
                    {vehicle.capacity}
                </Text>
            </View>

            {/* Divider */}
            <View
                style={[
                    styles.mb4,
                    {
                        height: 1,
                        width: '90%',
                        backgroundColor: isSelected ? COLORS.dividerYellow : COLORS.divider,
                    },
                ]}
            />

            {/* Price */}
            <Text
                style={[
                    styles.ts15,
                    {
                        fontWeight: '800',
                        color: COLORS.textDark,
                    },
                ]}
            >
                ₹{vehicle.price}
            </Text>

            {/* ETA */}
            <Text
                style={[
                    styles.ts10,
                    styles.mt4,
                    {
                        fontWeight: '700',
                        color: COLORS.mediumGrey,
                        letterSpacing: 0.3,
                    },
                ]}
            >
                {vehicle.eta}
            </Text>
        </TouchableOpacity>
    );
};

export default RideCard;
