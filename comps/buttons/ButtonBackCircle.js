import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Layout } from '../../const/Layout';
import AlignStyle from '../../css/AlignStyle';

export default class ButtonBackCircle extends Component {
  static propTypes = {
    lightBackground : PropTypes.bool,
    onPress         : PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  };

  componentWillUnmount() {
    delete this.state;
    delete this.props;
  }

  ////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <TouchableOpacity
        style   = {[css.btnBack, AlignStyle.middle]}
        onPress = {this.props.onPress}
      >
        <Ionicons
          name  = {'ios-arrow-back'}
          color = {'white'}
          size  = {28}
          style = {css.txtBack}
        />
      </TouchableOpacity>
    );
  }
}

const { width, height } = Dimensions.get('window');

const css = StyleSheet.create({
  btnBack: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    margin: Layout.marginPaddingDefault,
    ...Platform.select({
      ios: {
        top: Layout.marginPaddingDefault + (width > height ? Layout.statusBarHeight : 20)
      },
      android: {
        top: 0,
      }
    }),
  }
  , txtBack: {
    color: 'white',
    ...Platform.select({
      ios: {
        marginBottom: -3
      }
    }),
  }
});