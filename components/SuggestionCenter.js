import React, { Component } from 'react';
import { TouchableHighlight, FlatList, SectionList, StyleSheet, Text, View} from 'react-native';
import { callApi, getTodayHealth } from '../libs/apihelper.js';
const config = require('../config');

showList = false

export default class SuggestionCenter extends Component {
  constructor(props) {
    super(props)
    //this.state = { events: [] }
    this.state = { events: [], activities: [] }
  }

  giveSuggestion() {
    // maybe have a check here to prevent API call spam?
    showList = true
    this._getData().then((res) => {
      console.log(res)
      //this.setState({ events: res.eventSuggestions.concat(res.activitySuggestions) });
      this.setState({ events: res.eventSuggestions, activities: res.activitySuggestions });
    });
  }

  renderSuggestListSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  renderSuggestListHeader = () => {
    if (this.state.events.length + this.state.activities.length === 0) {
      <Text style={styles.eventListHeader}>Looks like we don't have enough data to suggest anything yet! Try adding a new event from the Events tab.</Text>
    }
    return <Text style={styles.eventListHeader}>Here's a list of things you can do that have made you happy before:</Text>;
  };

  render() {
    return (
      <View style={styles.scene}>
        <TouchableHighlight style={styles.button}
          underlayColor="white"
          onPress={() => {
            this.giveSuggestion();
          }}>
          <Text style={styles.buttonText}>Give me suggestions!</Text>
        </TouchableHighlight>

        {/* <FlatList
          style={styles.eventList}
          data={this.state.events}
          renderItem={({item}) => <Text style={styles.eventListItem}>{item.name}</Text>}
          ItemSeparatorComponent={this.renderSuggestListSeparator}
          ListHeaderComponent={this.renderSuggestListHeader}
          keyExtractor={(item, index) => item._id}
        /> */}
        {showList && <SectionList
          style={styles.eventList}
          sections={[
            { title: 'Events', data: this.state.events },
            { title: 'Activities', data: this.state.activities }
          ]}
          renderSectionHeader={ ({section}) => <Text style={styles.sectionHeader}> { section.title } </Text> }
          renderItem={({item}) => <Text style={styles.eventListItem}>{item.name}</Text>}
          ItemSeparatorComponent={this.renderSuggestListSeparator}
          ListHeaderComponent={this.renderSuggestListHeader}
          keyExtractor={(item, index) => item._id}
        />}
      </View>
    );
  }

  _getData() {
    return getTodayHealth().then((info) => {
      return callApi('/events/help', 'POST',
        {
          email: config.email,
          info
        }, {})
    })
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
   },
   eventList: {
    paddingTop: 15,
   },
   eventListHeader: {
    textAlign: 'center',
    paddingBottom: 15,
   },
   sectionHeader: {
    backgroundColor : 'lightgrey',
    fontSize : 20,
    padding: 5,
    color: 'black',
    fontWeight: 'bold'
   },
   eventListItem: {
     padding: 10,
     fontSize: 18,
   },
   button: {
    marginTop: 20,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
});
