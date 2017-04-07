import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  Animated,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import RNFetchBlob from 'react-native-fetch-blob';
import GridView from 'react-native-easy-gridview';
import { Container, Header, Body, Button, Icon, Title, Content } from 'native-base';

import InstagramAuth from './InstagramAuth';
import { channelOneSource, channelTwoSource, channelTwoAuthUrl } from '../config/feedSources';
import Constants from '../config/Constants';
import ImageDownloader from '../networking/ImageDownloader';
import { channelOneFetchFeed, channelOneFeedsFetchSuccess, clearChannelTwo, channelTwoAddItem } from '../actions/actions';

const screen = Dimensions.get('window');

var isChannelTwoExpanded = false;

class MapScreen extends Component {

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

    this.state = {
      mapRegion: {
        latitude: 40.7503287,
        longitude: -73.9936573,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03
      },
      instagramLocationIds: new Set(), // TODO: Store in Realm for persistence (less Instagram API requests)?
      pressedMarker: {
        name: ''
      },
      gridViewData: [],
      bounceValue: new Animated.Value(0)  // Initial position of Channel Two container
    };

    // Bind this function in order to have access to "this" inside the callback
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }

  /*
   * Channel One API Requests.
   */

  onRegionChangeComplete(mapRegion) {
    this.setState({ mapRegion });
    this.props.channelOneFetchFeed(channelOneSource(this.state.mapRegion.latitude, this.state.mapRegion.longitude, ''));
  }

  /*
   * Channel Two API Requests.
   * These functions rely on data being available in Channel One.
   */

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
      var data = feed['data'];

      data.map(locationData => {
        if (!this.state.instagramLocationIds.has(locationData['id'])) {
          this.state.instagramLocationIds.add(locationData['id']);
        }

        // TODO: Need more robust location name matching
        if (locationData['name'] == this.state.pressedMarker.name) {
          this.getInstagramLocationImages([locationData['id']]);
        }
      });

      //this.props.channelOneFetchSuccess(url, feed)
    })
    .catch(() => {
      console.log("getInstagramLocations CATCH");
    });
  }

  // Be sure to call this function only when necessary
  // so as not to exceed the Instagram API request limit.
  // Will dispatch Redux actions upon success and available data.
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
  }

  /*
   * Render helper functions
   */

   onMenuPress() {
 		this.props.navigator.push({
 			component: InstagramAuth,
 			passProps: {
         uri: channelTwoAuthUrl()
 			}
 		});
   }

  // May be called upon re-render caused by a Redux state change.
  getFeedMarkers() {
    return this.props.channelOneFeeds.map(  // Iterate through the master channelOne feeds array that contains individual feeds
      feed => feed.feed.map(                // Iterate through the marker data contained in each individual feed
        (markerData, i) =>
          <MapView.Marker
            key={i}
            title={markerData.name}
            coordinate={{latitude: markerData.latitude, longitude: markerData.longitude}}
            onSelect={() => this.onMarkerPress(markerData.name, markerData.latitude, markerData.longitude)}
            onPress={() => this.onMarkerPress(markerData.name, markerData.latitude, markerData.longitude)}>
            <MapView.Callout>
                <View>
                  <Text>{markerData.name}</Text>
                </View>
            </MapView.Callout>
          </MapView.Marker>
      )
    );
  }

  // WORKAROUND NOTE: onSelect triggers in iOS and onPress triggers in Android
  onMarkerPress(name, latitude, longitude) {
    this.props.clearChannelTwo();

    // TODO: First check if instagram location is already in current list, if not request nearby insta locations
    this.getInstagramLocations(channelTwoSource(latitude, longitude, this.props.instagramAccessToken));
    this.setState({
      pressedMarker: {
        name: name
      }
    });
  }

  renderChannelTwo() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    if (Platform.OS === 'android') {
      // Can't get TouchableHighlight to work in Android...
      return <TouchableNativeFeedback onPress={() => {this.toggleChannelTwo()}}>
        <Animated.View style={[styles.channelTwoContainer,
          {transform: [{translateY: this.state.bounceValue}]}]}>
          <GridView
            dataSource={ds.cloneWithRows(this.props.channelTwo)}
            renderRow={this.renderChannelTwoItem}
            numberOfItemsPerRow={3}
            removeClippedSubviews={false}
          />
        </Animated.View>
      </TouchableNativeFeedback>
    } else {
      // and TouchableNativeFeedback isn't supported in iOS
      return <TouchableHighlight onPress={() => {this.toggleChannelTwo()}}>
        <Animated.View style={[styles.channelTwoContainer,
          {transform: [{translateY: this.state.bounceValue}]}]}>
          <GridView
            dataSource={ds.cloneWithRows(this.props.channelTwo)}
            renderRow={this.renderChannelTwoItem}
            numberOfItemsPerRow={3}
            removeClippedSubviews={false}
          />
        </Animated.View>
      </TouchableHighlight>
    }
  }

  renderChannelTwoItem = (thumbnailPath) =>
    <View>
      <Image
        source={{uri: 'file:' + Constants.CACHED_IMAGES_DIR + thumbnailPath}}
        style={styles.channelTwoItem} />
    </View>

  // Expands or contracts Channel Two.
  // May be called upon re-render caused by a Redux state change.
  toggleChannelTwo() {
    var toValue = (screen.height - 250) * -1;
    if (isChannelTwoExpanded) {
      toValue = 0;
    }

    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8
      }
    ).start();

    isChannelTwoExpanded = !isChannelTwoExpanded;
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Map Mixer</Title>
          </Body>
          <Button
            onPress={() => this.onMenuPress()}
            iconCenter
            light>
            <Icon name='person' />
          </Button>
        </Header>
        <View style={styles.content}>
          <MapView
            style={styles.map}  // A style is required, otherwise the screen appears blank
            initialRegion={this.state.mapRegion}
            onRegionChangeComplete={this.onRegionChangeComplete}
            moveOnMarkerPress={false}
            showsUserLocation={true}
            showsMyLocationButton={true}>
            {this.getFeedMarkers()}
          </MapView>
          { (this.props.channelTwo.length > 0) && this.renderChannelTwo() }
        </View>
      </Container>
    );
  }
}

/*
 * Asynchronous threads
 */

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
      props.channelTwoAddItem(locationName + '/thumbnail-' + imageFilename);
    }
  });
}

/*
 * Redux methods
 */

const mapStateToProps = (state) => {
  return {
    instagramAccessToken: state.receivedInstagramAccessToken,
    channelOneFeeds: state.channelOneFeeds,
    channelOneFeedsHaveErrored: state.channelOneFeedsHaveErrored,
    channelOneFeedsAreLoading: state.channelOneFeedsAreLoading,
    channelTwo: state.channelTwo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    channelOneFetchFeed: (url) => dispatch(channelOneFetchFeed(url)),
    channelOneFetchSuccess: (url, feed) => dispatch(channelOneFeedsFetchSuccess(url, feed)),
    clearChannelTwo: () => dispatch(clearChannelTwo()),
    channelTwoAddItem: (image) => dispatch(channelTwoAddItem(image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

/*
 * Styles
 */

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  channelTwoContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    left: 20,
    top: screen.height - 150,
    width: screen.width - 40,
    height: screen.height - 100,
    paddingHorizontal: 20,
    paddingTop: 40
  },
  channelTwoList: {
    flex: 1
  },
  channelTwoItem: {
    flex: 1,
    height: 80,
    margin: 1
  }
});
