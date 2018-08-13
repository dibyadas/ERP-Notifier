import React from 'react';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import Login from './components/LoginComponent';
import Tabs from './components/UserPage';
import AuthLoad from './components/AuthLoad';

const AppStack = createStackNavigator({ UserPage: Tabs }, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false, 
    },
  });

const AuthStack = createSwitchNavigator({  AuthLoad: AuthLoad  ,login: Login}, {
    headerMode: 'none',
    initialRouteName: 'AuthLoad',
    backBehavior: null,
    navigationOptions: {
      headerVisible: false, 
    },
  });

const RootStack = createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
    backBehavior: null,
  }
);



export default class App extends React.Component {
  
 
  render() {
    return (
      
      <RootStack />

      );
  }
 
}
