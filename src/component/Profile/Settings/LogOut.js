import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import COLORS from '../../../assets/colors';
import { LogoutIcon } from '../../../assets/icons';

/**
 * LogOut button component for Settings screen
 */
const LogOut = ({
    onPress,
    navigation,
    title = 'Log Out',
    showConfirm = true,
    style,
}) => {
    const handlePress = () => {
        const executeLogout = () => {
            if (onPress) {
                onPress();
            } else if (navigation?.navigate) {
                navigation.navigate('Login');
            }
        };

        if (showConfirm) {
            Alert.alert(
                'Log Out',
                'Are you sure you want to log out of your account?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Log Out',
                        style: 'destructive',
                        onPress: executeLogout,
                    },
                ]
            );
        } else {
            executeLogout();
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePress}
            style={[styles.button, style]}
        >
            <View style={styles.iconContainer}>
                <LogoutIcon size={18} color={COLORS.cancelRed || '#FF4D4D'} />
            </View>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.cardBg,
        borderRadius: 16,
        borderWidth: 1.2,
        borderColor: '#FCEBEB',
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginTop: 4,
        marginBottom: 24,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFF1F1',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.cancelRed || '#FF4D4D',
        letterSpacing: 0.2,
    },
});

export default LogOut;
