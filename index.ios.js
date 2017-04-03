/**
 * iOS entry point for the app
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
import App from './app/components/App'

export default class MapMixer extends Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('MapMixer', () => MapMixer);
