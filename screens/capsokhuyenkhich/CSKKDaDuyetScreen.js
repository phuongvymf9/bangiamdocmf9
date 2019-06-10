import React, { PureComponent } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';

import { printLog, printError } from '../../utils/LogUtil';
import { getUserObjectAsync } from '../../utils/StorageUtils';

import { Layout } from '../../const/Layout';

export default class CSKKDaDuyetScreen extends PureComponent {
    state = {
        refreshing : false,
        listThongKeYC: [],
        switchValue: false,
        value: ''
    };
    render(){
      return(
        <View style = {[css.container, AlignStyle.middle]}>
            <ScrollView 
                style     = {css.main}
                onScroll  = {this.handleScroll}
                scrollEventThrottle = {16}
                refreshControl  = {
                    <RefreshControl
                        refreshing  = {this.state.refreshing}
                        onRefresh   = {this._onRefresh} />
                }>
                   <Text> Đã duyệt </Text>
            </ScrollView>
        </View>
        );
    }
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    }, 
    main: {
        paddingVertical: Layout.marginPaddingDefault,
    },
    txtYeuCau: { 
        color: '#398FFF', 
        textAlign: 'center'
    },
    vMain: {
        backgroundColor: '#FFFFFF',
        borderRadius: Layout.borderRadisComponent,
        marginBottom: Layout.marginPaddingDefault
    }
});