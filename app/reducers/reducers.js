import {
  RECEIVED_INSTAGRAM_ACCESS_TOKEN,
  FEEDS_HAVE_ERRORED,
  FEEDS_ARE_LOADING,
  FEEDS_FETCH_SUCCESS
} from '../actions/actions';

import MarkerFactory from '../models/MarkerFactory'

export function receivedInstagramAccessToken(state = '', action) {
  switch (action.type) {
    case RECEIVED_INSTAGRAM_ACCESS_TOKEN:
      return action.accessToken;

    default:
      return state;
  }
}

export function feedsHaveErrored(state = false, action) {
  switch (action.type) {
    case FEEDS_HAVE_ERRORED:
      return action.haveErrored;

    default:
      return state;
  }
}

export function feedsAreLoading(state = false, action) {
  switch (action.type) {
    case FEEDS_ARE_LOADING:
      return action.areLoading;

    default:
      return state;
  }
}

export function feeds(state = [], action) {
  switch (action.type) {
    case FEEDS_FETCH_SUCCESS:
      // Add the new feed to the existing list of feeds
      var newState = Object.assign([], state);

      // Extract the hostname from the provided URL
      var url = action.url;
      var indexOfDoubleSlash = url.indexOf('://');
      var indexOfDotCom = url.indexOf('.com/'); // TODO: Support other extensions?
      var hostname = url.substring(indexOfDoubleSlash + 3, indexOfDotCom + 4);

      newState.push({
        source: hostname,
        feed: MarkerFactory.build(hostname, action.feed)
      });

      return newState;

    default:
      return state;
  }
}
