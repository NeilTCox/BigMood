import React from 'react';
import { StyleSheet, Text, View , Dimensions} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const TodayRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);
const HistoryRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
const TipsRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#303ab7' }]} />
);

export default class TabViewExample extends React.Component {
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
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
