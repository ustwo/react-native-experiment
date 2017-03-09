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
        return createMarkers(data); // TODO: Some type of markers
      } else if ('filter' in firstElement) {
        return createMarkers(data); // TODO: Markers that display an image
      } else {
        return createMarkers(data); // TODO: Defeult instagram markers
      }
    } else if (hostname.indexOf('expedia') > -1) {
      return createMarkers(data);   // TODO: Parse expedia's data and map it to our universal marker
    } else {
      return createMarkers(data);   // TODO: Default marker
    }
  }
}

function createMarkers(dataArray) {
  console.log("createMarkers, dataArray length: " + dataArray.length);

  return dataArray;
}
