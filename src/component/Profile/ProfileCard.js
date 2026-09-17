import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
        cardStyles.card,
        containerStyle,
      ]}
    >
      <View style={cardStyles.userInfoRow}>
        {/* Avatar with yellow ring */}
        <View style={cardStyles.avatarContainer}>
          <Image
            source={avatar}
            style={cardStyles.avatarImage}
            resizeMode="cover"
          />
        </View>

        {/* User Details */}
        <View style={styles.ml12}>
          <Text style={cardStyles.nameText}>{name}</Text>
          <Text style={[styles.mt4, cardStyles.phoneText]}>{phone}</Text>

          {/* Rating Badge */}
          <View style={[styles.mt8, styles.pdh8, styles.pdv4, cardStyles.ratingBadge]}>
            <Text style={cardStyles.starIcon}>★</Text>
            <Text style={cardStyles.ratingScore}>{rating}</Text>
            <Text style={cardStyles.ratingLabel}>Rating</Text>
          </View>
        </View>
      </View>

      {/* Stat: Rides Completed */}
      <View style={cardStyles.statContainer}>
        <Text style={cardStyles.statNumber}>{ridesCompleted}</Text>
        <Text style={[styles.mt4, cardStyles.statLabel]}>Rides Completed</Text>
      </View>
    </Container>
  );
};

const cardStyles = StyleSheet.create({
  card: {
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
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2.2,
    borderColor: COLORS.yellow,
    overflow: 'hidden',
    backgroundColor: '#EAE5D8',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  nameText: {
    fontSize: 16.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  phoneText: {
    fontSize: 12.5,
    color: COLORS.textMuted,
  },
  ratingBadge: {
    backgroundColor: COLORS.iconBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  starIcon: {
    fontSize: 12,
    color: COLORS.yellowAccent,
    marginRight: 4,
  },
  ratingScore: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  ratingLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  statContainer: {
    alignItems: 'center',
    paddingLeft: 8,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textDark,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});

export { ProfileCard };
export default ProfileCard;
