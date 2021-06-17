import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';

import { colorLightGreen, colorWhite } from './constants/Colors';
import Register from './screens/Login/Register';
import LoginPage from './screens/Login/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactListview from './screens/Views/ContactListview';
import Tabs from './screens/Tabs/Tabs';
import CameraPage from './screens/Camera/CameraPage';
import ChatListView from './screens/Views/ChatListView';
import ChatView from './screens/ChatView/ChatView';
import GroepsListView from './screens/Views/GroepsListView';
import GroepsChatListView from './screens/Views/GroepsChatListView';


const Stack = createStackNavigator();

function App() {
  const isLoadingComplete = useCachedResources();


  

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider style={{backgroundColor:colorWhite}}>

        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen options={{headerShown:false}}  name="Login" component={LoginPage} />
            <Stack.Screen options={{headerShown:false}}  name="Register" component={Register} />
            <Stack.Screen options={{headerShown:false}}  name="Camera"   component={CameraPage} />
            <Stack.Screen options={{headerShown:false}}  name="Contacts" component={ContactListview} />
            <Stack.Screen options={{headerShown:false}}  name="Tabs" component={Tabs} />
            <Stack.Screen options={{headerShown:false}}  name="GroepsListView" component={GroepsListView} />
            <Stack.Screen options={{headerShown:false}}  name="GroepsChatListView" component={GroepsChatListView} />
            <Stack.Screen options={{headerShown:false}}  name="ChatView" component={ChatView} />
          </Stack.Navigator>
    </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

export default App;

