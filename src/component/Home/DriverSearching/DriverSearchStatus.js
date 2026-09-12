import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

// Animated Radar Pulse Icon
const RadarPulseIcon = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.parallel([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim, opacityAnim]);

  return (
    <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
      {/* Outer pulsating wave */}
      <Animated.View
        style={{
          position: 'absolute',
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: COLORS.yellow,
          opacity: opacityAnim,
          transform: [{ scale: pulseAnim }],
        }}
      />

      {/* Middle static soft circle */}
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 19,
          backgroundColor: '#FBE8A6',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Inner solid yellow circle */}
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: COLORS.yellow,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1.5,
            borderColor: COLORS.textDark,
          }}
        >
          {/* Center target dot */}
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: COLORS.textDark,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const DriverSearchStatus = ({
  statusText = 'FINDING YOUR DRIVER...',
  title = 'Almost there!',
  description = 'Your driver is on the way. Please wait.',
  currentStep = 1,
}) => {
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.25,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    blink.start();
    return () => blink.stop();
  }, [blinkAnim]);

  return (
    <View
      style={[
        styles.mh20,
        styles.mt16,
        styles.pdh16,
        styles.pdv16,
        {
          backgroundColor: '#FFFDF5',
          borderRadius: 18,
          borderWidth: 1.2,
          borderColor: '#F2E8CE',
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.03,
          shadowRadius: 5,
          elevation: 2,
        },
      ]}
    >
      {/* Top Status Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadarPulseIcon />

        <View style={[styles.ml12, { flex: 1 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                styles.ts11,
                styles.mr4,
                {
                  fontWeight: '800',
                  color: '#8A8275',
                  letterSpacing: 0.5,
                },
              ]}
            >
              {statusText}
            </Text>
            <Animated.View
              style={{
                width: 7,
                height: 7,
                borderRadius: 3.5,
                backgroundColor: COLORS.yellow,
                opacity: blinkAnim,
              }}
            />
          </View>

          <Text
            style={[
              styles.ts22,
              styles.mt4,
              {
                fontWeight: '900',
                color: COLORS.textDark,
                letterSpacing: -0.4,
              },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.ts12,
              styles.mt4,
              {
                color: '#706A5F',
              },
            ]}
          >
            {description}
          </Text>
        </View>
      </View>

      {/* Stepper / Progress Timeline */}
      <View
        style={[
          styles.mt16,
          styles.pdt16,
          {
            borderTopWidth: 1,
            borderTopColor: '#F2EBDC',
          },
        ]}
      >
        {/* Stepper Circles & Connecting Lines */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
        >
          {/* Step 1 Circle (Active) */}
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: currentStep >= 1 ? COLORS.yellow : COLORS.white,
              borderWidth: currentStep >= 1 ? 0 : 1.2,
              borderColor: '#DCD5C6',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: COLORS.textDark,
              }}
            />
          </View>

          {/* Line 1 (Yellow if currentStep >= 2, or active searching) */}
          <View
            style={{
              flex: 1,
              height: 2.5,
              backgroundColor: currentStep >= 1 ? COLORS.yellow : '#DCD5C6',
            }}
          />

          {/* Step 2 Circle (Pending Car) */}
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: currentStep >= 2 ? COLORS.yellow : COLORS.white,
              borderWidth: 1.2,
              borderColor: currentStep >= 2 ? COLORS.yellow : '#DCD5C6',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <Text style={{ fontSize: 13 }}>🚗</Text>
          </View>

          {/* Line 2 (Inactive Grey) */}
          <View
            style={{
              flex: 1,
              height: 2.5,
              backgroundColor: currentStep >= 3 ? COLORS.yellow : '#DCD5C6',
            }}
          />

          {/* Step 3 Circle (Pending Flag) */}
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: currentStep >= 3 ? COLORS.yellow : COLORS.white,
              borderWidth: 1.2,
              borderColor: currentStep >= 3 ? COLORS.yellow : '#DCD5C6',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <Text style={{ fontSize: 13 }}>⚑</Text>
          </View>
        </View>

        {/* Stepper Labels */}
        <View
          style={[
            styles.mt8,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}
        >
          {/* Step 1 Label */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text
              style={[
                styles.ts11,
                {
                  fontWeight: '800',
                  color: COLORS.textDark,
                },
              ]}
            >
              Searching
            </Text>
            <Text
              style={[
                styles.ts10,
                {
                  color: COLORS.textMuted,
                  marginTop: 1,
                },
              ]}
            >
              for nearby drivers
            </Text>
          </View>

          {/* Step 2 Label */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text
              style={[
                styles.ts11,
                {
                  fontWeight: '800',
                  color: COLORS.textDark,
                },
              ]}
            >
              Driver on the way
            </Text>
            <Text
              style={[
                styles.ts10,
                {
                  color: COLORS.textMuted,
                  marginTop: 1,
                },
              ]}
            >
              to your location
            </Text>
          </View>

          {/* Step 3 Label */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text
              style={[
                styles.ts11,
                {
                  fontWeight: '800',
                  color: COLORS.textDark,
                },
              ]}
            >
              Arriving soon
            </Text>
            <Text
              style={[
                styles.ts10,
                {
                  color: COLORS.textMuted,
                  marginTop: 1,
                },
              ]}
            >
              at pickup location
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DriverSearchStatus;
