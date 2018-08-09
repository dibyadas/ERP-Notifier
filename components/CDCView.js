import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';


import CDC from './CDC';
import NoticeModal from './NoticeModal';

export default CDCNoticeStack = createStackNavigator({ 'CDC': CDC, 'NoticeModal': NoticeModal },{
	initialRouteName: 'CDC',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false, 
    },
  });
