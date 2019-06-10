import React, { PureComponent } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import AlignStyle   from '../../css/AlignStyle';

import { Layout }   from '../../const/Layout';
import { SolidColors } from '../../const/Colors';
import { printLog } from '../../utils/LogUtil';
import CSKKItem from './CSKKItem';

export default class ListCSKK extends PureComponent {
  constructor(props) {
    super(props);
  };

  _goToChiTietScreen = (dataCSKK) => {
    this.props.navigate('CSKKChiTiet', {
        dataCSKK    : dataCSKK, 
        reloadList  : this.props.reloadList
    });
  }

  _renderItemCSKK = ({item}) => {
    return <CSKKItem  
      data      = {item}
      action    = {this._goToChiTietScreen} 
      />; 
  }

  render() {
    // let shadow = Platform.OS === 'ios' ? ShadowStyle.component : css.androidShadow;
    printLog('## ListCSKK ', this.props.data);
    if (!this.props.data || this.props.data.length === 0) return null;
    else return (
      <View style = {[css.container, AlignStyle.middle]}>
        <View style = {[css.vMain]}>
          <FlatList
            data        = {this.props.data}
            renderItem  = {this._renderItemCSKK}
            style       = {[css.list]}
            keyExtractor= {(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: Layout.marginPaddingLarge
  }
  , list: {
    width: Layout.compsInfoWidth,
    borderRadius: 0,
  }
  , vMain: {
    paddingLeft: Layout.marginPaddingDefault,
    marginTop: Layout.marginPaddingSmall,
    backgroundColor: '#FFFFFF',
    borderColor: SolidColors.greyLight,
    borderWidth: 1,
    borderRadius: 5
  }
});