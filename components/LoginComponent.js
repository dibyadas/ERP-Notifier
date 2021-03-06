import React, {Component} from 'react';
import {View, TextInput, Text, Button, Toast, LoaderScreen, Colors} from 'react-native-ui-lib';
import { AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Login extends React.Component {

		constructor(props) {
			    super(props);
			    this.changePwdType = this.changePwdType.bind(this);
		  }


	state = {
    rollno: '',
    password: '',
    securityFlag: false,
    secQues: '',
    answer: '',
    sessionToken: '',
    showToast: false,
    toastMessage: '',
    loading: false,
    loadingMessage: '',
    secure: true,
    icEye: 'visibility-off',
  };

  changePwdType() {
  	if( this.state.secure )
	{
		this.setState({
			icEye: 'visibility',
			secure: false
  		});
	}else if(!this.state.secure){
		this.setState({
			icEye: 'visibility-off',
			secure: true
  		});
	}
  }

  _handleSecurity(flag) {
    this.setState({ securityFlag: !flag });
  }

  _handleSecQues(value) {
  	this.setState({loadingMessage:'Fetching security question', loading: false});
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
      .catch((error) => {
      		console.log(error);
      		if(error == 'TypeError: Network request failed'){
				this.setState({showToast : true, toastMessage:'Enable Network connection', loading: false})
			}
      })
      .then(() => {
      	this.setState({loading: false})
      })
      ;
      
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
	  		this.setState({showToast : true, toastMessage:'Incorrect Login!', loading: false})
	  	}else if(responseJson.login === 'true'){
	  		this._storeData({rollno: this.state.rollno})
	  		this._storeLoginState(true);
	  		this.setState({ loading: false});
  			this.props.navigation.navigate('UserPage');
	  	}
	  })
	  .catch((error) => {
			console.log(error);
			if(error == 'TypeError: Network request failed'){
				this.setState({showToast : true, toastMessage:'Enable Network connection', loading: false})
			}
			
	  })
	  ;
  	
  }


  render() {

	  	let { rollno, password, securityFlag, secQues, secval } = this.state;

	    return (
	      <View flex style={{flexDirection: 'column', justifyContent: 'space-around'}}>
			      
	      
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
			         secureTextEntry={this.state.secure}
			         dark10/>
			         <Icon style={{position: 'absolute', top:33, right:10}}
					          name={this.state.icEye}
					          size={25}
					          onPress={this.changePwdType}
					    />
			         </View>



		      		{securityFlag && (
			         <View> 
			          <TextInput
			           text50 
			           floatingPlaceholder={true}
			           floatOnFocus={true}
			           placeholder={secQues}
			           onChangeText={answer => this.setState({ answer })}
			           secureTextEntry={this.state.secure}
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
				      message={this.state.toastMessage}
				      allowDismiss
				      onDismiss={() => this.setState({showToast: false})}
				      autoDismiss={3000}
				      centerMessage
					/>
			      {
						this.state.loading &&
						<LoaderScreen 
						color={Colors.blue60}
			            message={this.state.loadingMessage}
						overlay
			 			/>
				  }

	      </View>
	    );
	  }
}

export default Login;