import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const initialState = {
  receivedInstagramAccessToken: '',
  channelOneFeeds: [],
  channelOneFeedsHaveErrored: false,
  channelOneFeedsAreLoading: false,
  channelTwo: []  // TODO: Use a Set instead of an array to avoid duplicates
}

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}
