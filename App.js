import React from 'react';
// import { StyleSheet, Text, View, Button} from 'react-native';
// import { TextField } from 'react-native-material-textfield';
import Login from './components/LoginComponent';
import UserPage from './components/UserPage';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
// import Push from 'react-native-push-notification';

// https://facebook.github.io/react-native/docs/appstate

const AppStack = createStackNavigator({ UserPage: UserPage }, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false, 
    },
  });

const AuthStack = createStackNavigator({ login: Login}, {
    headerMode: 'none',
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
    initialRouteName: 'App',
  }
);

// const RootStack = createStackNavigator({
//   login: {
//     screen: Login
//   },
//   UserPage: {
//     screen: UserPage
//   }},
//   {
//     initialRouteName: 'login',
//     headerMode: 'none',
//     navigationOptions: {
//       headerVisible: false, 
//     },
//   }

// );


export default class App extends React.Component {
  
 
  render() {
    return (

      <RootStack />

      );
  }
 
}

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flex: 2,
//     'flexDirection': 'column',
//     'justifyContent': 'space-around',
//     // 'alignItems': 'center',
//     // flex: 3,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     alignContent: 'center',
//   },
//   text: {
//     flex: 2,
//     padding: 10,
//   }
// });
