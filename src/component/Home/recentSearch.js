import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ClockIcon } from './Icons';
import COLORS from '../../assets/colors';
import styles from '../../assets/styles';

const DEFAULT_SEARCHES = [
  {
    id: '1',
    title: 'Lalpur Market',
    subtitle: 'Lalpur, Ranchi, Jharkhand',
  },
  {
    id: '2',
    title: 'Kanke Road',
    subtitle: 'Kanke, Ranchi, Jharkhand',
  },
  {
    id: '3',
    title: 'Harmu Chowk',
    subtitle: 'Harmu, Ranchi, Jharkhand',
  },
];

const RecentSearch = ({
  data = DEFAULT_SEARCHES,
  onItemPress,
  onSeeAllPress,
}) => {
  return (
    <View>
      {/* Section Header */}
      <View
        style={[
          styles.pdh20,
          styles.mb12,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}
      >
        <Text
          style={[
            styles.ts15,
            {
              fontWeight: '800',
              color: COLORS.textDark,
            },
          ]}
        >
          Recent Searches
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSeeAllPress || (() => console.log('See all'))}
        >
          <Text
            style={[
              styles.ts13,
              {
                fontWeight: '700',
                color: COLORS.yellowAccent,
              },
            ]}
          >
            See all
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card Container */}
      <View
        style={[
          styles.mh20,
          styles.mb16,
          styles.pdv4,
          {
            backgroundColor: COLORS.cardBg,
            borderRadius: 16,
            borderWidth: 1.2,
            borderColor: COLORS.border,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 6,
            elevation: 2,
          },
        ]}
      >
        {data.map((item, index) => (
          <React.Fragment key={item.id}>
            <TouchableOpacity
              style={[
                styles.pdh16,
                styles.pdv12,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}
              activeOpacity={0.7}
              onPress={() =>
                onItemPress
                  ? onItemPress(item)
                  : console.log('Selected:', item.title)
              }
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: COLORS.iconBg,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ClockIcon size={15} color={COLORS.textDark} />
              </View>

              <View
                style={[
                  styles.ml12,
                  {
                    flex: 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.ts14,
                    {
                      fontWeight: '700',
                      color: COLORS.textDark,
                    },
                  ]}
                >
                  {item.title}
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
                  {item.subtitle}
                </Text>
              </View>

              <Text
                style={[
                  styles.ts18,
                  styles.ml8,
                  {
                    color: COLORS.textDark,
                    fontWeight: '400',
                  },
                ]}
              >
                ›
              </Text>
            </TouchableOpacity>
            {index < data.length - 1 && (
              <View
                style={[
                  styles.mh16,
                  {
                    height: 1,
                    backgroundColor: COLORS.divider,
                  },
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default RecentSearch;
