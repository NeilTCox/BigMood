import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';

export default class NewUser extends Component {
  render() {
    return (
      <View>
        <Text>this is where new users will be made</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

AppRegistry.registerComponent('NewUser', () => NewUser);
