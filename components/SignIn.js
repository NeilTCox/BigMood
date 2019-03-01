import React, { Component } from 'react';
import { Alert, AppRegistry, Button, Image, Text, TouchableOpacity, StyleSheet, TextInput, View } from 'react-native';
import { callApi } from '../libs/apihelper.js';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "gfgx",
      password: "hi",
      hidePassword: true,
    };
  }

  render() {
    return (
      <View style={styles.view}>

        <Text style={styles.title}>
          Sign In
        </Text>

        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />

        <View style = {styles.inputBtnHolder}>
          <TextInput
            style={styles.input}
            secureTextEntry={this.state.hidePassword}
            placeholder="password"
            onChangeText={(password) => this.setState({password})}
          />
          <TouchableOpacity activeOpacity = { 0.8 }
            style = { styles.visibilityBtn }
            onPress = { this._managePasswordVisibility }>
            <Image source = { ( this.state.hidePassword ) ? require('../assets/hide.png') : require('../assets/view.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>

        <Button
          onPress={this._authenticate.bind(this)}
          title="Log In"
          color="grey"
        />

      </View>
    );
  }

  _authenticate() {
    console.log("in authenticate")
    console.log(this.state.email)

    console.log(callApi);
    callApi('http://e881386f.ngrok.io/users/login',
      method='POST',
      body={
        email: this.state.email,
        password: this.state.password,
    })
    // .then((res) => console.log(res));
      .then((res) => {
        if( res.ok ) {
          Alert.alert('Sign in success', 'Yes, Daddy!', [],{cancelable: true},)
        } else {
          Alert.alert('Sign in error', 'Username or password incorrect', [],{cancelable: true},)
        }
      });
  }

  _managePasswordVisibility = () =>
  {
    this.setState({ hidePassword: !this.state.hidePassword });
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 18,
    alignSelf: 'stretch',
    // width: '60%',
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: 'grey',
    borderRadius: 5
  },
  inputBtnHolder:
  {
    position: 'relative',
    alignSelf: 'stretch',
    // width: '60%',
    justifyContent: 'center'
  },
  visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },
  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  }
});

AppRegistry.registerComponent('SignIn', () => SignIn);
