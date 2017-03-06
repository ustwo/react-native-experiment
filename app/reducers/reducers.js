import { ADD_FEED, REMOVE_FEED, CLEAR_FEEDS } from '../actions/actions'

const initialState = {
  feeds: []
}

export default function mapWrapperApp(state = initialState, action) {
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
}
