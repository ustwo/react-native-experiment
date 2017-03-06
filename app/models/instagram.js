import Realm from 'realm';

class InstagramImage extends Realm.Object {}
InstagramImage.schema = {
  name: 'InstagramImage',
  properties: {
    user: 'string',
    filePath: 'string',
    creationDate: 'date',
    latitude: 'double',
    longitude: 'double'
  }
};

export default new Realm({schema: [InstagramImage]});
