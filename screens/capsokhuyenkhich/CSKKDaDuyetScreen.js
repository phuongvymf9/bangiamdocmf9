import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert, RefreshControl } from 'react-native';

import { printLog, printError }         from '../../utils/LogUtil';
import { getUserObjectAsync }           from '../../utils/StorageUtils';

import { Layout }           from '../../const/Layout';
import { SolidColors }      from '../../const/Colors';

import CapSoKhuyenKhichApi  from '../../api/CapSoKhuyenKhichApi';
import ListCSKK from '../../comps/capsokhuyenkhich/ListCSKK';

export default class CSKKDaDuyetscreen extends PureComponent {
  state = {
    listCSKK     : null,
    refreshing      : false,
  };

  async componentDidMount() {
    this.getListCSKKDaDuyet();
  }

  getListCSKKDaDuyet  = async () => {
    let userInfo = await getUserObjectAsync();

    CapSoKhuyenKhichApi.MNG_CSKK_GetList(userInfo.userid, 1,
      reS => {
        printLog('getListCSKKDaDuyet', reS);
        if (reS.result) {
            /////////////////////////// Kiem tra danh sach rong ///////////////////////////
            if(reS.result.length > 0){
              let listCSKK = reS.result;
              this.setState({ listCSKK: listCSKK });
            } else {
              this.setState({ listCSKK: "NODATA" });
            }
          } else if ((reS.error)){
            Alert.alert('THÔNG BÁO', 'Rất tiếc! Đã xảy ra lỗi trong quá trình tải danh sách thuê bao.' + reS.error);
          }
          //this.setState({ loading: false }); // ngưng thông báo
      },
      reE => {
        //this.setState({ loading: false }); // ngưng thông báo
        Alert.alert('THÔNG BÁO', 'Rất tiếc! Đã xảy ra lỗi trong quá trình tải danh sách thuê bao.\nVui lòng thử lại sau.');
        printError('getListCSKKDaDuyet', reE);
      }
    );
  }

  render(){
    return(
      <View style = {[css.container, AlignStyle.middle]}>
        <ScrollView 
          style     = {css.main}
          onScroll  = {this.handleScroll}
          scrollEventThrottle = {16}
          refreshControl  = {
            <RefreshControl
              refreshing  = {this.state.refreshing}
              onRefresh   = {this._onRefresh}
            />
          }>
            <ListCSKK
                data         = {this.state.listCSKK}
                navigate     = {this.props.navigation.navigate}
                reloadListDB = {this.getListCSKKDaDuyet} 
             />
        </ScrollView>
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  txtChonHuyen: {
    color: SolidColors.grey,
    textAlign: 'center',
    marginTop: Layout.marginPaddingDefault
  },
  txtNoData: {
    textAlign: 'center',
    color: SolidColors.grey
  }
});