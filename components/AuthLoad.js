import React, { Component} from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { LoaderScreen, Colors, View , Text} from 'react-native-ui-lib';


export default class AuthLoad extends Component {


	constructor(props) {
	    super(props);
	    this._retrieveData();
  }

	state = {
		loading: true
	}


	_retrieveData = async () => {
		// console.log('Here');
	  try {
	    const value = await AsyncStorage.getItem('@LoginState');
	    
	    if (value !== null) {
	      if (JSON.parse(value) === true ){
	      	// console.log('Here');
	      	this.props.navigation.navigate('App');
	      }
	      else{
	      	
	      	this.props.navigation.navigate('login');
	      }
	    }
	    else{
	      	
	      	this.props.navigation.navigate('login');
	      }

	   } catch (error) {
	     Alert.alert('Error fetching saved data!');
	     return null;
	   }
	}


	render(){
		let { loading } = this.state;
		return(
			<View flex center>
			<Text>  </Text>
						{
						  loading &&
						   <LoaderScreen 
							color={Colors.blue60}
				            message='Opening..'
							overlay
				 			/>

						}
			</View>

			);
	}
}