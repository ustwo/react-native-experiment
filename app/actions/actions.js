/*
* action types
*/
export const ADD_FEED = 'ADD_FEED'
export const REMOVE_FEED = 'REMOVE_FEED'
export const CLEAR_FEEDS = 'CLEAR_FEEDS'

/*
* action creators
*/
export function addFeed(mapMarkers) {
  return {
    type: ADD_FEED,
    markers: mapMarkers
  };
}

export function removeFeed(id) {
  return {
    type: REMOVE_FEED,
    id: id
  };
}

export function clearFeeds() {
  return {
    type: CLEAR_FEEDS
  };
}
