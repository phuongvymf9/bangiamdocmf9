import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Asset, Font } from "expo";

import { getUserObjectAsync } from '../utils/StorageUtils';

import LoginBG    from "../comps/background/LoginBG";
import LoginIcon  from "../comps/icon/LoginIcon";

import { Layout, FontSize } from '../const/Layout';
import { SolidColors }      from '../const/Colors';

import LogUtil, { printWarn } from '../utils/LogUtil';
import LocationUtil           from '../utils/LocationUtil';
import PermissionAndroid      from '../utils/PermissionAndroid';
import MenuStorage from '../storage/MenuStorage';
import { getUniqueId } from '../storage/UniqueIdStorage';

export default class AppLoading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading   : false,
      userInfo  : null,
      menus     : null,
      location  : null,
    }
  }

  static navigationOptions = {
    header: null
  }

  loadUserAsync = async () => {
    try {
      let userInfo = await getUserObjectAsync();

      if (userInfo) {
        this.setState({ userInfo });
      }
    } catch (error) {
      printWarn('loadUserAsync', error);
    }
  }

  checkUserLogin = () => {
    let { userInfo } = this.state;
    let { navigate } = this.props.navigation;
    
    userInfo ? navigate('Home') : navigate('Login');
  }

  async getFirstLocation() {
    await LocationUtil.getLocationAsync();
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialCommunityIcons.font,
        'roboto-light'  : require('../assets/fonts/Roboto-Light.ttf'),
        'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'roboto-italic' : require('../assets/fonts/Roboto-Italic.ttf'),
        'roboto-medium' : require('../assets/fonts/Roboto-Medium.ttf'),
        'roboto-bold'   : require('../assets/fonts/Roboto-Bold.ttf'),
        'adam-gorry'    : require('../assets/fonts/SVN-Adam-Gorry.ttf'),
        'agency-fb'     : require('../assets/fonts/SVN-Agency-FB-bold.ttf'),
      }),
      this.loadUserAsync(),
      MenuStorage.getMenuAsync(),
      getUniqueId()
    ]);
  };

  requestPermission() {
    // Request phone state permission: 
    PermissionAndroid.requestPhoneStatePermission(() => LogUtil.log("requestPhoneStatePermission", "ok"));
  }

  componentDidMount = async () => {
    await this._loadResourcesAsync();
    this.checkUserLogin();
    this.getFirstLocation();
    this.requestPermission();
  };

  render() {
    return (
      <View style = {css.container}>
        <LoginBG />
        <View style = {css.main}>
          <LoginIcon />
          <View style = {css.vIndicator}>
            <ActivityIndicator
              size  = 'small'
              color = {SolidColors.secondary}
              style = {{
                marginRight: Layout.marginPaddingDefault
              }}
            />
            <Text style = {[{ color: 'white', fontSize: FontSize.normalText }]}>Đang tải ...</Text>
          </View>
        </View>
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    flex: 1
  }
  , main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
  , vIndicator: {
    flexDirection: 'row',
    padding: Layout.marginPaddingDefault
  }
});