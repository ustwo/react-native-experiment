/*
 * action types
 */
export const ADD_FEED = 'ADD_FEED'
export const REMOVE_FEED = 'REMOVE_FEED'

/*
 * action creators
 */
export function addFeed(mapMarkers) {
  return { type: ADD_FEED, mapMarkers}
}

export function removeFeed(id) {
  return { type: REMOVE_FEED, id}
}
