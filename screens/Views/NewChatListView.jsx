import React, { useState,memo, useCallback,useLayoutEffect } from 'react';
import { StyleSheet, View, Platform, Text, TextInput} from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { backGroundColor,colorGreen,  colorWhite } from '../../constants/Colors';
import {SearchBar, Icon} from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import ChatSelection from '../GroepSelection/ChatSelection';
import { createChatter } from '../../components/CRUD/crud';
import { useNavigation, useRoute } from '@react-navigation/core';
import {  useFirestore } from 'react-redux-firebase';
import { _firebase } from '../../auth/firebase';

const NewChatListView = ({navigation,persony}) => {
    let fireStore = useFirestore();
    const [person, setPerson] = useState(persony);
    const [personfilterd, setPersonfilterd] = useState(persony);
    const [text, settext] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [currentUSer, setCurrentUSer] = useState("");
    const nav = useNavigation();
    let rout = useRoute();

    useLayoutEffect(() => {
      nav.setOptions({
          headerTitle: () =>(
            <SearchBar onChangeText={(e) => filterArray(e)} value={text}
              platform={(Platform.OS == "ios") ? "ios" : (Platform.OS == "android") ? "android" : "default"}
              inputContainerStyle={{backgroundColor:colorGreen,height:40, borderRadius:10}}
              leftIconContainerStyle={{color:colorWhite}}
              inputStyle={{color:colorWhite}}
              placeholder="Search in your contacts"
              placeholderTextColor="white"
              containerStyle={{backgroundColor:colorWhite, paddingHorizontal:10, flex:1}} />
            ),
          headerLeft:() => (
            <Button icon={<Icon name="arrow-back" color={colorGreen}  />} type="clear"  onPress={() => nav.goBack()}/> 
          ),
          headerStyle: {
              backgroundColor: colorWhite,
            },
      });
    }, [nav, person,text]);

    function filterArray(text){
    let search = text.toLowerCase();
    let array = person.filter(obj => (obj == undefined) ? "" : obj.name.toLowerCase().includes(search));
    setPersonfilterd(array);
    settext(text);
    }

    function selectedItems(id) {
    setSelectedId(id);
    }

    const createChat = useCallback((user) => {
      user["plan"] = 1;
      user["photo"] = (user.imageAvailable ? user.image.uri : "")
      user.firstName = (user.firstName ? user.firstName : "");
      user.firstName = (user.firstName ? user.firstName : "");
      let chat = user;
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


