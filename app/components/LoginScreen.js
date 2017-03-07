import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import {
	Container,
  Header,
	Body,
	Title,
	InputGroup,
	Input,
	Button,
	Icon,
	Text,
	View,
	Spinner
} from 'native-base';

import InstagramAuth from './InstagramAuth';
import MapScreen from './MapScreen';

export default class LoginScreen extends Component {

  static propTypes = {
    navigator: PropTypes.shape({
      getCurrentRoutes: PropTypes.func,
      jumpTo: PropTypes.func
    })
  }

  constructor(props) {
    super(props);

    this.initialState = {
      isLoading: false,
      error: null,
      username: '',
      password: ''
    };

    this.state = this.initialState;
  }

  onPressLogin() {
    this.setState({
      isLoading: true,
      error: ''
    });

		this.props.navigator.push({
			component: InstagramAuth,
			passProps: {
				uri: 'https://www.instagram.com/oauth/authorize/?client_id=89296477080d409693a2e8cfcf1c1b5d&redirect_uri=https://www.ustwo.com&response_type=token'
			}
		});
  }

	onPressMap() {
		this.props.navigator.push({
			component: MapScreen
		})
	}

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Header>
            <Body>
							<Title>Login</Title>
						</Body>
          </Header>
					<View style={styles.content}>
						<Button
							style={styles.button}
							onPress={() => this.onPressLogin()}>
							<Text>Login</Text>
						</Button>
						<Button
							style={styles.button}
							onPress={() => this.onPressMap()}>
							<Text>View Map</Text>
						</Button>
					</View>
        </View>
      </Container>
    )
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
		padding: 30,
		flex: 1,
	},
	button: {
		marginTop: 20,
		alignSelf: 'center',
		width: 150,
	}
});
