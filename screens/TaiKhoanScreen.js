import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from "expo";

import { createSubNavigationOptions } from '../utils/HeaderUtil';
import { getUserObjectAsync, clearStorage } from '../utils/StorageUtils';
import { getTextAvartarFromHoten } from '../utils/Utils';

import { SolidColors, GradientColors } from '../const/Colors';
import { AvartarSize, Layout } from '../const/Layout';

import TextStyles from '../css/TextStyles';
import AlignStyle from '../css/AlignStyle';
import ShadowStyle from '../css/ShadowStyle';

export default class TaiKhoanScreen extends Component {
  static navigationOptions = createSubNavigationOptions('Thông tin tài khoản');

  constructor(props) {
    super(props);

    this.state = {
      avartarText : 'NV',
      userInfo    : null
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // ## FOR HANDLE EVENTS ## ----------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------

  setTextAvartar = async () => {
    let userInfo    = await getUserObjectAsync();
    let textAvartar = getTextAvartarFromHoten(userInfo.hoten);
    this.setState({
      avartarText : textAvartar,
      userInfo    : userInfo
    });
  }

  _onClickSignOut = async () => {
    // const { dispatch }  = this.props.navigation;
    // const resetAction   = getResetAction('Login');

    // await clearStorage();
    
    // dispatch(resetAction);
    
    await clearStorage();
    this.props.navigation.navigate('Login');
  }

  // ----------------------------------------------------------------------------------------------------------
  // ## FOR RENDER GUI ## -------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------

  _Avartar = () => {
    return (
      <View style = {[css.vAvartar, AlignStyle.middle]}>
        <LinearGradient
          colors  = {GradientColors.taiKhoanMenu.colors}
          start   = {GradientColors.taiKhoanMenu.start}
          style   = {[css.avartar, AlignStyle.middle]}
        >
          <Text style = {[TextStyles.avartar, { color: 'white' }]}>{this.state.avartarText}</Text>
        </LinearGradient>
      </View>
    );
  }

  _RowInfo = (title, contain, last) => {
    const border = last ? null : css.borderRowInfo;
    return (
      <View style = {[css.vRowInfo, border]}>
        <View style = {{ flex: .4 }}>
          <Text style = {[TextStyles.normal, { color: SolidColors.grey }]}>{title}</Text>
        </View>
        <View style = {[{ flex: .6 }, AlignStyle.centerVertical]}>
          <Text style = {TextStyles.normalBold}>{contain}</Text>
        </View>
      </View>
    );
  }

  _Info = () => {
    const { userInfo } = this.state;

    if (!userInfo) return (
      <View style = {[css.vInfo, ShadowStyle.component,]}>
      </View>
    );
    else return (
      <View style = {[css.vInfo, ShadowStyle.component,]}>
        <Text style = {[TextStyles.title, css.txtName]}> {userInfo.hoten} </Text>
        {this._RowInfo('Số EZ', userInfo.eznumber)}
        {this._RowInfo('Chức danh', userInfo.chucdanh)}
        {this._RowInfo('Userid', userInfo.userid)}
        {this._RowInfo('Mã nhân viên', userInfo.staff_code)}
        {this._RowInfo('Đơn vị', userInfo.tenchinhanh)}
        {this._RowInfo('Huyện', userInfo.tenhuyen)}
        {this._RowInfo('Mã huyện', userInfo.bhtt_area_code, true)}
      </View>
    );
  }

  _SignOut = () => {
    return (
      <TouchableOpacity
        onPress = {this._onClickSignOut.bind(this)}
        style   = {[css.btnSignOut, AlignStyle.centerHorizontal]}>
        <Text style = {[TextStyles.medium, { color: SolidColors.primaryRed }]}>Đăng xuất</Text>
      </TouchableOpacity>
    );
  }

  componentDidMount = () => {
    this.setTextAvartar();
  };

  render() {
    return (
      <ScrollView style={css.container}>
        {this._Avartar()}
        {this._Info()}
        {this._SignOut()}
      </ScrollView>
    );
  }
}

const css = StyleSheet.create({
  container: {
    backgroundColor: SolidColors.greyLight,
    flex: 1,
  }
  , vAvartar: {
    height: AvartarSize.avartarSize,
    zIndex: 1000,
    marginBottom: - (AvartarSize.avartarSize / 2),
    marginTop: Layout.marginPaddingDefault,
  }
  , avartar: {
    height: AvartarSize.avartarSize,
    width: AvartarSize.avartarSize,
    borderRadius: AvartarSize.avartarSize / 2,
  }
  , vInfo: {
    backgroundColor: 'white',
    borderRadius: Layout.menuItemBorderRadius,
    marginHorizontal: Layout.marginPaddingLarge,
    marginBottom: Layout.marginPaddingDefault,
    paddingTop: (AvartarSize.avartarSize / 2) + Layout.marginPaddingSmall,
    paddingHorizontal: Layout.marginPaddingLarge,
  }
  , btnSignOut: {
    padding: Layout.marginPaddingLarge,
    borderColor: SolidColors.borderColor,
    borderTopWidth: Layout.borderWidthDefault * 2,
    borderBottomWidth: Layout.borderWidthDefault * 2,
    backgroundColor: 'white',
    marginTop: Layout.marginPaddingDefault * 3
  }
  , vRowInfo: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: Layout.marginPaddingDefault
  }
  , borderRowInfo: {
    borderBottomWidth: Layout.borderWidthDefault,
    borderColor: SolidColors.borderColor,
  }
  , vColInfo: {
    flex: 1,
  }
  , txtName: {
    color: SolidColors.primary,
    textAlign: 'center',
    marginBottom: Layout.marginPaddingSmall
  }
});