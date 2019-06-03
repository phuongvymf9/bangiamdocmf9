import { Dimensions, StatusBar, Platform } from "react-native";
import { getStatusBarHeight } from "../utils/StatusBarHeight";

// ------------------------------------------------------------------------------------------
// ## FOR LAYOUT ## -------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

const { width, height } = Dimensions.get('window');
const statusBarHeight   = Platform.OS === 'android' ? StatusBar.currentHeight : getStatusBarHeight();

export const Layout = {
  screenWidth           : width,
  screenHeight          : height,
  statusBarHeight       : statusBarHeight,
  AppBarHeight          : 40 + statusBarHeight,
  compsInfoWidth        : width - 30,
  
  // ## Menu Item =======================================
  menuItemBorderRadius  : 5,
  menuItemHeight        : 100,
  menuItemWidth         : 100,
  menuItemIconSize      : 30,
  
  // ## Margin ==========================================
  marginPaddingSmall    : 5,
  marginPaddingDefault  : 10,
  marginPaddingLarge    : 15,
  
  // ## Border ==========================================
  borderRadisComponent  : 10,
  borderWidthDefault    : 1,
  borderComponentSmall  : 5,

  // ## Button ==========================================
  buttonHeight          : 40,
  buttonMediumHeight    : 50,
  buttonLargeHeight     : 60,
};

// ------------------------------------------------------------------------------------------
// ## FOR FONTSIZE ## -----------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

export const FontSize = {
  large         : 24,
  medium        : 18,
  small         : 12,
  titleHeader   : 21,
  normalText    : 15,
  mediumText    : 17,
  avartar       : 38,

  iconSizeWithNormalText  : 19,
  iconSizeWithLargeText   : 24
};

// ------------------------------------------------------------------------------------------
// ## FOR ICON SIZE ## ----------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

export const IconSize = {
  loginIcon: {
    width   : 160,
    height  : 160
  }
};

// ------------------------------------------------------------------------------------------
// ## FOR LOGIN FORM LAYOUT ## --------------------------------------------------------------
// ------------------------------------------------------------------------------------------

const inputHeight = 45;

export const LoginFormLayout = {
  formWidth     : 310,
  inputHeight   : inputHeight,
  borderRadius  : inputHeight / 2,
  borderWidth   : 1,
  borderColor   : 'white'
}

// ------------------------------------------------------------------------------------------
// ## FOR TAI KHOAN SCREEN LAYOUT ## --------------------------------------------------------
// ------------------------------------------------------------------------------------------

export const AvartarSize = {
  avartarSize   : 90,
  avartarSmall  : 45,
}