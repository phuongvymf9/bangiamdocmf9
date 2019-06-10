import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { SolidColors } from '../../const/Colors';
import { Layout } from '../../const/Layout';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MediumTextBold } from '../comp-chung/StyledText';
import AlignStyle from '../../css/AlignStyle';

function ButtonSquare ({
  onPress         = () => {},
  title           = '',
  backgroundColor = SolidColors.primary,
  textColor       = '#FFF',
  iconName        = '',
}) {
  return (
    <TouchableOpacity
      style   = {[css.button, AlignStyle.middle, { backgroundColor: backgroundColor }]}
      onPress = {onPress}
    >
      {
        iconName
          ? <MaterialIcons
              name  = {iconName}
              color = {textColor}
              size  = {22}
              style = {{marginRight: Layout.marginPaddingDefault}}
            />
          : null
      }
      <MediumTextBold style = {{ color: textColor }}>{title}</MediumTextBold>
    </TouchableOpacity>
  );
}

ButtonSquare.propTypes = {
  onPress         : PropTypes.func.isRequired,
  title           : PropTypes.string.isRequired,
  iconName        : PropTypes.string,
  backgroundColor : PropTypes.string,
  textColor       : PropTypes.string
}

const css = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    marginTop: Layout.marginPaddingLarge,
  }
});

export default ButtonSquare;