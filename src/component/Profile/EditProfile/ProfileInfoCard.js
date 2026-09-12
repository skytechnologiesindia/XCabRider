import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';
import images from '../../../assets/images';

// Mini Camera Icon for Avatar
const CameraIcon = ({ size = 12, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size * 0.8, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.4,
        height: 2,
        backgroundColor: color,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
      }}
    />
    <View
      style={{
        width: size,
        height: size * 0.65,
        borderRadius: 2,
        borderWidth: 1.4,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.35,
          height: size * 0.35,
          borderRadius: (size * 0.35) / 2,
          borderWidth: 1,
          borderColor: color,
        }}
      />
    </View>
  </View>
);

// Blue Checkmark Icon for Verified Name
const VerifiedBadge = ({ size = 16 }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#2563EB',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 6,
    }}
  >
    <View
      style={{
        width: size * 0.45,
        height: size * 0.25,
        borderLeftWidth: 1.6,
        borderBottomWidth: 1.6,
        borderColor: COLORS.white,
        transform: [{ rotate: '-45deg' }],
        marginTop: -1.5,
      }}
    />
  </View>
);

const ProfileInfoCard = ({
  fullName = 'Yasir Boss',
  phone = '+91 98••• 4821',
  rating = '4.9',
  avatarSource = images.avatar,
  onCameraPress,
}) => {
  return (
    <View
      style={[
        styles.mh20,
        styles.mt8,
        styles.mb16,
        styles.p16,
        {
          backgroundColor: COLORS.cardBg,
          borderRadius: 18,
          borderWidth: 1.2,
          borderColor: COLORS.border,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
          elevation: 2,
        },
      ]}
    >
      {/* Avatar with yellow ring & camera badge */}
      <View style={{ position: 'relative' }}>
        <View
          style={{
            width: 66,
            height: 66,
            borderRadius: 33,
            borderWidth: 2.5,
            borderColor: COLORS.yellow,
            overflow: 'hidden',
            backgroundColor: '#EAE5D8',
          }}
        >
          <Image
            source={avatarSource}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>

        {/* Camera badge */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: -1,
            right: -2,
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: COLORS.yellow,
            borderWidth: 2,
            borderColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 3,
          }}
          activeOpacity={0.8}
          onPress={onCameraPress}
        >
          <CameraIcon size={12} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      {/* User Details */}
      <View style={[styles.ml16, { flex: 1 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '800',
              color: COLORS.textDark,
            }}
          >
            {fullName}
          </Text>
          <VerifiedBadge size={16} />
        </View>

        <Text
          style={[
            styles.mt4,
            {
              fontSize: 13,
              color: COLORS.textMuted,
            },
          ]}
        >
          {phone}
        </Text>

        {/* Rating Badge */}
        <View
          style={[
            styles.mt8,
            styles.pdh8,
            styles.pdv4,
            {
              backgroundColor: COLORS.iconBg,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: COLORS.border,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
            },
          ]}
        >
          <Text
            style={{
              fontSize: 12,
              color: COLORS.yellowAccent,
              marginRight: 4,
            }}
          >
            ★
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '800',
              color: COLORS.textDark,
            }}
          >
            {rating}
          </Text>
          <Text
            style={{
              fontSize: 10.5,
              fontWeight: '600',
              color: COLORS.textMuted,
              marginLeft: 4,
            }}
          >
            Rating
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileInfoCard;
