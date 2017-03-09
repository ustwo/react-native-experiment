import MarkerData from './MarkerData'

export default class MarkerFactory {
  static build(hostname, action) {
    if (hostname.indexOf('instagram') > -1) { // api.instagram.com
      var data = action.feed['data'];
      // There are two types of supported instagram results:
      // A list of locations (look for the keywords 'latitude' and 'longitude')
      // or a list of media images (look for the keyword 'filter').
      // We really only need to check the first element to make a determination.
      var firstElement = data[0];

      if ('latitude' in firstElement) {
        return createMarkers(data); // TODO: Some type of markers
      } else if ('filter' in firstElement) {
        return createMarkers(data); // TODO: Markers that display an image
      } else {
        return createMarkers(data); // TODO: Defeult markers
      }
    } else if (hostname.indexOf('expedia') > -1) {

    } else {

    }
  }
}

function createMarkers(dataArray) {
  console.log("createMarkers, dataArray length: " + dataArray.length);

  return dataArray;

  // TODO: Can't get realm working over an array
  /*MarkerData.write(() => {
    dataArray.map(
      (data) => {
        console.log("CREATING MARKER NAME: " + data['name']);

        MarkerData.create('Marker',
          {locationId: data['id'], locationName: data['name'], user: 'temp', filePath: 'nowhere', creationDate: new Date(),
          latitude: data['latitude'], longitude: data['longitude']}
        );
      }
    );
  })*/
}
