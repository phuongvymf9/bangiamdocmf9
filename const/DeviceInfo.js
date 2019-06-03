import { NativeModules, Platform } from 'react-native';
import { Constants } from 'expo';
import { getUniqueId } from '../storage/UniqueIdStorage';

const isAndroid = Platform.OS === 'android';

const getImeis = (callback) => {
  if (__DEV__) callback('35467108081143');
  else if (isAndroid) NativeModules.MF9DeviceInfo.getFullImei(imeis => callback(imeis));
  else callback(Constants.deviceId);
}

const getImeisv02 = async (callback) => {
  try {
    if (isAndroid) {

      if (__DEV__) callback('35467108081143');
      else NativeModules.MF9DeviceInfo.getFullImei(imeis => callback(imeis));
      
    } else {
      let deviceId = await getUniqueId();
      callback(deviceId);
    }

  } catch (error) {
    throw error;
  }
}

let phoneStatePermission;
if (isAndroid && !__DEV__) phoneStatePermission = NativeModules.MF9DeviceInfo.phoneStatePermission;
else phoneStatePermission = true;

const requestPermission = (permission, requestCode, callback) => {
  if (__DEV__ || !isAndroid) callback(true);
  else NativeModules.MF9DeviceInfo.requestPermission(permission, requestCode, callback);
}

// export default {
//   getImeis              : Platform.OS === 'android' ? NativeModules.MF9DeviceInfo.getFullImei : null,
//   phoneStatePermission  : Platform.OS === 'android' ? NativeModules.MF9DeviceInfo.phoneStatePermission : null,
//   requestPermission     : Platform.OS === 'android' ? NativeModules.MF9DeviceInfo.requestPermission : null,
// }

export default {
  getImeis,
  phoneStatePermission,
  requestPermission,
  getImeisv02
};
