import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';

import TextStyles from '../../css/TextStyles';
import AlignStyle from '../../css/AlignStyle';

import { SolidColors } from '../../const/Colors';

export default class AppBuilding extends Component {
  render() {
    return (
      <View style = {[AlignStyle.middle, { flex: 1 }]}>
        <Ionicons
          name  = 'ios-ionitron'
          size  = {scale(60)}
          color = {SolidColors.grey}
        />
        <Text style = {[TextStyles.normalItalic, { color: SolidColors.grey }]}> Chức năng đang được xây dựng ... </Text>
      </View>
    );
  }
}
