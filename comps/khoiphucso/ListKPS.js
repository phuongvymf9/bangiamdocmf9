import React, { PureComponent } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import AlignStyle   from '../../css/AlignStyle';

import KPSItem from './KPSItem';

export default class ListKPS extends PureComponent {
  constructor(props) {
    super(props);
  };

  _goToChiTietScreen = (dataKPS) => {
    this.props.navigate('KPSChiTiet', {
        dataKPS     : dataKPS, 
        reloadList  : this.props.reloadList
    });
  }

  _renderItemKPS = ({item}) => {
    return <KPSItem  
      data      = {item}
      action    = {this._goToChiTietScreen} 
      />; 
  }

  render() {
    //let shadow = Platform.OS === 'ios' ? ShadowStyle.component : css.androidShadow;
    //printLog('## ListCSKK ', this.props.data);
    if (!this.props.data || this.props.data.length === 0) return null;
    else return (
      <View style = {[css.container, AlignStyle.middle]}>
          <FlatList
            data        = {this.props.data}
            renderItem  = {this._renderItemKPS}
            style       = {[css.list]}
            keyExtractor= {(item, index) => index.toString()}
          />
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  }
});