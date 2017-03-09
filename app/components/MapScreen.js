import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import networking from '../networking/networking';
import feedFetchData from '../actions/actions'

class MapScreen extends Component {

  componentDidMount() {
    // This dispatch, once its async task completes, will update the feeds in the local state (triggering a re-render)
    this.props.fetchData('https://api.instagram.com/v1/locations/search?lat=37.78825&lng=-122.4324&access_token=' + this.props.instagramAccessToken);
  }

  FeedMarkers() {
    console.log('state feeds: ' + JSON.stringify(this.props.feeds));

    return this.props.feeds.map(  // Iterate through the master feeds array that contains individual feeds
      feed => feed.feed.map(      // Iterate through the marker data contained in each individual feed
        (markerData, i) =>
          <MapView.Marker
            key={i}
            coordinate={{latitude: markerData.latitude, longitude: markerData.longitude}}>
          </MapView.Marker>
      )
    );
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

const mapStateToProps = (state) => {
  return {
    instagramAccessToken: state.receivedInstagramAccessToken,
    feeds: state.feeds,
    haveErrored: state.feedsHaveErrored,
    areLoading: state.feedsAreLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(feedFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

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

//AppRegistry.registerComponent('Map', () => Map);
