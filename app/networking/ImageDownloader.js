import RNFetchBlob from 'react-native-fetch-blob';

import Constants from '../config/Constants';

module.exports = {
  download: function(baseUrl, filename, prefix) {
    return RNFetchBlob.config({
      path: Constants.CACHED_IMAGES_DIR + prefix + '-' + filename
    })
    .fetch('GET', baseUrl + filename, {
      // Headers
    })
    .then((res) => {
      console.log("downloaded: " + res.path());
      return res;
    })
  }
}
