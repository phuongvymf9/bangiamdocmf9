import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { LinearGradient } from 'expo';

import { SolidColors, GradientColors } from '../../const/Colors';
import { Layout } from '../../const/Layout';

import TextStyles   from '../../css/TextStyles';
import AlignStyle   from '../../css/AlignStyle';

import { getEZAsync, getUserObjectAsync } from '../../utils/StorageUtils';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo  : null,
      ez        : ''
    }
  }

  _getUserInfo = async () => {
    let userInfo  = await getUserObjectAsync();
    let ez        = await getEZAsync();

    this.setState({
      userInfo,
      ez
    });
  }

  componentDidMount = () => {
    this._getUserInfo();
  };

  _UserInfo = () => {
    if (this.state.userInfo) {
      let { hoten, chucdanh } = this.state.userInfo;

      return (
        <View style = {AlignStyle.centerHorizontal}>
          <Text style={[TextStyles.medium, { color: 'white' }, css.paddingText]}>{hoten}</Text>
          <Text style={[TextStyle.normal, { color: 'white' }, css.paddingText]}>Tài khoản: {this.state.ez}</Text>
          <Text style={[TextStyle.small, { color: 'white', textAlign: 'center' }, css.paddingText]}>{chucdanh}</Text>
        </View>
      );

    } else {
      return (
        <View style={{ flexDirection: 'row' }}>
          <ActivityIndicator
            color = {SolidColors.secondary}
            size  = 'small'
            style = {{ marginRight: Layout.marginPaddingDefault }}
          />
          <Text style={[TextStyles.normal, { color: SolidColors.grey }]}>Đang tải thông tin ...</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <LinearGradient
        colors  = {GradientColors.backgroundColor.colors}
        start   = {GradientColors.backgroundColor.start}
        style   = {[css.vUserInfo, AlignStyle.middle]}
      >
        <Image
          source  = {require('../../assets/user-info.png')}
          style   = {css.imgIcon}
        />
        <View style = {[css.vInfoText]}>
          {this._UserInfo()}
        </View>
      </LinearGradient>
    );
  }
};

const css = StyleSheet.create({
  vUserInfo: {
    paddingTop: Layout.statusBarHeight,
  }
  , imgIcon: {
    width: 80,
    height: 80,
    marginTop: Layout.marginPaddingLarge
  }
  , vInfoText: {
    margin: Layout.marginPaddingDefault
  }
  , paddingText: {
    ...Platform.select({
      ios: {
        paddingBottom: 4
      },
      android: {
        paddingBottom: 2
      }
    }),
  }
});
