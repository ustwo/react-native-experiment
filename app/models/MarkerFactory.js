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
        return getInstagramLocationMarkers(data);
      } else if ('filter' in firstElement) {
        return data; // TODO: Markers that display an image
      } else {
        return data; // TODO: Defeult instagram markers
      }
    } else if (hostname.indexOf('maps.googleapis') > -1) {  // maps.googleapis.com
      return getGoogleMarkers(feed);
    } else {
      return feed;
    }
  }
}

/*
 * Example input:
 * {
 *   "data":[
 *      {
 *         "latitude":37.78819,
 *         "id":"219648625",
 *         "name":"The Grove Fillmore",
 *         "longitude":-122.43343
 *      },
 *      ...
 *      {
 *         "latitude":37.787198688533,
 *         "id":"226037645",
 *         "name":"St. Dominic's Catholic Church, San Francisco",
 *         "longitude":-122.43573967138
 *      }
 *   ],
 *   "meta":{
 *      "code":200
 *   }
 * }
 */
function getInstagramLocationMarkers(data) {
  var markers = [];

  data.map(locationData => {
    var markerData = new MarkerData(locationData['id']);
    markerData.name = locationData['name'];
    markerData.latitude = locationData['latitude'];
    markerData.longitude = locationData['longitude'];

    markers.push(markerData);
  });

  return markers;
}

/*
 * Example input:
 * {
 *   "html_attributions" : [],
 *   "next_page_token" : "CpQCAQEAADdRkn4TtcMbWxpLIjhkNJm56OQx0tR8vrwwdJZXl-Y-4_S2n4P7PYmOKnxqQiSq_GKdLXDdNAZF4CkvwvKqr54fUyWpt96NCHKnj8Dcrvk2aBbIhm97xjP2HmTTF6QJz-_G_fflo3auKJh2k0KV_4ialHVp79FXRTpwB9QTRe46tUGs5nUsneVsPtyqsRgKnOIyis6JJmMN6PkIa8aMwWNFHl0KXe14i1k3lcbIRrukdom7Dflxe_-Dgc0GtGVJpQV5yLh12J07rVos2j53q3RqVzGiadOOwfzyTJ1RBkf9LBXqyUxIHVNGhXOMFLtdB2jGmnwm0qqD9sJ2scvhg5-HZn9LoV2O9LJYn464z8-3EhBibxmVaqutGz4JFh4wne2hGhTatBlkqDEktgN43Pg1M7AjkfgTiQ",
 *   "results" : [
 *      {
 *         "geometry" : {
 *            "location" : {
 *               "lat" : 37.7781821,
 *               "lng" : -122.4217949
 *            },
 *            "viewport" : {
 *               "northeast" : {
 *                  "lat" : 37.77944128029149,
 *                  "lng" : -122.4204279697085
 *               },
 *               "southwest" : {
 *                  "lat" : 37.7767433197085,
 *                  "lng" : -122.4231259302915
 *               }
 *            }
 *         },
 *         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
 *         "id" : "9d8f15a1eeb97beb2644f06bfa08a72384c4fc2a",
 *         "name" : "Jardinière",
 *         "opening_hours" : {
 *            "exceptional_date" : [],
 *            "open_now" : false,
 *            "weekday_text" : []
 *         },
 *         "photos" : [
 *            {
 *               "height" : 2430,
 *               "html_attributions" : [
 *                  "\u003ca href=\"https://maps.google.com/maps/contrib/117413991469996675325/photos\"\u003eMaryGayle T\u003c/a\u003e"
 *               ],
 *               "photo_reference" : "CoQBdwAAAJRedRkXUrdTpxRmY80tBtz9qGetaPpo18lTxxGbCIZh9whoDZIV0XEJd9fHwpBdUxdw5EArYXaIBoMuEBjtRjg0PESRQhP2rZ4UV9vOsEZpzic3LszEVjRnqak36R-xqZSXejnjcKJXAxslWQJWPBxbXUHyMKLZGzGkdWlWFTa0EhDORlgH4zUuViaa9XhDIH5RGhT30szs0AuL92i3W_FxOPN1i5ykfw",
 *               "width" : 2430
 *            }
 *         ],
 *         "place_id" : "ChIJKxsc-5iAhYARt0aq9Skp6t8",
 *         "price_level" : 4,
 *         "rating" : 4.1,
 *         "reference" : "CmRSAAAARv5AdPy3xtBW7hdJiCkAUUPDUK7ZzYdHvXWdIlJpzeBARGceU_-CuaVzGIefDEtRXBJQxspRe9koggVScZ-eI8rmOwpucyziY0NrP4MH_QUsGxMSWwTc6ObAO2LqhoYwEhCXC64DpXDi0IYD3CCeBS8DGhR__ZSrm6j5qhIdAe99LAcF7vZ4dQ",
 *         "scope" : "GOOGLE",
 *         "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
 *         "vicinity" : "300 Grove Street, San Francisco"
 *      },
 *      ...
 *    ]
 *  }
 */
function getGoogleMarkers(feed) {
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
}
