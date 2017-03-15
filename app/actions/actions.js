/*
* action types
*/

export const RECEIVED_INSTAGRAM_ACCESS_TOKEN = 'RECEIVED_INSTAGRAM_ACCESS_TOKEN'
export const CHANNEL_ONE_FEEDS_HAVE_ERRORED = 'CHANNEL_ONE_FEEDS_HAVE_ERRORED'
export const CHANNEL_ONE_FEEDS_ARE_LOADING = 'CHANNEL_ONE_FEEDS_ARE_LOADING'
export const CHANNEL_ONE_FEEDS_FETCH_SUCCESS = 'CHANNEL_ONE_FEEDS_FETCH_SUCCESS'
export const CHANNEL_TWO_ADD_ITEM = 'CHANNEL_TWO_ADD_ITEM'

// Not currently used
//export const UPDATE_THUMBNAIL_PATH = 'UPDATE_THUMBNAIL_PATH'

/*
* action creators
*/

export function receivedInstagramAccessToken(accessToken) {
  return {
    type: RECEIVED_INSTAGRAM_ACCESS_TOKEN,
    accessToken // ES6 shorthand
  }
}

// Not currently used
export function channelOneFeedsHaveErrored(bool) {
  return {
    type: CHANNEL_ONE_FEEDS_HAVE_ERRORED,
    haveErrored: bool
  };
}

// Not currently used
export function channelOneFeedsAreLoading(bool) {
  return {
    type: CHANNEL_ONE_FEEDS_ARE_LOADING,
    areLoading: bool
  };
}

export function channelOneFeedsFetchSuccess(url, feed) {
  return {
    type: CHANNEL_ONE_FEEDS_FETCH_SUCCESS,
    url,
    feed
  };
}

/*
 * An action creator that dispatches one of the feed action creators above
 * depending on the status of the fetched data. Each of the actions
 * addresses only a part of the store in order to separate concerns.
 */
export function channelOneFetchFeed(url) {
  console.log('channelOneFetchFeed with url: ' + url);

  return (dispatch) => {
    dispatch(channelOneFeedsHaveErrored(false));
    dispatch(channelOneFeedsAreLoading(true));

    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      dispatch(channelOneFeedsAreLoading(false));

      return response;
    })
    .then(response => response.json())
    .then(feed => dispatch(channelOneFeedsFetchSuccess(url, feed)))
    .catch(() => dispatch(channelOneFeedsHaveErrored(true)));
  };
}

export function channelTwoAddItem(image) {
  return {
    type: CHANNEL_TWO_ADD_ITEM,
    image
  }
}

/*
 * Will set the thumbnailPath property of the MarkerData object in the
 * store's feed that matches the locationName, triggering a re-render.
 */
 // Not currently used
/*export function updateMarkerThumbnail(locationName, thumbnailPath) {
  return {
    type: UPDATE_THUMBNAIL_PATH,
    locationName,
    thumbnailPath
  }
}*/
