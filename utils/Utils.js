import { StackActions, NavigationActions } from "react-navigation";
import LogUtil, { printWarn } from "./LogUtil";
import { FileSystem } from 'expo';

export const respXml2Json = (xmlStr = "") => {
  let jsonString = xmlStr.match(/\{.*\:*\}/g);
  let jsonData = JSON.parse(jsonString[0]);

  return jsonData;
}

export const xoaKhoangTrangThua = (string = '') => {
  return string.replace(string.match(/\s+/i), ' ').trim();
}

export const checkMobiFoneNumber = (phone = '') => {
  if (phone.indexOf('+8490')  >= 0) return true;
  if (phone.indexOf('+8493')  >= 0) return true;
  if (phone.indexOf('+8489')  >= 0) return true;

  if (phone.indexOf('+8470') >= 0) return true;
  if (phone.indexOf('+8479') >= 0) return true;
  if (phone.indexOf('+8477') >= 0) return true;
  if (phone.indexOf('+8476') >= 0) return true;
  if (phone.indexOf('+8478') >= 0) return true;

  if (phone.indexOf('+84121') >= 0) return true;
  if (phone.indexOf('+84120') >= 0) return true;
  if (phone.indexOf('+84122') >= 0) return true;
  if (phone.indexOf('+84126') >= 0) return true;
  if (phone.indexOf('+84128') >= 0) return true;

  return false;
}

export const checkEz = (ez) => {
  if (!ez) return false;

  if (ez.startsWith('0')) ez = ez.substring(1, ez.length);

  // if (ez.length === 9) {
  //   let dauSo = ez.substring(0, 2);

  //   if (dauSo === '90') return true;
  //   if (dauSo === '93') return true;
  //   if (dauSo === '89') return true;

  //   if (dauSo === '70') return true;
  //   if (dauSo === '79') return true;
  //   if (dauSo === '77') return true;
  //   if (dauSo === '76') return true;
  //   if (dauSo === '78') return true;

  // } else if (ez.length === 10) {
  //   let dauSo = ez.substring(0, 3);

  //   if (dauSo === '121') return true;
  //   if (dauSo === '120') return true;
  //   if (dauSo === '122') return true;
  //   if (dauSo === '126') return true;
  //   if (dauSo === '128') return true;
  // }

  return true;
}

export const getResetAction = (routeName) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })],
  });

  return resetAction;
}

export const getResetActionWithParams = (routeName, params) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName, params })],
  });

  return resetAction;
}

export const getStringCurrentDate = () => {
  let today = new Date();
  let dd    = today.getDate();
  let mm    = today.getMonth() + 1; //January is 0!
  let yyyy  = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return dd + '/' + mm + '/' + yyyy; // dd/mm/yyyy
}

export const getStringFromDate = (date) => {
  let dd    = date.getDate();
  let mm    = date.getMonth() + 1; //January is 0!
  let yyyy  = date.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return dd + '/' + mm + '/' + yyyy; // dd/mm/yyyy
}

export const toMonthForCallApi = (stringDate) => {
  let arr;

  try {
    arr = stringDate.split('/');
  } catch (error) {
    printWarn('toMonthForCallApi', error);
    arr = getStringCurrentDate().split('/');
  }

  return arr[1] + arr[2];
}

export const getMinDate = () => {
  let date  = new Date();
  let yy    = date.getFullYear();
  let mm    = date.getMonth();

  switch (mm) {
    case 3: mm = 12; yy -= 1; break;
    case 2: mm = 11; yy -= 1; break;
    case 1: mm = 10; yy -= 1; break;
    default: mm -= 3;
  }

  let firstDay = new Date(yy, mm, 1);

  return firstDay;
}

export const getTextAvartarFromHoten = (hoten = '') => {
  let textAvartar, arrName, length, tenDem, ten, posTen;

  hoten     = xoaKhoangTrangThua(hoten);
  arrName   = hoten.split(' ');
  length    = arrName.length;

  posTen    = length - 1;           // STT phan tu mang cuoi cung
  ten       = arrName[posTen];      // Phan tu mang cuoi cung la ten
  tenDem    = arrName[posTen - 1];  // Phan tu mang cuoi cung - 1 la ten dem
  
  while (ten.substring(0, 1) === "(") {
    posTen  = posTen - 1;
    ten     = arrName[posTen];
    tenDem  = arrName[posTen - 1];
  }

  textAvartar = tenDem.substring(0, 1) + ten.substring(0, 1);

  return textAvartar.toUpperCase();
}

export const getTextAvartarFromTen = (ten = '') => {
  let textAvartar = ten.trim().substring(0, 1);

  return textAvartar.toUpperCase();
}

export function readBase64FromURI(uri = '', handleFinish) {
  FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingTypes.Base64 })
    .then(result => {
      handleFinish(result);
    })
    .catch(error => {
      console.error('readBase64FromURI', error);
    });
}

export async function readImageDiemDanhData(uri = '') {
  try {
    let data = await FileSystem.readAsStringAsync(uri);
    return data;
  } catch (error) {
    LogUtil.error('readImageDiemDanhData - ' + uri, error);
  }
}

export function imgDiemDanhFileName() {
  let today = new Date();
  let dd    = today.getDate();
  let mm    = today.getMonth() + 1; //January is 0!
  let yyyy  = today.getFullYear();
  let hour  = today.getHours();
  let min   = today.getMinutes();
  let sec   = today.getSeconds();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return '' + yyyy + dd + mm + hour + min + sec;
}

export function getRandomInt(min, max)  {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}