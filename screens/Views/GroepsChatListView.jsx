import React, { useState,useEffect, createRef } from 'react';
import { Dimensions, StyleSheet, View ,Text, Alert} from 'react-native'
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import ActionSheet from "react-native-actions-sheet";
import * as Contacts from 'expo-contacts';
import Chat from '../Chat/Chat.jsx';
import {colorGreenIcon, colorLightGreen, colorWhite } from '../../constants/Colors';
import { Icon, Button,ListItem } from 'react-native-elements';
import { launchCameraAsync, MediaTypeOptions } from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Accordian from '../../components/Accordian.jsx';
import HeaderAnimated from '../HeaderComponent.jsx/HeaderAnimated.jsx';
import { useNavigation } from '@react-navigation/native';
import { readChatterAll } from '../../components/CRUD/crud.js';
import { firestore } from '../../auth/firebase.js';


let persons = [];

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
const GroepsChatListView = ({route}) => {
  const [person, setPerson] = useState([]);
  const [text, settext] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState(1);
  const navigation = useNavigation();

  function filterArray(text){
    let search = text.toLowerCase();
    let array = person.filter(obj => (obj == undefined) ? "" : obj.username.toLowerCase().includes(search));
    setPerson(array);
    settext(text);
  }

  function selected(item) {
    setSelectedId(item.id);
    navigation.navigate("ChatView",{
      person: item
    });
  }

  function changeView() {
    let screen = view;
        screen++;
    if(screen < 4){
        setView(screen);
    }else{
      setView(1);
    }
  }

  useEffect(() => {
      const unsubscribe = firestore.collection('Chatter').onSnapshot((snapshot) => {
        persons = snapshot.docs.map(doc => doc.data());
        setPerson(snapshot.docs.map(doc => doc.data()));
      });
      //return unsubscribe;
  },[setPerson]);


  const renderItem = ({ item }) => {
    const checked = (item.id == selectedId) ? true : false;
    return (
        <TouchableWithoutFeedback onPress={() => selected(item)}>
            <Chat 
                name={item.username} 
                id={item.id} 
                date={item.date}
                plan={1}
                selected={checked}
                message={"Hallo dit is een test hall yes".substring(0,20)}
                photo ={item.photo}/>
          </TouchableWithoutFeedback> 
            );
  };

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

  if (person.length > 0){
    if(view == 1){
      return (
        <View style={styles.container}>
          <HeaderAnimated filterArray={(e) => filterArray(e)} 
            placeholder="Search an user..." text={text} 
            changeView={changeView} actionView={() => {actionSheetRef.current?.setModalVisible();}}/>

            <FlatList
              data={person}
              renderItem={renderItem}
              ItemSeparatorComponent={renderSeparator}
              keyExtractor={item => item.id.toString()}
              extraData={selectedId}/> 

              <Button icon={<Icon name="camera" color={colorWhite} 
                  borderRadius={50} 
                  iconStyle={{fontSize: 40}}/>} 
                  containerStyle={styles.cont_btn_camera} 
                  buttonStyle={styles.btn_style_camera}
                  onPress={() => pickFromCamera()}/>

              <Button icon={<Icon name="chat" color={colorGreenIcon} 
                  borderRadius={50} 
                  iconStyle={{fontSize: 30}}/>} 
                  containerStyle={styles.cont_btn_chat} 
                  buttonStyle={styles.btn_style_chat}
                  onPress={() => navigation.navigate('NewChat')}/>

        <ActionSheet ref={actionSheetRef}>
          <View>
            <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>Create</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
          </View>
        </ActionSheet>        
        </View>
      );
    }else if(view == 2){
      return (
        <View style={styles.container}>
          <HeaderAnimated filterArray={(e) => filterArray(e)} text={text} placeholder="Search user..." changeView={changeView}/>
          <Accordian name="Users" iconname="people" List={
            <FlatList
            data={person}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator}
            style={{height:Dimensions.get("window").height / 2.7}}
            keyExtractor={item => item.id.toString()}
            extraData={selectedId}
            />
        }/>
        <Accordian name="Groeps" iconname="groups" List={
            <FlatList
            data={person}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={item => item.id.toString()}
            extraData={selectedId}
            />
        }/>
          <Button icon={<Icon name="camera" color={colorWhite} borderRadius={50} iconStyle={{fontSize: 40}}  />} 
            containerStyle={styles.cont_btn_camera} 
            buttonStyle={styles.btn_style_camera}
              onPress={() => pickFromCamera()}/>
          <Button icon={<Icon name="chat" color={colorGreenIcon} borderRadius={50} iconStyle={{fontSize: 30}}  />} 
                                        containerStyle={styles.cont_btn_chat} 
                                        buttonStyle={styles.btn_style_chat}
                                        onPress={() => pickFromCamera()}/>
          <ActionSheet ref={actionSheetRef}>
          <View>
            <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>Create new</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>Create</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
          </View>
        </ActionSheet> 
        </View>
      );
    }else if(view == 3){
      return (
        <View style={styles.container}>
          <HeaderAnimated filterArray={(e) => filterArray(e)} placeholder="Search a group..." text={text} changeView={changeView}/>
            <FlatList
              data={person}
              ItemSeparatorComponent={renderSeparator}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              extraData={selectedId}/>
        
            <Button icon={<Icon name="camera" color={colorWhite} borderRadius={50} iconStyle={{fontSize: 40}}  />} 
              containerStyle={styles.cont_btn_camera} 
              buttonStyle={styles.btn_style_camera}
              onPress={() => pickFromCamera()}/>

            <Button icon={<Icon name="chat" color={colorGreenIcon} borderRadius={50} iconStyle={{fontSize: 30}}  />} 
              containerStyle={styles.cont_btn_chat} 
              buttonStyle={styles.btn_style_chat}
              onPress={() => navigation.navigate('NewGroep')}/>
        </View>
      );
    }
  }else{
    return (
    <View style={styles.container}>
        <Button  icon={<Icon name="chat" color={colorWhite} borderRadius={50} iconStyle={{fontSize: 60}}  />} 
          containerStyle={styles.cont_btn_camera_cr} 
          buttonStyle={styles.btn_style_camera_cr}
          onPress={() => navigation.navigate('NewChat')}/>
        <View style={styles.cont_btn_camera_cr}>
          <Text style={{fontSize:18}}>Let's talk...</Text>
        </View>
    </View>);
  }
}

export default GroepsChatListView

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
