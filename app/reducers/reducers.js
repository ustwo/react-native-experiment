import {
  RECEIVED_INSTAGRAM_ACCESS_TOKEN,
  CHANNEL_ONE_FEEDS_HAVE_ERRORED,
  CHANNEL_ONE_FEEDS_ARE_LOADING,
  CHANNEL_ONE_FEEDS_FETCH_SUCCESS,
  CLEAR_CHANNEL_ONE,
  CHANNEL_TWO_ADD_ITEM

  // Not currently used
  //UPDATE_THUMBNAIL_PATH
} from '../actions/actions';

import MarkerFeedBuilder from '../models/MarkerFeedBuilder'

export function receivedInstagramAccessToken(state = '', action) {
  switch (action.type) {
    case RECEIVED_INSTAGRAM_ACCESS_TOKEN:
      return action.accessToken;

    default:
      return state;
  }
}

export function channelOneFeedsHaveErrored(state = false, action) {
  switch (action.type) {
    case CHANNEL_ONE_FEEDS_HAVE_ERRORED:
      return action.haveErrored;

    default:
      return state;
  }
}

export function channelOneFeedsAreLoading(state = false, action) {
  switch (action.type) {
    case CHANNEL_ONE_FEEDS_ARE_LOADING:
      return action.areLoading;

    default:
      return state;
  }
}

export function channelOneFeeds(state = [], action) {
  switch (action.type) {
    case CLEAR_CHANNEL_ONE:
      return [];

    case CHANNEL_ONE_FEEDS_FETCH_SUCCESS:
      // Add the new feed to the existing list of feeds
      var newState = Object.assign([], state);

      var hostname = getHostname(action.url);

      newState.push({
        source: hostname,
        feed: MarkerFeedBuilder.build(hostname, action.feed)
      });

      return newState;

    // Not currently used
    /*case UPDATE_THUMBNAIL_PATH:
      var newState = Object.assign([], state);

      for (var i = 0; i < newState.length; i++) {
        var markers = newState[i]['feed'];

        for (var j = 0; j < markers.length; j++) {
          var markerData = markers[j];

          if (markerData.name == action.locationName) {
            markerData.thumbnailPath = action.thumbnailPath;
            break;
          }
        }
      }

      return newState;*/

    default:
      return state;
  }
}

export function channelTwo(state = [], action) {
  switch (action.type) {
    case CHANNEL_TWO_ADD_ITEM:
      var newState = Object.assign([], state);

      // TODO: Use a Set instead of an array to avoid duplicates
      /*if (!newState.has(action.image)) {
        newState.add(action.image);
      }*/
      newState.push(action.image);

      return newState;

    default:
      return state;
  }
}

/*
 * Extract the hostname from the provided URL
 */
function getHostname(url) {
  var indexOfDoubleSlash = url.indexOf('://');
  var indexOfDotCom = url.indexOf('.com/'); // TODO: Support other extensions?
  return url.substring(indexOfDoubleSlash + 3, indexOfDotCom + 4);
}
