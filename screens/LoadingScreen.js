import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Layout } from '../const/Layout';
import { SolidColors } from '../const/Colors';
import AlignStyle from '../css/AlignStyle';

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadding: false
    }
  }

  _stop = () => {
    this.setState({ loadding: false });
  }

  _start = () => {
    this.setState({ loadding: true });
  }

  render() {
    if (this.state.loadding) {
      return (
        <View style = {[css.container, AlignStyle.middle]}>
          <View style = {[css.main, AlignStyle.centerVertical]}>
            <ActivityIndicator
              size  = 'small'
              color = {SolidColors.secondary}
              style = {{ marginRight: Layout.marginPaddingDefault }}
            />
            <Text>Đang xử lý. Vui lòng chờ ...</Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

const css = StyleSheet.create({
  container: {
    width: Layout.screenWidth,
    height: Layout.screenHeight,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
  }
  , main: {
    padding: Layout.marginPaddingDefault,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: Layout.menuItemBorderRadius
  }
});
