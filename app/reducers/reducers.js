import { combineReducers } from 'redux'
import { ADD_FEED, REMOVE_FEED } from '../actions/actions'

const initialState = {
  feeds: []
}

function mapWrapperApp(state = initialState, action) {
  switch (action.type) {
    case ADD_FEED:
      return state
    case REMOVE_FEED:
      return state
    default:
      return state
  }
}

/*
function feeds(state = [], action) {
  switch (action.type) {
    case ADD_FEED:
      return [
        ...state,
        {
          //stuff
        }
      ]
    case REMOVE_FEED:
      return ''
    default:
      return state
  }
}

const mapWrapperApp = combineReducers({
  feeds
})
*/

export default mapWrapperApp
