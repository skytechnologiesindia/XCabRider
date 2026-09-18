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
import { ArrowRightIcon } from '../../assets/icons/Icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_TABLET = SCREEN_WIDTH >= 600;

const FourthOnBoarding = ({ onNext, navigation }) => {
    const handleGetStarted = () => {
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
                {/* Top Spacer */}
                <View style={{ height: 16 }} />

                {/* Illustration Section */}
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
                        source={images.onboardingLiveTracking}
                        style={{
                            width: '100%',
                            maxWidth: IS_TABLET ? 420 : 360,
                            height: Math.min(280, SCREEN_WIDTH * 0.75),
                        }}
                        resizeMode="contain"
                    />
                </View>

                {/* Text Content Section */}
                <View style={[styles.pdt8, styles.pdb16]}>
                    <Text
                        style={{
                            fontSize: 34,
                            fontWeight: '800',
                            color: COLORS.onboardingDark,
                            lineHeight: 41,
                            letterSpacing: -0.5,
                        }}
                    >
                        Know where{'\n'}your ride is.
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
                        Track your driver in real time{'\n'}and reach your destination{'\n'}with confidence.
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
                    {/* Pagination Dots (3 dots, 3rd active) */}
                    <View
                        style={[
                            styles.mb24,
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
                        onPress={handleGetStarted}
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
                            <ArrowRightIcon size={16} color={COLORS.onboardingDark} style={{ marginLeft: 6 }} />

                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FourthOnBoarding;
