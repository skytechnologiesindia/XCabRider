import React from 'react';
import { Image, View, Text } from 'react-native';
import COLORS from '../colors';

// WebP icon assets
export const GOOGLE_ICON = require('./google.webp');
export const INDIA_FLAG_ICON = require('./india_flag.webp');
export const CLOCK_ICON = require('./clock.webp');
export const PENCIL_ICON = require('./pencil.webp');
export const SEARCH_ICON = require('./search.webp');
export const GPS_TARGET_ICON = require('./gps_target.webp');
export const HOME_ICON = require('./home_icon.webp');
export const WORK_ICON = require('./work_icon.webp');
export const STAR_ICON = require('./star_icon.webp');
export const REFRESH_ICON = require('./refresh_icon.webp');
export const LOCATION_PIN_ICON = require('./location_pin.webp');
export const DESTINATION_PIN_ICON = require('./destination_pin.webp');
export const BELL_ICON = require('./bell_icon.webp');

/**
 * GoogleIcon component using WebP image asset
 */
export const GoogleIcon = ({ size = 20, style }) => (
  <Image
    source={GOOGLE_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * IndiaFlagIcon component using WebP image asset
 */
export const IndiaFlagIcon = ({ size = 22, style }) => (
  <Image
    source={INDIA_FLAG_ICON}
    style={[
      {
        width: size,
        height: size,
        borderRadius: size / 2,
      },
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * ClockIcon component using WebP image asset
 */
export const ClockIcon = ({ size = 18, color, style }) => (
  <Image
    source={CLOCK_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * PencilIcon / EditIcon component using WebP image asset
 */
export const PencilIcon = ({ size = 18, color, style }) => (
  <Image
    source={PENCIL_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const EditIcon = PencilIcon;

/**
 * SearchIcon component using WebP image asset
 */
export const SearchIcon = ({ size = 19, color, style }) => (
  <Image
    source={SEARCH_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * GpsTargetIcon component using WebP image asset
 */
export const GpsTargetIcon = ({ size = 20, color, style }) => (
  <Image
    source={GPS_TARGET_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * HomeIcon component using WebP image asset
 */
export const HomeIcon = ({ size = 20, color, style }) => (
  <Image
    source={HOME_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * WorkIcon component using WebP image asset
 */
export const WorkIcon = ({ size = 20, color, style }) => (
  <Image
    source={WORK_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * StarIcon component using WebP image asset
 */
export const StarIcon = ({ size = 20, color, style }) => (
  <Image
    source={STAR_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * RefreshIcon component using WebP image asset
 */
export const RefreshIcon = ({ size = 14, color, style }) => (
  <Image
    source={REFRESH_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * LocationPin component using WebP image asset
 */
export const LocationPin = ({ size = 18, color, style }) => (
  <Image
    source={LOCATION_PIN_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const LocationPinIcon = LocationPin;
export const LocationIcon = LocationPin;

/**
 * DestinationPin component using WebP image asset
 */
export const DestinationPin = ({ size = 22, style }) => (
  <Image
    source={DESTINATION_PIN_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      style,
    ]}
    resizeMode="contain"
  />
);

export const DestinationPinIcon = DestinationPin;

/**
 * HeaderBell component using WebP image asset with optional notification badge
 */
export const HeaderBell = ({ size = 22, color, hasBadge = false, style }) => (
  <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
    <Image
      source={BELL_ICON}
      style={[
        {
          width: size,
          height: size,
        },
        color ? { tintColor: color } : null,
      ]}
      resizeMode="contain"
    />
    {hasBadge && (
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 7.5,
          height: 7.5,
          borderRadius: 4,
          backgroundColor: COLORS.yellow,
          borderWidth: 1.2,
          borderColor: COLORS.background || '#FFFFFF',
        }}
      />
    )}
  </View>
);

export const BellIcon = HeaderBell;

export const CAR_NAV_ICON = require('./car_nav.webp');
export const CALENDAR_RIDES_ICON = require('./calendar_rides.webp');
export const ALERTS_NAV_ICON = require('./alerts_nav.webp');
export const PROFILE_NAV_ICON = require('./profile_nav.webp');
export const PROMO_DISCOUNT_ICON = require('./promo_discount.webp');
export const PERSON_ICON = require('./person.webp');
export const CHEVRON_RIGHT_ICON = require('./chevron_right.webp');
export const CROSS_CIRCLE_ICON = require('./cross_circle.webp');
export const CANCEL_WARNING_ICON = require('./cancel_warning.webp');
export const PICKUP_DOT_ICON = require('./pickup_dot.webp');
export const CAR_BADGE_ICON = require('./car_badge.webp');
export const XCAB_X_LOGO = require('./xcab_x_logo.webp');
export const ARROW_RIGHT_ICON = require('./arrow_right.webp');

/**
 * XCabXLogo component using WebP image asset
 */
export const XCabXLogo = ({ size = 24, style }) => (
  <Image
    source={XCAB_X_LOGO}
    style={[
      {
        width: size * 0.9,
        height: size,
      },
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * ArrowRightIcon component using WebP image asset
 */
export const ArrowRightIcon = ({ size = 16, color, style }) => (
  <Image
    source={ARROW_RIGHT_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * CarBadgeIcon component using WebP image asset
 */
export const CarBadgeIcon = ({ size = 18, color, style }) => (
  <Image
    source={CAR_BADGE_ICON}
    style={[
      {
        width: size,
        height: size * 0.75,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * PickupIndicator / PickupDotIcon component using WebP image asset
 */
export const PickupIndicator = ({ size = 22, style }) => (
  <Image
    source={PICKUP_DOT_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      style,
    ]}
    resizeMode="contain"
  />
);

export const PickupDotIcon = PickupIndicator;

/**
 * CarNavIcon component using WebP image asset
 */
export const CarNavIcon = ({ size = 24, color, style }) => (
  <Image
    source={CAR_NAV_ICON}
    style={[
      {
        width: size,
        height: size * 0.8,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * CalendarRidesIcon component using WebP image asset
 */
export const CalendarRidesIcon = ({ size = 22, color, style }) => (
  <Image
    source={CALENDAR_RIDES_ICON}
    style={[
      {
        width: size * 0.85,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * AlertsNavIcon component using WebP image asset with optional badge
 */
export const AlertsNavIcon = ({ size = 22, color, badge, style }) => (
  <View style={[{ width: size + 4, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
    <Image
      source={ALERTS_NAV_ICON}
      style={[
        {
          width: size,
          height: size,
        },
        color ? { tintColor: color } : null,
      ]}
      resizeMode="contain"
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

/**
 * ProfileNavIcon component using WebP image asset
 */
export const ProfileNavIcon = ({ size = 22, color, style }) => (
  <Image
    source={PROFILE_NAV_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * PromoDiscountIcon component using WebP image asset
 */
export const PromoDiscountIcon = ({ size = 36, style }) => (
  <Image
    source={PROMO_DISCOUNT_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * PersonIcon component using WebP image asset
 */
export const PersonIcon = ({ size = 12, color, style }) => (
  <Image
    source={PERSON_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * ChevronRight component using WebP image asset
 */
export const ChevronRight = ({ size = 14, color, style }) => (
  <Image
    source={CHEVRON_RIGHT_ICON}
    style={[
      {
        width: size * 0.6,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const ChevronRightIcon = ChevronRight;

/**
 * CrossCircleIcon component using WebP image asset
 */
export const CrossCircleIcon = ({ size = 18, color, style }) => (
  <Image
    source={CROSS_CIRCLE_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * CancelIconBadge component using WebP image asset
 */
export const CancelIconBadge = ({ size = 42, style }) => (
  <Image
    source={CANCEL_WARNING_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      style,
    ]}
    resizeMode="contain"
  />
);

export const CancelWarningIcon = CancelIconBadge;

// Profile WebP icon assets
export const RECEIPT_ICON = require('./receipt_icon.webp');
export const EMERGENCY_SHIELD_ICON = require('./emergency_shield.webp');
export const HELP_SAFETY_ICON = require('./help_safety.webp');
export const SETTINGS_GEAR_ICON = require('./settings_gear.webp');
export const USER_ICON = require('./user_icon.webp');
export const GLOBE_ICON = require('./globe_icon.webp');
export const HELP_CIRCLE_ICON = require('./help_circle.webp');
export const CHAT_BUBBLE_ICON = require('./chat_bubble.webp');
export const INFO_CIRCLE_ICON = require('./info_circle.webp');
export const LOGOUT_ICON = require('./logout_icon.webp');
export const BACK_ARROW_ICON = require('./back_arrow.webp');
export const CLOSE_X_ICON = require('./close_x.webp');
export const GENDER_ICON = require('./gender_icon.webp');
export const MALE_ICON = require('./male_icon.webp');
export const FEMALE_ICON = require('./female_icon.webp');
export const OTHER_GENDER_ICON = require('./other_gender_icon.webp');
export const CALENDAR_FIELD_ICON = require('./calendar_field.webp');
export const PHONE_ICON = require('./phone_icon.webp');
export const MAIL_ICON = require('./mail_icon.webp');
export const CITY_ICON = require('./city_icon.webp');
export const CAMERA_ICON = require('./camera_icon.webp');
export const VERIFIED_BADGE_ICON = require('./verified_badge.webp');
export const CHECK_MARK_ICON = require('./check_mark.webp');
export const CHEVRON_LEFT_ICON = require('./chevron_left.webp');
export const CHEVRON_DOWN_ICON = require('./chevron_down.webp');
export const NIGHT_LOCK_ICON = require('./night_lock.webp');
export const PLUS_ICON = require('./plus_icon.webp');
export const TRASH_ICON = require('./trash_icon.webp');
export const NAVIGATION_ARROW_ICON = require('./navigation_arrow.webp');
export const LOCK_PRIVACY_ICON = require('./lock_privacy.webp');
export const GREEN_PICKUP_DOT_ICON = require('./green_pickup_dot.webp');
export const RED_DROP_PIN_ICON = require('./red_drop_pin.webp');
export const CASH_ICON = require('./cash_icon.webp');
export const UPI_BOLT_ICON = require('./upi_bolt.webp');
export const CHECK_CIRCLE_GREEN_ICON = require('./check_circle_green.webp');

/**
 * ReceiptIcon component using WebP image asset
 */
export const ReceiptIcon = ({ size = 18, color, style }) => (
  <Image
    source={RECEIPT_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * EmergencyShieldIcon / EmergencyIcon / ShieldSosIcon component using WebP image asset
 */
export const EmergencyShieldIcon = ({ size = 18, color, style }) => (
  <Image
    source={EMERGENCY_SHIELD_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const EmergencyIcon = EmergencyShieldIcon;
export const ShieldSosIcon = EmergencyShieldIcon;

/**
 * HelpSafetyIcon / HelpIcon component using WebP image asset
 */
export const HelpSafetyIcon = ({ size = 18, color, style }) => (
  <Image
    source={HELP_SAFETY_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const HelpIcon = HelpSafetyIcon;

/**
 * SettingsGearIcon / SettingsIcon component using WebP image asset
 */
export const SettingsGearIcon = ({ size = 18, color, style }) => (
  <Image
    source={SETTINGS_GEAR_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const SettingsIcon = SettingsGearIcon;

/**
 * UserIcon / UserFieldIcon component using WebP image asset
 */
export const UserIcon = ({ size = 18, color, style }) => (
  <Image
    source={USER_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const UserFieldIcon = UserIcon;

/**
 * GlobeIcon component using WebP image asset
 */
export const GlobeIcon = ({ size = 18, color, style }) => (
  <Image
    source={GLOBE_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * HelpCircleIcon component using WebP image asset
 */
export const HelpCircleIcon = ({ size = 18, color, style }) => (
  <Image
    source={HELP_CIRCLE_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * ChatBubbleIcon / MessageChatIcon component using WebP image asset
 */
export const ChatBubbleIcon = ({ size = 18, color, style }) => (
  <Image
    source={CHAT_BUBBLE_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const MessageChatIcon = ChatBubbleIcon;

/**
 * InfoCircleIcon component using WebP image asset
 */
export const InfoCircleIcon = ({ size = 18, color, style }) => (
  <Image
    source={INFO_CIRCLE_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * LogoutIcon component using WebP image asset
 */
export const LogoutIcon = ({ size = 18, color, style }) => (
  <Image
    source={LOGOUT_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * BackArrowIcon component using WebP image asset
 */
export const BackArrowIcon = ({ size = 18, color, style }) => (
  <Image
    source={BACK_ARROW_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * CloseIcon / CloseXIcon component using WebP image asset
 */
export const CloseIcon = ({ size = 14, color, style }) => (
  <Image
    source={CLOSE_X_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const CloseXIcon = CloseIcon;

/**
 * GenderIcon / GenderFieldIcon component using WebP image asset
 */
export const GenderIcon = ({ size = 18, color, style }) => (
  <Image
    source={GENDER_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const GenderFieldIcon = GenderIcon;

/**
 * MaleIcon component using WebP image asset
 */
export const MaleIcon = ({ size = 18, color, style }) => (
  <Image
    source={MALE_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * FemaleIcon component using WebP image asset
 */
export const FemaleIcon = ({ size = 18, color, style }) => (
  <Image
    source={FEMALE_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * OtherGenderIcon / OtherIcon component using WebP image asset
 */
export const OtherGenderIcon = ({ size = 18, color, style }) => (
  <Image
    source={OTHER_GENDER_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const OtherIcon = OtherGenderIcon;

/**
 * CalendarFieldIcon / CalendarBadgeIcon component using WebP image asset
 */
export const CalendarFieldIcon = ({ size = 18, color, style }) => (
  <Image
    source={CALENDAR_FIELD_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const CalendarBadgeIcon = CalendarFieldIcon;

/**
 * PhoneIcon / PhoneFieldIcon component using WebP image asset
 */
export const PhoneIcon = ({ size = 18, color, style }) => (
  <Image
    source={PHONE_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const PhoneFieldIcon = PhoneIcon;

/**
 * MailIcon / MailFieldIcon component using WebP image asset
 */
export const MailIcon = ({ size = 18, color, style }) => (
  <Image
    source={MAIL_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const MailFieldIcon = MailIcon;

/**
 * CityIcon / CityFieldIcon component using WebP image asset
 */
export const CityIcon = ({ size = 18, color, style }) => (
  <Image
    source={CITY_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const CityFieldIcon = CityIcon;

/**
 * CameraIcon component using WebP image asset
 */
export const CameraIcon = ({ size = 16, color, style }) => (
  <Image
    source={CAMERA_ICON}
    style={[
      {
        width: size,
        height: size * 0.8,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * VerifiedBadge component using WebP image asset
 */
export const VerifiedBadge = ({ size = 16, style }) => (
  <Image
    source={VERIFIED_BADGE_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * CheckMarkIcon / CheckVectorIcon component using WebP image asset
 */
export const CheckMarkIcon = ({ size = 14, color, style }) => (
  <Image
    source={CHECK_MARK_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const CheckVectorIcon = CheckMarkIcon;

/**
 * ChevronLeftIcon component using WebP image asset
 */
export const ChevronLeftIcon = ({ size = 14, color, style }) => (
  <Image
    source={CHEVRON_LEFT_ICON}
    style={[
      {
        width: size * 0.6,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * ChevronDownIcon component using WebP image asset
 */
export const ChevronDownIcon = ({ size = 12, color, style }) => (
  <Image
    source={CHEVRON_DOWN_ICON}
    style={[
      {
        width: size,
        height: size * 0.6,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * NightLockIcon / MoonOrLockIcon component using WebP image asset
 */
export const NightLockIcon = ({ size = 16, color, style }) => (
  <Image
    source={NIGHT_LOCK_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const MoonOrLockIcon = NightLockIcon;

/**
 * PlusIcon component using WebP image asset
 */
export const PlusIcon = ({ size = 16, color, style }) => (
  <Image
    source={PLUS_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * TrashIcon component using WebP image asset
 */
export const TrashIcon = ({ size = 16, color, style }) => (
  <Image
    source={TRASH_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * NavigationArrowIcon component using WebP image asset
 */
export const NavigationArrowIcon = ({ size = 18, color, style }) => (
  <Image
    source={NAVIGATION_ARROW_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * LockPrivacyIcon / LockIcon component using WebP image asset
 */
export const LockPrivacyIcon = ({ size = 14, color, style }) => (
  <Image
    source={LOCK_PRIVACY_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

export const LockIcon = LockPrivacyIcon;

/**
 * GreenPickupDot component using WebP image asset
 */
export const GreenPickupDot = ({ size = 10, style }) => (
  <Image
    source={GREEN_PICKUP_DOT_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * RedDropPin component using WebP image asset
 */
export const RedDropPin = ({ size = 12, style }) => (
  <Image
    source={RED_DROP_PIN_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * CashIcon component using WebP image asset
 */
export const CashIcon = ({ size = 16, color, style }) => (
  <Image
    source={CASH_ICON}
    style={[
      {
        width: size * 1.25,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * UpiBoltIcon component using WebP image asset
 */
export const UpiBoltIcon = ({ size = 14, color, style }) => (
  <Image
    source={UPI_BOLT_ICON}
    style={[
      {
        width: size * 0.75,
        height: size,
      },
      color ? { tintColor: color } : null,
      style,
    ]}
    resizeMode="contain"
  />
);

/**
 * CheckCircleGreenIcon component using WebP image asset
 */
export const CheckCircleGreenIcon = ({ size = 12, style }) => (
  <Image
    source={CHECK_CIRCLE_GREEN_ICON}
    style={[
      {
        width: size,
        height: size,
      },
      style,
    ]}
    resizeMode="contain"
  />
);

export default {
  GoogleIcon,
  IndiaFlagIcon,
  ClockIcon,
  PencilIcon,
  EditIcon,
  SearchIcon,
  GpsTargetIcon,
  HomeIcon,
  WorkIcon,
  StarIcon,
  RefreshIcon,
  LocationPin,
  LocationPinIcon,
  DestinationPin,
  DestinationPinIcon,
  HeaderBell,
  CarNavIcon,
  CalendarRidesIcon,
  AlertsNavIcon,
  ProfileNavIcon,
  PromoDiscountIcon,
  PersonIcon,
  ChevronRight,
  ChevronRightIcon,
  CrossCircleIcon,
  CancelIconBadge,
  CancelWarningIcon,
  PickupIndicator,
  PickupDotIcon,
  CarBadgeIcon,
  XCabXLogo,
  ArrowRightIcon,
  ReceiptIcon,
  EmergencyShieldIcon,
  EmergencyIcon,
  ShieldSosIcon,
  HelpSafetyIcon,
  HelpIcon,
  SettingsGearIcon,
  SettingsIcon,
  UserIcon,
  UserFieldIcon,
  GlobeIcon,
  HelpCircleIcon,
  ChatBubbleIcon,
  MessageChatIcon,
  InfoCircleIcon,
  LogoutIcon,
  BackArrowIcon,
  CloseIcon,
  CloseXIcon,
  GenderIcon,
  GenderFieldIcon,
  MaleIcon,
  FemaleIcon,
  OtherGenderIcon,
  OtherIcon,
  CalendarFieldIcon,
  CalendarBadgeIcon,
  PhoneIcon,
  PhoneFieldIcon,
  MailIcon,
  MailFieldIcon,
  CityIcon,
  CityFieldIcon,
  CameraIcon,
  VerifiedBadge,
  CheckMarkIcon,
  CheckVectorIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  NightLockIcon,
  MoonOrLockIcon,
  PlusIcon,
  TrashIcon,
  NavigationArrowIcon,
  LockPrivacyIcon,
  LockIcon,
  GreenPickupDot,
  RedDropPin,
  CashIcon,
  UpiBoltIcon,
  CheckCircleGreenIcon,
  GOOGLE_ICON,
  INDIA_FLAG_ICON,
  CLOCK_ICON,
  PENCIL_ICON,
  SEARCH_ICON,
  GPS_TARGET_ICON,
  HOME_ICON,
  WORK_ICON,
  STAR_ICON,
  REFRESH_ICON,
  LOCATION_PIN_ICON,
  DESTINATION_PIN_ICON,
  BELL_ICON,
  CAR_NAV_ICON,
  CALENDAR_RIDES_ICON,
  ALERTS_NAV_ICON,
  PROFILE_NAV_ICON,
  PROMO_DISCOUNT_ICON,
  PERSON_ICON,
  CHEVRON_RIGHT_ICON,
  CROSS_CIRCLE_ICON,
  CANCEL_WARNING_ICON,
  PICKUP_DOT_ICON,
  CAR_BADGE_ICON,
  XCAB_X_LOGO,
  ARROW_RIGHT_ICON,
  RECEIPT_ICON,
  EMERGENCY_SHIELD_ICON,
  HELP_SAFETY_ICON,
  SETTINGS_GEAR_ICON,
  USER_ICON,
  GLOBE_ICON,
  HELP_CIRCLE_ICON,
  CHAT_BUBBLE_ICON,
  INFO_CIRCLE_ICON,
  LOGOUT_ICON,
  BACK_ARROW_ICON,
  CLOSE_X_ICON,
  GENDER_ICON,
  MALE_ICON,
  FEMALE_ICON,
  OTHER_GENDER_ICON,
  CALENDAR_FIELD_ICON,
  PHONE_ICON,
  MAIL_ICON,
  CITY_ICON,
  CAMERA_ICON,
  VERIFIED_BADGE_ICON,
  CHECK_MARK_ICON,
  CHEVRON_LEFT_ICON,
  CHEVRON_DOWN_ICON,
  NIGHT_LOCK_ICON,
  PLUS_ICON,
  TRASH_ICON,
  NAVIGATION_ARROW_ICON,
  LOCK_PRIVACY_ICON,
  GREEN_PICKUP_DOT_ICON,
  RED_DROP_PIN_ICON,
  CASH_ICON,
  UPI_BOLT_ICON,
  CHECK_CIRCLE_GREEN_ICON,
};


