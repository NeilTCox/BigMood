import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';

export default class ActivityCalendar extends Component {
  render() {
    return (
      <View>
        <Text>calendar goes here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

AppRegistry.registerComponent('ActivityCalendar', () => ActivityCalendar);
