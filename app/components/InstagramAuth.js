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
import MapScreen from './MapScreen'

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

	onPressMap() {
		this.props.navigator.replace({
			component: MapScreen
		})
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
								<Button
									style={styles.button}
									onPress={() => this.onPressMap()}>
									<Text>View Map</Text>
								</Button>
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

  onShouldStartLoadWithRequest = (event) => {
    var urlToLoad = event['url'];

    if (urlToLoad.indexOf("access_token=") > -1) {
      var stringParts = urlToLoad.split("access_token=");
      var accessToken = stringParts.pop();

			this.props.saveAccessToken(accessToken);

			this.setState({
				isLoggedIn: true
			})

      return false;
    }

    return true;
  }

  onNavigationStateChange = (navState) => {
    this.setState({
      url: navState.url,
      isLoading: navState.loading
    })
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
