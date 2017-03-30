/*
 * Channel One populates the map with markers that can be tapped.
 */
export function channelOneSource(latitude, longitude, authToken) {
  return 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=1400&type=restaurant&key=AIzaSyD-d7MKoxPuq0XvV3BGXMbuBLRIlo1GX4U';
}

/*
 * Channel Two is activated when a user taps on a marker, initiating a call for
 * Channel Two enhancement data (e.g. Instagram photos for the Channel One location).
 */
export function channelTwoSource(latitude, longitude, authToken) {
  return 'https://api.instagram.com/v1/locations/search?lat=' + latitude + '&lng=' + longitude + '&access_token=' + authToken;
}
