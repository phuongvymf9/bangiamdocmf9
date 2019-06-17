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

// Cap so khuyen khich
import KPSTabNavigations       from "./KPSTabNavigations";
import KPSChiTietScreen        from "../screens/khoiphucso/KPSChiTietScreen";


export default createStackNavigator(
  {
    Home          : HomeScreen, // HomeScreen,
    UserInfo      : TaiKhoanScreen,
    LichSuChamSoc : HistoryScreen,
    DongBo        : DongBoScreen,

// ## Cap so khuyen khich =================================

    CapSoKhuyenKhich: {
      screen: CSKKTabNavigations,
      navigationOptions: { 
        title: "Cấp số khuyến khích" ,
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
    },
    CSKKChiTiet: CSKKChiTietScreen,
    
// ## Khoi phuc so =================================

     KhoiPhucSo: {
      screen: KPSTabNavigations,
      navigationOptions: { 
        title: "Khôi phục số" ,
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
    },
    KPSChiTiet: KPSChiTietScreen,
  },
  //stackNaviConfig
);
