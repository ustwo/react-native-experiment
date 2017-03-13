import { combineReducers } from 'redux';
import {
  receivedInstagramAccessToken,
  feeds,
  feedsHaveErrored,
  feedsAreLoading,
  channelTwo
} from './reducers';

export default combineReducers({
  receivedInstagramAccessToken,
  feeds,
  feedsHaveErrored,
  feedsAreLoading,
  channelTwo
});
