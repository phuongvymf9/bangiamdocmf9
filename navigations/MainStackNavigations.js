import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import { SolidColors }          from "../const/Colors";
import { getSlideFromRightTransitionConfig } from "../utils/NavigationUtils";

import HomeScreen               from "../screens/HomeScreen";
import TaiKhoanScreen           from "../screens/TaiKhoanScreen";
import HistoryScreen            from "../screens/HistoryScreen";
import DongBoScreen             from "../screens/DongBoScreen";

// Cap so khuyen khich
import CSKKTabNavigations       from "./CSKKTabNavigations";
import CSKKChiTietScreen        from "../screens/capsokhuyenkhich/CSKKChiTietScreen";

import ModalChung from "../comps/capsokhuyenkhich/ModalChung";

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
  },
  ...Platform.select({
    android: {
      transitionConfig: getSlideFromRightTransitionConfig
    }
  })
}

export default createStackNavigator(
  {
    Home          : HomeScreen, // HomeScreen,
    UserInfo      : TaiKhoanScreen,
    LichSuChamSoc : HistoryScreen,
    DongBo        : DongBoScreen,

    // ## Cap so khuyen khich =================================

    CapSoKhuyenKhich: {
      screen: CSKKTabNavigations,
      navigationOptions: { title: "Cấp số khuyến khích" }
    },
    CSKKChiTiet: CSKKChiTietScreen,
  },
  stackNaviConfig
);
