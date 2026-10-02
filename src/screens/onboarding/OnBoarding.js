import React, { useState } from 'react';
import { View } from 'react-native';
import COLORS from '../../assets/colors';
import FirstOnBoarding from '../../component/OnBoarding/FirstOnBoarding';
import SecondOnBoarding from '../../component/OnBoarding/SecondOnBoarding';
import ThirdOnBoarding from '../../component/OnBoarding/ThirdOnBoarding';
import FourthOnBoarding from '../../component/OnBoarding/FourthOnBoarding';

const OnBoarding = ({ navigation, onFinish }) => {
    const [step, setStep] = useState(1);

    const handleFirstComplete = () => {
        setStep(2);
    };

    const handleSecondComplete = () => {
        setStep(3);
    };

    const handleThirdComplete = () => {
        setStep(4);
    };

    const handleFinish = () => {
        if (onFinish) {
            onFinish();
        } else if (navigation?.navigate) {
            navigation.navigate('Login');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            {step === 1 && (
                <FirstOnBoarding
                    navigation={navigation}
                    onNext={handleFirstComplete}
                />
            )}
            {step === 2 && (
                <SecondOnBoarding
                    navigation={navigation}
                    onNext={handleSecondComplete}
                    onSkip={handleFinish}
                />
            )}
            {step === 3 && (
                <ThirdOnBoarding
                    navigation={navigation}
                    onNext={handleThirdComplete}
                />
            )}
            {step === 4 && (
                <FourthOnBoarding
                    navigation={navigation}
                    onNext={handleFinish}
                />
            )}
        </View>
    );
};

export default OnBoarding;
