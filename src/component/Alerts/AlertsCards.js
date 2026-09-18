import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';

import { CarBadgeIcon } from '../../assets/icons/Icons';
export { CarBadgeIcon };


const AlertsCards = ({
  item,
  title,
  description,
  time,
  isUnread,
  icon,
  onPress,
  containerStyle,
}) => {
  const cardTitle = item?.title || title || 'Driver Raj Kumar is arriving';
  const cardDesc =
    item?.description ||
    item?.subtitle ||
    description ||
    'White Swift Dzire • JH 01 AB 4821 is 2 mins away';
  const cardTime = item?.time || time || '2m ago';
  const cardIsUnread = item?.isUnread !== undefined ? item.isUnread : isUnread !== undefined ? isUnread : true;

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.75 : 1}
      onPress={onPress}
      style={[
        cardStyles.cardContainer,
        containerStyle,
      ]}
    >
      {/* Top Row: Icon + Title + Status Dot & Time */}
      <View style={cardStyles.topRow}>
        {/* Yellow Badge Icon */}
        <View style={cardStyles.iconBadge}>
          {icon ? icon : <CarBadgeIcon size={18} color={COLORS.textDark} />}
        </View>

        {/* Title */}
        <View style={cardStyles.titleContainer}>
          <Text style={cardStyles.titleText}>
            {cardTitle}
          </Text>
        </View>

        {/* Timestamp & Unread Dot */}
        <View style={cardStyles.timeContainer}>
          {cardIsUnread && <View style={cardStyles.unreadDot} />}
          <Text style={cardStyles.timeText}>
            {cardTime}
          </Text>
        </View>
      </View>

      {/* Subtitle / Details */}
      <Text style={cardStyles.descriptionText}>
        {cardDesc}
      </Text>
    </TouchableOpacity>
  );
};

const cardStyles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginTop: 6,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 22,
  },
  timeContainer: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.yellow,
    marginRight: 6,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.mediumGrey,
  },
  descriptionText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
    lineHeight: 18,
    paddingLeft: 50,
  },
});

export default AlertsCards;
