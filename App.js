import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Survey from './components/Survey';
import Tabs from './components/Tabs';

const stackNav = createStackNavigator({
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
