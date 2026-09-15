import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import COLORS from '../../../assets/colors';

// Vector Icon: Star Rating
const StarRating = ({ rating = 5 }) => {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text
          key={star}
          style={[
            styles.starIcon,
            { color: star <= rating ? COLORS.yellow : '#DDD8CE' },
          ]}
        >
          ★
        </Text>
      ))}
    </View>
  );
};

// Vector Icon: Cash Note
const CashBadge = () => (
  <View style={styles.cashBadgeContainer}>
    <View style={styles.cashIconMini}>
      <Text style={styles.cashIconSymbol}>💵</Text>
    </View>
    <Text style={styles.cashBadgeText}>Paid in Cash</Text>
  </View>
);

// Vector Icon: Online / UPI
const UpiBadge = () => (
  <View style={styles.upiBadgeContainer}>
    <Text style={styles.upiIconSymbol}>⚡</Text>
    <Text style={styles.upiBadgeText}>Paid via UPI</Text>
  </View>
);

// Route Connector (Green Dot -> Dashed Line -> Red Pin)
const RouteTimeline = ({ pickup, dropoff, metrics }) => (
  <View style={styles.routeContainer}>
    <View style={styles.routeTimelineColumn}>
      {/* Green Pickup Dot */}
      <View style={styles.greenPickupDot} />
      {/* Vertical Dashed Line */}
      <View style={styles.dashedLine} />
      {/* Red Drop Pin */}
      <View style={styles.redDropPin} />
    </View>

    <View style={styles.routeAddressesColumn}>
      <View style={styles.addressRow}>
        <Text style={styles.addressLabel}>Pickup:</Text>
        <Text style={styles.addressText} numberOfLines={1}>
          {pickup}
        </Text>
      </View>

      <View style={[styles.addressRow, { marginTop: 6 }]}>
        <Text style={styles.addressLabel}>Drop-off:</Text>
        <Text style={styles.addressText} numberOfLines={1}>
          {dropoff}
        </Text>
      </View>

      {metrics ? (
        <Text style={styles.metricsText}>{metrics}</Text>
      ) : null}
    </View>
  </View>
);

const RidesCards = ({ ride, onRebook }) => {
  if (!ride) return null;

  const isCompleted = ride.status === 'COMPLETED';

  return (
    <View style={styles.cardContainer}>
      {/* Card Header: Vehicle + Date + Status Tag */}
      <View style={styles.cardTopRow}>
        <View style={styles.vehicleInfoGroup}>
          <View style={styles.vehicleThumbnailWrapper}>
            <Image
              source={ride.carImage}
              style={styles.vehicleThumbnail}
              resizeMode="contain"
            />
          </View>
          <View style={styles.vehicleTextGroup}>
            <Text style={styles.carNameText}>{ride.carName}</Text>
            <Text style={styles.dateText}>{ride.date}</Text>
          </View>
        </View>

        {/* Status Pill Badge */}
        {isCompleted ? (
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>Completed ✓</Text>
          </View>
        ) : (
          <View style={styles.cancelledBadge}>
            <Text style={styles.cancelledBadgeText}>Cancelled</Text>
          </View>
        )}
      </View>

      {/* Card Divider */}
      <View style={styles.cardDivider} />

      {/* Route Path (Pickup -> Drop-off) */}
      <RouteTimeline
        pickup={ride.pickup}
        dropoff={ride.dropoff}
        metrics={ride.metrics}
      />

      {/* Card Bottom Row: Payment Info / Reason + Price + Action Button */}
      <View style={styles.cardBottomRow}>
        <View style={styles.paymentAndRatingGroup}>
          {isCompleted ? (
            <>
              {ride.paymentType === 'CASH' ? <CashBadge /> : <UpiBadge />}
              {ride.rating ? (
                <View style={{ marginTop: 6 }}>
                  <StarRating rating={ride.rating} />
                </View>
              ) : null}
            </>
          ) : (
            <View style={styles.cancelledReasonBox}>
              <Text style={styles.cancelledReasonText}>
                {ride.cancellationReason}
              </Text>
            </View>
          )}
        </View>

        {/* Fare & Button Column */}
        <View style={styles.fareActionColumn}>
          <View style={styles.farePriceRow}>
            <Text style={styles.fareLabel}>Fare</Text>
            <Text
              style={[
                styles.fareAmountText,
                !isCompleted && { color: COLORS.textMuted },
              ]}
            >
              {ride.fare}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={() => onRebook && onRebook(ride)}
          >
            <Text style={styles.actionButtonText}>
              {isCompleted ? 'Rebook' : 'Book Again'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vehicleInfoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleThumbnailWrapper: {
    width: 48,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#F7F4EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    overflow: 'hidden',
  },
  vehicleThumbnail: {
    width: '100%',
    height: '100%',
  },
  vehicleTextGroup: {
    flex: 1,
  },
  carNameText: {
    fontSize: 14.5,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  dateText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 1,
  },
  completedBadge: {
    backgroundColor: '#DEF7EC',
    paddingHorizontal: 9,
    paddingVertical: 4.5,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#03543F',
  },
  cancelledBadge: {
    backgroundColor: '#FDE8E8',
    paddingHorizontal: 9,
    paddingVertical: 4.5,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelledBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9B1C1C',
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: 10,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  routeTimelineColumn: {
    alignItems: 'center',
    width: 16,
    paddingTop: 4,
    marginRight: 8,
  },
  greenPickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  dashedLine: {
    width: 1.5,
    height: 20,
    backgroundColor: '#D6D0C5',
    marginVertical: 2,
  },
  redDropPin: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  routeAddressesColumn: {
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.textMuted,
    width: 58,
  },
  addressText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.textDark,
    flex: 1,
  },
  metricsText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 5,
    paddingLeft: 58,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F5F2EA',
  },
  paymentAndRatingGroup: {
    flex: 1,
    justifyContent: 'center',
  },
  cashBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    borderWidth: 1,
    borderColor: '#FEF08A',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  cashIconMini: {
    marginRight: 4,
  },
  cashIconSymbol: {
    fontSize: 12,
  },
  cashBadgeText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#854D0E',
  },
  upiBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  upiIconSymbol: {
    fontSize: 11,
    marginRight: 3,
  },
  upiBadgeText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#1E40AF',
  },
  cancelledReasonBox: {
    alignSelf: 'flex-start',
  },
  cancelledReasonText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#9B1C1C',
    fontStyle: 'italic',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 15,
    marginRight: 2,
  },
  fareActionColumn: {
    alignItems: 'flex-end',
  },
  farePriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  fareLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginRight: 6,
  },
  fareAmountText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textDark,
  },
  actionButton: {
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 14,
    paddingVertical: 6.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.yellow,
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1.5,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
});

export default RidesCards;
