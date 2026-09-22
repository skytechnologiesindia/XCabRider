import React from 'react';
import { Image } from 'react-native';

/**
 * XCAB Centralized Icon Registry
 * All icons in the application are registered here with clean, camelCase keys.
 */
export const icons = {
  // ==========================================
  // Navigation & Bottom Bar
  // ==========================================
  alertsNav: require('./icons/alerts_nav.webp'),
  calendarRides: require('./icons/calendar_rides.webp'),
  carNav: require('./icons/car_nav.webp'),
  profileNav: require('./icons/profile_nav.webp'),
  navigationArrow: require('./icons/navigation_arrow.webp'),

  // ==========================================
  // Arrows & Chevrons
  // ==========================================
  arrowRight: require('./icons/arrow_right.webp'),
  backArrow: require('./icons/back_arrow.webp'),
  chevronDown: require('./icons/chevron_down.webp'),
  chevronLeft: require('./icons/chevron_left.webp'),
  chevronRight: require('./icons/chevron_right.webp'),

  // ==========================================
  // Actions & Controls
  // ==========================================
  search: require('./icons/search.webp'),
  closeX: require('./icons/close_x.webp'),
  pencil: require('./icons/pencil.webp'),
  plusIcon: require('./icons/plus_icon.webp'),
  refreshIcon: require('./icons/refresh_icon.webp'),
  trashIcon: require('./icons/trash_icon.webp'),
  cameraIcon: require('./icons/camera_icon.webp'),

  // ==========================================
  // Map & Location Pins
  // ==========================================
  destinationPin: require('./icons/destination_pin.webp'),
  gpsTarget: require('./icons/gps_target.webp'),
  greenPickupDot: require('./icons/green_pickup_dot.webp'),
  locationPin: require('./icons/location_pin.webp'),
  pickupDot: require('./icons/pickup_dot.webp'),
  redDropPin: require('./icons/red_drop_pin.webp'),

  // ==========================================
  // User & Profile
  // ==========================================
  userIcon: require('./icons/user_icon.webp'),
  person: require('./icons/person.webp'),
  femaleIcon: require('./icons/female_icon.webp'),
  maleIcon: require('./icons/male_icon.webp'),
  genderIcon: require('./icons/gender_icon.webp'),
  otherGenderIcon: require('./icons/other_gender_icon.webp'),
  mailIcon: require('./icons/mail_icon.webp'),
  phoneIcon: require('./icons/phone_icon.webp'),
  cityIcon: require('./icons/city_icon.webp'),
  homeIcon: require('./icons/home_icon.webp'),
  workIcon: require('./icons/work_icon.webp'),
  verifiedBadge: require('./icons/verified_badge.webp'),

  // ==========================================
  // Status & Badges
  // ==========================================
  bellIcon: require('./icons/bell_icon.webp'),
  checkCircleGreen: require('./icons/check_circle_green.webp'),
  checkMark: require('./icons/check_mark.webp'),
  crossCircle: require('./icons/cross_circle.webp'),
  cancelWarning: require('./icons/cancel_warning.webp'),
  carBadge: require('./icons/car_badge.webp'),
  starIcon: require('./icons/star_icon.webp'),
  promoDiscount: require('./icons/promo_discount.webp'),

  // ==========================================
  // Security & Settings
  // ==========================================
  emergencyShield: require('./icons/emergency_shield.webp'),
  helpCircle: require('./icons/help_circle.webp'),
  helpSafety: require('./icons/help_safety.webp'),
  infoCircle: require('./icons/info_circle.webp'),
  lockPrivacy: require('./icons/lock_privacy.webp'),
  nightLock: require('./icons/night_lock.webp'),
  logoutIcon: require('./icons/logout_icon.webp'),
  settingsGear: require('./icons/settings_gear.webp'),
  chatBubble: require('./icons/chat_bubble.webp'),
  globeIcon: require('./icons/globe_icon.webp'),

  // ==========================================
  // Payment & Utilities
  // ==========================================
  cashIcon: require('./icons/cash_icon.webp'),
  upiBolt: require('./icons/upi_bolt.webp'),
  receiptIcon: require('./icons/receipt_icon.webp'),
  clock: require('./icons/clock.webp'),
  calendarField: require('./icons/calendar_field.webp'),
  indiaFlag: require('./icons/india_flag.webp'),
  google: require('./icons/google.webp'),
  xcabXLogo: require('./icons/xcab_x_logo.webp'),
};

// Standard helper component creator for JSX-style usages
const makeIcon = (sourceKey, defaultSize = 18, defaultRatio = 1) => {
  const IconComp = ({ size = defaultSize, color, style, ...props }) => (
    <Image
      source={icons[sourceKey]}
      style={[
        {
          width: size * defaultRatio,
          height: size,
        },
        color ? { tintColor: color } : null,
        style,
      ]}
      resizeMode="contain"
      {...props}
    />
  );
  return IconComp;
};

// Named Icon Component Exports for seamless compatibility
export const AlertsNavIcon = makeIcon('alertsNav', 22);
export const ArrowRightIcon = makeIcon('arrowRight', 18);
export const BackArrowIcon = makeIcon('backArrow', 18);
export const BellIcon = makeIcon('bellIcon', 20);
export const HeaderBell = BellIcon;

export const CalendarFieldIcon = makeIcon('calendarField', 18);
export const CalendarBadgeIcon = CalendarFieldIcon;
export const CalendarRidesIcon = makeIcon('calendarRides', 22);

export const CameraIcon = makeIcon('cameraIcon', 16, 1.25);
export const CancelWarningIcon = makeIcon('cancelWarning', 24);
export const CancelIconBadge = CancelWarningIcon;

export const CarBadgeIcon = makeIcon('carBadge', 18);
export const CarNavIcon = makeIcon('carNav', 22);
export const CashIcon = makeIcon('cashIcon', 16, 1.25);
export const ChatBubbleIcon = makeIcon('chatBubble', 18);
export const MessageChatIcon = ChatBubbleIcon;

export const CheckCircleGreenIcon = makeIcon('checkCircleGreen', 14);
export const CheckMarkIcon = makeIcon('checkMark', 14);
export const CheckVectorIcon = CheckMarkIcon;

export const ChevronDownIcon = makeIcon('chevronDown', 12, 1.6);
export const ChevronLeftIcon = makeIcon('chevronLeft', 16, 0.6);
export const ChevronRightIcon = makeIcon('chevronRight', 16, 0.6);
export const ChevronRight = ChevronRightIcon;

export const CityIcon = makeIcon('cityIcon', 18);
export const CityFieldIcon = CityIcon;

export const ClockIcon = makeIcon('clock', 16);
export const CloseIcon = makeIcon('closeX', 16);
export const CloseXIcon = CloseIcon;
export const CrossCircleIcon = makeIcon('crossCircle', 18);

export const DestinationPin = makeIcon('destinationPin', 18);
export const DestinationPinIcon = DestinationPin;

export const EmergencyShieldIcon = makeIcon('emergencyShield', 18);
export const EmergencyIcon = EmergencyShieldIcon;
export const ShieldSosIcon = EmergencyShieldIcon;

export const FemaleIcon = makeIcon('femaleIcon', 18);
export const GenderIcon = makeIcon('genderIcon', 18);
export const GenderFieldIcon = GenderIcon;
export const GlobeIcon = makeIcon('globeIcon', 18);

export const GoogleIcon = makeIcon('google', 20);
export const GpsTargetIcon = makeIcon('gpsTarget', 20);
export const GreenPickupDot = makeIcon('greenPickupDot', 10);
export const PickupIndicator = GreenPickupDot;
export const PickupDot = makeIcon('pickupDot', 12);
export const PickupDotIcon = PickupDot;

export const HelpCircleIcon = makeIcon('helpCircle', 18);
export const HelpSafetyIcon = makeIcon('helpSafety', 18);
export const HelpIcon = HelpSafetyIcon;

export const HomeIcon = makeIcon('homeIcon', 18);
export const IndiaFlagIcon = makeIcon('indiaFlag', 20, 1.33);
export const InfoCircleIcon = makeIcon('infoCircle', 18);

export const LocationPin = makeIcon('locationPin', 18);
export const LocationPinIcon = LocationPin;
export const LocationIcon = LocationPin;

export const LockPrivacyIcon = makeIcon('lockPrivacy', 16);
export const LockIcon = LockPrivacyIcon;
export const LogoutIcon = makeIcon('logoutIcon', 18);

export const MailIcon = makeIcon('mailIcon', 18);
export const MailFieldIcon = MailIcon;
export const MaleIcon = makeIcon('maleIcon', 18);

export const NavigationArrowIcon = makeIcon('navigationArrow', 18);
export const NightLockIcon = makeIcon('nightLock', 16);
export const MoonOrLockIcon = NightLockIcon;

export const OtherGenderIcon = makeIcon('otherGenderIcon', 18);
export const OtherIcon = OtherGenderIcon;

export const PencilIcon = makeIcon('pencil', 16);
export const EditIcon = PencilIcon;

export const PersonIcon = makeIcon('person', 18);
export const PhoneIcon = makeIcon('phoneIcon', 18);
export const PhoneFieldIcon = PhoneIcon;

export const PlusIcon = makeIcon('plusIcon', 16);
export const ProfileNavIcon = makeIcon('profileNav', 22);
export const PromoDiscountIcon = makeIcon('promoDiscount', 18);
export const ReceiptIcon = makeIcon('receiptIcon', 18);
export const RedDropPin = makeIcon('redDropPin', 14);
export const RefreshIcon = makeIcon('refreshIcon', 18);
export const SearchIcon = makeIcon('search', 18);
export const SettingsGearIcon = makeIcon('settingsGear', 18);
export const SettingsIcon = SettingsGearIcon;
export const StarIcon = makeIcon('starIcon', 16);
export const TrashIcon = makeIcon('trashIcon', 16);
export const UpiBoltIcon = makeIcon('upiBolt', 14, 0.75);
export const UserIcon = makeIcon('userIcon', 18);
export const UserFieldIcon = UserIcon;
export const VerifiedBadge = makeIcon('verifiedBadge', 16);
export const WorkIcon = makeIcon('workIcon', 18);
export const XCabXLogo = makeIcon('xcabXLogo', 24);

export default icons;
