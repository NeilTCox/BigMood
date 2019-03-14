import React, { Component } from 'react';
import { Alert, Image, Text, TouchableOpacity, TouchableHighlight, StyleSheet, TextInput, View } from 'react-native';
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

        <TouchableHighlight onPress={this._authenticate.bind(this)} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </View>
        </TouchableHighlight>

      </View>
    );
  }

  _authenticate() {
    callApi("/users/login",
      method='POST',
      body={
        email: this.state.email,
        password: this.state.password,
    })
    .then((res) => {
      if(res.email) {
        //Alert.alert('Sign in success', 'Yes, Daddy!', [],{cancelable: true},)
        this.props.navigation.navigate('Tabs')  // might need to supply the user object here later
      } else {
        Alert.alert('Sign in error', 'Username or password incorrect', [],{cancelable: true},)
      }
    })
    .catch(
      (err) => {console.log(err)}
    );
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
    marginBottom: 30,
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
    borderRadius: 5,
    marginBottom: 15
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
    top: 3,
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
  },
  button: {
    marginTop: 20,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});
