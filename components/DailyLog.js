import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';

export default class DailyLog extends Component {
  render() {
    return (
      <View>
        <Text>today's events are here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

AppRegistry.registerComponent('DailyLog', () => DailyLog);
