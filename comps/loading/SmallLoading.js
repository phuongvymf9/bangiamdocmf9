import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { SolidColors }  from '../../const/Colors';
import { Layout }       from '../../const/Layout';

import AlignStyle from '../../css/AlignStyle';
import TextStyles from '../../css/TextStyles';

export default class SmallLoading extends Component {
  render() {
    return (
      <View style = {[AlignStyle.middle, { flexDirection: 'row', padding: Layout.marginPaddingDefault }]}>
        <ActivityIndicator
          color = {this.props.colorIndicator || SolidColors.secondary}
          size  = 'small'
          style = {{ marginRight: Layout.marginPaddingDefault }}
        />
        <Text style = {[TextStyles.normal, { color: this.props.colorText || SolidColors.grey }]}>
          { this.props.text ? this.props.text : 'Đang tải dữ liệu, vui lòng chờ ...'}
        </Text>
      </View>
    );
  }
}
