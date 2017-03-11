/*
* action types
*/

export const RECEIVED_INSTAGRAM_ACCESS_TOKEN = 'RECEIVED_INSTAGRAM_ACCESS_TOKEN'
export const FEEDS_HAVE_ERRORED = 'FEEDS_HAVE_ERRORED'
export const FEEDS_ARE_LOADING = 'FEEDS_ARE_LOADING'
export const FEEDS_FETCH_SUCCESS = 'FEEDS_FETCH_SUCCESS'
export const UPDATE_THUMBNAIL_PATH = 'UPDATE_THUMBNAIL_PATH'

/*
* action creators
*/

export function receivedInstagramAccessToken(accessToken) {
  return {
    type: RECEIVED_INSTAGRAM_ACCESS_TOKEN,
    accessToken // ES6 shorthand
  }
}

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

export function feedsFetchSuccess(url, feed) {
  return {
    type: FEEDS_FETCH_SUCCESS,
    url,
    feed
  };
}

/*
 * An action creator that dispatches one of the feed action creators above
 * depending on the status of the fetched data. Each of the actions
 * addresses only a part of the store in order to separate concerns.
 */
export function feedFetchData(url) {
  console.log('feedFetchData with url: ' + url);

  return (dispatch) => {
    dispatch(feedsHaveErrored(false));
    dispatch(feedsAreLoading(true));

    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      dispatch(feedsAreLoading(false));

      return response;
    })
    .then(response => response.json())
    .then(feed => dispatch(feedsFetchSuccess(url, feed)))
    .catch(() => dispatch(feedsHaveErrored(true)));
  };
}

/*
 * Will set the thumbnailPath property of the MarkerData object in the
 * store's feed that matches the locationName, triggering a re-render.
 */
export function updateMarkerThumbnail(locationName, thumbnailPath) {
  return {
    type: UPDATE_THUMBNAIL_PATH,
    locationName,
    thumbnailPath
  }
}
