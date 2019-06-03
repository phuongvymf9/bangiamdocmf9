import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from "expo";

import LoginBG from "../comps/background/LoginBG";
import LoginIcon from "../comps/icon/LoginIcon";
import LoginForm from "../comps/login/LoginForm";

import LoadingScreen from "../screens/LoadingScreen";

import TextStyle from "../css/TextStyles";
import { printWarn } from "../utils/LogUtil";
import { getStringCurrentDate, getResetActionWithParams } from '../utils/Utils';
import { storeUserInfo, storeEZAsync } from '../utils/StorageUtils';

import { Layout, FontSize } from '../const/Layout';
import { CheckOTP } from '../api/SoapApi';
import { getMenuListByStaffType } from '../utils/MenuListUtil';
import { dbRespMess } from '../const/AppConfig';

export default class OtpScreen extends Component {
  constructor(props) {
    super(props);

    this.ez = props.navigation.state.params.ez;
  }

  static navigationOptions = {
    header: null
  }

  // ## Handle Api --------------------------------------------------------------------------------------

  handleCheckOTP = async (ez, otp) => {
    const { navigate } = this.props.navigation;
    const strToDay = getStringCurrentDate();

    const checkSuccess = result => {
      this.Loading._stop();

      if (result.result === dbRespMess.messUserNotFound) {
        this.showAlert('Không tìm thấy thông tin nhân viên. Vui lòng kiểm tra lại số EZ.');

      } else if (result.result === dbRespMess.messPermission) {
        this.showAlert('EZ của bạn không có quyền sử dụng app.');

      } else if (result.error) {
        this.showAlert(result);

        // Dang Nhap thanh cong
      } else {
        const userinfo = result.result;
        storeEZAsync(ez);
        storeUserInfo(JSON.stringify(userinfo)); // Save user info to local storage
        navigate('Home');
      }
    }

    const checkError = error => {
      this.Loading._stop();
      this.showAlert(error);
      printWarn('checkError', error);
    }

    CheckOTP('latitude', 'longitude', Constants.deviceId, ez, otp, strToDay, checkSuccess, checkError);
  }

  showAlert = (message) => {
    message = typeof message === 'object' ? JSON.stringify(message) : message;
    Alert.alert(
      'THÔNG BÁO',
      'Thực hiện không thành công.\n' + message
    );
  }

  // ## Handle Button -----------------------------------------------------------------------------------

  checkOTPFormat = (otp = '') => {
    if (!otp) return false;
    if (otp.length !== 6) return false;

    try {
      const test = Number(otp);
      if (!test) return false;
    } catch (error) {
      return false;
    }

    return true;
  }

  onXacNhan = async (otp) => {
    if (!this.checkOTPFormat(otp)) {
      Alert.alert(
        'THÔNG BÁO',
        'Mã OTP chưa chính xác. Vui lòng kiểm tra lại.'
      );
      return;
    }

    this.Loading._start();
    await this.handleCheckOTP(this.ez, otp);
  }

  onBack = () => {
    const { goBack } = this.props.navigation;
    goBack();
  }

  // ## Handle Render  -----------------------------------------------------------------------------------

  _ButtonBack = () => {
    return (
      <TouchableOpacity style={css.btnBack} onPress={this.onBack.bind(this)}>
        <Ionicons
          name  = 'ios-arrow-back-outline'
          color = 'white'
          size  = {FontSize.iconSizeWithNormalText}
        />
        <Text style = {[TextStyle.normal, { color: 'white', marginLeft: Layout.marginPaddingDefault }]}>Trở về</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={css.container} >
        <LoginBG />
        <View style = {css.main}>
          <LoginIcon />
          <Text style = {TextStyle.title}>Đăng nhập</Text>
          <Text style = {[TextStyle.normal, css.txtMessage, { textAlign: 'center' }]}>
            Bạn sẽ nhận được mã OTP qua SMS.{'\n'}Vui lòng nhập mã vào ô bên dưới.
          </Text>
          <LoginForm 
            title           = "Mã OTP" 
            action          = {this.onXacNhan.bind(this)} 
            buttonName      = 'Xác nhận' 
            placeholderText = 'Nhập mã OTP'
          />
        </View>
        {this._ButtonBack()}
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
    marginTop: Layout.marginPaddingDefault
  }
  , btnBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    padding: Layout.marginPaddingDefault,
    marginTop: 30,
  }
});
