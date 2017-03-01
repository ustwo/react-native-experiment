/**
* Common entry point for the app
* @flow
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Platform
} from 'react-native';
import MapView from 'react-native-maps';
import Marker from './components/Marker'; // TODO: Is default MapView.Marker good enough?
import Networking from './components/Networking';
import RNFetchBlob from 'react-native-fetch-blob';

export default class App extends Component {
  componentDidMount() {
    // TODO: Temporary test... also, image won't show up until app is reloaded after first-run
    Networking.download(
      'https://facebook.github.io/react/img/', 'logo_og.png'
    )
    .then((res) => {
    })
  }

  render() {
    // TODO: Temporary test
    let dirs = RNFetchBlob.fs.dirs;
    let filename = 'file:' + dirs.DocumentDir + '/user_images/' + 'logo_og.png';

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}  // A style is required, otherwise the screen appears blank
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421}}
          showsUserLocation={true}
          showsMyLocationButton={true}>
          <MapView.Marker
            coordinate={{latitude: 37.78825, longitude: -122.4624}}>
            <Image
              source={{uri: filename}}
              style={{width: 50, height: 50}} />
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

AppRegistry.registerComponent('MapWrapper', () => MapWrapper);
