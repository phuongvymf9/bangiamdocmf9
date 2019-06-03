import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Layout } from '../../const/Layout';
import { SolidColors } from '../../const/Colors';
import AlignStyle from '../../css/AlignStyle';
import TextStyles from '../../css/TextStyles';

export default class LightLoading extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loading : this.props.autoRun || false
    };

    this._show = this._show.bind(this);
    this._hide = this._hide.bind(this);
  };

  _show  = () => { this.setState({ loading: true}); }
  _hide  = () => { this.setState({ loading: false }); }
  _start = () => { this.setState({ loading: true}); }
  _stop  = () => { this.setState({ loading: false }); }

  render() {
    if (!this.state.loading) return null;
    else return (
      <View style={[css.container, AlignStyle.middle, this.props.noBackground ? css.bgTranparent : css.bgColor]}>
        <View style = {css.vMain}>
          <ActivityIndicator
            size='large'
            color={SolidColors.primary}
          />
          <Text style = {[TextStyles.normal, css.txtCaption]}>{this.props.caption ? this.props.caption : 'Đang xử lý, vui lòng chờ giây lát ...'}</Text>
        </View>
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
  , vMain: {
    paddingHorizontal: Layout.marginPaddingLarge,
    paddingVertical: Layout.marginPaddingLarge,
    borderRadius: Layout.borderRadisComponent,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: 'rgba(57,143,255, 0.1)',
    borderWidth: 2
  }
  , txtCaption: {
    color: SolidColors.grey,
    marginTop: Layout.marginPaddingLarge
  }
  , bgColor: { backgroundColor: 'rgba(0,0,0,0.3)' }
  , bgTranparent: { backgroundColor: 'rgba(0,0,0,0)' }
});