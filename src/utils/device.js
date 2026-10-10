import { Platform } from 'react-native';
import { getOrCreateDeviceId } from './storage';

/**
 * Returns platform formatted for backend API ('IOS' | 'ANDROID')
 */
export const getPlatform = () => {
  return Platform.OS === 'ios' ? 'IOS' : 'ANDROID';
};

/**
 * Returns formatted device metadata required for auth and tracking APIs
 * device.platform and device.appVersion ('1.0.3') are required.
 * fcmToken is optional; omitted if not available.
 */
export const getDeviceInfo = async (fcmToken = null) => {
  const deviceId = await getOrCreateDeviceId();
  const device = {
    deviceId,
    platform: getPlatform(),
    appVersion: '1.0.3',
  };

  if (fcmToken && typeof fcmToken === 'string' && fcmToken !== 'optional' && fcmToken.trim().length > 0) {
    device.fcmToken = fcmToken.trim();
  }

  return device;
};

export default {
  getPlatform,
  getDeviceInfo,
};
