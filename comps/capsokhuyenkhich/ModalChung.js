import React, { PureComponent } from 'react';
import { StyleSheet, View }     from 'react-native';
import ModalSelector            from 'react-native-modal-selector'

import AlignStyle from '../../css/AlignStyle';

import { SolidColors }  from '../../const/Colors';
import { Layout }       from '../../const/Layout';

export default class ModalChung extends PureComponent {
    constructor(props) {
        super(props);
    }    

    render() {
        return (
            <View style = {[css.vRowInfo, css.borderRowInfo]}>
                <View style = {css.container}>
                    <ModalSelector 
                        initValue       = {this.props.initValue}
                        data            = {this.props.data}
                        onChange        = {this.props.onChange}
                        cancelText      = {'Đóng'}
                        selectStyle     = {[css.selectStyle, AlignStyle.middle]}
                        selectTextStyle = {[css.sectionTextStyle]}
                        sectionTextStyle= {[css.sectionTextStyle]}
                        cancelTextStyle = {[css.cancelTextStyle]}
                    />
                </View>
            </View>
        );
    }
}

const css = StyleSheet.create({
    container: {
        flex:1,
        borderRadius: 25,
        width: '100%',
        height: Layout.buttonHeight,
        borderWidth: 1,
        borderColor: SolidColors.grey
    },
    selectStyle :{
        borderWidth: 0,
        padding: 0,
        height: 30,
        justifyContent: 'center'
    },
    selectTextStyle:{
        fontFamily: 'roboto-bold',
        color: '#546E7A'
    },
    sectionTextStyle:{
        fontFamily: 'roboto-bold',
        fontSize: 18,
        color: '#546E7A'
    },
    cancelTextStyle:{
        fontFamily: 'roboto-bold',
        color: '#f44336'
    },
    vRowInfo: {
        flex: 1,
        //flexDirection: 'row',
        paddingVertical: Layout.marginPaddingDefault
    },
    borderRowInfo: {
        borderBottomWidth: Layout.borderWidthDefault,
        borderColor: SolidColors.borderColor,
    }
});


