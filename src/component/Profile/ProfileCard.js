import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';
import images from '../../assets/images';

/**
 * ProfileCard component
 * Displays user avatar, name, phone, rating, and total completed rides stat
 */
const ProfileCard = ({
  name = 'Yasir Boss',
  phone = '+91 98••• 4821',
  rating = '4.9',
  ridesCompleted = '08',
  avatar = images.avatar,
  onPress,
  containerStyle,
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      activeOpacity={onPress ? 0.85 : 1}
      onPress={onPress}
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
          justifyContent: 'space-between',
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
          elevation: 2,
        },
        containerStyle,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}
      >
        {/* Avatar with yellow ring */}
        <View
          style={{
            width: 62,
            height: 62,
            borderRadius: 31,
            borderWidth: 2.2,
            borderColor: COLORS.yellow,
            overflow: 'hidden',
            backgroundColor: '#EAE5D8',
          }}
        >
          <Image
            source={avatar}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
          />
        </View>

        {/* User Details */}
        <View style={styles.ml12}>
          <Text
            style={[
              styles.ts16,
              {
                fontWeight: '800',
                color: COLORS.textDark,
              },
            ]}
          >
            {name}
          </Text>
          <Text
            style={[
              styles.ts12,
              styles.mt4,
              {
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
              style={[
                styles.ts12,
                styles.mr4,
                {
                  color: COLORS.yellowAccent,
                },
              ]}
            >
              ★
            </Text>
            <Text
              style={[
                styles.ts12,
                {
                  fontWeight: '800',
                  color: COLORS.textDark,
                },
              ]}
            >
              {rating}
            </Text>
            <Text
              style={[
                styles.ts11,
                styles.ml4,
                {
                  fontWeight: '600',
                  color: COLORS.textMuted,
                },
              ]}
            >
              Rating
            </Text>
          </View>
        </View>
      </View>

      {/* Stat: Rides Completed */}
      <View
        style={[
          styles.pdl8,
          {
            alignItems: 'center',
          },
        ]}
      >
        <Text
          style={[
            styles.ts22,
            {
              fontWeight: '900',
              color: COLORS.textDark,
            },
          ]}
        >
          {ridesCompleted}
        </Text>
        <Text
          style={[
            styles.ts10,
            styles.mt4,
            {
              fontWeight: '600',
              color: COLORS.textMuted,
              textAlign: 'center',
            },
          ]}
        >
          Rides Completed
        </Text>
      </View>
    </Container>
  );
};

export { ProfileCard };
export default ProfileCard;
