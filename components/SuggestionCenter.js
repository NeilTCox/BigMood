import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';

export default class SuggestionCenter extends Component {
  render() {
    return (
      <View>
        <Text>tip (suggestion) requests go here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

AppRegistry.registerComponent('SuggestionCenter', () => SuggestionCenter);
