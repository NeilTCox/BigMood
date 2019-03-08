import React, { Component } from 'react';
import { Alert, AppRegistry, Button, Image, Text, TouchableOpacity, StyleSheet, TextInput, View } from 'react-native';
import { callApi } from '../libs/apihelper';
const config = require('../config');

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "gfg",
      password: "hi",
      reenteredPassword: "",
      hidePassword: true, 
      first: "",
      last: ""
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

        <TextInput
          style={styles.input}
          placeholder="first name"
          onChangeText={(first) => this.setState({ first })}
        />

        <TextInput
          style={styles.input}
          placeholder="last name"
          onChangeText={(last) => this.setState({ last })}
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

    callApi('/users/create', 'POST',
     body={
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.first,
        lastName: this.state.last
      })
    .then( (res) => {
      console.log(res)
      if(res.email) {
        console.log('res is ok')
      } else {
        Alert.alert('Error creating account', 'SOME ISSUE', [],{cancelable: true})
      }
    })
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

AppRegistry.registerComponent('SignUp', () => SignUp);