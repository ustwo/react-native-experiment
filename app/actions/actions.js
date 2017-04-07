/*
 * Action types
 */

export const CHANNEL_ONE_FEEDS_HAVE_ERRORED = 'CHANNEL_ONE_FEEDS_HAVE_ERRORED'
export const CHANNEL_ONE_FEEDS_ARE_LOADING = 'CHANNEL_ONE_FEEDS_ARE_LOADING'
export const CLEAR_CHANNEL_ONE = 'CLEAR_CHANNEL_ONE'
export const CHANNEL_ONE_FEEDS_FETCH_SUCCESS = 'CHANNEL_ONE_FEEDS_FETCH_SUCCESS'
export const RECEIVED_INSTAGRAM_ACCESS_TOKEN = 'RECEIVED_INSTAGRAM_ACCESS_TOKEN'
export const CLEAR_CHANNEL_TWO = 'CLEAR_CHANNEL_TWO'
export const CHANNEL_TWO_ADD_ITEM = 'CHANNEL_TWO_ADD_ITEM'

/*
 * Channel One action creators
 */

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

export function clearChannelOne() {
  return {
    type: CLEAR_CHANNEL_ONE
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
    .then(feed => {
      dispatch(clearChannelOne());
      dispatch(channelOneFeedsFetchSuccess(url, feed));
    })
    .catch(() => dispatch(channelOneFeedsHaveErrored(true)));
  };
}

/*
 * Channel Two
 */

 export function receivedInstagramAccessToken(accessToken) {
   return {
     type: RECEIVED_INSTAGRAM_ACCESS_TOKEN,
     accessToken
   }
 }

export function clearChannelTwo() {
  return {
    type: CLEAR_CHANNEL_TWO
  };
}

export function channelTwoAddItem(image) {
  return {
    type: CHANNEL_TWO_ADD_ITEM,
    image
  }
}
