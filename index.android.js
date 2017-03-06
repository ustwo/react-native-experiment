/**
 * Android entry point for the app
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import configureStore from './app/config/store'
import App from './app/components/App'

let store = configureStore();

export default class MapWrapper extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('MapWrapper', () => MapWrapper);
