import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const initialState = {
  receivedInstagramAccessToken: '',
  feeds: [],
  feedsHaveErrored: false,
  feedsAreLoading: false
}

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}
