import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import { LoginFormLayout, Layout } from "../../const/Layout";
import { SolidColors } from "../../const/Colors";
import TextStyle from "../../css/TextStyles";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ''
    }
  }

  _onPress = () => {
    Keyboard.dismiss();

    const action = this.props.action;
    const { inputValue } = this.state;

    let ez = inputValue.startsWith("0") ? inputValue.substring(1, inputValue.length) : inputValue;

    action(ez);
  }

  render() {
    return (
      <View style = {css.container}>
        <Text style = {[TextStyle.small, { color: 'white', textAlign: 'center' }]}>{this.props.title}</Text>
        <TextInput
          style         = {[css.input, css.inputText, css.txtText, TextStyle.normal, { textAlign: 'center' }]}
          value         = {this.state.inputValue}
          onChangeText  = {val => this.setState({ inputValue: val })}
          placeholder   = {this.props.placeholderText}
          keyboardType  = 'phone-pad'
          underlineColorAndroid = 'rgba(0,0,0,0)'
          placeholderTextColor  = {SolidColors.loginPlacholderText}
        />
        <TouchableOpacity 
          style   = {css.inputBtn} 
          onPress = {this._onPress.bind(this)}>
          <Text style = {[TextStyle.medium, { color: '#FFF', textAlign: 'center' }]}>{this.props.buttonName}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    width: LoginFormLayout.formWidth,
    padding: Layout.marginPaddingDefault,
  },
  input: {
    height: LoginFormLayout.inputHeight,
    width: '100%',
    borderColor: LoginFormLayout.borderColor,
    borderWidth: LoginFormLayout.borderWidth,
    justifyContent: 'center',
    marginTop: Layout.marginPaddingDefault,
    borderRadius: LoginFormLayout.borderRadius, 
  },
  inputText: {
    color: '#FF3636'
  },
  inputBtn: {
    height: LoginFormLayout.inputHeight,
    width: '100%',
    borderColor: '#398FFF',
    borderWidth: LoginFormLayout.borderWidth,
    justifyContent: 'center',
    marginTop: Layout.marginPaddingDefault,
    backgroundColor: '#398FFF',
    borderRadius: LoginFormLayout.borderRadius,
  }
});
