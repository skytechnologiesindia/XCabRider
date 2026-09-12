import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HomeIcon, WorkIcon, StarIcon } from '../Icons';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

const SavedPlaces = ({
  onPressHome,
  onPressWork,
  onPressFavourites,
}) => {
  return (
    <View
      style={[
        styles.pdh20,
        styles.mt16,
        styles.mb20,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      ]}
    >
      {/* Home */}
      <TouchableOpacity
        style={[
          styles.mr4,
          styles.pdv12,
          styles.pdh12,
          {
            flex: 1,
            backgroundColor: COLORS.cardBg,
            borderRadius: 16,
            borderWidth: 1.2,
            borderColor: COLORS.border,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.03,
            shadowRadius: 5,
            elevation: 1,
          },
        ]}
        activeOpacity={0.8}
        onPress={onPressHome || (() => console.log('Add home'))}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: COLORS.iconBg,
            borderWidth: 1,
            borderColor: COLORS.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <HomeIcon size={19} color={COLORS.textDark} />
        </View>
        <View style={[styles.ml8, { flex: 1 }]}>
          <Text
            style={[
              styles.ts14,
              {
                fontWeight: '700',
                color: COLORS.textDark,
              },
            ]}
          >
            Home
          </Text>
          <Text
            style={[
              styles.ts11,
              styles.mt4,
              {
                color: COLORS.textMuted,
              },
            ]}
          >
            Add home
          </Text>
        </View>
      </TouchableOpacity>

      {/* Work */}
      <TouchableOpacity
        style={[
          styles.mh4,
          styles.pdv12,
          styles.pdh12,
          {
            flex: 1,
            backgroundColor: COLORS.cardBg,
            borderRadius: 16,
            borderWidth: 1.2,
            borderColor: COLORS.border,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.03,
            shadowRadius: 5,
            elevation: 1,
          },
        ]}
        activeOpacity={0.8}
        onPress={onPressWork || (() => console.log('Add work'))}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: COLORS.iconBg,
            borderWidth: 1,
            borderColor: COLORS.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <WorkIcon size={19} color={COLORS.textDark} />
        </View>
        <View style={[styles.ml8, { flex: 1 }]}>
          <Text
            style={[
              styles.ts14,
              {
                fontWeight: '700',
                color: COLORS.textDark,
              },
            ]}
          >
            Work
          </Text>
          <Text
            style={[
              styles.ts11,
              styles.mt4,
              {
                color: COLORS.textMuted,
              },
            ]}
          >
            Add work
          </Text>
        </View>
      </TouchableOpacity>

      {/* Favourites */}
      <TouchableOpacity
        style={[
          styles.ml4,
          styles.pdv12,
          styles.pdh12,
          {
            flex: 1,
            backgroundColor: COLORS.cardBg,
            borderRadius: 16,
            borderWidth: 1.2,
            borderColor: COLORS.border,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.03,
            shadowRadius: 5,
            elevation: 1,
          },
        ]}
        activeOpacity={0.8}
        onPress={onPressFavourites || (() => console.log('Saved places'))}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: COLORS.iconBg,
            borderWidth: 1,
            borderColor: COLORS.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StarIcon size={19} color={COLORS.textDark} />
        </View>
        <View style={[styles.ml8, { flex: 1 }]}>
          <Text
            style={[
              styles.ts14,
              {
                fontWeight: '700',
                color: COLORS.textDark,
              },
            ]}
          >
            Favourites
          </Text>
          <Text
            style={[
              styles.ts11,
              styles.mt4,
              {
                color: COLORS.textMuted,
              },
            ]}
          >
            Saved places
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SavedPlaces;
