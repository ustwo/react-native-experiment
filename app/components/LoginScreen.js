import React, { Component, PropTypes } from 'react';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
	Container,
  Header,
	Title,
	InputGroup,
	Input,
	Button,
	Icon,
	Text,
	View,
	Spinner
} from 'native-base';

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
    dismissKeyboard();

    console.log("ON PRESS LOGIN.");
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Header>
            <Title>Login</Title>
          </Header>
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.content}>
              <InputGroup style={styles.input}>
                <Icon style={styles.inputIcon} name="ios-person" />
                <Input
                  placeholder="Username"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={username => this.setState( { username })}
                  value={this.state.username}
                />
              </InputGroup>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Container>
    )
  }

  /*render() {
    const goToMap = () => {
      Actions.mapScreen();
    }

    return (
      <View style={styles.container}>
        <Button
          onPress={goToMap}
          title="Go To Map" />
      </View>
    )
  }*/
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
	shadow: {
		flex: 1,
		width: null,
		height: null,
	},
	inputIcon: {
		width: 30,
	},
	input: {
		marginBottom: 20,
	},
	button: {
		marginTop: 20,
		alignSelf: 'center',
		width: 150,
	},
	error: {
		color: 'red',
		marginBottom: 20,
	},
});

/*var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCCCC'
  }
});*/
