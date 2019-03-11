import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { callApi } from '../libs/apihelper.js';
const config = require('../config');

const happy = '#B3DEA9'
const ok = '#EE9B67'
const sad = '#F7CF6D'

export default class ActivityCalendar extends Component {
  constructor(props){
    super(props)
    this.state = {calendarHighlights : {}}
  }
  componentDidMount(){
    this.calendarHighlights()
  }

  calendarHighlights(){
    // retrieve calendar highlights from server
    callApi(`/days`, 'GET', {}, {email: config.email})
    .then((res) => {
      calendarHighlights = {}
      days = res.days

      console.log(days)
      
      for(i = 0; i < days.length; i++){
        color = ''
        switch(days[i].mood){
          case 'HAPPY':
            color = '#B3DEA9';
            break;
          case 'NEUTRAL':
            color = '#EE9B67';
            break;
          case 'SAD':
            color = '#F7CF6D';
            break;
          default:
            color = '#FFFFFF';
            break;
        }

        startingDay = true
        endingDay = true
        if(i === 0){
          if(days[i].mood === days[i+1].mood){
            endingDay = false
          }
        }else if(i === days.length-1){
          if(days[days.length-1].mood === days[days.length-2].mood){
            startingDay = false
          }
        }else{
          if(days[i].mood === days[i-1].mood){
            startingDay = false
          }
          if(days[i].mood === days[i+1].mood){
            endingDay = false
          }
        }

        calendarHighlights[days[i].date.slice(0, 10)] = {color, startingDay, endingDay}
      }
      console.log(calendarHighlights)
      this.setState({calendarHighlights : calendarHighlights});
    });
    // dummy data
    // calendarHighlights = {
    //   '2019-02-15': {startingDay: true, color: happy},
    //   '2019-02-16': {color: happy},
    //   '2019-02-17': {endingDay: true, color: happy,},
    //   '2019-02-18': {startingDay: true, endingDay: true, color: ok},
    //   '2019-02-19': {startingDay: true, color: sad},
    //   '2019-02-20': {endingDay: true, color: sad,},
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
