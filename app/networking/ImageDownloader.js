import RNFetchBlob from 'react-native-fetch-blob';

let dirs = RNFetchBlob.fs.dirs;

module.exports = {
  download: function(baseUrl, filename, prefix) {
    return RNFetchBlob.config({
      // TODO: Change path based on feed source and other parameters (e.g. username)
      path: dirs.DocumentDir + '/user_images/' + prefix + '-' + filename
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
