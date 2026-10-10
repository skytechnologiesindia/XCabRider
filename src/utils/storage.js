import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Keys ek hi jagah define rahengi (Typo ka risk zero)
export const STORAGE_KEYS = {
  TOKEN: 'rider_access_token',
  ACCESS_TOKEN: 'rider_access_token',
  REFRESH_TOKEN: 'rider_refresh_token',
  PHONE: 'rider_phone',
  IS_LOGGED_IN: 'rider_is_logged_in',
  RIDER_DATA: 'rider_profile_data',
  DRIVER_DATA: 'rider_profile_data', // compatibility alias
  PROFILE_DATA: 'rider_profile_data',
  DEVICE_ID: 'rider_device_id',
};

// 2. Common Safe Helpers (JSON & Error handle ke sath)
export const storage = {
  // Data save karna
  setItem: async (key, value) => {
    try {
      const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (e) {
      console.error(`Storage set error for key ${key}:`, e);
      return false;
    }
  },

  // Data retrieve karna
  getItem: async (key, isJson = false) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) return null;
      return isJson ? JSON.parse(value) : value;
    } catch (e) {
      console.error(`Storage get error for key ${key}:`, e);
      return null;
    }
  },

  // Single item delete karna
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`Storage remove error for key ${key}:`, e);
      return false;
    }
  },

  // Logout ke waqt all auth data clear karna
  clearAuth: async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.PHONE,
        STORAGE_KEYS.IS_LOGGED_IN,
        STORAGE_KEYS.RIDER_DATA,
      ]);
      return true;
    } catch (e) {
      console.error('Storage clear error:', e);
      return false;
    }
  },
};

// 3. Helper convenience functions
export const clearAuthData = () => storage.clearAuth();

export const getStoredAuthData = async () => {
  try {
    const [accessToken, refreshToken, phone, isLoggedIn, rider] = await Promise.all([
      storage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
      storage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
      storage.getItem(STORAGE_KEYS.PHONE),
      storage.getItem(STORAGE_KEYS.IS_LOGGED_IN),
      storage.getItem(STORAGE_KEYS.RIDER_DATA, true),
    ]);

    return {
      accessToken,
      refreshToken,
      phone,
      isLoggedIn: isLoggedIn === 'true',
      rider,
    };
  } catch (error) {
    console.error('Error reading auth data from storage:', error);
    return null;
  }
};

export const getOrCreateDeviceId = async () => {
  try {
    let deviceId = await storage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (!deviceId) {
      deviceId = `rider-device-${Math.random().toString(36).substring(2, 10)}-${Date.now()}`;
      await storage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
    }
    return deviceId;
  } catch {
    return 'rider-device-id';
  }
};

export default storage;
