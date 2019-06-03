import React, { Component } from 'react';

import { createSubNavigationOptions } from '../utils/HeaderUtil';

import AppBuiding from "../comps/comp-chung/AppBuiding";

export default class HistoryScreen extends Component {
  static navigationOptions = createSubNavigationOptions('Lịch sử chăm sóc');
  
  render() {
    return (
      <AppBuiding />
    );
  }
}
