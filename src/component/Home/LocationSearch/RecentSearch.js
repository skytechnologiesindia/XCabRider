import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ClockIcon } from '../Icons';
import COLORS from '../../../assets/colors';
import styles from '../../../assets/styles';

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
    {
        id: '4',
        title: 'Rajendra Chowk',
        subtitle: 'Main Road, Ranchi, Jharkhand',
    },
];

const RecentSearch = ({
    data = DEFAULT_SEARCHES,
    onSelectRecent,
    onSeeAllPress,
}) => {
    const items = data && data.length > 0 ? data : DEFAULT_SEARCHES;

    return (
        <View>
            {/* ================= RECENT SEARCHES HEADER ================= */}
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

            {/* ================= RECENT SEARCHES LIST CARD ================= */}
            <View
                style={[
                    styles.mh20,
                    styles.mb16,
                    styles.pdv4,
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
                        overflow: 'hidden',
                    },
                ]}
            >
                {items.map((item, index) => (
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
                            onPress={() => {
                                if (onSelectRecent) {
                                    onSelectRecent(item);
                                } else {
                                    console.log('Selected recent:', item.title);
                                }
                            }}
                        >
                            <View
                                style={{
                                    width: 34,
                                    height: 34,
                                    borderRadius: 17,
                                    backgroundColor: COLORS.iconBg,
                                    borderWidth: 1,
                                    borderColor: COLORS.border,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <ClockIcon size={16} color={COLORS.textDark} />
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
                        {index < items.length - 1 && (
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
