import {
  CHANNEL_ONE_FEEDS_HAVE_ERRORED,
  CHANNEL_ONE_FEEDS_ARE_LOADING,
  CLEAR_CHANNEL_ONE,
  CHANNEL_ONE_FEEDS_FETCH_SUCCESS,
  RECEIVED_INSTAGRAM_ACCESS_TOKEN,
  CLEAR_CHANNEL_TWO,
  CHANNEL_TWO_ADD_ITEM
} from '../actions/actions';

import MarkerFeedBuilder from '../models/MarkerFeedBuilder'

/*
 * Channel One
 */

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

    default:
      return state;
  }
}

/*
 * Channel Two
 */

 export function receivedInstagramAccessToken(state = '', action) {
   switch (action.type) {
     case RECEIVED_INSTAGRAM_ACCESS_TOKEN:
       return action.accessToken;

     default:
       return state;
   }
 }

export function channelTwo(state = [], action) {
  switch (action.type) {
    case CLEAR_CHANNEL_TWO:
      return [];

    case CHANNEL_TWO_ADD_ITEM:
      var newState = Object.assign([], state);

      // TODO: Use a Set instead of an array to avoid duplicates?
      newState.push(action.image);

      return newState;

    default:
      return state;
  }
}

/*
 * Utilities
 */

/*
 * Extract the hostname from the provided URL
 */
function getHostname(url) {
  var indexOfDoubleSlash = url.indexOf('://');
  var indexOfDotCom = url.indexOf('.com/'); // TODO: Support other extensions?
  return url.substring(indexOfDoubleSlash + 3, indexOfDotCom + 4);
}
