import React, {Component} from 'react';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import PushNotification from 'react-native-push-notification';

import { createMaterialTopTabNavigator } from 'react-navigation';

import CDCNoticeStack from './CDCView';
import Profile from './Profile';
import Academic from './Academic';
import Convocation from './Convocation';

export default Tabs = createMaterialTopTabNavigator({
  CDC: CDCNoticeStack,
  Academic: Academic,
  Convocation: Convocation,
  Profile: Profile,
  },
  {
  	shifting: true,
  	backBehavior: null,
    initialRouteName: 'CDC',
    animationEnabled: false,
    swipeEnabled: true,
    // Android's default option displays tabBars on top, but iOS is bottom
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#82807f',
      // Android's default showing of icons is false whereas iOS is true
      showIcon: false,
      style: {
      	backgroundColor: '#fcab88',
      }
    },
  },

);