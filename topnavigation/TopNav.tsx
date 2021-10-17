import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatListView from '../screens/Views/ChatListView';
import CallListView from '../screens/Views/CallListView';
import { NavigationContainer } from '@react-navigation/native';
import EventListView from '../screens/Views/EventListView';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import ContactListview from '../screens/Views/ContactListview';
import { colorDarkGreen, colorGreen, colorLightGreen, colorLightOrange } from '../constants/Colors';
import GroepsChatListView from '../screens/Views/GroepsChatListView';
import * as Contacts from 'expo-contacts';
import { firestore } from '../auth/firebase';



const Tab = createMaterialTopTabNavigator();


const TopNav = ({users,group, person, view}) => {

    return (
    <Tab.Navigator
        initialRouteName="Chat"
        tabBarOptions={{
        activeTintColor: '#fff',
        indicatorStyle : { backgroundColor:'#ffffff' },
        labelStyle: { fontSize: 14, fontWeight: 'bold' },
        style: { backgroundColor: colorGreen, color: 'black' },
        showIcon: true
      }}
      
    >
      <Tab.Screen
        name="Chat"
        children={() =>{
          return(
            <ChatListView persony={person} users={users} group={group} view={view}/>
          )
         }}
        
        options={{tabBarIcon: () => <Icon name="forum" color={"white"}/>,
                  tabBarLabel: () => null }}
      />
      {/* <Tab.Screen
        name="GroepChat"
        component={GroepsChatListView}
        options={{tabBarIcon: () => <Icon name="forum" color={"white"}/>,
                  tabBarLabel: () => null }}
      /> */}
      <Tab.Screen
        name="Call"
        component={CallListView}
        options={{tabBarIcon: () => <Icon name="wifi-calling" color={"white"}/>,
                  tabBarLabel: () => null }}
      />
      <Tab.Screen
        name="Event"
        component={EventListView}
        options={{tabBarIcon: () => <Icon name="date-range" color={"white"}/>,
                  tabBarLabel: () => null }}
      />
    </Tab.Navigator>
    )
}

export default TopNav

const styles = StyleSheet.create({})
