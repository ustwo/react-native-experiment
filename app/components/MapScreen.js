import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import ImageDownloader from '../networking/ImageDownloader';
import { feedFetchData, feedsFetchSuccess } from '../actions/actions'

class MapScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: 40.7503287,
      longitude: -73.9936573,
      instagramLocations: []
    };
  }

  componentDidMount() {
    // These dispatches, once the async tasks complete, will update the feeds in the local state (triggering a re-render)
    this.getInstagramLocations('https://api.instagram.com/v1/locations/search?lat=' + this.state.latitude + '&lng=' + this.state.longitude + '&access_token=' + this.props.instagramAccessToken);
    this.props.fetchData('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.state.latitude + ',' + this.state.longitude + '&radius=1400&type=food&key=AIzaSyD-d7MKoxPuq0XvV3BGXMbuBLRIlo1GX4U');
  }

  getInstagramLocations(url) {
    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    })
    .then(response => response.json())
    .then(feed => {
      var locationIds = [];

      var data = feed['data'];
      data.map(locationData => {
        locationIds.push(locationData['id']);
      })

      this.getInstagramLocationImages(locationIds);

      this.props.fetchSuccess(url, feed)
    })
    .catch(() => {
      console.log("getInstagramLocations CATCH");
    });
  }

  getInstagramLocationImages(locationIds) {
    locationIds.map(locationId => {
      fetch('https://api.instagram.com/v1/locations/' + locationId + '/media/recent?access_token=' + this.props.instagramAccessToken)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(feed => {
        //console.log("fetching from: " + 'https://api.instagram.com/v1/locations/' + locationId + '/media/recent?access_token=' + this.props.instagramAccessToken)

        var data = feed['data'];
        if (data.length > 0) {
          var keys = Object.keys(data);

          for (key in keys) {
            var instagramPost = data[key];

            var locationName = instagramPost['location']['name'];

            // TODO: Check if image exists first, and download if it doesn't
            var imageUrl = instagramPost['images']['standard_resolution']['url'];
            downloadImage(imageUrl, locationName + '/image');

            var thumbnailUrl = instagramPost['images']['thumbnail']['url'];
            downloadImage(thumbnailUrl, locationName + '/thumbnail');
          }
        }
      })
      .catch(() => {
        console.log("getInstagramLocationImages CATCH");
      });
    });
  }

  getFeedMarkers() {
    //console.log('state feeds: ' + JSON.stringify(this.props.feeds));
    /*this.props.feeds.map(  // Iterate through the master feeds array that contains individual feeds
      feed => feed.feed.map(      // Iterate through the marker data contained in each individual feed
        (markerData, i) =>
          console.log(feed.source + " location name: " + markerData.name)
      )
    );*/

    return this.props.feeds.map(  // Iterate through the master feeds array that contains individual feeds
      feed => feed.feed.map(      // Iterate through the marker data contained in each individual feed
        (markerData, i) =>
          // See MarkerData for available feeds (NOTE: Not actually using MarkerData at the moment, but we will)
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
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421}}
          showsUserLocation={true}
          showsMyLocationButton={true}>
          {this.getFeedMarkers()}
        </MapView>
      </View>
    );
  }
}

async function downloadImage(imageUrl, prefix) {
  var indexOfLastSlash = imageUrl.lastIndexOf('/');
  var imageBaseUrl = imageUrl.substring(0, indexOfLastSlash + 1);
  var imageFilename = imageUrl.substring(indexOfLastSlash + 1);

  console.log("baseUrl: " + imageBaseUrl + ", imageFilename: " + imageFilename);

  // TODO: Check if image exists first, and download if it doesn't
  ImageDownloader.download(imageBaseUrl, imageFilename, prefix);
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
    fetchData: (url) => dispatch(feedFetchData(url)),
    fetchSuccess: (url, feed) => dispatch(feedsFetchSuccess(url, feed))
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
