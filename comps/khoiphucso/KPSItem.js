import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import { Layout } from '../../const/Layout';
import { SolidColors }      from '../../const/Colors';

import AlignStyle from '../../css/AlignStyle';
import TextStyles from '../../css/TextStyles';

import { MediumTextBold, MediumText } from '../comp-chung/StyledText';

import { printLog } from '../../utils/LogUtil';

export default class KPSItem extends PureComponent {
    constructor(props) {
        super(props);
    };

    _goToChiTietScreen = () => {
        if (this.props.data.daduyet == 1) {
            Alert.alert('THÔNG BÁO', 'Bạn đã duyệt số thuê bao này. Vui lòng không thực hiện lại. Xin cảm ơn!');
            return;
        }

        this.props.action(this.props.data);  
    };

    render() {
        return (
            <TouchableOpacity
                activeOpacity = {0.7}
                onPress       = {this._goToChiTietScreen}
            >
                <View style = {css.container}>
                    <View style={[css.vIcon, AlignStyle.middle]}>
                        <Icon 
                        name  = {`ios-checkmark-circle`}
                        color = {'#CCC'}
                        size  = {30}
                        />
                    </View>
                    <View style={[css.vContent, AlignStyle.centerVertical]}>
                        <MediumTextBold style = {[TextStyles.normal, css.txtMedium]}>Số thuê bao: {this.props.data.sothuebao}</MediumTextBold>
                        <MediumText style = {[TextStyles.normal, css.txtSmall]}>Gói cước: 
                            <MediumText style = {[TextStyles.normalBold, css.txtdata]}> {this.props.data.goicuoc}</MediumText>
                        </MediumText>
                        <MediumText style = {[TextStyles.normalchange, css.txtSmall]}>Thời gian cam kết: 
                            <MediumText style = {[TextStyles.normal, css.txtdata]}> {this.props.data.tg_camket}</MediumText>
                        </MediumText>
                        <MediumText style = {[TextStyles.normal, css.txtSmall]}>Tên nhân viên: {this.props.data.user}</MediumText>
                        <MediumText style = {[TextStyles.normal, css.txtSmall]}>Tỉnh: {this.props.data.tentinh}</MediumText>
                        <MediumText style = {{ color: this.props.data.daduyet == 0 ? SolidColors.primaryRed : SolidColors.primaryGreen }}>
                            Trạng thái: {this.props.data.daduyet == 0 ? 'Chưa duyệt' : 'Đã duyệt'}</MediumText>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const css = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: Layout.marginPaddingLarge,
    borderWidth:1,
    borderColor: SolidColors.greyLight
  }, 
  vIcon: {
    height: 100,
    width: 60,
  },
  vContent: {
    //flex: 1,
    paddingVertical: Layout.marginPaddingLarge,
    marginRight: Layout.marginPaddingLarge
  },
  txtMedium: {
      color: SolidColors.primary
  },
  txtdata: {
    color: '#2E7D32'
  },
  txtSmall: {
    color: SolidColors.grey
  }
});