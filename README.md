# Map Mixer
Map Mixer takes an Airbnb React Native Mapview component and puts two layers — or "channels" — of information on top of it. Channel One takes in a JSON feed of geolocation data, extracts the minimum amount of data required for useful map markers (e.g. latitude, longitude, etc.), and places those markers on the map. When the user taps on a map marker, Channel Two is engaged and requests a feed of enhancement data for that particular location (e.g. Instagram pictures).


# Feed Sources
The app/config/feedSources.js file contains the URL structures as well as injectable parameters for the Channel One/Two feeds. There is also a method to specify the URL for Channel Two authentication which is provided to and used in a WebView by InstagramAuth.js to get an API access token.


# Third-Party Components
* [react-native-maps](https://github.com/airbnb/react-native-maps)
* [native-base](https://github.com/GeekyAnts/NativeBase)
* [react-native-fetch-blob](https://github.com/wkh237/react-native-fetch-blob)
* [traverse](https://github.com/substack/js-traverse)
* [react-native-easy-gridview](https://github.com/pavlelekic/react-native-gridview)
* [redux](https://github.com/reactjs/redux) / [react-redux](https://github.com/reactjs/react-redux) / [redux-thunk](https://github.com/gaearon/redux-thunk)


# Dev Team
* sonam@ustwo.com
* alfonso@ustwo.com


# References
* Running Deck - https://docs.google.com/presentation/d/1a4M7hN6p37MPL860PJxaLD0W9f8VpJEnxu-7nafDZIY/edit#slide=id.gda4552a05_0_0
