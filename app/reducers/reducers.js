import {
  FEEDS_HAVE_ERRORED, FEEDS_ARE_LOADING, FEEDS_FETCH_SUCCESS
} from '../actions/actions';

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
      // TODO: Use an actual list of geolocation items instead of placeholder data
      var newState = Object.assign([], state);
      newState.push({
        url: action.url,
        feed: action.feed
      });

      return newState;

    default:
      return state;
  }
}
