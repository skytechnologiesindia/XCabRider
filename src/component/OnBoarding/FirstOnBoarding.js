import React, { useEffect, useRef, useCallback } from 'react';
import {
    View,
    Image,
    StatusBar,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../assets/images';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FirstOnBoarding = ({ onNext, navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.92)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;
    const hasNavigated = useRef(false);

    const handleFinish = useCallback(() => {
        if (hasNavigated.current) return;
        hasNavigated.current = true;
        if (onNext) {
            onNext();
        } else if (navigation?.navigate) {
            navigation.navigate('Login');
        }
    }, [navigation, onNext]);

    useEffect(() => {
        // 1. Smooth Fade-in and gentle Scale-up for the big XCab logo
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 7,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();

        // 2. Smooth animated progress bar (0% -> 100%)
        const animation = Animated.timing(progressAnim, {
            toValue: 1,
            duration: 2200,
            useNativeDriver: false,
        });

        animation.start(({ finished }) => {
            if (finished) {
                setTimeout(() => {
                    handleFinish();
                }, 150);
            }
        });

        return () => {
            animation.stop();
        };
    }, [fadeAnim, handleFinish, progressAnim, scaleAnim]);

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const logoWidth = Math.min(SCREEN_WIDTH * 0.58, 225);
    const logoHeight = logoWidth * (342 / 728);

    return (
        <TouchableWithoutFeedback onPress={handleFinish}>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: COLORS.onboardingSplashBg,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <StatusBar barStyle="dark-content" backgroundColor={COLORS.onboardingSplashBg} />

                {/* Top Spacer to balance layout */}
                <View style={{ height: 60 }} />

                {/* Center Content: Exact XCab Big Brand Logo & Tagline */}
                <Animated.View
                    style={[
                        styles.pdh20,
                        {
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <Image
                        source={images.xcabLogo}
                        style={{
                            width: logoWidth,
                            height: logoHeight,
                        }}
                        resizeMode="contain"
                    />
                </Animated.View>

                {/* Bottom Progress Bar */}
                <View
                    style={[
                        styles.pdb64,
                        {
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                        },
                    ]}
                >
                    <View
                        style={{
                            width: Math.min(185, SCREEN_WIDTH * 0.48),
                            height: 4.5,
                            borderRadius: 2.25,
                            backgroundColor: COLORS.onboardingTrack,
                            overflow: 'hidden',
                        }}
                    >
                        <Animated.View
                            style={{
                                height: '100%',
                                backgroundColor: COLORS.yellow,
                                borderRadius: 2.25,
                                width: progressWidth,
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default FirstOnBoarding;
