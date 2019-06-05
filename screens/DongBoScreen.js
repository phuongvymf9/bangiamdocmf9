import React, { Component } from 'react';

import { createSubNavigationOptions } from '../utils/HeaderUtil';

import AppBuiding from "../comps/comp-chung/AppBuiding";

export default class DongBoScreen extends Component {
  static navigationOptions = createSubNavigationOptions('Đồng bộ dữ liệu');

  render() {
    return (
      <AppBuiding />
    );
  }
}
