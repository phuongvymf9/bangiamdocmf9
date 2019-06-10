import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { SolidColors } from '../../const/Colors';
import { Layout } from '../../const/Layout';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MediumTextBold } from '../comp-chung/StyledText';
import AlignStyle from '../../css/AlignStyle';

export default ButtonRounded = ({
  onPress         = () => { },
  title           = '',
  backgroundColor = SolidColors.primary,
  textColor       = '#FFF',
  iconColor       = '#FFF',
  iconName        = '',
  buttonHeight    = 60,
  marginTop       = Layout.marginPaddingLarge
}) => {
  return (
    <TouchableOpacity
      style = {[
        AlignStyle.middle,
        {
          flexDirection: 'row',
          backgroundColor: backgroundColor,
          height: buttonHeight,
          borderRadius: buttonHeight / 2,
          marginTop: marginTop
        }
      ]}
      onPress = {onPress}
    >
      <MaterialIcons
        name  = {iconName}
        color = {iconColor}
        size  = {22}
      />
      <MediumTextBold 
        style={{
          color: textColor,
          marginLeft: Layout.marginPaddingDefault
        }}
      >
        {title}
      </MediumTextBold>
    </TouchableOpacity>
  );
}

ButtonRounded.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string
}
