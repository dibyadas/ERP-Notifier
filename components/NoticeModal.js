import React, { Component} from 'react';
import { WebView, ScrollView, View, StyleSheet } from 'react-native';
import { TextInput, Text, Button} from 'react-native-ui-lib';
import HTMLView from 'react-native-htmlview';


export default class NoticeModal extends Component{


	render() {


		const { navigation } = this.props;

		const subject = navigation.getParam('subject','default')
		const company = navigation.getParam('company','default')
		const message = navigation.getParam('message','default')
		// console.log(message);

		return(
			<View style={{display: 'flex', padding: 10}} >
				<View style={{ paddingTop: 10, paddingBottom : 30 }}>
				<Text text50 style={{fontWeight: 'bold', padding: 5}}> Subject: <Text style={{fontWeight: 'normal'}}> {subject} </Text> </Text>
				<Text text50 style={{fontWeight: 'bold', padding: 5}}> Company: <Text style={{fontWeight: 'normal'}}> {company} </Text> </Text>
				</View>
				
				<ScrollView style={{ marginBottom: 150 }}>
							 <HTMLView
						        value={message}
						        textComponentProps={{selectable: true}}
						        nodeComponentProps={{selectable: true}}
						        stylesheet={styles}
						      />
				</ScrollView>
			
			</View>
			);
	}

}

const styles = StyleSheet.create({
	body:{
		fontSize: 10,
	},
  	br: {
    	fontWeight: '300',
    	color: '#FF3366', // make links coloured pink
  	},
});