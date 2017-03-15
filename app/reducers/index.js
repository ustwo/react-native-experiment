import { combineReducers } from 'redux';
import {
  receivedInstagramAccessToken,
  channelOneFeedsHaveErrored,
  channelOneFeedsAreLoading,
  channelOneFeeds,
  channelTwo
} from './reducers';

export default combineReducers({
  receivedInstagramAccessToken,
  channelOneFeedsHaveErrored,
  channelOneFeedsAreLoading,
  channelOneFeeds,
  channelTwo
});
