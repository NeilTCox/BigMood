import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View} from 'react-native';
import { callApi } from '../libs/apihelper.js';


export default class SuggestionCenter extends Component {
  constructor(props) {
    super(props)
    this.state = { events: [] }
  }

  componentDidMount() {
    this._getData().then((res) => {
      this.setState({ events: res.events });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.events}
          renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
        />
      </View>
    );
  }

  _getData() {
    return callApi('/events', 'GET', 
      {}, {
        email: "test@test.com",
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
});

AppRegistry.registerComponent('SuggestionCenter', () => SuggestionCenter);
