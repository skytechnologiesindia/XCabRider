import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../assets/images';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_TABLET = SCREEN_WIDTH >= 600;

const ThirdOnBoarding = ({ onNext, navigation }) => {
    const handleNext = () => {
        if (onNext) {
            onNext();
        } else if (navigation?.navigate) {
            navigation.navigate('Login');
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.onboardingBg,
            }}
        >
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.onboardingBg} />

            <ScrollView
                contentContainerStyle={[
                    styles.pdh24,
                    styles.pdb32,
                    {
                        flexGrow: 1,
                        justifyContent: 'space-between',
                    },
                ]}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                {/* Top Header: Brand Logo */}
                <View
                    style={[
                        styles.pdt12,
                        styles.pdb4,
                        {
                            alignItems: 'flex-start',
                        },
                    ]}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Stylized 'X' */}
                        <View
                            style={{
                                width: 22,
                                height: 24,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 1,
                            }}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    width: 6,
                                    height: 24,
                                    borderRadius: 2,
                                    backgroundColor: COLORS.onboardingDark,
                                    transform: [{ rotate: '-35deg' }],
                                }}
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    width: 6,
                                    height: 24,
                                    borderRadius: 2,
                                    backgroundColor: COLORS.onboardingYellow,
                                    transform: [{ rotate: '35deg' }],
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: '900',
                                color: COLORS.onboardingDark,
                                letterSpacing: 0.5,
                                marginLeft: 2,
                                includeFontPadding: false,
                            }}
                        >
                            CAB
                        </Text>
                    </View>
                </View>

                {/* Professional Illustration Section */}
                <View
                    style={[
                        styles.mv12,
                        {
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}
                >
                    <Image
                        source={images.onboardingSafeRides}
                        style={{
                            width: '100%',
                            maxWidth: IS_TABLET ? 420 : 360,
                            height: Math.min(275, SCREEN_WIDTH * 0.74),
                        }}
                        resizeMode="contain"
                    />
                </View>

                {/* Text Content Section */}
                <View style={[styles.pdt8, styles.pdb20]}>
                    <Text
                        style={{
                            fontSize: 34,
                            fontWeight: '800',
                            color: COLORS.onboardingDark,
                            lineHeight: 41,
                            letterSpacing: -0.5,
                        }}
                    >
                        Safe rides,{'\n'}every time.
                    </Text>
                    <Text
                        style={[
                            styles.mt8,
                            {
                                fontSize: 16,
                                fontWeight: '400',
                                color: COLORS.onboardingSubtext,
                                lineHeight: 24,
                            },
                        ]}
                    >
                        Ride with verified drivers{'\n'}and stay connected{'\n'}throughout your trip.
                    </Text>
                </View>

                {/* Bottom Section: Dots & Button */}
                <View
                    style={[
                        styles.pdt12,
                        styles.pdb8,
                        {
                            width: '100%',
                            maxWidth: IS_TABLET ? 420 : undefined,
                            alignSelf: 'center',
                        },
                    ]}
                >
                    {/* Pagination Dots (3 dots, 2nd active) */}
                    <View
                        style={[
                            styles.mb28,
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                        ]}
                    >
                        <View
                            style={[
                                styles.mh4,
                                {
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: COLORS.onboardingDot,
                                },
                            ]}
                        />
                        <View
                            style={[
                                styles.mh4,
                                {
                                    width: 9,
                                    height: 9,
                                    borderRadius: 4.5,
                                    backgroundColor: COLORS.onboardingYellow,
                                },
                            ]}
                        />
                        <View
                            style={[
                                styles.mh4,
                                {
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: COLORS.onboardingDot,
                                },
                            ]}
                        />
                    </View>

                    {/* Get Started Button */}
                    <TouchableOpacity
                        activeOpacity={0.88}
                        style={{
                            backgroundColor: COLORS.onboardingYellow,
                            borderRadius: 18,
                            paddingVertical: 17,
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowColor: COLORS.yellowAccent,
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 8,
                            elevation: 3,
                        }}
                        onPress={handleNext}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16.5,
                                    fontWeight: '700',
                                    color: COLORS.onboardingDark,
                                }}
                            >
                                Get Started
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '800',
                                    color: COLORS.onboardingDark,
                                }}
                            >
                                {' '}→
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ThirdOnBoarding;
