import RNFetchBlob from 'react-native-fetch-blob';

let dirs = RNFetchBlob.fs.dirs;

module.exports = {
  CACHED_IMAGES_DIR: dirs.DocumentDir + '/user_images/'
}
