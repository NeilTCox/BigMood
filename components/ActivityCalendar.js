import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const happy = '#B3DEA9'
const ok = '#EE9B67'
const sad = '#F7CF6D'

export default class ActivityCalendar extends Component {
  componentWillMount(){
    this.calendarHighlights()
  }

  calendarHighlights(){
    // retrieve calendar highlights from server
    //body = callApi('', 'GET')
    // dummy data
    calendarHighlights = {
      '2019-02-15': {startingDay: true, color: happy},
      '2019-02-16': {color: happy},
      '2019-02-17': {endingDay: true, color: happy,},
      '2019-02-18': {startingDay: true, endingDay: true, color: ok},
      '2019-02-19': {startingDay: true, color: sad},
      '2019-02-20': {endingDay: true, color: sad,},
      }

    this.setState({calendarHighlights : calendarHighlights});
  }

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

          markedDates = {
            this.state.calendarHighlights
          }

          markingType = {'period'}
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
