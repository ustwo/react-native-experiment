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
    // TODO: Temporary test... also, image won't show up until app is reloaded after first-run
    /*networking.download(
      'https://facebook.github.io/react/img/', 'logo_og.png'
    )
    .then((res) => {
      this.setState({});  // Trigger a re-render
    })*/
    //this.props.fetchData('https://www.instagram.com/fonztagram/media/');
    this.props.fetchData('https://api.instagram.com/v1/locations/search?lat=37.78825&lng=-122.4324&access_token=' + this.props.instagramAccessToken);
  }

  FeedMarkers() {
    console.log('state feeds: ' + JSON.stringify(this.props.feeds));

    /*return this.props.feeds.map(
      feed => feed.markers.map(
        (instagramImage, i) =>
          <MapView.Marker
            key={i}
            coordinate={{latitude: instagramImage.latitude, longitude: instagramImage.longitude}}>
            <Image
              source={{uri: 'file:' + instagramImage.filePath}}
              style={{width: 50, height: 50}} />
          </MapView.Marker>
      )
    );*/
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
