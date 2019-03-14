import React from 'react';
import { StyleSheet, Text, View , Dimensions} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import DailyLog from './DailyLog';
import ActivityCalendar from './ActivityCalendar';
import SuggestionCenter from './SuggestionCenter';

const TodayRoute = () => (
  <View style={[styles.scene, { backgroundColor: 'white' }]}>
    <DailyLog />
  </View>
);
const HistoryRoute = () => (
  <View style={[styles.scene, { backgroundColor: 'white' }]}>
    <ActivityCalendar />
  </View>
);
const TipsRoute = () => (
  <View style={[styles.scene, { backgroundColor: 'white' }]}>
    <SuggestionCenter />
  </View>
);

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'today', title: 'Today' },
      { key: 'history', title: 'History' },
      { key: 'tips', title: 'Tips' },
    ],
  };

  static navigationOptions = () => {
    return {
      headerTitle: 'BigMood',
      headerLeft: null,   // remove back button
    }
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          today: TodayRoute,
          history: HistoryRoute,
          tips: TipsRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').width,
        }}
        tabBarPosition={'bottom'}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
