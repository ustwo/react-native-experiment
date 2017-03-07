/*
* action types
*/

export const FEEDS_HAVE_ERRORED = 'FEEDS_HAVE_ERRORED'
export const FEEDS_ARE_LOADING = 'FEEDS_ARE_LOADING'
export const FEEDS_FETCH_SUCCESS = 'FEEDS_FETCH_SUCCESS'

/*
* action creators
*/

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
    url,  // ES6 shorthand
    feed
  };
}

/*
 * An action creator that dispatches one of the action creators above
 * depending on the status of the fetched data. Each of the actions
 * addresses only a part of the store in order to separate concerns.
 */
export default function feedFetchData(url) {
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
    .then(response => response.json())
    .then(feed => dispatch(feedsFetchSuccess(url, feed)))
    .catch(() => dispatch(feedsHaveErrored(true)));
  };
}
