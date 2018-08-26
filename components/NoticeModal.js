import React, { Component, Header} from 'react';
import { WebView, ScrollView, View, StyleSheet  } from 'react-native';
import { TextInput, Text, Button, Color} from 'react-native-ui-lib';
import HTMLView from 'react-native-htmlview';

export default class NoticeModal extends Component{

	render() {


		const { navigation } = this.props;

		const subject = navigation.getParam('subject','default')
		const company = navigation.getParam('company','default')
		const message = navigation.getParam('message','default')
		const attachment_url = navigation.getParam('attachment_url','default');
		const attachment_raw = navigation.getParam('attachment_raw','default');
		console.log(message);

		return(
			<View style={{backgroundColor: 'white',display: 'flex', padding: 10}} >
				<View style={{ paddingTop: 10, paddingBottom : 30 }}>
				<Text text50 dark10 style={{fontWeight: 'bold', padding: 5}}> Subject: <Text style={{fontWeight: 'normal'}}> {subject} </Text> </Text>
				<Text text50 dark10 style={{fontWeight: 'bold', padding: 5}}> Company: <Text style={{fontWeight: 'normal'}}> {company} </Text> </Text>
				{ 
					
					(attachment_url && attachment_url != 'default' ) ? 
					(	<Button
			           text60 
			           white 
			           onPress={() => navigation.navigate('PDF',{'attachment_url':attachment_url, 'attachment_raw': attachment_raw})}
			           background-blue50 
			           label="View Attachment"
			           />	
					) : false 
					  
		         }



				</View>
				
				<ScrollView style={{ marginBottom: 150 }}>
							 <HTMLView
						        value={message}
						        textComponentProps={{color: 'black', selectable: true}}
						        nodeComponentProps={{selectable: true}}
						      />
				</ScrollView>
			
			</View>
			);
	}

}
