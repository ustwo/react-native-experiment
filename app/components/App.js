/**
* Common entry point for the app
* @flow
*/

import React, { Component } from 'react';
import { StyleSheet, Navigator, View } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from '../config/store';
import MapScreen from './MapScreen';

const routeStack = [
  { name: 'MapScreen', component: MapScreen }
];

let store = configureStore();

export default class App extends Component {

  componentDidMount() {
    // TODO: Autologin a saved Instagram user
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Navigator
            initialRoute={routeStack[0]}
            initialRouteStack={routeStack}
            renderScene={(route, navigator) =>
              <route.component route={route} navigator={navigator} {...route.passProps} />
            }
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
