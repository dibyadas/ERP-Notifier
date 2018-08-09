import React, {Component} from 'react';
import { FlatList, StyleSheet, Alert, AsyncStorage } from 'react-native';
import {View, Text, LoaderScreen, BorderRadiuses, ListItem, Colors, ThemeManager} from 'react-native-ui-lib';
	

export default class CDC extends Component {


	constructor(props) {
		super(props);
		this.handleRefresh = this.handleRefresh.bind(this);
	}
	

	state = {
		loading: true,
		refreshing: false,
		dataSource: []
	}

	componentDidMount() {

		this._retrieveData();
		this.setState({ loading: false});

  	}

  	_storeData = async (noticesToSave) => {
	  try {
	  	console.log(JSON.stringify(noticesToSave));
	    await AsyncStorage.setItem('@Notices', JSON.stringify(noticesToSave));
	  } catch (error) {
	    Alert.alert('Error saving data!');
	  }
	}

	_retrieveData = async () => {
	  try {
	    const value = await AsyncStorage.getItem('@Notices');
	    if (value !== null) {
	      this.setState({ dataSource: JSON.parse(value)});
	    }
	   } catch (error) {
	     Alert.alert('Error fetching saved data!');
	     return null;
	   }
	}



  	handleRefresh() {
  		this.setState({refreshing: true})

  		fetch('https://922ed2fe.ngrok.io/notices',{
  			method: 'GET',
  		})
  		.then(response => response.json())
  		.then(responseJson => {
  			let temp = this.state.dataSource.concat(responseJson);
  			this.setState({
  				dataSource: temp,
  			})
  			return this.state.dataSource
  		})
  		.then((noticesToSave) => this._storeData(noticesToSave))
  		.catch(error => Alert.alert('error') )
  		.then(() => this.setState({refreshing: false}))


  	}

  	renderRow(item) {
  		return (
  				<ListItem
  				activeBackgroundColor={Colors.blue60}
		        activeOpacity={0.3}
		        onPress={() => Alert.alert(`pressed on contact # `)}
		        height={70}
		        animation="fadeIn"
		        easing="ease-out-expo"
		        duration={1000}
				useNativeDriver
  				>
  				<ListItem.Part left containerStyle={[styles.border, {padding: 17}]}>
				          <Text> Notice </Text>
				</ListItem.Part>

  				<ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>

  						  <ListItem.Part containerStyle={{marginBottom: 3}}>
				            <Text dark10 text70 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{item['type']}</Text>
				          </ListItem.Part>

				          <ListItem.Part>
				            <Text style={{flex: 1, marginRight: 10}} text90 dark40 numberOfLines={1}>{item['priority']}</Text>
				          </ListItem.Part>

				</ListItem.Part>

				
				<ListItem.Part right containerStyle={[styles.border, {paddingRight: 17}]}>
				       <Text> tso</Text>
				</ListItem.Part>

				</ListItem>

  			);
  	}

	render() {
		return (

			<View flex>

			{ !this.state.loading &&
			 <FlatList
		  		data={this.state.dataSource}
  				renderItem={({item}) => this.renderRow(item)}
  				refreshing={this.state.refreshing}
  				onRefresh={this.handleRefresh}
			/>
			}

			{
				this.state.loading &&
				<LoaderScreen 
				color={Colors.blue60}
	            message="Loading..."
				overlay
	 			/>
			} 
				
			 </View>
			);
	}
}

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
});