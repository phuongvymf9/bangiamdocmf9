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