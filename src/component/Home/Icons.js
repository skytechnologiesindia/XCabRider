import React from 'react';
import { View, Text } from 'react-native';
import COLORS from '../../assets/colors';

export const LocationPin = ({ size = 14, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size * 1.25, alignItems: 'center', justifyContent: 'flex-start' }}>
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.8,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.35,
          height: size * 0.35,
          borderRadius: size * 0.2,
          backgroundColor: color,
        }}
      />
    </View>
    <View
      style={{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: size * 0.25,
        borderRightWidth: size * 0.25,
        borderTopWidth: size * 0.35,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
        marginTop: -1,
      }}
    />
  </View>
);

export const HeaderBell = ({ size = 22, color = COLORS.textDark, hasBadge = true }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.65,
        height: size * 0.7,
        borderTopLeftRadius: size * 0.35,
        borderTopRightRadius: size * 0.35,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        borderWidth: 1.8,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <View
        style={{
          width: size * 0.85,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          marginBottom: -2,
        }}
      />
    </View>
    <View
      style={{
        width: 3.5,
        height: 2.5,
        backgroundColor: color,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        marginTop: 2,
      }}
    />
    {hasBadge && (
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 1,
          width: 7.5,
          height: 7.5,
          borderRadius: 4,
          backgroundColor: COLORS.yellow,
          borderWidth: 1.2,
          borderColor: COLORS.mapBg,
        }}
      />
    )}
  </View>
);

export const SearchIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        width: size * 0.75,
        height: size * 0.75,
        borderRadius: (size * 0.75) / 2,
        borderWidth: 2,
        borderColor: color,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: 2.2,
        height: size * 0.42,
        backgroundColor: color,
        borderRadius: 1,
        bottom: 0,
        right: 1,
        transform: [{ rotate: '-45deg' }],
      }}
    />
  </View>
);

export const GpsTargetIcon = ({ size = 20, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.78,
        height: size * 0.78,
        borderRadius: (size * 0.78) / 2,
        borderWidth: 1.8,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.25,
          height: size * 0.25,
          borderRadius: size * 0.15,
          backgroundColor: color,
        }}
      />
    </View>
    {/* 4 tick marks */}
    <View style={{ position: 'absolute', top: 0, width: 1.8, height: size * 0.2, backgroundColor: color }} />
    <View style={{ position: 'absolute', bottom: 0, width: 1.8, height: size * 0.2, backgroundColor: color }} />
    <View style={{ position: 'absolute', left: 0, width: size * 0.2, height: 1.8, backgroundColor: color }} />
    <View style={{ position: 'absolute', right: 0, width: size * 0.2, height: 1.8, backgroundColor: color }} />
  </View>
);

export const HomeIcon = ({ size = 20, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    {/* Roof */}
    <View
      style={{
        width: size * 0.65,
        height: size * 0.65,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        marginTop: 2,
      }}
    />
    {/* Body */}
    <View
      style={{
        width: size * 0.68,
        height: size * 0.45,
        borderLeftWidth: 1.8,
        borderRightWidth: 1.8,
        borderBottomWidth: 1.8,
        borderColor: color,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        marginTop: -size * 0.22,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <View
        style={{
          width: size * 0.24,
          height: size * 0.25,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          borderWidth: 1.4,
          borderColor: color,
          borderBottomWidth: 0,
        }}
      />
    </View>
  </View>
);

export const WorkIcon = ({ size = 20, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    {/* Handle */}
    <View
      style={{
        width: size * 0.38,
        height: size * 0.22,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderWidth: 1.6,
        borderColor: color,
        borderBottomWidth: 0,
        marginBottom: -1,
      }}
    />
    {/* Briefcase Body */}
    <View
      style={{
        width: size * 0.85,
        height: size * 0.58,
        borderRadius: 4,
        borderWidth: 1.8,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Middle line / clasp */}
      <View style={{ width: '100%', height: 1.2, backgroundColor: color, opacity: 0.5 }} />
      <View
        style={{
          position: 'absolute',
          width: size * 0.22,
          height: size * 0.16,
          borderRadius: 1.5,
          borderWidth: 1.2,
          borderColor: color,
          backgroundColor: COLORS.white,
        }}
      />
    </View>
  </View>
);

export const StarIcon = ({ size = 20, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: size * 1.1, color, lineHeight: size * 1.1, textAlign: 'center' }}>
      ☆
    </Text>
  </View>
);

export const RefreshIcon = ({ size = 13, color = COLORS.textDark }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: size, color, fontWeight: '700', lineHeight: size }}>
      ↻
    </Text>
  </View>
);

export const ClockIcon = ({ size = 18, color = COLORS.textDark }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 1.6,
      borderColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View
      style={{
        position: 'absolute',
        width: 1.4,
        height: size * 0.32,
        backgroundColor: color,
        top: size * 0.18,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: size * 0.26,
        height: 1.4,
        backgroundColor: color,
        left: size * 0.44,
        top: size * 0.44,
        borderRadius: 1,
      }}
    />
  </View>
);

export const PromoDiscountIcon = ({ size = 36 }) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: COLORS.yellow,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ rotate: '-10deg' }],
      shadowColor: COLORS.yellow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2,
    }}
  >
    <View
      style={{
        width: size * 0.8,
        height: size * 0.8,
        borderWidth: 1.5,
        borderColor: COLORS.textDark,
        borderStyle: 'dashed',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: '900', color: COLORS.textDark }}>%</Text>
    </View>
  </View>
);

export const CarNavIcon = ({ size = 24, color = COLORS.yellow }) => (
  <View style={{ width: size, height: size * 0.8, alignItems: 'center', justifyContent: 'center' }}>
    {/* Cabin */}
    <View
      style={{
        width: size * 0.58,
        height: size * 0.34,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: 1.8,
        borderColor: color,
        borderBottomWidth: 0,
      }}
    />
    {/* Body */}
    <View
      style={{
        width: size * 0.9,
        height: size * 0.34,
        borderRadius: 4,
        borderWidth: 1.8,
        borderColor: color,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 2,
      }}
    >
      {/* Headlights */}
      <View style={{ width: 3, height: 2, backgroundColor: color, borderRadius: 1 }} />
      <View style={{ width: 3, height: 2, backgroundColor: color, borderRadius: 1 }} />
    </View>
    {/* Wheels */}
    <View
      style={{
        position: 'absolute',
        bottom: -2,
        width: size * 0.76,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ width: 4.5, height: 2.5, backgroundColor: color, borderRadius: 1.5 }} />
      <View style={{ width: 4.5, height: 2.5, backgroundColor: color, borderRadius: 1.5 }} />
    </View>
  </View>
);

export const CalendarRidesIcon = ({ size = 22, color = COLORS.navInactive }) => (
  <View
    style={{
      width: size * 0.82,
      height: size,
      borderRadius: 3.5,
      borderWidth: 1.8,
      borderColor: color,
      padding: 2.5,
      alignItems: 'center',
    }}
  >
    {/* Top rings */}
    <View
      style={{
        position: 'absolute',
        top: -3,
        width: size * 0.55,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ width: 2, height: 4, backgroundColor: color, borderRadius: 1 }} />
      <View style={{ width: 2, height: 4, backgroundColor: color, borderRadius: 1 }} />
      <View style={{ width: 2, height: 4, backgroundColor: color, borderRadius: 1 }} />
    </View>
    {/* Rows / Checklist lines */}
    <View style={{ width: '100%', height: 1.4, backgroundColor: color, marginTop: 4, borderRadius: 1 }} />
    <View style={{ width: '80%', height: 1.4, backgroundColor: color, marginTop: 3, alignSelf: 'flex-start', borderRadius: 1 }} />
    <View style={{ width: '60%', height: 1.4, backgroundColor: color, marginTop: 3, alignSelf: 'flex-start', borderRadius: 1 }} />
  </View>
);

export const AlertsNavIcon = ({ size = 22, color = COLORS.navInactive, badge = 2 }) => (
  <View style={{ width: size + 4, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.65,
        height: size * 0.7,
        borderTopLeftRadius: size * 0.35,
        borderTopRightRadius: size * 0.35,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        borderWidth: 1.8,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <View
        style={{
          width: size * 0.85,
          height: 1.8,
          backgroundColor: color,
          borderRadius: 1,
          marginBottom: -1.8,
        }}
      />
    </View>
    <View
      style={{
        width: 3.5,
        height: 2.5,
        backgroundColor: color,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        marginTop: 2,
      }}
    />
    {badge !== undefined && (
      <View
        style={{
          position: 'absolute',
          top: -2,
          right: 0,
          width: 14,
          height: 14,
          borderRadius: 7,
          backgroundColor: COLORS.yellow,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 9, fontWeight: '900', color: COLORS.textDark }}>{badge}</Text>
      </View>
    )}
  </View>
);

export const ProfileNavIcon = ({ size = 22, color = COLORS.navInactive }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    {/* Head */}
    <View
      style={{
        width: size * 0.42,
        height: size * 0.42,
        borderRadius: (size * 0.42) / 2,
        borderWidth: 1.8,
        borderColor: color,
        marginBottom: 1,
      }}
    />
    {/* Shoulders */}
    <View
      style={{
        width: size * 0.8,
        height: size * 0.38,
        borderTopLeftRadius: size * 0.38,
        borderTopRightRadius: size * 0.38,
        borderWidth: 1.8,
        borderColor: color,
        borderBottomWidth: 0,
      }}
    />
  </View>
);
