import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';


import CDC from './CDC';
import NoticeModal from './NoticeModal';
import PDF from './PDF';

export default CDCNoticeStack = createStackNavigator({ 'CDC': CDC, 'NoticeModal': NoticeModal, 'PDF': PDF },{
	initialRouteName: 'CDC',
    // headerMode: 'none',
    navigationOptions: {
      // headerVisible: false, 
      // header: null,
      title: 'Notices',
      headerTintColor: "white",
      headerStyle: {
         backgroundColor:"#9c0000"
       }
    },
  });
