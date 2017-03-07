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
  Right
} from 'native-base';

export default class MyWeb extends Component {

  constructor(props) {
    super(props);

    this.initialState = {
      url: this.props.uri,
      isLoading: true
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
            <WebView
              source={{uri: this.props.uri}}
              style={{marginTop: 20}}
              onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
              onNavigationStateChange={this.onNavigationStateChange}
              scalePagesToFit={true}
            />
          </View>
        </View>
      </Container>
    );
  }

  onShouldStartLoadWithRequest = (event) => {
    console.log('onShouldStartLoadWithRequest with event: ' + JSON.stringify(event));
    var urlToLoad = event['url'];

    if (urlToLoad.indexOf("access_token=") > -1) {
      var stringParts = urlToLoad.split("access_token=");
      var accessToken = stringParts.pop();

      console.log("URL TO LOAD: " + urlToLoad + " AND ACCESS TOKEN: " + accessToken);

      // TODO: If token is already and user navigates to this view,
      //       show alert that user is already logged in and will be
      //       taken to the map
      this.props.navigator.pop();

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
	}
});
