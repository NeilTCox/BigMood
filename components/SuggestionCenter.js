import React, { Component } from 'react';
import { TouchableHighlight, FlatList, StyleSheet, Text, View} from 'react-native';
import { callApi, getTodayHealth } from '../libs/apihelper.js';

export default class SuggestionCenter extends Component {
  constructor(props) {
    super(props)
    this.state = { events: [] }
  }

  giveSuggestion() {
    this._getData().then((res) => {
      console.log(res)
      this.setState({ events: res.eventSuggestions.concat(res.activitySuggestions) });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button}
          underlayColor="white"
          onPress={() => {
            this.giveSuggestion();
          }}>
          <Text style={styles.buttonText}>Give me suggestions!</Text>
        </TouchableHighlight>

        <FlatList
          data={this.state.events}
          keyExtractor={(item, index) => item._id}
          renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
        />
      </View>
    );
  }

  _getData() {
    return getTodayHealth().then((info) => {
      return callApi('/events/help', 'POST',
        {
          email: "t@t.com",
          info
        }, {})
    })
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 22
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
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
