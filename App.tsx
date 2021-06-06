import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import TopNav from './topnavigation/TopNav';
import { View } from 'react-native';
//import { colorblue, colorGreen, colorOrange, colorRose, colorYello } from '../../constants/Colors';
import { TextInput } from 'react-native-gesture-handler';
import { Icon, Button, ButtonGroup } from 'react-native-elements'

import { colorDarkGreen, colorGreen, colorLightGreen, colorLightOrange, colorWhite } from './constants/Colors';
import Register from './screens/Login/Register';
import LoginPage from './screens/Login/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function Tabs (){
  return (<View style={{flex:1, backgroundColor:colorLightGreen}}><View style={{backgroundColor:colorLightGreen, height:40}}></View>
              <View style={{backgroundColor:colorLightGreen, height:50,marginVertical:10, display:'flex', 
                  flexDirection:"row", flexWrap:'wrap', alignItems: "center", justifyContent:"space-between"}}>
                <View style={{ width:"40%", display:'flex', alignItems: "center", flexDirection:"row", flexWrap:'wrap'}}>
                  <TextInput style={{ fontSize:20, padding:13, width:"100%", color:"white"}} placeholder="Search..." placeholderTextColor="white"/>
                </View>
                <View style={{display:"flex", flexDirection:"row"}}>
                    <Button icon={<Icon name="camera" color={colorDarkGreen} iconStyle={{fontSize: 26}} />} type="clear"/>
                    <Button icon={<Icon name="sensor-window" color="white" iconStyle={{fontSize: 26}} />}  type="clear"/>
                    <Button icon={<Icon name="today" color="white" iconStyle={{fontSize: 26}} />}  type="clear"/>
                    <Button icon={<Icon name="more-vert" color="white" iconStyle={{fontSize: 26}}/>} type="clear"/>
                </View>
              </View>
              <TopNav/></View>);
}

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider style={{backgroundColor:colorWhite}}>
        <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{headerShown:false}} name="Login" component={LoginPage} />
        <Stack.Screen options={{headerShown:false}} name="Register" component={Register} />
        <Stack.Screen  options={{headerShown:false}} name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
     {/*    <Navigation  colorScheme={colorScheme} />
        <StatusBar /> */}
      {/* <View style={{backgroundColor:"#9e1141", height:40}}></View>
      <View style={{backgroundColor:"#CA1551", height:50,marginVertical:10, display:'flex', 
          flexDirection:"row", flexWrap:'wrap', alignItems: "center", justifyContent:"space-between"}}>
        <View style={{ width:"40%", display:'flex', alignItems: "center", flexDirection:"row", flexWrap:'wrap'}}>
          <TextInput style={{ fontSize:20, padding:13, width:"100%", color:"white"}} placeholder="Search..." placeholderTextColor="white"/>
        </View>
        <View style={{display:"flex", flexDirection:"row"}}>
            <Button icon={<Icon name="camera" color={colorGreen} iconStyle={{fontSize: 26}} />} type="clear"/>
            <Button icon={<Icon name="sensor-window" color="white" iconStyle={{fontSize: 26}} />}  type="clear"/>
            <Button icon={<Icon name="today" color="white" iconStyle={{fontSize: 26}} />}  type="clear"/>
            <Button icon={<Icon name="more-vert" color="white" iconStyle={{fontSize: 26}}/>} type="clear"/>
        </View>
      </View>
      <TopNav/> */}
      
      </SafeAreaProvider>
    );
  }
}

export default App;

