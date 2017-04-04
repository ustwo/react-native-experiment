import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import {
	Container,
  Header,
  Button,
  Icon,
	Title,
  Left,
  Body,
  Right,
	Text
} from 'native-base';
import { connect } from 'react-redux';

import { receivedInstagramAccessToken } from '../actions/actions'

class InstagramAuth extends Component {

  constructor(props) {
    super(props);

    this.initialState = {
      url: this.props.uri,
      isLoading: true,
			isLoggedIn: false
    };

    this.state = this.initialState;
  }

  onPressBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Header>
            <Left>
              <Button
                onPress={() => this.onPressBack()}
                transparent>
                <Icon name="ios-arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Instagram</Title>
            </Body>
            <Right />
          </Header>
          <View style={styles.content}>
						{ this.state.isLoggedIn ?
							<View>
								<Text>You are logged in</Text>
							</View> :
							<WebView
	              source={{uri: this.props.uri}}
	              style={{marginTop: 20}}
	              onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
	              onNavigationStateChange={this.onNavigationStateChange}
	              scalePagesToFit={true}
	            />
						}
          </View>
        </View>
      </Container>
    );
  }

	extractAccessTokenFromUrl(url) {
		var stringParts = url.split("access_token=");
		var accessToken = stringParts.pop();

		return accessToken;
	}

  onShouldStartLoadWithRequest = (event) => {
    var urlToLoad = event['url'];

		console.log("onShouldStartLoadWithRequest: " + urlToLoad);

    if (urlToLoad.indexOf("access_token=") > -1) {
			this.props.saveAccessToken(this.extractAccessTokenFromUrl(urlToLoad));

			this.setState({
				isLoggedIn: true
			})

      return false;
    }

    return true;
  }

	/*
	 * Preferably, we want to get the token from the URL before the page loads.
	 * However, onShouldStartLoadWithRequest isn't currently able to be called
	 * in Android, so we we need a workaround here.
	 */
  onNavigationStateChange = (navState) => {
		var currentUrl = navState.url;

		if (currentUrl.indexOf("access_token=") > -1) {
			this.props.saveAccessToken(this.extractAccessTokenFromUrl(currentUrl));

			this.setState({
				url: navState.url,
	      isLoading: navState.loading,
				isLoggedIn: true
			})
		} else {
			this.setState({
	      url: navState.url,
	      isLoading: navState.loading
	    })
		}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAccessToken: (accessToken) => dispatch(receivedInstagramAccessToken(accessToken))
  };
};

export default connect(null, mapDispatchToProps)(InstagramAuth);

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	content: {
		padding: 0,
		flex: 1,
	},
	button: {
		marginTop: 20,
		alignSelf: 'center',
		width: 150,
	}
});
