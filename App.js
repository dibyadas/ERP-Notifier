import React from 'react';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import BackgroundTimer from 'react-native-background-timer';
import {AsyncStorage , NetInfo} from 'react-native';
import PushNotification from 'react-native-push-notification';

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
    
  latest = null;

  componentDidMount(){

    const intervalId = BackgroundTimer.setInterval(() => {
      this._retrieveData();
    }, 2*60*1000 );

  }
  
  fetchLatest = () => {

    let latest = this.latest;
    let notif = this.notif;

    fetch('https://dibyadas-mftp.herokuapp.com/get_notices?page=1',{
      method: 'GET',
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson['notices'][0][3]+" in responseJson")
      return responseJson['notices'][0][3]
    })
    .then((nowlatest) => { 

        if(nowlatest && nowlatest != latest && latest != null ){
          console.log("here before notif")
          PushNotification.localNotification({
            title: "New notices from CDC",
            message: "Pull down the list to refresh",
          });

        }

     })
    .catch(error => {
        console.log(error);
        if(error == 'TypeError: Network request failed'){
          console.log(this.state.page)
      }
    });
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@Latest');
      if (value !== null) {
        this.latest = JSON.parse(value);
        this.fetchLatest();
      }
     } catch (error) {
       console.log('Error fetching saved data!, in latest');
       return null;
     }
  }

  render() {
    return (
      
      <RootStack />

      );
  }
 
}
