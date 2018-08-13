import React, {Component} from 'react';
import {View, TextInput, Text, Button, Toast, LoaderScreen, Colors} from 'react-native-ui-lib';
import { AsyncStorage } from 'react-native';

class Login extends React.Component {
	state = {
    rollno: '',
    password: '',
    securityFlag: false,
    secQues: '',
    answer: '',
    sessionToken: '',
    showToast: false,
    loading: false,
    loadingMessage: '',
  };

  _handleSecurity(flag) {
    this.setState({ securityFlag: !flag });
  }

  _handleSecQues(value) {
  	this.setState({loadingMessage:'Fetching security question', loading: true});
    fetch('https://dibyadas-mftp.herokuapp.com/get_security_ques?user_id=' + value, {
      method: 'GET',
    })
      .then(response => response.json())

      .then(responseJson => {
        if (responseJson.flag === false) {
          this.setState({ secQues: responseJson.sec, sessionToken: responseJson.sessionToken });
        }
        return responseJson.flag;
      })
      .then(flag => {
        this._handleSecurity(flag);
      })
      .catch((error) => console.log(error))
      .then(() => {
      	this.setState({loadingMessage:'', loading: false});
      });
      
  }

  _storeData = async (profile) => {
	  try {
	  	// console.log(JSON.stringify(profile));
	    await AsyncStorage.setItem('@Profile', JSON.stringify(profile));
	  } catch (error) {
	  	console.log(error);
	  }
	}

  _storeLoginState = async (state) => {
  	try{
  		await AsyncStorage.setItem('@LoginState', JSON.stringify(state));
  	} catch (error) {
  		console.log(error);
  	}

  }

  _handleSubmit() {
  	this.setState({loadingMessage:'Logging in...', loading: true});
  	fetch('https://dibyadas-mftp.herokuapp.com/try_login',{
		method:'POST',
		body: JSON.stringify({
			'user_id': this.state.rollno,
			'password': this.state.password,
			'secret_answer': this.state.answer,
			'sessionToken': this.state.sessionToken,
		})
	}).then(response => response.json())
	  .then(responseJson => {
	  	if(responseJson.login === 'false'){
	  		this.setState({showToast : true, loading: false})
	  	}else if(responseJson.login === 'true'){
	  		this._storeData({rollno: this.state.rollno})
	  		this._storeLoginState(true);
	  		this.setState({ loading: false});
  			this.props.navigation.navigate('UserPage');
	  	}
	  });
  	
  }


  render() {

	  	let { rollno, password, securityFlag, secQues, secval } = this.state;

	    return (
	      <View flex style={{flexDirection: 'column', justifyContent: 'space-around'}}>
			      {
						this.state.loading &&
						<LoaderScreen 
						color={Colors.blue60}
			            message={this.state.loadingMessage}
						overlay
			 			/>
				  }
	      
			      <View style={{padding: 10}}>

			    	<View>
			        <Text blue10 text30>Welcome</Text>
			        <Text> </Text>
			        </View>

			        <View>
			        <TextInput 
			         text50
			         onBlur={() => this._handleSecQues(rollno)}
			         floatingPlaceholder={true}
			         floatOnFocus={true}
			         placeholder="Roll Number"
			         onFocus={() => this.setState({ securityFlag: false })}
			         onChangeText={rollno => this.setState({ rollno })}
			         dark10/>
			         </View>

			         <View>
			        <TextInput
			         text50
			         floatingPlaceholder={true}
			         floatOnFocus={true}
			         placeholder="Password" 
			         onChangeText={password => this.setState({ password })}
			         secureTextEntry 
			         dark10/>
			         </View>


		      		{securityFlag && (
			         <View> 
			          <TextInput
			           text50 
			           floatingPlaceholder={true}
			           floatOnFocus={true}
			           placeholder={secQues}
			           onChangeText={answer => this.setState({ answer })}
			           secureTextEntry 
			           dark10/>
			        	</View>   
			        )}
		      		</View>

			        <View center>
			          <Button
			           text60 
			           white 
			           onPress={() => this._handleSubmit()}
			           background-orange30 
			           label="Login"/>
			        </View>

			        <Toast
				      visible={this.state.showToast}
				      message="Incorrect Login"
				      allowDismiss
				      onDismiss={() => this.setState({showToast: false})}
				      autoDismiss={3000}
				      centerMessage
					/>
			      

	      </View>
	    );
	  }
}

export default Login;