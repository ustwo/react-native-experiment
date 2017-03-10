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
        var markers = [];

        data.map(locationData => {
          var markerData = new MarkerData(locationData['id']);
          markerData.name = locationData['name'];
          markerData.latitude = locationData['latitude'];
          markerData.longitude = locationData['longitude'];

          markers.push(markerData);
        });

        return markers;
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

        var markerData = new MarkerData(result['id']);
        markerData.name = result['name'];

        var location = result['geometry']['location'];
        markerData.latitude = location['lat'];
        markerData.longitude = location['lng'];

        markers.push(markerData);
      }

      return markers;
    } else {
      return feed;
    }
  }
}
