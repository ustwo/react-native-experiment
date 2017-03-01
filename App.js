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
import Marker from './src/components/Marker'; // TODO: Is default MapView.Marker good enough?
import networking from './src/networking/networking';
import RNFetchBlob from 'react-native-fetch-blob';
import instagram from './src/models/instagram';

export default class App extends Component {
  constructor(props) {
    super(props);

    // Placeholder, doesn't really do anything yet
    this.feed = instagram.objects('InstagramFeed');
    this.feed.addListener((name, changes) => {
      console.log("FEED changed: " + JSON.stringify(changes));
    });

    this.state = {};
  }

  componentDidMount() {
    // TODO: Temporary test... also, image won't show up until app is reloaded after first-run
    networking.download(
      'https://facebook.github.io/react/img/', 'logo_og.png'
    )
    .then((res) => {
    })
  }

  // TODO: Use the feed prop
  FeedMarkers(images) {
    return images.map(function(instagramImage, i) {
      return(
          <MapView.Marker
            key={i}
            coordinate={{latitude: instagramImage.latitude, longitude: instagramImage.longitude}}>
            <Image
              source={{uri: 'file:' + instagramImage.filePath}}
              style={{width: 50, height: 50}} />
          </MapView.Marker>
      );
    })
  }

  render() {
    let images = instagram.objects('InstagramImage');

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
          {this.FeedMarkers(images)}
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
