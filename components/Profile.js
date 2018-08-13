import React, { Component} from 'react';
import { AsyncStorage } from 'react-native';
import { View, Text, Button} from 'react-native-ui-lib';

export default class Profile extends Component {

	state = {
		profile: '',
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

	render() {
		return(

			<View flex style={{padding: 40, justifyContent: 'space-between'}}> 
			<Text text40> Logged in as - 
			</Text>
			<Text text40 center> {this.state.profile}  </Text>
			<Button
	           text60 
	           white 
	           onPress={() => this._logout()}
	           background-orange50 
	           label="Log Out"/>

			 </View>

			);
	}

}

