import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Survey from './components/Survey';
import Tabs from './components/Tabs';
import DailyLog from './components/DailyLog';
import ActivityCalendar from './components/ActivityCalendar';
import SuggestionCenter from './components/SuggestionCenter';


const TodayRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
    <SignUp />
  </View>
);
const HistoryRoute = () => (
  <View style={[styles.scene]}>
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

const stackNav = createStackNavigator({
  LandingPage: {
    screen: LandingPage
  },
  SignIn: {
    screen: SignIn
  },
  SignUp: {
    screen: SignUp
  },
  Survey: {
    screen: Survey
  },
  Tabs: {
    screen: Tabs
  }
});

const AppContainer = createAppContainer(stackNav);

export default AppContainer;
