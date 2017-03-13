import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import ImageDownloader from '../networking/ImageDownloader';
import { feedFetchData, feedsFetchSuccess, updateMarkerThumbnail } from '../actions/actions'

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
    //this.getInstagramLocations('https://api.instagram.com/v1/locations/search?lat=' + this.state.latitude + '&lng=' + this.state.longitude + '&access_token=' + this.props.instagramAccessToken);
    this.props.fetchData('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.state.latitude + ',' + this.state.longitude + '&radius=1400&type=restaurant&key=AIzaSyD-d7MKoxPuq0XvV3BGXMbuBLRIlo1GX4U');
  }

  getInstagramLocations(url) {
    fetch(url)
    .then((response) => {
      console.log("RESPONSE: " + JSON.stringify(response));

      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    })
    .then(response => response.json())
    .then(feed => {
      var locationIds = [];

      console.log("INSTA LOCATION FEED: " + JSON.stringify(feed));

      var data = feed['data'];
      data.map(locationData => {
        locationIds.push(locationData['id']);
      })

      //this.getInstagramLocationImages(locationIds);

      this.props.fetchSuccess(url, feed)
    })
    .catch(() => {
      console.log("getInstagramLocations CATCH");
    });
  }

  // Avoid this for now... it launches a different Instagram API request for every single nearby location, running us close to the request limit
  /*getInstagramLocationImages(locationIds) {
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
        var data = feed['data'];
        if (data.length > 0) {
          var keys = Object.keys(data);

          for (key in keys) {
            var instagramPost = data[key];

            var locationName = instagramPost['location']['name'];

            // TODO: Check if image exists first, and download if it doesn't
            var imageUrl = instagramPost['images']['standard_resolution']['url'];
            downloadImage(this.props, locationName, imageUrl, 'image');

            var thumbnailUrl = instagramPost['images']['thumbnail']['url'];
            downloadImage(this.props, locationName, thumbnailUrl, 'thumbnail');
          }
        }
      })
      .catch(() => {
        console.log("getInstagramLocationImages CATCH");
      });
    });
  }*/

  getFeedMarkers() {
    this.props.feeds.map(  // Iterate through the master feeds array that contains individual feeds
      feed => feed.feed.map(      // Iterate through the marker data contained in each individual feed
        (markerData, i) => {
          if (markerData.thumbnailPath) {
            console.log("at " + i + " WE HAVE A THUMBNAIL: " + markerData.thumbnailPath);
          } else {
            console.log("...no thumbnail...");
          }
        }
      )
    );

    return this.props.feeds.map(  // Iterate through the master feeds array that contains individual feeds
      feed => feed.feed.map(      // Iterate through the marker data contained in each individual feed
        (markerData, i) =>
          <MapView.Marker
            key={i}
            title={markerData.name}
            coordinate={{latitude: markerData.latitude, longitude: markerData.longitude}}
            onPress={() => this.onMarkerPress(markerData.name, markerData.latitude, markerData.longitude)}>
            <MapView.Callout tooltip style={styles.customView}>
                <View style={styles.calloutText}>
                  <Text>{markerData.title}</Text>
                </View>
            </MapView.Callout>
            { markerData.thumbnailPath &&
                <Image
                  source={{uri: 'file:' + markerData.thumbnailPath}}
                  style={{width: 80, height: 80}} />
            }
          </MapView.Marker>
      )
    );
  }

  onMarkerPress(name, latitude, longitude) {
    console.log("PRESSED MARKER: " + name + " at " + latitude + ", " + longitude);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}  // A style is required, otherwise the screen appears blank
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03}}
          moveOnMarkerPress={false}
          showsUserLocation={true}
          showsMyLocationButton={true}>
          {this.getFeedMarkers()}
        </MapView>
      </View>
    );
  }
}

async function downloadImage(props, locationName, imageUrl, prefix) {
  var indexOfLastSlash = imageUrl.lastIndexOf('/');
  var imageBaseUrl = imageUrl.substring(0, indexOfLastSlash + 1);
  var imageFilename = imageUrl.substring(indexOfLastSlash + 1);

  // TODO: Check if image exists first, and download if it doesn't
  ImageDownloader.download(
    imageBaseUrl, imageFilename, locationName + '/' + prefix
  )
  .then((res) => {
    if (prefix.indexOf('thumbnail') > -1) {
      props.linkThumbnailToMarker(locationName, res.path());
    }
  });
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
    fetchSuccess: (url, feed) => dispatch(feedsFetchSuccess(url, feed)),
    linkThumbnailToMarker: (locationName, thumbnailPath) => dispatch(updateMarkerThumbnail(locationName, thumbnailPath))
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
