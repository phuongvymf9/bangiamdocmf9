import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert, RefreshControl } from 'react-native';

import { printLog, printError }  from '../../utils/LogUtil';
import { getUserObjectAsync }    from '../../utils/StorageUtils';

import { Layout }           from '../../const/Layout';
import { SolidColors }      from '../../const/Colors';

import CapSoKhuyenKhichApi  from '../../api/CapSoKhuyenKhichApi';

import SmallLoading         from '../../comps/loading/SmallLoading';
import ListCSKK             from '../../comps/capsokhuyenkhich/ListCSKK';
import { RegularText }      from '../../comps/comp-chung/StyledText';

export default class CSKKChoDuyetscreen extends PureComponent {
  state = {
    listCSKK        : null,
    refreshing      : false,
    loading         : false,
  };

  async componentDidMount() {
    this.getListCSKKChuaDuyet();
  }

  getListCSKKChuaDuyet  = async () => {
    let userInfo = await getUserObjectAsync();

    this.setState({loading: true});
    CapSoKhuyenKhichApi.MNG_CSKK_GetList(userInfo.userid, 0,
      reS => {
        printLog('getListCSKKChuaDuyet', reS);
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
          this.setState({ loading: false }); // ngưng thông báo
      },
      reE => {
        this.setState({ loading: false }); // ngưng thông báo
        Alert.alert('THÔNG BÁO', 'Rất tiếc! Đã xảy ra lỗi trong quá trình tải danh sách thuê bao.\nVui lòng thử lại sau.');
        printError('getListCSKKChuaDuyet', reE);
      }
    );
  }

  loadGoiCuocAsync = async (  ) => {
      let userInfo = await getUserObjectAsync();
      let loaikh = this.state.navigation.params.dataCSKK.loaikh;

      CapSoKhuyenKhichApi.MNG_CSKK_GetListGoiCuoc(userInfo.userid, loaikh,
        reS => {
          // printLog('loadBoPhanAsync', { reS });
          if (reS.result) {
            printLog('loadGoiCuocAsync', reS);
            let listGoiCuoc = reS.result;
            let listGoiCuocChuan = [];
  
            // Neu listCuaHang co du lieu
            if (listGoiCuoc.length > 0) {
              listGoiCuoc.map((goicuoc) => {
                let goicuocChuan = {
                  key   : goicuoc.key,
                  label : goicuoc.tengoi
                };
                listGoiCuocChuan.push(goicuocChuan); // Them du lieu vao mang chuan
              });
              // cập nhật dữ liệu vào state
              this.setState({ listGoiCuoc: listGoiCuocChuan });
            } else {
              this.setState({ listGoiCuoc: 'NO DATA' });
            }
          } else if ((reS.error)) {
            Alert.alert('THÔNG BÁO', 'Rất tiếc! Đã xảy ra lỗi trong quá trình tải danh sách gói cước.' + reS.error);
          }
        },
        reE => {
          printError('loadGoiCuocAsync', reE);
          Alert.alert('THÔNG BÁO', 'Rất tiếc! Đã xảy ra lỗi trong quá trình tải danh sách gói cước.\nVui lòng thử lại sau.');
        }
      );
    }

    _onRefresh = async () => {
      this.setState({ refreshing: true });
      await this.getDmHuyenOnline();
      this.setState({ refreshing: false });
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
                  : <ListCSKK
                        data         = {this.state.listCSKK}
                        navigate     = {this.props.navigation.navigate}
                        reloadList   = {this.getListCSKKChuaDuyet} 
                    />
            }
        </ScrollView>
      </View>
    );
  }
}

function NoDataView() {
  return (
    <RegularText style={css.txtNoData}>Không có dữ liệu</RegularText>
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
    color: SolidColors.grey
  }
});