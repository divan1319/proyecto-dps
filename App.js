import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import BottomTab from './src/navigation/BottomNavigationTab';
import Login from './src/pages/Login';

const AppStack = createStackNavigator(
  {
    MainApp: MainApp,
  },
  {
    headerMode: 'none'
  }
);

const AuthStack = createStackNavigator(
  {
    Login: Login,
  },
  {
    headerMode: 'none'
  }
);

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

function MainApp() {
  return (
    <NavigationContainer>
      <BottomTab/>
    </NavigationContainer>
  );
}

const App = createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    AuthLoading: AuthLoadingScreen
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default createAppContainer(App);