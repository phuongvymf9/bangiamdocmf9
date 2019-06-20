import React, { PureComponent } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import { SolidColors } from '../../const/Colors';
import { LoginFormLayout, Layout } from '../../const/Layout';
import AlignStyle from '../../css/AlignStyle';

export default class FormGoiCuoc extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            iMagoi: '',
            iTengoi: '',
            iMuccuoc: '',
            iCamket: ''
        };
    }  
    
    _onChangeText( iTengoi,iMuccuoc,iCamket ) {
        this.setState({ iTengoi,iMuccuoc,iCamket });
      }

    render() {
        return (
                <View style = {[css.container, AlignStyle.middle]}>
                    <TextInput 
                        style                 = {[ css.input, { textAlign: "center" }]}
                        value                 = {this.props.value}
                        multiline             = {true}
                        onChangeText          = {this.props.onChangeText}
                        underlineColorAndroid = {'rgba(0,0,0,0)'}
                        placeholder           = {'Nhập mã gói'}
                        placeholderTextColor  = {SolidColors.grey}
                    />
                    <TextInput 
                        style                 = {[ css.input, { textAlign: "center" }]}
                        value                 = {this.state.value1}
                        multiline             = {true}
                        onChangeText          = {this.props.onChangeText1}
                        underlineColorAndroid = {'rgba(0,0,0,0)'}
                        placeholder           = {'Nhập tên gói cước'}
                        placeholderTextColor  = {SolidColors.grey}
                    />
                    <TextInput 
                        style                 = {[ css.input, { textAlign: "center" }]}
                        value                 = {this.state.value2}
                        multiline             = {true}
                        onChangeText          = {this.props.onChangeText2}
                        underlineColorAndroid = {'rgba(0,0,0,0)'}
                        placeholder           = {'Nhập mức cước'}
                        placeholderTextColor  = {SolidColors.grey}
                    />
                    <TextInput 
                        style                 = {[ css.input, { textAlign: "center" }]}
                        value                 = {this.state.value3}
                        multiline             = {true}
                        onChangeText          = {this.props.onChangeText3}
                        underlineColorAndroid = {'rgba(0,0,0,0)'}
                        placeholder           = {'Nhập thời gian cam kết'}
                        placeholderTextColor  = {SolidColors.grey}
                    />  
                </View>
        );
    }
}

const css = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#FFF',
    },
    input: {
        width: '90%',
        height: LoginFormLayout.inputHeight,
        borderRadius: Layout.borderRadisComponent,
        borderColor: SolidColors.grey,
        borderWidth: LoginFormLayout.borderWidth,
        justifyContent: "center",
        marginTop: Layout.marginPaddingDefault,
        marginBottom: Layout.marginPaddingSmall,
    }
});


