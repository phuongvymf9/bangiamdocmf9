import { AsyncStorage } from "react-native";
import LogUtil, { printError } from "../utils/LogUtil";

/**
 * Hàm lưu dữ liệu vào Storage
 * @param {String} key Storage key
 * @param {Any} data Storage data
 */
const saveAsync = async (key, data, options = { showLog: true }) => {
  try {
    if (typeof data === 'object') data = JSON.stringify(data);
  } catch (error) {
    printError('## saveAsync', error);
  }

  let message     = `Data (${data}) save with key (${key}) => `;
  let resultBool  = false;

  try {
    await AsyncStorage.setItem(key, data);
    options.showLog && LogUtil.log('## saveAsync', message + 'OK');
    resultBool = true;
  } catch (error) {
    LogUtil.error('## saveAsync : ' + message + 'ERROR', error);
  }

  return resultBool;
}

/**
 * Hàm lấy dữ liệu từ Storage
 * @param {String} key Storage key
 */
const getAsync = async (key, options = { resultIsObject: false }) => {
  let data    = null;
  let message = `Data of key (${key}) is => `;

  try {
    data = await AsyncStorage.getItem(key);
    // LogUtil.log('## getAsync', message + data);
    if (data && options.resultIsObject) data = JSON.parse(data);
  } catch (error) {
    LogUtil.error('## getAsync : ' + message, error);
    console.warn(error);
  }

  return data;
}

const clearAsync = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    LogUtil.log('## clearAsync - ' + key, 'Success');
  } catch (error) {
    LogUtil.error('## clearAsync - ' + key, error);
  }
}

const clearAllStorageAsync = async () => {
  try {
    await AsyncStorage.clear();
    LogUtil.log('## clearAllStorageAsync', 'Success');
  } catch (error) {
    LogUtil.error('## clearAllStorageAsync', error);
  }
}

export default {
  saveAsync,
  getAsync,
  clearAllStorageAsync,
  clearAsync
}