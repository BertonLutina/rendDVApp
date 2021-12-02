import React, { useState,useEffect, createRef,useMemo,memo,useCallback } from 'react';
import { StyleSheet, View ,Text, Alert} from 'react-native'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Chat from '../Chat/Chat.jsx';
import {colorGreen, colorGreenIcon, colorLightGreen, colorWhite } from '../../constants/Colors';
import { Icon, Button, ListItem} from 'react-native-elements';
import { launchCameraAsync, MediaTypeOptions } from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { firestore, _firebase } from '../../auth/firebase.js';
import ChatviewUserGroep from './ChatVieuws/ChatviewUserGroep.jsx';
import ChatviewGroep from './ChatVieuws/ChatviewGroep.jsx';
import ChatviewUser from './ChatVieuws/ChatviewUser.jsx';
import GroepsChat from '../GroepsChat/GroepsChat.jsx';
import ActionSheet from 'react-native-actions-sheet'
import { getChatterId, getGroupsId } from '../../constants/constantFunction.js';
import { getDayString, getUseDate } from '../../constants/date.js';



const pickFromCamera = async () => {
  const {granted} = await Camera.requestPermissionsAsync();
  if(granted){
   let data = await launchCameraAsync({
      mediaTypes:MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[1,1],
      quality:1
    })
  }else{
    Alert.alert("you to get permissions");
  }

}

const actionSheetRef = createRef();


const ChatListView = ({ users,group, view:viewp}) => {
  const [person, setPerson] = useState(users);
  const [groups, setGroups] = useState(group);
  const [personfilterd, setPersonfilterd] = useState(users);
  const [text, settext] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState(1);
  const navigation = useNavigation();

  const filterArray = useCallback((text) =>{
    let search = text.toLowerCase();
    let array = person.filter(obj => (obj == undefined) ? "" : obj.username.toLowerCase().includes(search));
    setPersonfilterd(users);
    settext(text);
  },[settext, setPersonfilterd]);

  const selected = useCallback((item,num) => {
    if(num == 0)
      navigation.navigate("ChatView", {
        person: item
      });
    else if(num == 1){
      navigation.navigate("GroepsView", {
        person: item
      });
    }
  },[navigation]);

  const changeView = useCallback(() => {
    let screen = view;
        screen++;
    if(screen < 4){
        setView(screen);
    }else{
      setView(1);
    }
  }, [view]);

  useEffect(() => {
    let unmouted = false;
    let unmouted2 = false;
     _firebase.auth().onAuthStateChanged(function(user) {
      setView(viewp||1)
      if (user) {
        var p_uid = getChatterId(user.uid);
        var g_uid = getGroupsId(user.uid);
          firestore.collection(p_uid).onSnapshot((snapshot) => {
            if(!unmouted){
              setPersonfilterd(snapshot.docs.map(doc => doc.data()));
              setPerson(snapshot.docs.map(doc => doc.data()));
            }
            return () => {
              unmouted = true;
            }
          });

          firestore.collection(g_uid).onSnapshot((snapshot) => {
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
      
  },[viewp]);

  const renderItem = useMemo(() => { return ({ item }) => {
  const checked = (item.id == selectedId) ? true : false;
 // var p_uid = getChatterId(_firebase.auth().currentUser.uid);

  /* let lastchat = firestore.collection(p_uid).doc(item.id).collection("messages").limit(1).onSnapshot((data) => 

  ); */

    return (
        <TouchableWithoutFeedback>
            <Chat 
                name={item.name} 
                id={item.id} 
                date={getUseDate(item.createDate, "dd/mm/yyyy")}
                plan={item.plan}
                onPress={() => selected(item,0)}
                selected={checked}
                message={"Hallo dit is een test hall yes".substring(0,20)}
                photo ={item.photo}/>
        </TouchableWithoutFeedback> 
            );
  }});

  const renderItemGroup = useMemo(() => { return({ item }) => {
    const checked = (item.id == selectedId) ? true : false;
      return (
          <TouchableWithoutFeedback >
              <GroepsChat 
                  id={item.id}
                  name={item.groupname} 
                  plan={item.plan}
                  date={getUseDate(item.createDate, "dd/mm/yyyy")}
                  members = {item.members}
                  onPress={() => selected(item,1)}
                  selected={checked}
                  message={"Hallo dit is een test hall yes".substring(0,20)}
                  photo ={item.photo}/>
          </TouchableWithoutFeedback> 
              );
    }});

  const renderSeparator = () => {
    return (
      <View
        style={{
          height:0.5,
          marginLeft:"20%",
          backgroundColor:colorLightGreen,
          width:"86%",
        }}/>
    )
  };

 

    if ((personfilterd.length > 0 || groups.length > 0)){
      if(view == 1){
        return (
          <ChatviewUser 
            person = {personfilterd} renderItem = {renderItem} renderSeparator ={renderSeparator} text = {text}
            selectedId = {selected} filterArray= {filterArray} actionSheetRef ={actionSheetRef} navigation = {navigation}
            changeView = {changeView} pickFromCamera = {pickFromCamera}
          />);
      }else if(view == 2){
        return (
          <ChatviewUserGroep
            person = {personfilterd} group={groups} renderItem={renderItem} renderItemGroup={renderItemGroup} renderSeparator ={renderSeparator} text = {text}
            selectedId = {selected} filterArray={filterArray} actionSheetRef ={actionSheetRef} navigation = {navigation}
            changeView = {changeView} pickFromCamera = {pickFromCamera} />
          );
      }else if(view == 3){
        return (
          <ChatviewGroep 
            person = {groups} renderItem= {renderItemGroup} renderSeparator ={renderSeparator} text = {text}
            selectedId = {selected} filterArray= {filterArray} actionSheetRef ={actionSheetRef} navigation = {navigation}
            changeView = {changeView} pickFromCamera = {pickFromCamera}
            />);
      }
      }else{
      return (
      <View style={styles.container}>
          <Button  icon={<Icon name="chat" color={colorWhite} borderRadius={50} iconStyle={{fontSize: 60}}  />} 
            containerStyle={styles.cont_btn_camera_cr} 
            buttonStyle={styles.btn_style_camera_cr}
            onPress={() => {actionSheetRef.current?.setModalVisible()}}/>
          <View style={{backgroundColor:colorGreen,position:"relative",flex:1,justifyContent:"center",alignItems:'center',
        borderTopLeftRadius:150,borderBottomRightRadius:150, margin:20}}>
            <Text style={{fontSize:18, color:colorWhite}}>Let's talk...</Text>
          </View>
          <ActionSheet ref={actionSheetRef}>
            <View>
              <ListItem bottomDivider onPress={() => navigation.navigate('NewChat')}>
                  <ListItem.Content>
                    <ListItem.Title>Create new chat</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
              </ListItem>
              <ListItem bottomDivider onPress={() => navigation.navigate('NewGroep')}>
                  <ListItem.Content>
                    <ListItem.Title>Create new groupchat</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
              </ListItem>
            </View>
          </ActionSheet> 
      </View>);
    }
}

export default memo( ChatListView)

const styles = StyleSheet.create({
    main:{
        flex:1
    },
    container:{
        backgroundColor:colorWhite,
        flex:1
    },
    cont_btn_camera_cr:{
      position:"relative",
      flex:1,
      justifyContent:"center",
      alignItems:'center',
      borderRadius:10,
    },
    btn_style_camera_cr:{
      padding:8,
      backgroundColor:colorGreenIcon,
    },
    cont_btn_camera:{
      position:'absolute', 
      bottom:100,
      borderRadius:50, 
      right:20,
      shadowColor:"black",
      shadowOffset:{
        width:0,
        height:2
    },
    shadowRadius:3.5,
    shadowOpacity:0.2,
    elevation:11
    },
    btn_style_camera:{
      padding:2,
      backgroundColor:colorGreenIcon,
    },
    cont_btn_chat:{
      position:'absolute', 
      bottom:170,
      borderRadius:50, 
      right:20,
      shadowColor:"black",
      shadowOffset:{
        width:0,
        height:2
    },
    shadowRadius:3.5,
    shadowOpacity:0.2,
    elevation:11
    },
    btn_style_chat:{
      padding:7,
      backgroundColor:colorWhite, 
    }
})
