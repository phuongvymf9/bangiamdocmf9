import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import { FontSize, Layout } from '../../const/Layout';
import { SolidColors }      from '../../const/Colors';

import AlignStyle from '../../css/AlignStyle';
import TextStyles from '../../css/TextStyles';

import { MediumTextBold, SmallText } from '../comp-chung/StyledText';
import { printLog } from '../../utils/LogUtil';

export default class CSKKItem extends PureComponent {
  constructor(props) {
    super(props);
  };

  _goToChiTietScreen = () => {
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
            <Text style = {[TextStyles.normal, css.txtSmall]}>Gói cước: {this.props.data.goicuoc}</Text>
            <Text style = {[TextStyles.normal, css.txtSmall]}>Thời gian cam kết: {this.props.data.tg_camket}</Text>
            <Text style = {[TextStyles.normal, css.txtSmall]}>Đơn vị yêu cầu: {this.props.data.khachhang}</Text>
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
});