import React, { Component } from 'react';
import { View, StyleSheet, ListView, StatusBar, Alert, TouchableOpacity, Text } from 'react-native';
import { Updates } from 'expo';

import UserInfo   from "../comps/mainmenu/UserInfo";
import MenuItem   from "../comps/mainmenu/MenuItem";
import AlignStyle from '../css/AlignStyle';
import HeaderUtil  from "../utils/HeaderUtil";
import { ApiAppTools, CheckOTP } from '../api/SoapApi';
import LogUtil from '../utils/LogUtil';
import { EZStore, clearStorage, getEZAsync, storeUserInfo } from '../utils/StorageUtils';
import { AppVersion, RELOAD_USERINFO_KEY } from '../const/AppConfig';
import MenuListUtil from '../utils/MenuListUtil';
import { Layout } from '../const/Layout';
import ShadowStyle from '../css/ShadowStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SolidColors } from '../const/Colors';
import TextStyles from '../css/TextStyles';
import LightLoading from '../comps/loading/LightLoading';
import { getStringCurrentDate } from '../utils/Utils';

export default class HomeScreen extends Component {
  static navigationOptions = HeaderUtil.createNullNavigationOptions();

  constructor(props) {
    super(props);

    this.state = {
      MenuList : []
    }

    this.MenuList         = this.props.navigation.state.params;
    this.dsMenu           = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this._gotoMenu        = this._gotoMenu.bind(this);
    this._renderMenuItem  = this._renderMenuItem.bind(this);
    this.checkAppVersion  = this.checkAppVersion.bind(this);
    this._onRefresh       = this._onRefresh.bind(this);
    this._refLoading      = this._refLoading.bind(this);
    this._updateAppManual = this._updateAppManual.bind(this);
    this._checkUpdateOTA  = this._checkUpdateOTA.bind(this);
    this.reloadUserInfoAsync = this.reloadUserInfoAsync.bind(this);
  }

  componentWillMount = async () => {
    let ez = await EZStore.getEZAsync();
    await this.loadMenuList(ez);
    await this._checkUpdateOTA();
  }

  componentDidMount = () => {
    this.checkAppVersion();
  }

  componentWillUnmount = () => {
    delete this.props;
    delete this.state;
    delete this.MenuList;
    delete this.dsMenu;
    delete this._gotoMenu;
    delete this._renderMenuItem;
    delete this.checkAppVersion;
    delete this._onRefresh;
    delete this._refLoading;
    delete this._updateAppManual;
    delete this._checkUpdateOTA;
    delete this.reloadUserInfoAsync;
  }

  // ===========================================================================================================

  // ===========================================================================================================

  loadMenuList = ez => {
    MenuListUtil.getMenuListByEz(ez, { online: false }, async (result) => {
      if (typeof result === 'string') {
        Alert.alert('THÔNG BÁO', result);
        await clearStorage();
        this.props.navigation.navigate('Login');
        return;
      }
      this.setState({ MenuList: result });
    });
  }

  reloadMenu = async (ez) => {
    this.Loading._show();

    await MenuListUtil.getMenuListByEz(ez, { online: true }, result => {
      this.Loading._hide();
      if (typeof result === 'string') {
        Alert.alert('THÔNG BÁO', result);
        return;
      }
      this.setState({ MenuList: result });
    });
  }

  checkAppVersion = async () => {
    let lat, lng, ez;

    lat = lng = 'toado';
    ez  = await EZStore.getEZAsync();

    ApiAppTools.CheckAppVersion(lat, lng, ez, AppVersion,
      reS => {
        LogUtil.log('checkAppVersion', reS);
        let result = reS.result;
        
        if (typeof result === 'object') {
          Alert.alert('THÔNG BÁO', result.message);

          if (result.action === 'LOGIN') {
            clearStorage();
            this.props.navigation.navigate('Login');
          }

        } else if (typeof result === 'string') {
          if (result !== 'OK') {
            Alert.alert(
              'THÔNG BÁO', result,
              [{ text: 'OK', onPress: this.checkAppVersion }]
            );
          }
        }
      },
      reE => {
        LogUtil.error('checkAppVersion', reE);
      }
    )
  }

  async reloadUserInfoAsync () {
    let eznumber = await getEZAsync();

    CheckOTP('toado', 'toado', 'Reload UserInfo', eznumber, RELOAD_USERINFO_KEY, getStringCurrentDate(),
      reS => {
        if (reS.result) {
          if (typeof reS.result === 'object') {
            storeUserInfo(JSON.stringify(reS.result)); // Save user info to local storage
            this.refs.UserInfoView._getUserInfo();
          }
        }
      },
      reE => {
        LogUtil.error('reloadUserInfoAsync', reE);
      }
    );
  }

  // ===========================================================================================================

  // ===========================================================================================================

  _gotoMenu       = (screenName)  => { this.props.navigation.navigate(screenName); }
  _goToTaiKhoan   = ()            => { this.props.navigation.navigate("UserInfo"); }
  _renderMenuItem = (rowData)     => { return <MenuItem data={rowData} onPress={this._gotoMenu} />; }
  _refLoading     = ref           => { this.Loading = ref; }

  _onRefresh = async () => {
    let ez = await EZStore.getEZAsync();
    this.reloadMenu(ez);
    this.reloadUserInfoAsync();
    this._checkUpdateOTA();
  }

  async _checkUpdateOTA() {
    // Update App manual
    if (!__DEV__) {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          Alert.alert(
            'THÔNG BÁO',
            'Manager MF9 đã có bản cập nhật mới. Bạn có muốn khởi động lại ứng dụng để cập nhật?',
            [
              { text: 'Không', onPress: () => { LogUtil.log('Alert update app manual', 'canceled') } },
              { text: 'Đồng ý', onPress: this._updateAppManual },
            ]
          );
        }
      } catch (error) {
        LogUtil.error('Update OTA', error);
      }
    }
  }

  async _updateAppManual() {
    await Updates.fetchUpdateAsync();
    Updates.reloadFromCache();
  }

  render() {
    return (
      <View style = {css.container} >
        <StatusBar barStyle = 'light-content' />
        <UserInfo ref = {'UserInfoView'} _goToTaiKhoan = {this._goToTaiKhoan.bind(this)} />
        <View style = {[css.vMainMenu, AlignStyle.middle]}>
          {
            this.state.MenuList ? 
              <ListView contentContainerStyle={css.list}
                dataSource          = {this.dsMenu.cloneWithRows(this.state.MenuList)}
                enableEmptySections = {true}
                renderRow           = {this._renderMenuItem}
                initialListSize     = {this.state.MenuList.length}
              />
              :
              null
          }
        </View>
        <TouchableOpacity 
          style   = {[css.btnReload, AlignStyle.middle, ShadowStyle.buttonSmall]}
          onPress = {this._onRefresh}
        >
          <Ionicons
            name  = {'md-sync'}
            color = {SolidColors.appBarColor}
            size  = {16}
          />
          <Text style = {[TextStyles.small, css.txtReload]}>Refresh</Text>
        </TouchableOpacity>
        <LightLoading ref = {this._refLoading} caption = {'Đang cập nhật lại Menu'}/>
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
  , vMainMenu: {
    backgroundColor: '#fff',
    flex: 1,
  }
  , list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: SolidColors.greyLight,
  }
  , btnReload: {
    flexDirection: 'row',
    paddingHorizontal: Layout.marginPaddingDefault,
    position: 'absolute',
    right: 0,
    backgroundColor: '#FFFFFF',
    height: 24,
    borderRadius: 12,
    marginTop: Layout.statusBarHeight + Layout.marginPaddingLarge,
    marginRight: Layout.marginPaddingSmall
  }
  , txtReload: {
    color: SolidColors.appBarColor,
    marginLeft: Layout.marginPaddingDefault
  }
});