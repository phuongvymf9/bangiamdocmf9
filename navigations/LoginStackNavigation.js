import { createStackNavigator } from "react-navigation";
import { SolidColors }          from "../const/Colors";

import LoginScreen  from "../screens/LoginScreen";
import OtpScreen    from "../screens/OtpScreen";

const stackNaviConfig = {
  navigationOptions: {
    headerMode        : 'none',
    headerStyle       : {
      backgroundColor : SolidColors.appBarColor,
    },
    headerTintColor   : '#fff',
    headerTitleStyle  : {
      fontWeight      : 'bold',
    },
  }
}

export default createStackNavigator(
  {
    Login : LoginScreen,
    OTP   : OtpScreen,
  },
  stackNaviConfig
);
