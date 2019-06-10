import React from 'react';
import { Text } from 'react-native';

export class SmallText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-regular', fontSize: 14 }]} />;
  }
}

export class SmallTextBold extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-bold', fontSize: 14 }]} />;
  }
}

export class RegularText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-regular', fontSize: 16 }]} />;
  }
}

export class RegularTextItalic extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-regular', fontSize: 16, fontStyle: 'italic' }]} />;
  }
}

export class RegularTextBold extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-bold', fontSize: 16 }]} />;
  }
}

export class MediumText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-regular', fontSize: 18 }]} />;
  }
}

export class MediumTextBold extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-bold', fontSize: 18 }]} />;
  }
}

export class LargeText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-regular', fontSize: 20 }]} />;
  }
}

export class LargeTextBold extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-bold', fontSize: 20 }]} />;
  }
}