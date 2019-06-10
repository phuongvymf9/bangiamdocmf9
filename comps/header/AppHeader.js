import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Contants
import { SolidColors } from "../../const/Colors";
import { Layout, FontSize } from "../../const/Layout";

// Styles
import Dropdown from "../../css/ShadowStyle";
import Align from "../../css/AlignStyle";
import TextStyle from "../../css/TextStyles";

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  _openDrawer = () => {
    this.props.openDrawer();
  }

  _Menu = () => {
    return (
      <TouchableOpacity style={css.btnMenu} onPress={this._openDrawer.bind(this)} >
        <MaterialCommunityIcons
          name='backburger'
          color='white'
          size={FontSize.iconSizeWithLargeText}
        />
      </TouchableOpacity>
    );
  }

  _Title = () => {
    return (
      <View style={[css.vTitle, Align.middle]} >
        <Text style={TextStyle.title}> Trang chủ </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[css.container, Align.centerHorizontal]}>
        <StatusBar barStyle='light-content' />
        {this._Menu()}
        {this._Title()}
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    backgroundColor: SolidColors.appBarColor,
    paddingTop: Layout.statusBarHeight,
    height: Layout.AppBarHeight,
    paddingHorizontal: Layout.marginPaddingDefault,
    flexDirection: 'row',
  }
  , btnMenu: {
    paddingVertical: Layout.marginPaddingDefault,
  },
  vTitle: {
    position: 'absolute',
    paddingTop: Layout.statusBarHeight,
    height: Layout.AppBarHeight,
    width: Layout.screenWidth
  }
});
