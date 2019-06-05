import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import { SolidColors }           from "../const/Colors";

import AppLoading                from "../screens/AppLoading";
import MainStackNavigations      from "./MainStackNavigations";
import LoginStackNavigation      from './LoginStackNavigation';

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
//test
const NavigationStack = createSwitchNavigator(
  {
    Loading         : AppLoading, 
    Login           : LoginStackNavigation,
    Home            : MainStackNavigations
  },
  stackNaviConfig
);

const Container = createAppContainer(NavigationStack);

export default Container;
