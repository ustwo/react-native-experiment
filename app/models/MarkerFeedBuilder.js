import MarkerData from './MarkerData';
import traverse from 'traverse';

/*
 * Create an array of map markers by extracting relevant data from the input geolocation feed.
 * NOTE: hostname is not currently utilized for anything, but may be useful in the future...
 */
export default class MarkerFeedBuilder {
  static build(hostname, feed) {
    return getMarkers(feed);
  }
}

/*
 * Example instagram input:
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
 *
 * Example googleapis input:
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
function getMarkers(feed) {
  var markers = [];

  // Every push into one of these arrays is comprised of the node's tree level and the node's value.
  // After extracting values from the JSON response, all the arrays should have the same length.
  var latArray = [];
  var lngArray = [];
  var idArray = [];
  var nameArray = [];

  // Visit every node in the feed tree and save/update values of relevant keys encountered
  traverse(feed).map(function (value) {
    if (this.isLeaf) {
      if (this.key == 'lat' || this.key == 'latitude') {
        extractBestValue(this, value, latArray);
      } else if (this.key == 'lng' || this.key == 'longitude') {
        extractBestValue(this, value, lngArray);
      } else if (this.key == 'id') {
        extractBestValue(this, value, idArray);
      } else if (this.key == 'name') {
        extractBestValue(this, value, nameArray);
      }
    }
  });

  // Create MarkerData objects from the extracted values
  for (var i = 1; i < latArray.length; i = i + 2) {
    var markerData = new MarkerData(idArray[i]);

    markerData.name = nameArray[i];
    markerData.latitude = latArray[i];
    markerData.longitude = lngArray[i];

    markers.push(markerData);
  }

  return markers;
}

/*
 * Assumptions: A key such as "lat" may appear several times in a single geolocation item
 *              (e.g. the lat-lng pair for the location as well as lat-lng pairs that describe
 *              some sort of bounding box for the location). Assume that the value of "lat"
 *              that appears closer to the root node is the value we want to extract.
 */
function extractBestValue(context, nodeValue, array) {
  var indexOfLastTreeLevel = array.length - 2;

  if (array.length == 0) {
    // Array is empty, initialize with the first encountered value
    array.push(context.level, nodeValue);
  } else if (array[indexOfLastTreeLevel] > context.level) {
    // The current encountered value is at a lower level than the one previously saved;
    // Remove any entries that were part of the previous level
    var lastTreeLevel = array[indexOfLastTreeLevel];

    if (indexOfLastTreeLevel - 2 >= 0) {
      for (var i = indexOfLastTreeLevel; i >= 0; i = i - 2) {
        if (array[i] == lastTreeLevel) {
          array.splice(i, 2);
        }
      }
    }

    array.push(context.level, nodeValue);
  } else if (array[indexOfLastTreeLevel] == context.level) {
    // Because this node is at the same level as the one previously saved,
    // it is probably one of the desired values of the next location in the feed
    array.push(context.level, nodeValue);
  }
}
