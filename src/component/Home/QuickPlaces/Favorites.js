import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../../../assets/colors';
import { StarIcon } from '../Icons';

/**
 * Favorites quick destination card component
 */
const Favorites = ({
  title = 'Favorites',
  subtitle = 'Saved places',
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      activeOpacity={0.8}
      onPress={onPress || (() => console.log('Saved places'))}
    >
      <View style={styles.iconWrap}>
        <StarIcon size={19} color={COLORS.textDark} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 3.5,
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    marginLeft: 7,
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 10.5,
    color: COLORS.textMuted,
    marginTop: 1,
  },
});

export default Favorites;
