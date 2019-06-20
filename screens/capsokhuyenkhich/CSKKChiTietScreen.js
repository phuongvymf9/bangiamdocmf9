import React, { PureComponent } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, Alert, StatusBar } from "react-native";

import { SolidColors }            from "../../const/Colors";
import { LoginFormLayout,Layout } from "../../const/Layout";

import { createSubNavigationOptions } from "../../utils/HeaderUtil";
import { getUserObjectAsync }         from '../../utils/StorageUtils';
import LogUtil, { printLog, printError }       from '../../utils/LogUtil';

import TextStyles       from "../../css/TextStyles";

import { RegularText }  from '../../comps/comp-chung/StyledText';
import ModalChung       from '../../comps/capsokhuyenkhich/ModalChung';
import FormGoiCuoc      from '../../comps/capsokhuyenkhich/FormGoiCuoc';
import SmallLoading     from '../../comps/loading/SmallLoading';

import CapSoKhuyenKhichApi  from '../../api/CapSoKhuyenKhichApi';

export default class CSKKChiTietScreen extends PureComponent {
  static navigationOptions = createSubNavigationOptions("Thông tin chi tiết");
    constructor(props) {
      super(props);
        this.state = {
          maGoi: '',
          iLydo: '',
          iMagoi:'',
          iCamket: '',
          iTengoi: '',
          iMuccuoc: '',
          lsGoiCuoc: [],
          inputGoiCuoc: "",
          changeGoiCuoc: false, 
          loading: false
        };
    }

    async componentDidMount() {
      this.loadGoiCuocAsync();
    }

    _handleOnchange = (option) => {
      let maGoi = option.magoi;
  
      this.setState({ maGoi });
    }

    _RowInfo = (title, contain, last) => {
        const border = last ? null : css.borderRowInfo;
        return (
          <View style = {[css.vRowInfo, border]}>
            <View style = {{ flex: .4 }}>
              <Text style = {[TextStyles.mediumLight, { color: SolidColors.grey }]}>{title}</Text>
            </View>
            <View style = {[{ flex: .6 }, AlignStyle.centerVertical]}>
              <Text style = {[TextStyles.mediumChange, { color:'#546E7A' }]}>{contain}</Text>
            </View>
          </View>
        );
    }

    loadGoiCuocAsync = async () => {
      let userInfo = await getUserObjectAsync();
      let loaikh = this.props.navigation.state.params.dataCSKK.loaikh;

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
                  label : goicuoc.tengoi,
                  magoi : goicuoc.magoi
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

    onClickFinish = async() => {
      let idyeucau, checkduyet, lydo, goi_camket, magoi_khac, 
      tengoi_khac, muccuoc_khac, tg_camketkhac, capquanly, loaikh;
      let userInfo = await getUserObjectAsync();
  
      idyeucau      = this.props.navigation.state.params.dataCSKK.id;
      checkduyet    = '1';
      lydo          = this.state.iLydo || '';
      goi_camket    = this.state.maGoi || '';
      magoi_khac    = this.state.iMagoi;
      tengoi_khac   = this.state.iTengoi;
      muccuoc_khac  = this.state.iMuccuoc;
      tg_camketkhac = this.state.iCamket;
      capquanly     = '1';
      loaikh        = this.props.navigation.state.params.dataCSKK.loaikh;

      this.setState({ loading: true });

    CapSoKhuyenKhichApi.MNG_CSKK_Duyet(userInfo.userid, idyeucau, checkduyet, lydo, goi_camket, magoi_khac, 
        tengoi_khac, muccuoc_khac, tg_camketkhac,  capquanly, loaikh,
        reS => {
          LogUtil.log('reS.result.result', reS.result.result );
          Alert.alert(
            'THÔNG BÁO', 
            reS.result.result ? 'Thành công' : JSON.stringify(reS),
            [
              { text: 'Trở về', onPress: this.goBack }
            ]
          );
          LogUtil.log('onClickFinish', reS);
  
          this.setState({ loading: false }); // ngưng thông báo
        },
        reE => {
          this.setState({ loading: false }); // ngưng thông báo
          printError('reE', reE);
          Alert.alert('THÔNG BÁO', 'Rất tiếc! Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thực hiện lại.\nXin cảm ơn!'); 
        }
      );
    }

    goBack = () => {
      //Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
      StatusBar.setHidden(false);
      this.props.navigation.goBack();
      !!this.props.navigation.state.params.reloadList && this.props.navigation.state.params.reloadList();
    }

    render(){
      return(
        <KeyboardAvoidingView style={[css.container]} behavior="padding" enabled   keyboardVerticalOffset={100}>
          <ScrollView>
            <View style={css.formTitle}>
              <Icon 
                name="md-information-circle"
                size={25}
                color={SolidColors.primary}
              />
              <Text style = {[TextStyles.medium, css.txtName]}> Thông tin thuê bao </Text>
            </View>
              {this._RowInfo('Số thuê bao:',this.props.navigation.state.params.dataCSKK.sothuebao)} 
              {this._RowInfo('Gói cước:',this.props.navigation.state.params.dataCSKK.tengoi)}
              {this._RowInfo('Mức cước:',this.props.navigation.state.params.dataCSKK.muccuoc)}
              {this._RowInfo('Cam kết:',this.props.navigation.state.params.dataCSKK.tg_camket)}
              {this._RowInfo('Khách hàng:',this.props.navigation.state.params.dataCSKK.tenkh)}
              {this._RowInfo('Loại KH:',
                this.props.navigation.state.params.dataCSKK.loaikh == 1
                  ? 'Doanh nghiệp' 
                  : this.props.navigation.state.params.dataCSKK.loaikh == 2 
                    ? 'Cá nhân'
                    : this.props.navigation.state.params.dataCSKK.loaikh == 3
                      ? 'Subsidy'
                      : this.props.navigation.state.params.dataCSKK.loaikh == 4
                        ? 'cam kết cước' 
                        : this.props.navigation.state.params.dataCSKK.loaikh
              )}
              {this._RowInfo('Địa chỉ:',this.props.navigation.state.params.dataCSKK.diachi)}
              <View style={css.formTitle}>
                <Icon 
                  name="md-information-circle"
                  size={25}
                  color={SolidColors.primary}
                />
                <Text style = {[TextStyles.medium, css.txtName]}> Đơn vị yêu cầu </Text>
              </View>
              {this._RowInfo('User:',this.props.navigation.state.params.dataCSKK.user)}
              {this._RowInfo('Chức danh:',this.props.navigation.state.params.dataCSKK.chucdanh)}
              {this._RowInfo('Tỉnh:',this.props.navigation.state.params.dataCSKK.tentinh)}
              {this._RowInfo('Tên cửa hàng:',this.props.navigation.state.params.dataCSKK.tencuahang)}
              {this._RowInfo('Thời gian gửi yêu cầu:',this.props.navigation.state.params.dataCSKK.tg_yeucau)}
              <View style={css.formTitle}>
                <Icon 
                  name="md-information-circle"
                  size={25}
                  color={SolidColors.primary}
                />
                <Text style = {[TextStyles.medium, css.txtName]}> Chi nhánh </Text>
              </View>
              {this._RowInfo('Ngày duyệt:',this.props.navigation.state.params.dataCSKK.cn_ngayduyet)}
              {this._RowInfo('Người duyệt:',this.props.navigation.state.params.dataCSKK.cn_nguoiduyet)}
              { this._RowInfo(
                'Trạng thái:',
                  this.props.navigation.state.params.dataCSKK.cn_lydo === ''
                    ? 'Duyệt'
                    : 'Không duyệt'
              )}
              { 
                this.props.navigation.state.params.dataCSKK.cn_lydo != null
                  ? <View>
                      {this._RowInfo('Gói cước:',this.props.navigation.state.params.dataCSKK.cn_magoi)}
                      {this._RowInfo('Cam kết:',this.props.navigation.state.params.dataCSKK.cn_thoigian)}
                    </View>
                  : <View>
                      {this._RowInfo('Lý do:',this.props.navigation.state.params.dataCSKK.cn_lydo)}
                    </View>
              }
                
              <View style={css.formTitle}>
                <Icon 
                  name="md-information-circle"
                  size={25}
                  color={SolidColors.primary}
                />
                <Text style = {[TextStyles.medium, css.txtName]}> Phòng BH - KHDN </Text>
              </View>
              {this._RowInfo('Ngày duyệt:',this.props.navigation.state.params.dataCSKK.pbh_ngayduyet)}
              {this._RowInfo('Người duyệt:',this.props.navigation.state.params.dataCSKK.pbh_nguoiduyet)}
              { 
                this.props.navigation.state.params.dataCSKK.pbh_lydo != null
                  ? <View>
                      {this._RowInfo('Trạng thái:','Không duyệt')}
                      {this._RowInfo('Lý do:',this.props.navigation.state.params.dataCSKK.pbh_lydo)}
                    </View>
                  : <View>
                      {this._RowInfo('Gói cước:',this.props.navigation.state.params.dataCSKK.pbh_magoi)}
                      {this._RowInfo('Cam kết:',this.props.navigation.state.params.dataCSKK.pbh_thoigian)}
                      {this._RowInfo('Trạng thái:','Duyệt')}
                    </View>
              }
              <View style={css.formTitle}>
                <Icon 
                  name="md-information-circle"
                  size={25}
                  color={SolidColors.primary}
                />
                <Text style = {[TextStyles.medium, css.txtName]}> Công ty </Text>
              </View>
              <ModalChung 
                data        = {this.state.listGoiCuoc}
                initValue   = "Chọn gói cước"
                onChange    = {this._handleOnchange} 
              />
              {
                this.state.maGoi === '_GOICUOCKHAC'
                  ? <FormGoiCuoc 
                      value = {this.state.iMagoi}
                      onChangeText ={val => this.setState({ iMagoi: val })}
                      value1 = {this.state.iTengoi}
                      onChangeText1 ={val => this.setState({ iTengoi: val })}
                      value2 = {this.state.iMuccuoc}
                      onChangeText2 ={val => this.setState({ iMuccuoc: val })}
                      value3 = {this.state.iCamket}
                      onChangeText3 ={val => this.setState({ iCamket: val })}
                    />
                  : null
              }
              <Text style = {[TextStyles.medium, css.txtName]}>Nếu không duyệt vui lòng nhập lý do</Text>
                <TextInput 
                  style                 = {[ css.input, { textAlign: "center" }]}
                  value                 = {this.state.iLydo}
                  multiline             = {true}
                  onChangeText          = {val => this.setState({ iLydo: val })}
                  underlineColorAndroid = {'rgba(0,0,0,0)'}
                  placeholder           = {'Nhập lý do'}
                  placeholderTextColor  = {SolidColors.grey}
                />
                {
                  this.state.loading 
                    ? <SmallLoading /> 
                    : <View style={css.vAction}>
                        <Button 
                          text      = {'Duyệt yêu cầu'} 
                          iconName  = {'md-checkmark'} 
                          colorIcon = {'#43A047'} 
                          onPress   = {this.onClickFinish} 
                        />
                        <Button 
                          text      = {'Không duyệt'} 
                          iconName  = {'ios-brush'} 
                          colorIcon = {'#F48FB1'} 
                          onPress   = {this.onClickChange}
                        />
                      </View>
                }
        </ScrollView>
      </KeyboardAvoidingView>
    );
   }
 }

function Button({
    text      = '',
    iconName  = 'md-checkmark',
    onPress   = () => {},
    colorText = SolidColors.grey,
    colorIcon = '#43A047',
  }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[css.button, AlignStyle.middle]}
      >
        <Icon 
          name={iconName}
          size={25}
          color={colorIcon}
        />
        <RegularText  style = {{color: colorText, marginLeft: Layout.marginPaddingSmall}}>{text}</RegularText>
      </TouchableOpacity>
    );
  }

const css = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFF",
        marginTop: Layout.marginPaddingLarge + 5 
    },
    icon: {
        paddingHorizontal: Layout.marginPaddingDefault,
        flexDirection: 'row',
        marginBottom:Layout.marginPaddingLarge + 5,
        borderBottomColor: SolidColors.greyLight,
        borderBottomWidth: 1
    },
    vAction: {
        borderTopWidth: 1,
        borderColor: '#F5F5F5',
        marginTop: Layout.marginPaddingDefault,
        paddingTop: Layout.marginPaddingDefault,
        flexDirection: 'row',
        width: '100%'
    },
    txtName: {
        color: SolidColors.primary,
        textAlign: 'center',
        marginBottom: Layout.marginPaddingSmall
    },
    formTitle: {
        flexDirection: 'row'
    },
    button: {
        paddingVertical: Layout.marginPaddingSmall,
        paddingHorizontal: Layout.marginPaddingDefault,
        backgroundColor: '#FAFAFA',
        borderRadius: 5,
        borderColor: '#CCC',
        borderWidth: 1,
        marginRight: Layout.marginPaddingDefault,
        flexDirection: 'row'
    },
    borderRowInfo: {
        borderBottomWidth: Layout.borderWidthDefault,
        borderColor: SolidColors.borderColor,
    },
    vRowInfo: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: Layout.marginPaddingDefault,
        width:'100%',
        alignItems: "center"
    },
    input: {
        color: SolidColors.primaryGreen,
        fontFamily: 'roboto-bold',
        fontSize: 16
    },
    formModal:{
        marginTop: 10
    },
    input: {
        height: LoginFormLayout.inputHeight,
        borderRadius: Layout.borderRadisComponent,
        borderColor: SolidColors.grey,
        borderWidth: LoginFormLayout.borderWidth,
        justifyContent: "center",
        marginTop: Layout.marginPaddingDefault,
        marginBottom: Layout.marginPaddingSmall,
    },
    txtName: {
        color: SolidColors.primary,
        textAlign: 'center',
        marginVertical: Layout.marginPaddingSmall
    }
  });