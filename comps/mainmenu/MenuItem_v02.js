import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Layout }       from '../../const/Layout';
import { SolidColors }  from '../../const/Colors';

import AlignStyle   from '../../css/AlignStyle';
import TextStyles   from '../../css/TextStyles';
import ShadowStyle  from '../../css/ShadowStyle';


export default class MenuItem extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount = () => {
    delete this.props;
    parentViewSize = null;
    menuItemSize = null;
  }

  _onPress = () => {
    const { onPress }     = this.props;
    const { screenName }  = this.props.data;
    onPress(screenName);
  }

  render() {
    const { iconName, title } = this.props.data;

    return (
      <View style = {css.vMenuItem}> 
        <TouchableOpacity
          onPress = {this._onPress.bind(this)}
          style   = {[css.container, AlignStyle.middle]} >
          <View style = {[css.bgColor, AlignStyle.middle]}>
            <MaterialCommunityIcons
              name  = {iconName}
              size  = {Layout.menuItemIconSize}
              color = {this.props.data.GradientColors}
            />
            <Text style = {[TextStyles.normal, css.txtTile]}>{title}</Text>
          </View>
        </TouchableOpacity>
      </View>
      
    );
  }
};

const parentViewSize = Platform.OS === 'android' 
  ? Layout.screenWidth - (Layout.marginPaddingLarge * 2) - 1  
  : Layout.screenWidth - (Layout.marginPaddingLarge * 2); // - 1 border
const menuItemSize = parentViewSize / 3;

const css = StyleSheet.create({
  vMenuItem: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: SolidColors.greyLight,
    height: Layout.menuItemHeight,
    width: menuItemSize,
    backgroundColor: 'white'
  }
  , container: {
    flex: 1,
  }
  , bgColor: {
    flex: 1,
    width: menuItemSize,
    padding: Layout.marginPaddingSmall,
  }
  , txtTile: {
    color: SolidColors.grey,
    marginTop: Layout.marginPaddingDefault,
    textAlign: 'center'
  }
});
