import React, { Component} from 'react';
import { AsyncStorage } from 'react-native';
import { View, Text, Button, Modal} from 'react-native-ui-lib';
import PushNotification from 'react-native-push-notification';

export default class Profile extends Component {

	state = {
		profile: '',
		modalVisible: false,
	}

	componentDidMount() {
		this._retrieveProfile();
  	}

	_retrieveProfile = async () => {
	  try {
	    const value = await AsyncStorage.getItem('@Profile');

	    if (value !== null) {
	    	console.log(value);
	    	console.log(JSON.parse(value));
	      	this.setState({ profile: JSON.parse(value)['rollno'] });
	    }
	   } catch (error) {
	   	 console.log(error);
	     return null;
	   }
	}

	_storeLoginState = async (state) => {
	  	try{
	  		await AsyncStorage.setItem('@LoginState', JSON.stringify(state));
	  	} catch (error) {
	  		console.log(error);
	  	}

	  }

	_logout() {
		this.setState({profile: ''})
		this._storeLoginState(false);
		this.props.navigation.navigate('login');
	}

	notify(){
		PushNotification.localNotificationSchedule({
		  message: "My Notification Message", // (required)
		  date: new Date(Date.now() + (5 * 1000)) // in 60 secs
		});
	}

	showModal(){
		this.setState({modalVisible: true})
	}

	render() {
		return(

			<View flex style={{padding: 40, justifyContent: 'space-between'}}> 
			<Text text40> Logged in as - 
			</Text>
			<Text text40 center> {this.state.profile}  </Text>
			<View>
			<Button
	           text60 
	           white 
	           onPress={() => this._logout()}
	           background-orange50 
	           label="Log Out"/>

	           <Modal
		          animationType="fade"
		          transparent={false}
		          visible={this.state.modalVisible}
		          onRequestClose={() => {
		            this.setState({modalVisible: false})
	          }}> 
		          <View flex center style={{padding: 40}}>
			          <Text>
			          	This app has been developed by Dibya Prakash Das.
			          	</Text>
			          	<Text>
			          	It's made using React Native and supports anything above Android 7 very well. 
			          	</Text>
			          	<Text>
			          	For any feedback and complaints, please drop me a mail @ dibyadas998@gmail.com or message me on Facebook. Thank you!
			          	</Text>
			          	<Text>
			          	For the developers out there, if you find bugs, please report it to github_repo.
			          	</Text>
			          	<Text>
			          	PRs are more than welcome! ;)
			          </Text>
		          </View>
	          </Modal>
	          <View style={{padding: 10}}>
	          </View>
	        <Button background-blue50 onPress={() => this.showModal()} label="About the app" />
	        </View>
			 </View>

			);
	}

}

