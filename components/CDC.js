import React, {Component} from 'react';
import { FlatList, StyleSheet, Alert, AsyncStorage ,  NetInfo } from 'react-native';
import {View, Text, LoaderScreen, BorderRadiuses, ListItem, Colors, ThemeManager} from 'react-native-ui-lib';
import NoticeModal from './NoticeModal';

import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


class MyListItem extends React.PureComponent {

		_showModal(item) {
			this.props.navigation.navigate('NoticeModal',{
				'type': 'type',
				'subject': item[2],
				'company': item[1],
				'message': item[0],
				});
		}

		render() {

			let  item  = this.props.item;

	  		return (
	  				<ListItem
	  				activeBackgroundColor={Colors.blue60}
			        activeOpacity={0.3}
			        onPress={() => this._showModal(item)}
			        height={70}
			        animation="fadeIn"
			        easing="ease-out-expo"
			        duration={1000}
					useNativeDriver
					containerStyle={[styles.border]}
	  				>
	  				{/*<ListItem.Part left containerStyle={[styles.border, {padding: 17}]}>
					          <Text> {item['priority']} </Text>
					</ListItem.Part>*/}

	  				<ListItem.Part middle column containerStyle={[styles.border, {paddingLeft:10, paddingRight: 17}]}>

	  						  <ListItem.Part containerStyle={{marginBottom: 3}}>
					            <Text dark10 text60 bold style={{flex: 1, marginRight: 10}} numberOfLines={1}> {item[2]} </Text>
					          </ListItem.Part>

					          

					</ListItem.Part>

					
					<ListItem.Part right containerStyle={[styles.border,{paddingRight: 17}]}>
					       <Text text70 bold > {item[1].slice(0,30)} </Text>
					</ListItem.Part>

					</ListItem>

	  			);
	  	}
	}

export default class CDC extends Component {

	constructor(props) {
		super(props);
		this.handleRefresh = this.handleRefresh.bind(this);
	}
	

	state = {
		loading: true,
		refreshing: false,
		dataSource: [],
		page: 2
	}

	
	componentDidMount() {

		setTimeout(() => {
			NetInfo.getConnectionInfo().then((connectionInfo) => {
  				if(connectionInfo.type === 'none'){
  					this._retrieveData();
  				}else{
  					this.handleRefresh();
  				}
			});
			
			this.setState({ loading: false});
		},100);

  	}



  	
  	_storeData = async (noticesToSave) => {
	  try {
	  	// console.log("sdfds"+JSON.stringify(noticesToSave));
	    await AsyncStorage.setItem('@Notices', JSON.stringify(noticesToSave));
	    // await AsyncStorage.setItem('@Notices', JSON.stringify(''));
	  } catch (error) {
	  	console.log(error);
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

	

	_getPage(info) {
		if(Math.abs(info.distanceFromEnd) < 0.001){
			this.setState({refreshing: true})
	  		fetch('https://dibyadas-mftp.herokuapp.com/get_notices?page='+this.state.page,{
	  			method: 'GET',
	  		})
	  		.then(response => response.json())
	  		.then(responseJson => {
	  			let temp = this.state.dataSource.concat(responseJson['notices']);
	  			// console.log(responseJson['notices'][0]);
	  			this.setState({
	  				dataSource: temp,
	  			})
	  			return this.state.dataSource
	  		})
	  		.then((noticesToSave) => this._storeData(noticesToSave))
	  		.then(() => this.setState({ page: this.state.page + 1, refreshing: false}))
	  		.catch(error => {
	  			if(error == 'TypeError: Network request failed'){
	  				console.log(this.state.page)
					this.setState({refreshing: false})
				}
	  		})
	  		
		}
	}

  	handleRefresh() {
  		// console.log(page);
  		this.setState({refreshing: true})
  		fetch('https://dibyadas-mftp.herokuapp.com/get_notices?page=1',{
  			method: 'GET',
  		})
  		.then(response => response.json())
  		.then(responseJson => {
  			// let temp = this.state.dataSource.concat(responseJson['notices']);
  			// console.log(responseJson['notices'][0]);
  			this.setState({
  				dataSource: responseJson['notices'],
  			})
  			return this.state.dataSource
  		})
  		.then((noticesToSave) => this._storeData(noticesToSave))
  		.catch(error => console.log(error) )
  		.then(() => this.setState({refreshing: false}))


  	}

  	

	_renderItem = ({item}) => (
	    <MyListItem
	         item={item}
	         navigation={this.props.navigation}
	    />
	  );


  	

	render() {
		return (

			<View flex>

			{ !this.state.loading &&
			 <FlatList
		  		data={this.state.dataSource}
  				renderItem={this._renderItem}
  				refreshing={this.state.refreshing}
  				initialNumToRender={10}
  				onRefresh={this.handleRefresh}
  				onEndReached={(info) => { this._getPage(info)}}
  				onEndReachedThreshold={0}
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