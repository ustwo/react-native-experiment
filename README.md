# Map Mixer
Map Mixer takes an Airbnb React Native Mapview component and puts two layers — or "channels" — of information on top of it. Channel One takes in a JSON feed of geolocation data, extracts the minimum amount of data required for useful map markers (e.g. latitude, longitude, etc.), and places those markers on the map. When the user taps on a map marker, Channel Two is engaged and requests a feed of enhancement data for that particular location (e.g. Instagram pictures).


![alt text](https://github.com/ustwo/react-native-experiment/blob/master/mapmixer-login.gif "Login Flow")
![alt text](https://github.com/ustwo/react-native-experiment/blob/master/mapmixer-channel2.gif "Channel 2 Flow")


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

