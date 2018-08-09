import React, {Component} from 'react';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
// import RNLocalNotifications from 'react-native-local-notifications';
// import NotificationsAndroid from 'react-native-notifications';
import PushNotification from 'react-native-push-notification';
// import { createTabNavigator } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CDC from './CDC';
import Academic from './Academic';
import Convocation from './Convocation';

const Tabs = createMaterialTopTabNavigator({
  CDC: CDC,
  Academic: Academic,
  Convocation: Convocation,
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
      inactiveTintColor: 'grey',
      // Android's default showing of icons is false whereas iOS is true
      showIcon: false,
      style: {
      	backgroundColor: 'white',
      }
    },
  },

);

export default class UserPage extends React.Component {

	// state = {
	// 	msg:  'Lansdsding page for user!',
	// }

	// _handlePushNotif() {
	//   	PushNotification.localNotification({
	//   		message: "My notif age",
	//   		// ongoing: true,    // keep it true for urgent notifications
	//   		bigText: "My big text that will be shown when notification is expanded",
 //    		subText: "This is a subText",
	//   		actions: '["View","Dismiss"]',
	//   	});
	// }


	render() {
		return(

			<Tabs />

			);
	}

	// render() {
	// 	return (
	// 		<View>
	// 			<View center paddingH-25 paddingT-120> 
	// 				<Text> {this.state.msg} </Text>
	// 			</View>

	// 			<View center paddingH-25 paddingT-120> 
	// 				<Button 
	// 				onPress={() => this._handlePushNotif()}
	// 				label='For a push notif'
	// 				/> 
	// 			</View>
	// 		</View>
	// 	);
	// }
}