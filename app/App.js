/**
* Common entry point for the app
* @flow
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';
import MapView from 'react-native-maps';
import networking from './networking/networking';
import instagram from './models/instagram';
import configureStore from './config/store'
import * as actions from './actions/actions'

const store = configureStore()

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feeds: [] // A hashmap of geodata feeds where the key is the name of the feed
    };
  }

  componentDidMount() {
    // TODO: Temporary test... also, image won't show up until app is reloaded after first-run
    networking.download(
      'https://facebook.github.io/react/img/', 'logo_og.png'
    )
    .then((res) => {
      this.setState({
        feeds: instagram.objects('InstagramImage')
      });

      // redux test
      store.dispatch(actions.addFeed(instagram.objects('InstagramImage')));
    })
  }

  FeedMarkers() {
    return this.state.feeds.map(function(instagramImage, i) {
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
          {this.FeedMarkers()}
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
