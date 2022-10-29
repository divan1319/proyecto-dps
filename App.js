import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import BottomTab from './src/navigation/BottomNavigationTab';
import Login from './src/pages/Login';
import Registro from './src/pages/Registro';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    SignUp: Registro
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
    const userData = await AsyncStorage.getItem('userData');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userData ? 'App' : 'Auth');
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