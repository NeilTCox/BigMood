import React, { Component } from 'react';
import { TouchableNativeFeedback, Platform, StyleSheet, Text, View} from 'react-native';

// Pivot page:
//
//      New user -> Sign Up -> Survey -> Tabs
// Existing user -> Sign In -> Tabs

export default class LandingPage extends Component {
  static navigationOptions = () => {
    return {
      header: null
    }
  };

  _NewUser() {
    this.props.navigation.navigate('SignUp')
  }

  _ExistingUser() {
    this.props.navigation.navigate('SignIn')
  }

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.title}>BigMood</Text>
        
        <TouchableNativeFeedback
            onPress={this._NewUser.bind(this)}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>New User</Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback
            onPress={this._ExistingUser.bind(this)}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Existing User</Text>
          </View>
        </TouchableNativeFeedback>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 60,
    flex: 1,
    flexDirection: 'column',
    fontFamily: 'sans-serif-thin',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  title: {
    padding: 30,
    fontFamily: 'sans-serif-thin',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});
