import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

// Destination pin component
const DestinationPin = ({ size = 18 }) => (
  <View style={{ width: size, height: size * 1.35, alignItems: 'center', justifyContent: 'flex-start' }}>
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: COLORS.redPin,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.redPin,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 3,
        elevation: 3,
      }}
    >
      <View
        style={{
          width: size * 0.36,
          height: size * 0.36,
          borderRadius: (size * 0.36) / 2,
          backgroundColor: COLORS.white,
        }}
      />
    </View>
    <View
      style={{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: size * 0.28,
        borderRightWidth: size * 0.28,
        borderTopWidth: size * 0.38,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: COLORS.redPin,
        marginTop: -2,
      }}
    />
  </View>
);

// Pickup GPS yellow circle dot
const PickupIndicator = ({ size = 22 }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: COLORS.yellow,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View
      style={{
        width: size * 0.38,
        height: size * 0.38,
        borderRadius: (size * 0.38) / 2,
        backgroundColor: COLORS.textDark,
      }}
    />
  </View>
);

const PickDrop = ({
  pickup: initialPickup = 'Current location',
  destination: initialDestination = '',
  activeField = 'destination',
  onFocusField,
  onChangePickup,
  onChangeDestination,
  onConfirmTrip,
  onSelectPickup,
  onSelectDestination,
}) => {
  const [pickupText, setPickupText] = useState(initialPickup);
  const [destinationText, setDestinationText] = useState(initialDestination);

  useEffect(() => {
    if (initialPickup !== undefined) setPickupText(initialPickup);
  }, [initialPickup]);

  useEffect(() => {
    if (initialDestination !== undefined) setDestinationText(initialDestination);
  }, [initialDestination]);

  const handleConfirm = () => {
    const p = pickupText.trim() || 'Ranchi Railway Station';
    const d = destinationText.trim() || 'Lalpur Market';
    onConfirmTrip?.({
      pickup: p,
      destination: d,
    });
  };

  return (
    <View
      style={[
        styles.mh20,
        {
          backgroundColor: COLORS.cardBg,
          borderRadius: 18,
          borderWidth: 1.2,
          borderColor: COLORS.border,
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
          elevation: 2,
          position: 'relative',
        },
      ]}
    >
      {/* Connecting vertical dashed line */}
      <View
        style={{
          position: 'absolute',
          left: 26,
          top: 36,
          bottom: 36,
          width: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <View style={{ width: 1.8, height: 4, backgroundColor: COLORS.borderDash, borderRadius: 1 }} />
        <View style={{ width: 1.8, height: 4, backgroundColor: COLORS.borderDash, borderRadius: 1 }} />
        <View style={{ width: 1.8, height: 4, backgroundColor: COLORS.borderDash, borderRadius: 1 }} />
      </View>

      {/* Row 1: Pickup Location */}
      <View
        style={[
          styles.pdh16,
          styles.pdv12,
          {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: activeField === 'pickup' ? COLORS.yellowLight : 'transparent',
            borderTopLeftRadius: 17,
            borderTopRightRadius: 17,
          },
        ]}
      >
        <PickupIndicator size={22} />
        <View style={[styles.ml12, { flex: 1 }]}>
          <Text
            style={[
              styles.ts12,
              {
                color: COLORS.textMuted,
                fontWeight: '500',
              },
            ]}
          >
            Pickup location
          </Text>
          <TextInput
            style={[
              styles.ts15,
              {
                fontWeight: '700',
                color: COLORS.textDark,
                paddingVertical: 3,
                paddingHorizontal: 0,
              },
            ]}
            value={pickupText}
            onFocus={() => onFocusField?.('pickup')}
            onChangeText={(text) => {
              setPickupText(text);
              onChangePickup?.(text);
            }}
            placeholder="Current location"
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        {pickupText.length > 0 && pickupText !== 'Current location' && (
          <TouchableOpacity
            onPress={() => {
              setPickupText('');
              onChangePickup?.('');
            }}
            style={{
              padding: 4,
              marginRight: 4,
            }}
          >
            <View
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: COLORS.divider,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: '700', color: COLORS.textMuted }}>✕</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (onSelectPickup) {
              onSelectPickup();
            } else {
              handleConfirm();
            }
          }}
          style={styles.p4}
        >
          <Text style={[styles.ts18, { color: COLORS.textDark, fontWeight: '400' }]}>
            ›
          </Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View
        style={[
          styles.mr16,
          {
            height: 1,
            backgroundColor: COLORS.divider,
            marginLeft: 52,
          },
        ]}
      />

      {/* Row 2: Where to? */}
      <View
        style={[
          styles.pdh16,
          styles.pdv12,
          {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: activeField === 'destination' ? COLORS.yellowLight : 'transparent',
            borderBottomLeftRadius: 17,
            borderBottomRightRadius: 17,
          },
        ]}
      >
        <DestinationPin size={18} />
        <View style={[styles.ml12, { flex: 1 }]}>
          <Text
            style={[
              styles.ts12,
              {
                color: COLORS.textMuted,
                fontWeight: '500',
              },
            ]}
          >
            Where to?
          </Text>
          <TextInput
            style={[
              styles.ts15,
              {
                fontWeight: '700',
                color: COLORS.textDark,
                paddingVertical: 3,
                paddingHorizontal: 0,
              },
            ]}
            value={destinationText}
            onFocus={() => onFocusField?.('destination')}
            onChangeText={(text) => {
              setDestinationText(text);
              onChangeDestination?.(text);
            }}
            placeholder="Search destination"
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="done"
            onSubmitEditing={handleConfirm}
          />
        </View>

        {destinationText.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setDestinationText('');
              onChangeDestination?.('');
            }}
            style={{
              padding: 4,
              marginRight: 6,
            }}
          >
            <View
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: COLORS.divider,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: '700', color: COLORS.textMuted }}>✕</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (onSelectDestination) {
              onSelectDestination();
            }
            handleConfirm();
          }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: destinationText.trim() ? COLORS.yellow : COLORS.divider,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={[styles.ts18, { color: COLORS.textDark, fontWeight: '800', marginTop: -2 }]}>
            ›
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PickDrop;
