import React, { Component } from 'react';
import { Alert, Button, Image, Text, TouchableOpacity, StyleSheet, TextInput, View } from 'react-native';
const config = require('../config');

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "gfg",
      password: "hi",
      reenteredPassword: "hi",
      hidePassword: true, 
    };
  }

  render() {
    return (
      <View style={styles.view}>

        <Text style={styles.title}>
          Sign Up
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

        <View style = {styles.inputBtnHolder}>
          <TextInput
            style={styles.input}
            secureTextEntry={this.state.hidePassword}
            placeholder="re-enter password"
            onChangeText={(reenteredPassword) => this.setState({reenteredPassword})}
          /> 
          <TouchableOpacity activeOpacity = { 0.8 } 
            style = { styles.visibilityBtn } 
            onPress = { this._managePasswordVisibility }>
            <Image source = { ( this.state.hidePassword ) ? require('../assets/hide.png') : require('../assets/view.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>

        <Button
          onPress={this._createAccount.bind(this)}
          title="create account"
          color="grey"
        />

      </View>
    );
  }
  
  _createAccount() {
    console.log("in createAccount")
    console.log(this.state.email)

    if( this.state.password != this.state.reenteredPassword ) {
        Alert.alert('Error creating account', 'Passwords do not match', [],{cancelable: true})
        return;
    }

    fetch(`${config.endpoint}/users/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
    // .then((res) => console.log(res));
    .then((res) => {
      //console.log(res)
      if( res.ok ) {
        const tempUserDetails = {}
        tempUserDetails.email = this.state.email
        tempUserDetails.password = this.state.password
        this.props.navigation.navigate('Survey', {userDetails: tempUserDetails});
      } else {
        Alert.alert('Error creating account', 'Bad response from server', [],{cancelable: true})
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
    fontFamily: 'sans-serif-thin',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  title: {
    fontFamily: 'sans-serif-thin',
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

//AppRegistry.registerComponent('SignUp', () => SignUp);