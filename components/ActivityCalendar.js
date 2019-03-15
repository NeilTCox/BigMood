import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { callApi } from '../libs/apihelper.js';
const config = require('../config');

const happy = '#B3DEA9'
const ok = '#EE9B67'
const sad = '#F7CF6D'

export default class ActivityCalendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      calendarHighlights : {},
      date: '',
      mood: '',
      events: [],
      sleep: '',
      steps: '',
    }
  }
  componentDidMount(){
    this.calendarHighlights()
  }

  getMoodColor(mood){
    color = ''
    switch(mood){
      case 'HAPPY':
        color = '#B3DEA9';
        break;
      case 'NEUTRAL':
        color = '#F7CF6D';
        break;
      case 'SAD':
        color = '#EE9B67';
        break;
      default:
        color = '#FFFFFF';
        break;
    }
    return color
  }

  calendarHighlights(){
    // retrieve calendar highlights from server
    callApi(`/days`, 'GET', {}, {email: config.email})
    .then((res) => {
      calendarHighlights = {}
      days = res.days
      
      for(i = 0; i < days.length; i++){
        color = this.getMoodColor(days[i].mood);

        startingDay = true;
        endingDay = true;
        if(i === 0){
          if(days[i].mood === days[i+1].mood){
            endingDay = false;
          }
        }else if(i === days.length-1){
          if(days[days.length-1].mood === days[days.length-2].mood){
            startingDay = false;
          }
        }else{
          if(days[i].mood === days[i-1].mood){
            startingDay = false;
          }
          if(days[i].mood === days[i+1].mood){
            endingDay = false;
          }
        }
        calendarHighlights[days[i].date.slice(0, 10)] = {color, startingDay, endingDay};
      }
      // today = new Date();
      // today = String(today.getFullYear()+"-"+('0' + (today.getMonth() + 1)).slice(-2)+"-"+today.getDate());
      // selectedCalendarHighlights = calendarHighlights
      // selectedCalendarHighlights[today].selected = true;
      // selectedCalendarHighlights[today].selectedColor = 'blue';
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

  displayDate(day){
    callApi('/days/log', 'GET', {}, {email: config.email, date: day.dateString})
    .then((res) => {
      date = `${day.month}/${day.day}/${day.year}`;
      // dateSelected = `${day.year}-${('0' + (day.month + 1)).slice(-2)}-${day.day}`;
      // console.log(dateSelected);
      // selectedCalendarHighlights = this.state.unselectedCalendarHighlights;
      // selectedCalendarHighlights[dateSelected][selected] = true;
      // selectedCalendarHighlights[dateSelected][selectedColor] = 'blue';
      mood = res.mood;
      sleep = res.info.sleep;
      steps = res.info.steps;
      happyEvents = "";
      okEvents = "";
      sadEvents = "";
      for(var event of res.events){
        if(event.mood == "HAPPY"){
          happyEvents += (event.name+", ");
        }else if(event.mood == "NEUTRAL"){
          okEvents += (event.name+", ");
        }else{
          sadEvents += (event.name+", ");
        }
      }

      moodColor = this.getMoodColor(mood);

      happyEvents = happyEvents.slice(0,happyEvents.length-2);
      okEvents = okEvents.slice(0,okEvents.length-2)
      sadEvents = sadEvents.slice(0,sadEvents.length-2)

      this.setState({date, mood, moodColor, happyEvents, okEvents, sadEvents, sleep, steps});
    });
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
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => this.displayDate(day)}


          markedDates = {
            this.state.calendarHighlights
          }

          markingType = {'period'}
        />
        <View>
          <View style={styles.dayHeader}>
            <Text style={styles.date}>
              {this.state.date}
            </Text>
            <View style={[styles.mood, {backgroundColor: this.state.moodColor}]}></View>
          </View>
          <View style={styles.statsContainer}>
            <View>
              <Text style={styles.sleepemoji}>🛏️</Text>
              <Text style={styles.sleep}>{this.state.sleep} Hours</Text>
            </View>
            <View>
              <Text style={styles.stepsemoji}>👟</Text>
              <Text style={styles.steps}>{this.state.steps} Steps</Text>
            </View>
          </View>
          <View style={styles.activities}>
            <Text>😋: {this.state.happyEvents}</Text>
            <Text>🙂: {this.state.okEvents}</Text>
            <Text>😥: {this.state.sadEvents}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  dayHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 200,
  },
  date: {
    marginLeft: 10,
    width: 225,
    height: 50,
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mood: {
    backgroundColor: "#FFFFFF",
    height: 124,
    width: 124,
    borderRadius: 124/2,
    marginRight: 40,
    marginTop: 40,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 200,
  },
  sleepemoji: {
    marginTop: 75,
    marginLeft: 25,
    width: 75,
    height: 75,
    fontSize: 66,
  },
  sleep: {
    marginLeft: 25,
    width: 75,
    height: 25,
    textAlign: 'center',
  },
  stepsemoji: {
    marginTop: 75,
    width: 75,
    height: 75,
    fontSize: 66,
  },
  steps: {
    width: 75,
    height: 25,
    textAlign: 'center',
  },
  activities: {
    marginTop: 180,
    marginLeft: 25,
    marginRight: 25,
  },
});

AppRegistry.registerComponent('ActivityCalendar', () => ActivityCalendar);
