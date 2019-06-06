import React, { Component } from 'react';
import {  StyleSheet } from 'react-native';
import { LinearGradient } from "expo";

import { GradientColors } from "../../const/Colors";

export default class LoginBG extends Component {
  render() {
    return (
      <LinearGradient
        style   = {css.bgColor}
        colors  = {GradientColors.backgroundColor.colors}
        start   = {GradientColors.backgroundColor.start}
        end     = {GradientColors.backgroundColor.end}
      />
    );
  }
}

const css = StyleSheet.create({
  bgColor: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  }
});
