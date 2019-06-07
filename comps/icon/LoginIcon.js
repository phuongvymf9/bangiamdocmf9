import React, { Component } from 'react';
import {  View, StyleSheet, Image } from 'react-native';

import { IconSize, Layout } from "../../const/Layout";

export default class LoginIcon extends Component {
  render() {
    const img = require('../../assets/icon-login.png');

    return (
      <View style={css.container}>
        <Image
          source={img}
          style={css.imgIcon}
        />
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    padding: Layout.marginPaddingDefault
  }
  , imgIcon: {
    height: IconSize.loginIcon.height,
    width: IconSize.loginIcon.width,
  }
});
