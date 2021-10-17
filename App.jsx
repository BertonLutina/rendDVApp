import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import { LogBox } from 'react-native';
import { colorWhite } from './constants/Colors';
import Register from './screens/Login/Register';
import LoginPage from './screens/Login/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactListview from './screens/Views/ContactListview';
import Tabs from './screens/Tabs/Tabs';
import CameraPage from './screens/Camera/CameraPage';
import ChatView from './screens/ChatView/ChatView';
import GroepsListView from './screens/Views/NewGroepsListView';
import GroepSelection from './screens/GroepSelection/GroepSelection';
import NewGroepsListView from './screens/Views/NewGroepsListView';
import NewChatListView from './screens/Views/NewChatListView';
import * as Contacts from 'expo-contacts';
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth, firestore, _firebase } from './auth/firebase';
import NewGroePSum from './screens/Views/NewGroePSum';
import { Provider } from 'react-redux';
import { rrfProps, store } from './store/store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import GroepsView from './screens/GroepsView/GroepsView';
import { getChatter, getChatterId, getGroupsId } from './constants/constantFunction';
import ChatListView from './screens/Views/ChatListView';
import EventCreater from './screens/Events/EventCreater';

const Stack = createStackNavigator();

function App() {
 
  LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
  LogBox.ignoreLogs(['Remote debugger']);
  LogBox.ignoreAllLogs(); // ignore all logs

  const [person, setPerson] = useState([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const[user] = useAuthState(auth);
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    let unmouted = false;
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers,Contacts.Fields.Image,Contacts.Fields.Emails],
          });
          if (data.length > 0) {
              let result = Object.values(data).sort((a,b) => (a.name > b.name) ? 1 : -1);
              setPerson(result); 
          }
        }
        return () => {
          unmouted = true;
        }

        
      })();
    }, []);

    useEffect(() => {
      let unmouted = false;
      let unmouted2 = false;
      _firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          let p_uid = getChatterId(user.uid);
          let g_uid = getGroupsId(user.uid);
          const unsubscribe = firestore.collection(p_uid).onSnapshot((snapshot) => {
            if(!unmouted)
            setUsers(snapshot.docs.map(doc => doc.data()));
          return () => {
            unmouted = true;
          }
        });

        const unsubscribegroup = firestore.collection(g_uid).onSnapshot((snapshot) => {
          if(!unmouted2)
          setGroups(snapshot.docs.map(doc => doc.data()));
        return () => {
          unmouted2 = true;
        }
      });


        } else {
          Alert.alert("LogOut","You're LogOut please Login Again");
        }
      });
        

     
      },[]);

    

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
      <SafeAreaProvider style={{backgroundColor:colorWhite}}>
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName={ user ? "Tabs" : "Login"}>
            <Stack.Screen   name="Login" component={LoginPage} />
            <Stack.Screen   name="Register" component={Register} />
            <Stack.Screen   name="Camera"   component={CameraPage} />
            <Stack.Screen   name="Contacts" component={ContactListview} />
            <Stack.Screen   name="Tabs" children={() =>{ return( <Tabs users={users} group={groups} person={person}/> )}} />
            <Stack.Screen   name="GroepsListView" component={GroepsListView} />
            <Stack.Screen   name="GroepSelection" component={GroepSelection} />
            <Stack.Screen   name="NewGroePSum" component={NewGroePSum} />
            <Stack.Screen   name="NewChat" children={() =>{ return( <NewChatListView persony={person}/> )}} />
            <Stack.Screen   name="NewGroep" children={() =>{ return( <NewGroepsListView  persony={person}/> )}} />
            <Stack.Screen   name="Chatlist" children={() =>{ return( <ChatListView /> )}} />
            <Stack.Screen   name="ChatView" component={ChatView} />
            <Stack.Screen   name="EventCreater" component={EventCreater} />
            <Stack.Screen   name="GroepsView" component={GroepsView} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;

