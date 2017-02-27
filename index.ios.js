/**
 * iOS entry point for the app
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

export default class MapWrapper extends Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('MapWrapper', () => MapWrapper);
