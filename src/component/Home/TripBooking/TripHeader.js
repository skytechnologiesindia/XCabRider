import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

const TripHeader = ({ title = 'Your Trip', onClose }) => {
    return (
        <View
            style={[
                styles.pdh20,
                styles.mt4,
                styles.mb16,
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                },
            ]}
        >
            <Text
                style={[
                    styles.ts24,
                    {
                        fontWeight: '800',
                        color: COLORS.textDark,
                        letterSpacing: -0.4,
                    },
                ]}
            >
                {title}
            </Text>
            <TouchableOpacity
                style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    backgroundColor: COLORS.closeBtnBg,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                activeOpacity={0.7}
                onPress={onClose}
            >
                <Text
                    style={[
                        styles.ts15,
                        {
                            fontWeight: '700',
                            color: COLORS.closeIcon,
                            marginTop: -1,
                        },
                    ]}
                >
                    ✕
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default TripHeader;
