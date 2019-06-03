import { AsyncStorage } from "react-native";
import LogUtil, { printWarn, printLog } from "./LogUtil";
import { resetMenuListCache } from "../const/AllCache";
import { getUniqueId, saveUniqueId } from "../storage/UniqueIdStorage";

const UserInfoKey   = '@UserInfo';
const ezKey         = UserInfoKey + '_ez'

// ----------------------------------------------------------------------------------------------------------
// ## APP CACHE ## ------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

let UserInfoCache   = null;  // [object]
let EZCache         = null;  // [string]
let EZNhanVienCache = null;  // [string]

// ----------------------------------------------------------------------------------------------------------
// ## USER INFORMATION ## -----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

export const getUserInfoCache = () => { return UserInfoCache; }

export const storeUserInfo = async (userInfo) => {
  try {
    // Save to app Cache
    UserInfoCache = JSON.parse(userInfo);
    // Save to AsyncStorage
    await AsyncStorage.setItem(UserInfoKey, userInfo);
  } catch (error) {
    printWarn('storeUserInfo', error);
  }
}

/**
 * Hàm lấy thông tin User [string]
 */
export const getUserInfoAsync = async () => {
  printLog('execute getUserInfoAsync');

  // Get from Cache If exist
  if (UserInfoCache) return JSON.stringify(UserInfoCache);

  // Get from AsyncStorage
  let userInfo = '';
  try {
    userInfo = await AsyncStorage.getItem(UserInfoKey);
  } catch (error) {
    printWarn('getUserInfoAsync', error);
  }

  return userInfo;
}

/**
 * Hàm lấy thông tin User [object]
 */
export const getUserObjectAsync = async () => {
  printLog('execute getUserObjectAsync');

  // Get from Cache If exist
  if (UserInfoCache) return UserInfoCache;
  // Get from AsyncStorage
  let userInfo = null;
  try {
    userInfo = await AsyncStorage.getItem(UserInfoKey);
    userInfo = JSON.parse(userInfo);
    UserInfoCache = userInfo;
  } catch (error) {
    printWarn('getUserInfoAsync', error);
  }

  return userInfo;
}

export const removeUserInfoAsync = async () => {
  try {
    UserInfoCache = null;
    await AsyncStorage.removeItem(UserInfoKey);
  } catch (error) {
    printWarn('removeUserInfoAsync', error);
  }
}

// ----------------------------------------------------------------------------------------------------------
// ## STORAGE EZ ## -----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

export const storeEZAsync = async (ez) => {
  try {
    await AsyncStorage.setItem(ezKey, ez);
    // Save to app cache
    EZCache = ez;
  } catch (error) {
    printWarn('storeEZAsync', error);
  }
}

export const getEZAsync = async () => {
  if (EZCache) return EZCache;

  let ez = '';
  try {
    ez = await AsyncStorage.getItem(ezKey);
    // Save to app cache
    EZCache = ez;
  } catch (error) {
    printWarn('getEZAsync', error);
  }

  return ez;
}

export const EZStore = {
  getEZAsync,
  storeEZAsync
}

// For Nhan vien of TNBH
export const setEZNhanVienCache = val => { EZNhanVienCache = val; }
export const getEZNhanVienCahce = ()  => { return EZNhanVienCache; }

// ----------------------------------------------------------------------------------------------------------
// ## STORAGE THONG TIN LUONG ## ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

const getLuongStorageKey = (loaiReport, ez, month) => {
  return `@LuongStorage_${ez}_${loaiReport}_${month}`;
};

export const saveLuongAsync = async (loaiReport, ez, month, val) => {
  const key = getLuongStorageKey(loaiReport, ez, month);

  if (typeof val === 'object') val = JSON.stringify(val);

  try {
    // Delete if luong existed
    const luong = await AsyncStorage.getItem(key);
    if (luong) await AsyncStorage.removeItem(key);

    // Save to storage
    await AsyncStorage.setItem(key, val);
    printLog('saveLuongAsync ok with key: ', key);
  } catch (error) {
    printWarn('saveLuongAsync', error);
  }
}

export const getLuongAsync = async (loaiReport, ez, month) => {
  const key = getLuongStorageKey(loaiReport, ez, month);
  let luong = '';

  try {
    luong = await AsyncStorage.getItem(key);
    printLog('getLuongAsync ok with key: ', key);
  } catch (error) {
    printWarn('getLuongAsync', error);
  }

  return luong;
}

export const deleteLuongAsync = async (loaiReport, ez, month) => {
  const key = getLuongStorageKey(loaiReport, ez, month);

  try {
    const luong = await AsyncStorage.getItem(key);
    if (luong) {
      await AsyncStorage.removeItem(key);
      printLog('deleteLuongAsync ok with key: ', key);
    }
  } catch (error) {
    printWarn('deleteLuongAsync', error);
  }
}

// ----------------------------------------------------------------------------------------------------------
// ## STORAGE THONG TIN LUONG ## ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

const dsnvPrefixKey = '@DSNV_';

export const DSNVStore = {
  createKey: function (ez, month) {
    return `${dsnvPrefixKey}_${ez}_${month}`;
  },

  saveAsync: async function (ez, month, val) {
    let key = this.createKey(ez, month);

    try {
      // Delete if exist
      let oldData = await AsyncStorage.getItem(key);
      if (oldData) await this.deleteAsync(key);

      // If is Oject -> parse to string
      if (typeof val === 'object') val = JSON.stringify(val);

      // Save value
      await AsyncStorage.setItem(key, val);
      printLog('DSNVStore.saveAsync', 'OK');
    } catch (error) {
      printWarn('DSNVStore.saveAsync', error);
    }
  },

  getObjectAsync: async function (ez, month) {
    let key = this.createKey(ez, month);

    try {
      let val = await AsyncStorage.getItem(key);
      printLog('DSNVStore.getObjectAsync', 'OK');

      return JSON.parse(val);

    } catch (error) {
      printWarn('DSNVStore.save', error);
      return [];
    }
  },

  deleteAsync: async function (key) {
    try {
      await AsyncStorage.removeItem(key);
      printLog('DSNVStore.deleteAsync', 'OK');
    } catch (error) {
      printWarn('DSNVStore.deleteAsync', error);
    }
  }
}

// ----------------------------------------------------------------------------------------------------------
// ## Than tai 3 khia ## ------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

const dmHuyenKey          = '@DMHuyen';
const currentMsHuyenKey   = '@MsHuyen';

let msHuyenCache          = 0;

/**
 * Save danh muc huyen to local storage
 * @param {JsonObject} data JSON dm huyen
 */
const saveDmHuyenAsync = async (data) => {
  console.log('exec saveDmHuyenAsync');

  if (typeof data !== 'object') throw new TypeError('data is not object');
  else {
    try {
      await AsyncStorage.setItem(dmHuyenKey, JSON.stringify(data));
    } catch (error) {
      LogUtil.warn('saveDmHuyenAsync', error);
    }
  }
}

/**
 * Get danh muc huyen from local storage
 * @returns {JsonObject} JSON danh muc huyen
 */
const getDmHuyenAsync = async () => {
  console.log('exec getDmHuyenAsync');

  try {
    let dmHuyenStr = await AsyncStorage.getItem(dmHuyenKey);
    return JSON.parse(dmHuyenStr);
    
  } catch (error) {
    LogUtil.warn('getDmHuyenAsync', error);
  }
}

const removeDmHuyenAsync = async () => {
  try {
    await AsyncStorage.removeItem(dmHuyenKey);
  } catch (error) {
    LogUtil.warn('removeDmHuyenAsync', error);
  }
}

const saveCurrentMsHuyen = async (mshuyen) => {
  try {
    await AsyncStorage.setItem(currentMsHuyenKey, mshuyen.toString());
    LogUtil.log('saveCurrentMsHuyen', 'MS Huyen ' + mshuyen + ' saved with key: ' + currentMsHuyenKey);
    
  } catch (error) {
    LogUtil.error('saveCurrentMsHuyen', error);
  }
}

const getCurrentMsHuyen = async () => {
  let result;

  try {
    result = msHuyenCache || await AsyncStorage.getItem(currentMsHuyenKey);
    LogUtil.log('getCurrentMsHuyen', 'Current Ms huyen: ' + result);

  } catch (error) {
    LogUtil.error('getCurrentMsHuyen', error);
  }

  return result;
}

const deleteCurrentMsHuyen = async () => {
  try {
    await AsyncStorage.removeItem(currentMsHuyenKey); // remove from storage
    msHuyenCache = 0; // remove cache

    LogUtil.log('deleteCurrentMsHuyen', 'MS Huyen removed with key: ' + currentMsHuyenKey);

  } catch (error) {
    LogUtil.error('deleteCurrentMsHuyen', error);
  }
}

export const QuayThuongStorage = {
  saveDmHuyenAsync,
  getDmHuyenAsync,
  removeDmHuyenAsync,
  // ----------------
  saveCurrentMsHuyen,
  getCurrentMsHuyen,
  deleteCurrentMsHuyen
}

// ----------------------------------------------------------------------------------------------------------
// ## Clear Storate AND Cache ## ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

export const clearStorage = async () => {
  try {
    // Clear cache
    UserInfoCache   = null;
    EZCache         = null;
    EZNhanVienCache = null;
    resetMenuListCache();

    let idBkp = await getUniqueId();

    await AsyncStorage.clear();
    await saveUniqueId(idBkp);
    
  } catch (error) {
    printWarn('clearStorage', error);
  }
}