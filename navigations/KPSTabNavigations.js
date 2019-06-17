import React from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from 'react-navigation';

import { SolidColors } from '../const/Colors';

import KPSChoDuyetScreen from '../screens/khoiphucso/KPSChoDuyetScreen';
import KPSDaDuyetScreen from '../screens/khoiphucso/KPSDaDuyetScreen';

export default createBottomTabNavigator(
  {
    CSKKChoDuyet: {
      screen: KPSChoDuyetScreen,
      navigationOptions: {
        tabBarLabel:"Danh sách chờ duyệt",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-list" size={30} color={tintColor} />
        )
      }
    },
    CSKKDaDuyet: {
      screen: KPSDaDuyetScreen,
      navigationOptions: {
        tabBarLabel:"Danh sách đã duyệt",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-list-box" size={30} color={tintColor} />
        )
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: SolidColors.primary,
      inactiveTintColor: SolidColors.grey,
    }
  }
);