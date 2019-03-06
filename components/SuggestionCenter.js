import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View} from 'react-native';
import { callApi } from '../libs/apihelper.js';


export default class SuggestionCenter extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          // data={[
          //   {key: 'You should go for a run.'},
          //   {key: 'You should eat some food.'},
          //   {key: 'You should go hug a cat.'},
          // ]}
          data={this._getData()}
          renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
        />
      </View>
    );
  }

  _getData() {
    return callApi( 'http://1da417a0.ngrok.io/URL/events', 'POST', 
      {
        email: "test@test.com",
      }, {}).events
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
