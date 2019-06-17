import React, { PureComponent } from 'react';
import { View, StyleSheet, ScrollView, Alert, RefreshControl } from 'react-native';

import { printLog, printError }  from '../../utils/LogUtil';
import { getUserObjectAsync }    from '../../utils/StorageUtils';

import { Layout }           from '../../const/Layout';
import { SolidColors }      from '../../const/Colors';

import CapSoKhuyenKhichApi  from '../../api/CapSoKhuyenKhichApi';

import SmallLoading         from '../../comps/loading/SmallLoading';
import ListKPS              from '../../comps/khoiphucso/ListKPS';
import { RegularText }      from '../../comps/comp-chung/StyledText';

export default class KPSDaDuyetscreen extends PureComponent {
  state = {
    listKPS        : [],
    refreshing      : false,
    loading         : false,
  };

  async componentDidMount() {
    this.getListKPSChuaDuyet();
  }

  getListKPSChuaDuyet = async () => {
    let userInfo = await getUserObjectAsync();

    this.setState({loading: true});
    CapSoKhuyenKhichApi.MNG_CSKK_GetList(userInfo.userid, 1,
      reS => {
        printLog('getListKPSChuaDuyet', reS);
        if (reS.result) {
            /////////////////////////// Kiem tra danh sach rong ///////////////////////////
            if(reS.result.length > 0){
              let listKPS = reS.result;
              this.setState({ listKPS: listKPS });
            } else {
              this.setState({ listKPS: "NODATA" });
            }
          } else if ((reS.error)){
            Alert.alert('THÔNG BÁO', 'Rất tiếc! Đã xảy ra lỗi trong quá trình tải danh sách thuê bao.' + reS.error);
          }
          this.setState({ loading: false }); // ngưng thông báo
      },
      reE => {
        this.setState({ loading: false }); // ngưng thông báo
        Alert.alert('THÔNG BÁO', 'Rất tiếc! Đã xảy ra lỗi trong quá trình tải danh sách thuê bao.\nVui lòng thử lại sau.');
        printError('getListKPSChuaDuyet', reE);
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
            {
              this.state.loading 
                ? <SmallLoading />
                : this.state.listCSKK === 'NODATA' 
                  ? <NoDataView /> 
                  : <ListKPS
                        data         = {this.state.listKPS}
                        navigate     = {this.props.navigation.navigate}
                        reloadListDB = {this.getListKPSChuaDuyet} 
                    />
            }
        </ScrollView>
      </View>
    );
  }
}

function NoDataView() {
  return (
    <RegularText style={css.txtNoData}>Không có dữ liệu. Vui lòng thử lại sau</RegularText>
  );
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
    color: SolidColors.primaryRed
  }
});