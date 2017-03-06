/*
* action types
*/
/*export const ADD_FEED = 'ADD_FEED'
export const REMOVE_FEED = 'REMOVE_FEED'
export const CLEAR_FEEDS = 'CLEAR_FEEDS'*/
export const FEEDS_HAVE_ERRORED = 'FEEDS_HAVE_ERRORED'
export const FEEDS_ARE_LOADING = 'FEEDS_ARE_LOADING'
export const FEEDS_FETCH_SUCCESS = 'FEEDS_FETCH_SUCCESS'

/*
* action creators
*/
/*export function addFeed(mapMarkers) {
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
}*/

export function feedsHaveErrored(bool) {
  return {
    type: FEEDS_HAVE_ERRORED,
    haveErrored: bool
  };
}

export function feedsAreLoading(bool) {
  return {
    type: FEEDS_ARE_LOADING,
    areLoading: bool
  };
}

export function feedsFetchSuccess(feeds) {
  return {
    type: FEEDS_FETCH_SUCCESS,
    feeds: feeds
  };
}

export function feedFetchData(url) {
  console.log('feedFetchData with url: ' + url);

  return (dispatch) => {
    dispatch(feedsAreLoading(true));

    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      dispatch(feedsAreLoading(false));

      return response;
    })
    .then((response) => response.json())
    .then((feeds) => dispatch(feedsFetchSuccess(feeds)))
    .catch(() => dispatch(feedsHaveErrored(true)));
  };
}
