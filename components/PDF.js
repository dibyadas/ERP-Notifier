import React, { Component } from 'react';
import PDFView from 'react-native-view-pdf';
import { View, Alert, StatusBar } from 'react-native';

export default class PDF extends Component {

	static navigationOptions = {
		title: 'Attachment',
		headerStyle: {
         backgroundColor:"#9c0000"
       }
	}

	render() {

		const { navigation } = this.props;

		const attachment_url = navigation.getParam('attachment_url','default');
		const attachment_raw = navigation.getParam('attachment_raw','default');
		console.log(attachment_url);
		console.log(attachment_raw);
		if(attachment_url && attachment_url != 'default' ){
			return (

			<View style={{ flex: 1 }}>
			<StatusBar backgroundColor='#a80303' barStyle='light-content' />
			  <PDFView
			    style={{ flex: 1 }}
			    onError={(error) => Alert.alert('Bad PDF file - ',attachment_url)}
			    onLoad={() => console.log('PDF rendered from raw')}
			    resource={attachment_raw}
			    resourceType='base64'
			  />
			</View>

			);
		}
		
	}	
}

