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

class InstagramFeed extends Realm.Object {}
InstagramFeed.schema = {
  name: 'InstagramFeed',
  properties: {
    user: 'string',
    images: {type: 'list', objectType: 'InstagramImage'}
  }
};

export default new Realm({schema: [InstagramImage, InstagramFeed]});
