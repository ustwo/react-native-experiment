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

export function channelTwoAuthUrl() {
  return 'https://www.instagram.com/oauth/authorize/?client_id=89296477080d409693a2e8cfcf1c1b5d&redirect_uri=https://www.ustwo.com&response_type=token&scope=public_content';
}
