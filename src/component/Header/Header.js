import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../assets/images';
import COLORS from '../../assets/colors';
import { HeaderBell } from '../../assets/icons/Icons';

const Header = ({
  navigation,
  title,
  showAvatar = true,
  onAvatarPress,
  avatarSource = images.avatar,
  showNotification = true,
  onNotificationPress,
  hasNotificationBadge = true,
  showLogo = true,
  logoText = 'XCAB',
  leftComponent,
  rightComponent,
  safeAreaTop = true,
  style,
}) => {
  const insets = useSafeAreaInsets();

  const handleLogoPress = () => {
    if (navigation?.navigate) {
      navigation.navigate('Home');
    }
  };

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else if (navigation?.navigate) {
      navigation.navigate('Alerts');
    }
  };

  const handleAvatarPress = () => {
    if (onAvatarPress) {
      onAvatarPress();
    } else if (navigation?.navigate) {
      navigation.navigate('Profile');
    }
  };

  const topInset = safeAreaTop
    ? Math.max(insets?.top || 0, Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0)
    : 0;
  const computedPaddingTop = topInset + 14;

  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop: computedPaddingTop,
        },
        style,
      ]}
    >
      {/* Left: Brand Logo / Custom component */}
      {leftComponent ? (
        leftComponent
      ) : showLogo ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLogoPress}
          style={title ? styles.leftWithTitle : styles.leftContainer}
        >
          <Text style={title ? styles.logoTextSmall : styles.logoText}>
            {logoText}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}

      {/* Center: Optional Title */}
      {title ? (
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>
      ) : null}

      {/* Right: Custom right component / Bell + Avatar / Spacer */}
      {rightComponent ? (
        rightComponent
      ) : (
        <View style={styles.rightActionsRow}>
          {showNotification && (
            <TouchableOpacity
              style={styles.bellButton}
              activeOpacity={0.7}
              onPress={handleNotificationPress}
            >
              <HeaderBell size={21} color={COLORS.textDark} hasBadge={hasNotificationBadge} />
            </TouchableOpacity>
          )}

          {showAvatar && (
            <TouchableOpacity
              style={styles.avatarButton}
              activeOpacity={0.8}
              onPress={handleAvatarPress}
            >
              <Image
                source={avatarSource}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}

          {!showNotification && !showAvatar && title ? (
            <View style={styles.spacer} />
          ) : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EBE1',
    zIndex: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftWithTitle: {
    minWidth: 55,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textDark,
    letterSpacing: 0.8,
  },
  logoTextSmall: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textDark,
    letterSpacing: -0.5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  rightActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellButton: {
    padding: 6,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: '#E2DDD0',
    overflow: 'hidden',
    backgroundColor: '#EAE5D8',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  spacer: {
    width: 55,
  },
});

export default Header;
