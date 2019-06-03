import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Alert, Platform } from 'react-native';

import LoginBG      from "../comps/background/LoginBG";
import LoginIcon    from "../comps/icon/LoginIcon";
import LoginForm    from "../comps/login/LoginForm";

import LoadingScreen  from "../screens/LoadingScreen";

import TextStyle      from "../css/TextStyles";

import { printLog }  from "../utils/LogUtil";

import { Login }      from "../api/SoapApi";

import { Layout }     from '../const/Layout';
import { dbRespMess } from '../const/AppConfig';
import DeviceInfo     from '../const/DeviceInfo';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  }

  // ## Handle Api -----------------------------------------------------------------------------------

  handleLogin = async (ez) => {
    let { navigate }  = this.props.navigation;

    /*
    let location      = await getLocationAsync();

    // Neu lay vi tri khong thanh cong
    if (typeof location === 'string') {
      this.showAlert(location);
      this.Loading._stop();
      return;
    }

    const { latitude, longitude } = location.coords;
    */

    // Xu ly khi dang nhap thanh cong
    const loginSuccess = (result) => {
      printLog('loginSuccess', { result });

      if (result.result === dbRespMess.messOK) {
        this.Loading._stop();
        navigate('OTP', { ez });

      } else if (result.result === dbRespMess.messPermission) {
        this.Loading._stop();
        this.showAlert('EZ của bạn không có quyền sử dụng app.');

      } else {
        this.showAlert(JSON.parse(result));
      }
    }

    // Xu ly khi dang nhap bi loi
    const loginError = (error) => {
      this.Loading._stop();
      this.showAlert(error);
    }

    // Xu ly dang nhap
    Login('latitude', 'longitude', ez, loginSuccess, loginError);
  }

  showAlert = (message) => {
    if (typeof message === 'object') message = JSON.parse(message);
    
    Alert.alert(
      'THÔNG BÁO',
      'Thực hiện không thành công.\n' + message
    );
  }

  // ## Handle Button -----------------------------------------------------------------------------------

  onDangNhap = (ez) => {
    const startLoading  = this.Loading._start;
    const login         = this.handleLogin;

    if (Platform.OS === 'android') {
      let phoneStateRequestPermission = 'android.permission.READ_PHONE_STATE';
      let phoneStateRequestCode = 100; // 100 = READ_PHONE_STATE

      DeviceInfo.requestPermission(phoneStateRequestPermission, phoneStateRequestCode, handleCallback);

      async function handleCallback(permissionStatus) {
        if (!permissionStatus) return;
        beginLogin();
      }

    } else {
      beginLogin();
    }

    function beginLogin(param) {
      // if (!checkEz(ez)) {
      //   Alert.alert('THÔNG BÁO', 'Số EZ chưa chính xác. Vui lòng kiểm tra lại.');
      //   return;
      // }

      startLoading();
      login(ez);
    }
  }

  // ## Handle Render  -----------------------------------------------------------------------------------

  render() {
    return (
      <KeyboardAvoidingView 
        behavior  = 'padding' 
        style     = {css.container}
      >
        <LoginBG />
        <View style = {css.main}>
          <LoginIcon />
          <Text style = {TextStyle.title}>Đăng nhập</Text>
          <Text style = {[TextStyle.small, css.txtMessage]}>
            Nhập EZ tính lương đối với nhân viên BHK & BHTT.{'\n'}
            Nhập số điện thoại trên hệ thống nhân sự đối với Chuyên viên GSKPP.
          </Text>
          <LoginForm 
            title           = "Số EZ" 
            action          = {this.onDangNhap.bind(this)} 
            placeholderText = 'Nhập số EZ' 
            buttonName      = 'Đăng nhập'
          />
        </View>
        <LoadingScreen ref = {ref => this.Loading = ref} />
      </KeyboardAvoidingView>
    );
  }
}

const css = StyleSheet.create({
  container: {
    flex: 1,
  }
  , main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
  , txtMessage: {
    color: 'white',
    fontStyle: 'italic',
    marginTop: Layout.marginPaddingDefault,
    textAlign: 'center',
    paddingHorizontal: Layout.marginPaddingLarge * 2
  }
});
