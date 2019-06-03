import { StyleSheet } from "react-native";
import { FontSize } from "../const/Layout";

export default TextStyle = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: FontSize.titleHeader,
    textAlign: 'center',
    // fontWeight: 'bold'
    fontFamily: 'roboto-bold'
  }
  , large: {
    fontSize: FontSize.large,
    // fontWeight: 'bold'
    fontFamily: 'roboto-bold'
  }
  , medium: {
    fontSize: FontSize.medium,
    // fontWeight: 'bold'
    fontFamily: 'roboto-bold'
  }
  , mediumLight: {
    fontSize: FontSize.medium,
    fontFamily: 'roboto-regular'
  }
  , mediumText: {
    fontSize: FontSize.mediumText,
    fontFamily: 'roboto-regular'
  }

  , normal: {
    fontSize: FontSize.normalText,
    fontFamily: 'roboto-regular'
  }
  , normalBold: {
    fontSize: FontSize.normalText,
    // fontWeight: 'bold'
    fontFamily: 'roboto-bold'
  },
  changeBold: {
    fontSize: FontSize.small,
    // fontWeight: 'bold'
    fontFamily: 'roboto-bold'
  },
  normalItalic: {
    fontSize: FontSize.normalText,
    // fontStyle: 'italic'
    fontFamily: 'roboto-italic'
  }
  
  , small: {
    fontSize: FontSize.small,
    fontFamily: 'roboto-regular'
  }
  
  , avartar: {
    fontSize: FontSize.avartar,
    fontFamily: 'roboto-regular'
  }
});