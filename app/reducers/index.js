import { combineReducers } from 'redux';
import {
  receivedInstagramAccessToken,
  feeds,
  feedsHaveErrored,
  feedsAreLoading
} from './reducers';

export default combineReducers({
  receivedInstagramAccessToken,
  feeds,
  feedsHaveErrored,
  feedsAreLoading
});
