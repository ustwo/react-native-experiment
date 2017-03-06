/**
 * Handle HTTP/HTTPS requests
 */
import RNFetchBlob from 'react-native-fetch-blob';
import instagram from '../models/instagram';
import * as actions from '../actions/actions';

let dirs = RNFetchBlob.fs.dirs;

module.exports = {
  download: function(baseUrl, filename) {
    return RNFetchBlob.config({
      // TODO: Change path based on feed source and other parameters (e.g. username)
      path: dirs.DocumentDir + '/user_images/' + filename
    })
    .fetch('GET', baseUrl + filename, {
      // Headers
    })
    .then((res) => {
      instagram.write(() => {
        let allImages = instagram.objects('InstagramImage');
        instagram.delete(allImages);

        instagram.create('InstagramImage',
          {user: 'fonztagram', filePath: res.path(), creationDate: new Date(), latitude: 37.76325, longitude: -122.4324})
      })

      dispatch(actions.addFeed(instagram.objects('InstagramImage')));

      return res;
    })
  }
}
