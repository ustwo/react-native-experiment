import MarkerData from './MarkerData'

export default class MarkerFactory {
  static build(hostname, feed) {
    if (hostname.indexOf('instagram') > -1) { // api.instagram.com
      var data = feed['data'];
      // There are two types of supported instagram results:
      // A list of locations (look for the keyword 'latitude')
      // or a list of media images (look for the keyword 'filter').
      // We really only need to check the first element to make a determination.
      var firstElement = data[0];

      if ('latitude' in firstElement) {
        return data; // TODO: Some type of markers
      } else if ('filter' in firstElement) {
        return data; // TODO: Markers that display an image
      } else {
        return data; // TODO: Defeult instagram markers
      }
    } else if (hostname.indexOf('maps.googleapis') > -1) {  // maps.googleapis.com
      var markers = [];

      var keys = Object.keys(feed['results']);

      for (key in keys) {
        var result = feed['results'][key];
        var location = result['geometry']['location'];

        // TODO: Use standardized marker model
        markers.push({
          latitude: location['lat'],
          longitude: location['lng']
        });
      }

      return markers;
    } else {
      return feed;
    }
  }
}
