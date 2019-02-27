import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


export default class ActivityCalendar extends Component {
  render() {
    return (
      <View>
        <CalendarList
          // Enable horizontal scrolling, default = false
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
          // Set custom calendarWidth.
          calendarWidth={Dimensions.get('window').width}
        />
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
