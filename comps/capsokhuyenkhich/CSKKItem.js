import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import { FontSize, Layout } from '../../const/Layout';
import { SolidColors }      from '../../const/Colors';

import AlignStyle from '../../css/AlignStyle';
import TextStyles from '../../css/TextStyles';

import { MediumTextBold, MediumText } from '../comp-chung/StyledText';
import { printLog } from '../../utils/LogUtil';

export default class CSKKItem extends PureComponent {
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
        <View style = {[css.container, this.props.data.last ? null : css.borderBottom]}>
          <View style = {css.vInfo}>
            <MediumTextBold style = {[TextStyles.normal, css.txtMedium]}>Số thuê bao: {this.props.data.sothuebao}</MediumTextBold>
            <MediumText style = {[TextStyles.normal, css.txtSmall]}>Gói cước: 
                <MediumText style = {[TextStyles.normal, css.txtdata1]}> {this.props.data.goicuoc}</MediumText>
            </MediumText>
            <MediumText style = {[TextStyles.normalchange, css.txtSmall]}>Thời gian cam kết: 
                <MediumText style = {[TextStyles.normal, css.txtdata1]} > {this.props.data.tg_camket} (tháng)</MediumText>
            </MediumText>
            <MediumText style = {[TextStyles.normal, css.txtSmall]}>Tên nhân viên: {this.props.data.user}</MediumText>
            <MediumText style = {[TextStyles.normal, css.txtSmall]}>Tỉnh: {this.props.data.tentinh}</MediumText>
            <MediumText style = {{ color: this.props.data.daduyet == 0 ? SolidColors.primaryRed : SolidColors.primaryGreen }}>
              Trạng thái: {this.props.data.daduyet == 0 ? 'Chưa duyệt' : 'Đã duyệt'}</MediumText>
          </View>
          <View style = {[css.vIcon, AlignStyle.middle]}>
            <Icon
              name  = 'ios-arrow-forward'
              size  = {FontSize.iconSizeWithNormalText}
              color = {SolidColors.grey}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
  , borderBottom: {
    borderBottomWidth: Layout.borderWidthDefault,
    borderColor: SolidColors.borderColor
  }
  , vIcon: {
    paddingHorizontal: Layout.marginPaddingLarge
  }
  , vInfo: {
    paddingVertical: Layout.marginPaddingLarge,
    flex: 1
  }
  , txtSmall: {
    color: SolidColors.grey
  }
  , txtMedium: {
    color: SolidColors.primary
  }
  , txtdata: {
    color: SolidColors.primaryRed
  }
  , txtdata1: {
    color: '#2E7D32'
  }
});