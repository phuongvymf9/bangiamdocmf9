import React, { PureComponent } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Layout } from "../../const/Layout";
import { SolidColors } from "../../const/Colors";

import { createSubNavigationOptions } from "../../utils/HeaderUtil";
import { getUserObjectAsync }         from '../../utils/StorageUtils';
import { printLog, printError }         from '../../utils/LogUtil';

import TextStyles from "../../css/TextStyles";

import { RegularText } from '../../comps/comp-chung/StyledText';
import ModalChung from '../../comps/capsokhuyenkhich/ModalChung';

import CapSoKhuyenKhichApi  from '../../api/CapSoKhuyenKhichApi';

export default class CSKKChiTietScreen extends PureComponent {
  static navigationOptions = createSubNavigationOptions("Thông tin chi tiết");
    constructor(props) {
        super(props);
        this.state = {
            lsGoiCuoc       : [],
            changeGoiCuoc   : false,
            inputGoiCuoc     : ""
        };
    }

    async componentDidMount() {
      this.loadGoiCuocAsync();
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

        CapSoKhuyenKhichApi.MNG_CSKK_GetListGoiCuoc(userInfo.userid,
          reS => {
            // printLog('loadBoPhanAsync', { reS });
            if (reS.result) {
              /////////////////////////// Kiem tra danh sach rong ///////////////////////////
              if(reS.result.length > 0){
                let lsGoiCuoc = reS.result;
                this.setState({ lsGoiCuoc: lsGoiCuoc });
              } else {
                this.setState({ lsGoiCuoc: "NODATA" });
              }
            } else if ((reS.error)){
              Alert.alert('THÔNG BÁO', 'Rất tiếc! Đã xảy ra lỗi trong quá trình tải danh sách thuê bao.' + reS.error);
            }
            //this.setState({ loading: false }); // ngưng thông báo
          },
            reE => {
              printError('loadGoiCuocAsync', reE);
              Alert.alert('THÔNG BÁO', 'Rất tiếc! Đã xảy ra lỗi trong quá trình tải danh sách thuê bao.\nVui lòng thử lại sau.');
            }
        );
    }
    
    onClickChange = () => {
      this.setState ({
        changeGoiCuoc: true
      });
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
                        {this._RowInfo('Gói cước:',this.props.navigation.state.params.dataCSKK.goicuoc)}
                        {this._RowInfo('Cam kết:',this.props.navigation.state.params.dataCSKK.tg_camket)}
                        {
                          this.state.changeGoiCuoc
                          ? <View style={css.formModal}>
                              <Text style = {[TextStyles.mediumLight, { color: SolidColors.primaryRed }]}> *Vui lòng chọn gói cước cần thay đổi</Text>
                              <ModalChung 
                                title = "Thay đổi gói cước:"
                                data = {this.state.lsGoiCuoc}
                                initValue = "Chọn gói cước"
                                value = {this.state.inputGoiCuoc}
                                onChangeText = {val => this.setState({ inputGoiCuoc: val })}
                              />
                              </View>
                          : null
                        }
                        {this._RowInfo('Khách hàng:',this.props.navigation.state.params.dataCSKK.khachhang)}
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
                        {this._RowInfo('Tỉnh:',this.props.navigation.state.params.dataCSKK.tentinh)}
                        {this._RowInfo('Tên cửa hàng:',this.props.navigation.state.params.dataCSKK.tencuahang)}
                        {this._RowInfo('Thời gian gửi yêu cầu:',this.props.navigation.state.params.dataCSKK.tg_yeucau)}
                    <View style={css.vAction}>
                        <Button 
                            text      = {'Duyệt yêu cầu'} 
                            iconName  = {'md-checkmark'} 
                            colorIcon = {'#43A047'} 
                            onPress   = {this.onClickFinish} 
                        />
                        <Button 
                            text      = {'Sửa yêu cầu'} 
                            iconName  = {'ios-brush'} 
                            colorIcon = {'#F48FB1'} 
                            onPress   = {this.onClickChange}
                        />
                    </View>
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
        width:'100%'
    },
    input: {
        color: SolidColors.primaryGreen,
        fontFamily: 'roboto-bold',
        fontSize: 16
    },
    formModal:{
        marginTop: 10
    }
  });