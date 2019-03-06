import React from 'react';
import { AppRegistry, StyleSheet, Text, View , Dimensions} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import NewUser from './components/NewUser';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import DailyLog from './components/DailyLog';
import ActivityCalendar from './components/ActivityCalendar';
import SuggestionCenter from './components/SuggestionCenter';


const TodayRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
    <SignUp />
  </View>
);
const HistoryRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
    <ActivityCalendar />
  </View>
);
const TipsRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#303ab7' }]}>
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

AppRegistry.registerComponent('App', () => App);
