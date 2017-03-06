import {
  FEEDS_HAVE_ERRORED, FEEDS_ARE_LOADING, FEEDS_FETCH_SUCCESS
} from '../actions/actions';

/*export default function mapWrapperApp(state, action) {
  switch (action.type) {
    case ADD_FEED:
      var newState = Object.assign({}, state);

      newState.feeds.push({
        markers: action.markers
      });

      console.log('ADDED NEW FEED, length: ' + newState.feeds.length);

      return newState;

    case REMOVE_FEED:
      var feeds = [].concat(state.feeds);

      feeds.splice(action.id, 1);

      return Object.assign({}, state, {
        feeds: feeds
      });

    case CLEAR_FEEDS:
      return Object.assign({}, state, {
        feeds: []
      });

    default:
      return state
  }
}*/

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
      return action.feeds;

    default:
      return state;
  }
}
