import React, { Component } from 'react';
import { Alert, AppRegistry, Button, FlatList, Icon, ListItem, Modal, StyleSheet, TextInput, Text, TouchableHighlight, View} from 'react-native';
import { callApi, getTodayHealth } from '../libs/apihelper';
const config = require('../config');

export default class DailyLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mood: '',
      // sleep: -1,
      events: [],
      dayColor: {
        happyColor: 'powderblue',
        neutralColor: 'powderblue',
        sadColor: 'powderblue'
      },
      event: {
        name: '',
        mood: '',
      },
      eventColor: {
        happyColor: 'powderblue',
        neutralColor: 'powderblue',
        sadColor: 'powderblue'
      },
      modalVisible: false,
    }
    console.log(this.state.event)
  }

  render() {
    return (
      <View style={styles.scene}>

        <Text style={styles.titleText}>Daily Log</Text>

        <Text style={styles.subtitleText}>How happy were you today?</Text>
        <View style={styles.moodView}>
          <Button
            color = {this.state.dayColor.happyColor }
            onPress={this.dayHappy.bind(this)}
            title=":)"
          />
          <Button
            color = {this.state.dayColor.neutralColor }
            onPress={this.dayNeutral.bind(this)}
            title=":|"
          />
          <Button
            color = { this.state.dayColor.sadColor }
            onPress={this.daySad.bind(this)}
            title=":("
          />
        </View>

        <Text style={styles.subtitleText}>What did you do today?</Text>
        <FlatList
          data={this.state.events}
          extraData={this.state}
          renderItem={ ({item}) =>
            <View style={styles.eventView} >
              <Text style={styles.eventNameText}>{item.name}</Text>
              <Text>{item.mood}</Text>
            </View>
          }
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modalBackground}>

            <View style={styles.window}>

              <Text style={styles.subtitleText}>Event Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={ (n) =>  this.setState( {event: {...this.state.event, name: n}} ) }
              />

              <Text style={styles.subtitleText}>How happy did this event make you?</Text>
              <View style={styles.moodView}>
                <Button
                  color = {this.state.eventColor.happyColor }
                  onPress={this.eventHappy.bind(this)}
                  title=":)"
                />
                <Button
                  color = {this.state.eventColor.neutralColor }
                  onPress={this.eventNeutral.bind(this)}
                  title=":|"
                />
                <Button
                  color = { this.state.eventColor.sadColor }
                  onPress={this.eventSad.bind(this)}
                  title=":("
                />
              </View>

              <View style={styles.modalButtonContainer}>
                <TouchableHighlight style={styles.smallButton}
                  onPress={() => {
                    this.cancelEvent();
                  }}>
                  <Text style={styles.smallButtonText}>Cancel</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.smallButton}
                  onPress={ () => {
                    this.createEvent();
                    }}>
                  <Text style={styles.smallButtonText}>Create</Text>
                </TouchableHighlight>
              </View>

            </View>
          </View>
        </Modal>

        <TouchableHighlight style={styles.button}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={styles.buttonText}>NEW EVENT</Text>
        </TouchableHighlight>



        {/* <Text style={styles.subtitleText}>How many hours did you sleep?</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          onChangeText={ (sleep) => this.setState({ sleep: parseFloat(sleep) }) }
        />  */}

        <Button
          style={styles.submitButton}
          onPress={this.submitLog.bind(this)}
          title="Submit"
        />

      </View>
    );
  }

  // ================================================================================
  // API CALL -- creates day and submits all events
  submitLog() {
    if( this.state.mood == '' ) {
      Alert.alert('Missing Mood', 'Please select a mood.', [],{cancelable: true});
      return;
    }
    // if( this.state.sleep > 24 || this.state.sleep < 0 ) {
    //   Alert.alert('Invalid Sleep Hours', 'Please enter a sleep amount between 0 and 24 hours.', [],{cancelable: true});
    //   return;
    // }
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;

    getTodayHealth(new Date(today))
      .then(data => {
        callApi('/days/create', 'POST',
          body={
            email: config.email,
            mood: this.state.mood,
            info: {
              steps: data.steps,
              sleep: data.sleep
            },
            date: this.makeDateString() // figure out how to get this thing
          }).then( (res) => {
            console.log('got response')
            console.log(res);

            for ( let i = 0; i < this.state.events.length; i++ ) {
              console.log("event adding " + i);
              console.log(this.state.events[i])

              callApi('/events/create', 'POST',
                body={
                  ...this.state.events[i],
                  email: config.email,
                  date: this.makeDateString()
                }).then( (res) => {
                  console.log("event added");
                  console.log(res);
                })
            }

            var caption = 'Submitted today\'s events and activity data.'
            if (this.state.events.length === 0) {
              caption = 'Submitted today\'s activity data.'
            }

            Alert.alert('Success!', caption, [],{cancelable: true})
            //this.state.events.length = 0  // delete the current collection of events (doesn't update the main FlatList visually!!)
          })
      })
  }

  // =================================================================================
  // MODAL HELPER FUNCTIONS ==========================================================
  // creates event, exits modal, and resets all event values to default
  createEvent() {
    if( this.state.event.mood === '' ) {
      Alert.alert('Missing Mood', 'Please select a mood.', [],{cancelable: true});
      return;
    }
    if( this.state.event.name === '' ) {
      Alert.alert('Missing Name', 'Please enter a name.', [],{cancelable: true});
      return;
    }

    this.setState( {modalVisible: !this.state.modalVisible} );

    let tempEvents = this.state.events.slice();
    tempEvents.push( this.state.event );
    this.setState( {events: tempEvents} );
    this.setState( {event: {...this.event,
      name: '',
      mood: ''
    }}) ;
    this.setEventColor('powderblue','powderblue','powderblue');
  }

  // exits modal and resets all event values to default
  cancelEvent() {
    this.setState({modalVisible: !this.state.modalVisible});

    this.setState({event: {...this.event,
      name: '',
      mood: ''
    }});
    this.setEventColor('powderblue','powderblue','powderblue');
  }

  setModalVisible(desiredVisibility) {
    this.setState({modalVisible: desiredVisibility});
  }

  // =================================================================================
  // DAILY MOOD FUNCTIONS - deals with setting and displaying daily mood =============
  dayHappy() {
    this.setState({mood: "HAPPY"});
    this.setDayColor('black', 'powderblue', 'powderblue');
  }

  dayNeutral() {
    this.setState({mood: "NEUTRAL"})
    this.setDayColor('powderblue', 'black', 'powderblue');
  }

  daySad() {
    this.setState({mood: "SAD"})
    this.setDayColor('powderblue', 'powderblue', 'black');
  }

  // helper function for setting the dayColor variable
  setDayColor(happy, neutral, sad) {
    this.setState({dayColor: {
      happyColor: happy,
      neutralColor: neutral,
      sadColor: sad}} );
  }

  // =================================================================================
  // EVENT MOOD FUNCTIONS - deals with setting and displaying event mood =============
  eventHappy() {
    this.setState({event: {...this.state.event, mood: "HAPPY"}} );
    this.setEventColor('black', 'powderblue', 'powderblue');
  }

  eventNeutral() {
    this.setState({event: {...this.state.event, mood: "NEUTRAL"}} );
    this.setEventColor('powderblue', 'black', 'powderblue');
  }

  eventSad() {
    this.setState({event: {...this.state.event, mood: "SAD"}} );
    this.setEventColor('powderblue', 'powderblue', 'black');
  }

  // helper function for setting the eventColor variable
  setEventColor(happy, neutral, sad) {
    this.setState({eventColor: {
      happyColor: happy,
      neutralColor: neutral,
      sadColor: sad}} );
  }

  // =================================================================================
  // OTHER HELPER FUNCTIONS ===========================================================
  makeDateString() {
    let dateString = '';
    let date = new Date();
    dateString += date.getFullYear() + '-';
    dateString += (date.getMonth()+1) + '-';
    dateString += date.getDate();
    return dateString;
  }
}

// =================================================================================
// STYLES
const styles = StyleSheet.create({
  scene: {
    padding: 40,
  },

  // MAIN SCREEN STYLES ============================================================
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  moodView: {
    flexDirection: 'row',
  },

  // EVENT LIST STYLES ================================================
  eventView: {
    backgroundColor: 'powderblue',
    padding: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 3
  },
  eventNameText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  deleteImage: {

  },


  // MODAL STYLES =====================================================
  input: {
    borderColor: 'black',
    borderWidth: 1,
  },
  modalBackground: {
    backgroundColor: 'rgba(200,200,200,0.5)', // grayish with half opacity
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  window: {
    backgroundColor: 'white',
    width: 330,
    height: 500,
    padding: 20,
    justifyContent: 'center',
  },
  button: {
    width: 150,
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  modalButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallButton: {
    marginTop: 20,
    marginRight: 20,
    width: 120,
    height: 60,
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  buttonText: {
    padding: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  smallButtonText: {
    padding: 20,
    color: 'white'
  }
});

AppRegistry.registerComponent('DailyLog', () => DailyLog);
