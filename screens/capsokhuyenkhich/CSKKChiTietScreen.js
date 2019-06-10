import React, { PureComponent } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";

import { Layout } from "../../const/Layout";
import { SolidColors } from "../../const/Colors";

import { createSubNavigationOptions } from "../../utils/HeaderUtil";

import TextStyles from "../../css/TextStyles";

import Icon from "react-native-vector-icons/Ionicons";


import { RegularText } from '../../comps/comp-chung/StyledText';

export default class CSKKChiTietScreen extends PureComponent {
    static navigationOptions = createSubNavigationOptions("Thông tin chi tiết");
    constructor(props) {
      super(props);
    }

    _RowInfo = (title, contain, last) => {
        const border = last ? null : css.borderRowInfo;
        return (
          <View style = {[css.vRowInfo, border]}>
            <View style = {{ flex: .4 }}>
              <Text style = {[TextStyles.mediumLight, { color: SolidColors.grey }]}>{title}</Text>
            </View>
            <View style = {[{ flex: .6 }, AlignStyle.centerVertical]}>
              <Text style = {TextStyles.mediumChange}>{contain}</Text>
            </View>
          </View>
        );
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
                        {this._RowInfo('Số thuê bao:')}
                        {this._RowInfo('Gói cước:')}
                        {this._RowInfo('Thời gian cam kết:')}
                        {this._RowInfo('Khách hàng:')}
                        {this._RowInfo('Địa chỉ:')}
                    <View style={css.formTitle}>
                        <Icon 
                            name="md-information-circle"
                            size={25}
                            color={SolidColors.primary}
                        />
                        <Text style = {[TextStyles.medium, css.txtName]}> Đơn vị yêu cầu </Text>
                    </View>
                        {this._RowInfo('User:' )}
                        {this._RowInfo('Tên cửa hàng:')}
                        {this._RowInfo('Thời gian gửi yêu cầu:')}
                    <View style={css.vAction}>
                        <Button 
                            text      = {'Duyệt yêu cầu'} 
                            iconName  = {'md-checkmark'} 
                            colorIcon = {'#43A047'} 
                            onPress   = {this.onClickXacNhan} 
                        />
                        <Button 
                            text      = {'Chỉnh sửa'} 
                            iconName  = {'ios-brush'} 
                            colorIcon = {'#F48FB1'} 
                            onPress   = {this.onClickQuetSerial}
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
    }
  });