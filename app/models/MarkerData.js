import Realm from 'realm';

class MarkerData extends Realm.Object {}
MarkerData.schema = {
  name: 'MarkerData',
  properties: {
    locationId: 'int',
    locationName: 'string',
    user: 'string',
    filePath: 'string',
    creationDate: 'date',
    latitude: 'double',
    longitude: 'double'
  }
};

export default new Realm({schema: [MarkerData]});
