import { Platform } from 'react-native';
import DeviceInfo from "../const/DeviceInfo";

const requestPhoneStatePermission = (callback) => {
  if (Platform.OS === 'android') {
    let phoneStateRequestPermission = 'android.permission.READ_PHONE_STATE';
    let phoneStateRequestCode       = 100; // 100 = READ_PHONE_STATE

    DeviceInfo.requestPermission(phoneStateRequestPermission, phoneStateRequestCode, permissionStatus => {
      if (!permissionStatus) return;
      callback();
    });
  }
}

export default {
  requestPhoneStatePermission
}