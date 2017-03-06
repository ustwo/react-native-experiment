import { combineReducers } from 'redux';
import { feeds, feedsHaveErrored, feedsAreLoading } from './reducers';

export default combineReducers({
  feeds,
  feedsHaveErrored,
  feedsAreLoading
});
