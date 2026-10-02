import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

const BookRideButton = ({ vehicle, onPress }) => {
    if (!vehicle) return null;

    return (
        <TouchableOpacity
            style={[
                styles.mh20,
                styles.mt16,
                {
                    backgroundColor: COLORS.yellow,
                    borderRadius: 14,
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: COLORS.yellow,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 3,
                    position: 'relative',
                },
            ]}
            activeOpacity={0.85}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.ts16,
                    {
                        fontWeight: '800',
                        color: COLORS.textDark,
                        letterSpacing: -0.2,
                    },
                ]}
            >
                Book {vehicle.name} • ₹{vehicle.price}
            </Text>

            <Text
                style={[
                    styles.ts22,
                    {
                        position: 'absolute',
                        right: 18,
                        fontWeight: '800',
                        color: COLORS.textDark,
                        lineHeight: 22,
                    },
                ]}
            >
                ›
            </Text>
        </TouchableOpacity>
    );
};

export default BookRideButton;
