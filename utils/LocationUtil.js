import { Platform, Alert } from "react-native";
import { Constants, Location, Permissions } from 'expo';
import LogUtil from "./LogUtil";

const LocationMessage = {
  PermissionDenied: 'Permission to access location was denied!',
  LocationDisabled: 'Thiết bị của bạn chưa bật dịch vụ GPS.',
  NotDevice: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
};

/**
 * Hàm lấy vị trí: return [object] nếu thành công || return [string] nếu lỗi
 */
export const getLocationAsync = async () => {
  let result = '';

  // Check devices
  if (Platform.OS === 'android' && !Constants.isDevice) result = LocationMessage.NotDevice;

  // Check Permission
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') result = LocationMessage.PermissionDenied;

  // Get Location
  try {
    result = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
      maximumAge: 500
    });

  } catch (error) {
    result = LocationMessage.LocationDisabled;
  }

  return result;
};

/**
 * Hàm theo dõi vị trí
 */
export const watchLocationAsync = async (callback) => {
  // Check devices
  if (Platform.OS === 'android' && !Constants.isDevice) {
    Alert.alert('THÔNG BÁO', LocationMessage.NotDevice);
    return null;
  }

  // Check Permission
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    Alert.alert('THÔNG BÁO', LocationMessage.PermissionDenied);
    return null;
  }

  let optionLocation = {
    enableHighAccuracy  : false,
    timeInterval        : 500,
    // distanceInterval    : 100
  };

  let watchLocation;
  try {
    watchLocation = await Location.watchPositionAsync(optionLocation, result => {
      LogUtil.log('watchLocationAsync', result.coords);
      callback(result.coords);
    });
  } catch (error) {
    Alert.alert('THÔNG BÁO', LocationMessage.LocationDisabled);
    return null;
  }

  return watchLocation;
};

export default {
  getLocationAsync,
  watchLocationAsync
}

// =====================================================================================================
// VERSION 2 ===========================================================================================
// =====================================================================================================

export const watchLocationAsyncV2 = async (callback) => {
  // Check devices
  if (Platform.OS === 'android' && !Constants.isDevice) {
    Alert.alert('THÔNG BÁO', LocationMessage.NotDevice);
    return null;
  }

  // Check Permission
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    Alert.alert('THÔNG BÁO', LocationMessage.PermissionDenied);
    return null;
  }

  let optionLocation = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 0,
    distanceFilter: 1,
  };

  let watchLocation = navigator.geolocation.watchPosition(
    rs => {
      LogUtil.log('watchLocationAsyncV2 - OK', rs.coords);
      callback(rs.coords);
    },
    (error) => {
      LogUtil.log('watchLocationAsyncV2 - ERROR', error);
      Alert.alert('THÔNG BÁO', error.message);
    },
    optionLocation
  );
  
  return watchLocation;
}

export const clearWatchV2 = (idWatch)  => {
  navigator.geolocation.clearWatch(idWatch);
}