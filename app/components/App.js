/**
* Common entry point for the app
* @flow
*/

import React, { Component } from 'react';
import { StyleSheet, Navigator, View } from 'react-native';

import LoginScreen from './LoginScreen';

const routeStack = [
  { name: 'Login', component: LoginScreen }
];

export default class App extends Component {

  componentDidMount() {
    // TODO: Autologin a saved user
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={routeStack[0]}
          initialRouteStack={routeStack}
          renderScene={(route, navigator) =>
            <route.component route={route} navigator={navigator} {...route.passProps} />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
