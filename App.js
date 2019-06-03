import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigations from "./navigations/AppNavigations";
import { configure } from "./utils/SentryUtil";

console.ignoredYellowBox = ['Remote debugger'];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    configure();
    StatusBar.setBarStyle('light-content', true);
  }

  render() {
    return <AppNavigations />;
  }
}
