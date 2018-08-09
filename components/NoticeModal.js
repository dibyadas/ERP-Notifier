import React, { Component} from 'react';
import { WebView, ScrollView, View } from 'react-native';
import { TextInput, Text, Button} from 'react-native-ui-lib';
import PushNotification from 'react-native-push-notification';


export default class NoticeModal extends Component{

	

	// state = {
	// 	type: 'INTERNSHIP',
	// 	subject : 'Urgent',
	// 	company : 'Accenture Innovation Challenge Contest',
	// 	message: "The Accenture Innovation Challenge is now LIVE. \n\n" +

	// 			"Take home prizes worth INR 1,50,000\n\n" +

	// 			"To participate click on - http://www.naukri.com/tieups/tieups.php?othersrcp=30877\n\n" +

	// 			"Apply before 12 August 2018\n\n" +

	// 			"Chairman,CDC"
				
	// }

	render() {

		const { navigation } = this.props;

		const type = navigation.getParam('type','default')
		const subject = navigation.getParam('subject','default')
		const company = navigation.getParam('company','default')
		const message = navigation.getParam('message','default')

		return(
			<View style={{display: 'flex', padding: 10}} >
				<View style={{ paddingTop: 10, paddingBottom : 30 }}>
				<Text text50 style={{fontWeight: 'bold', padding: 5}}> Type: <Text style={{fontWeight: 'normal'}}> {type} </Text> </Text>
				<Text text50 style={{fontWeight: 'bold', padding: 5}}> Subject: <Text style={{fontWeight: 'normal'}}> {subject} </Text> </Text>
				<Text text50 style={{fontWeight: 'bold', padding: 5}}> Company: <Text style={{fontWeight: 'normal'}}> {company} </Text> </Text>
				</View>
				
				<ScrollView style={{marginBottom: 150 }}>
				 <Text text70 dark10> {message} </Text>  
				</ScrollView>
			
			</View>
			);
	}

}

