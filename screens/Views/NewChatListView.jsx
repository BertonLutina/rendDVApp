import React, { useEffect,useState,memo, useCallback } from 'react';
import { StyleSheet, View, Platform, Text, Alert, TextInput, ActivityIndicator} from 'react-native';
import * as Contacts from 'expo-contacts';
import { FlatList,TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { backGroundColor,colorGreen,colorLightGreen,  colorRose,  colorWhite } from '../../constants/Colors';
import {SearchBar, Icon} from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import ChatSelection from '../GroepSelection/ChatSelection';
import { createChatter } from '../../components/CRUD/crud';
import {DateTime} from 'luxon';
import { useNavigation, useRoute } from '@react-navigation/core';

const NewChatListView = ({navigation,persony}) => {

    const [person, setPerson] = useState(persony);
    const [personfilterd, setPersonfilterd] = useState(persony);
    const [text, settext] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const nav = useNavigation();
    let rout = useRoute()

    function filterArray(text){
    let search = text.toLowerCase();
    let array = person.filter(obj => (obj == undefined) ? "" : obj.name.toLowerCase().includes(search));
    setPersonfilterd(array);
    settext(text);
    }

    function selectedItems(id) {
    setSelectedId(id);
    }

    /* useEffect(() => {
      let unmouted = false;
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.PhoneNumbers,Contacts.Fields.Image,Contacts.Fields.Emails],
            });
            if (data.length > 0) {
                let result = Object.values(data).sort((a,b) => (a.name > b.name) ? 1 : -1);
                if(!unmouted){
                setPerson(result);
                setPersonfilterd(result);
              }        
            }
          }
          return () => {
            unmouted = true;
          }
        })();
      }, [setPerson]); */

      const createChat = useCallback((user) => {
        let chat = {
        username:user.name,
        firstName:(user.firstName ? user.firstName : ""),
        lastName:(user.lastName ? user.lastName : ""), 
        contactType : "person",
        id: user.id, 
        plan:1,
        message: {}, 
        photo: (user.imageAvailable ? user.image.uri : "")};
        createChatter(chat,nav);
      },[]);

    const renderItem = useCallback(({item}) => {
    const checked = (item.id == selectedId) ? true : false;
        return (<TouchableWithoutFeedback onPress={() => createChat(item)} >
                <ChatSelection
                    key={item.id}
                    name={item.name}
                    selected={checked}
                    photo ={item?.imageAvailable&&item?.image?.uri}/>
                </TouchableWithoutFeedback>);
        },[createChat]);

        return (
          <View style={styles.container}>
            <View style={{flexDirection:"row", width:"100%",justifyContent:"space-between", alignItems:"center", backgroundColor:colorWhite}}>
            <Button icon={<Icon name="arrow-back" color={colorGreen}  />} type="clear" onPress={() => nav.goBack()}/>
            <SearchBar onChangeText={(e) => filterArray(e)} value={text}
              platform={(Platform.OS == "ios") ? "ios" :(Platform.OS == "android") ? "android" : "default"}
              inputContainerStyle={{backgroundColor:colorGreen,height:40, borderRadius:10}}
              leftIconContainerStyle={{color:colorWhite}}
              inputStyle={{color:colorWhite}}
              placeholder="Search in your contacts"
              placeholderTextColor="white"
              containerStyle={{backgroundColor:colorWhite, paddingHorizontal:10, flex:1}} />
               </View>
               { (personfilterd.length > 0) ? <FlatList
                  data={personfilterd}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  extraData={selectedId}
                  initialNumToRender={5}

                  /> : <View style={{
                    flex: 1,
                    justifyContent: "center",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    padding: 10
                  }}><Text>jooooe</Text></View>}
                  
          </View>
        );
      }

export default memo(NewChatListView)

const styles = StyleSheet.create({
    container:{
        backgroundColor:backGroundColor,
        flex:1
    }
})


