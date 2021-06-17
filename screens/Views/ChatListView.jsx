import React, { useState,useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import * as Contacts from 'expo-contacts';
import Chat from '../Chat/Chat.jsx';
import {TouchableHighlight } from 'react-native-gesture-handler';
import { backGroundColor, colorGreen, colorLightGreen, colorWhite } from '../../constants/Colors';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { launchCameraAsync, MediaTypeOptions } from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { SearchBar } from 'react-native-elements';
import HeaderAnimated from '../HeaderComponent.jsx/HeaderAnimated.jsx';
import { useNavigation } from '@react-navigation/native';

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



const ChatListView = () => {
const [person, setPerson] = useState([]);
const [text, settext] = useState("");
const [selectedId, setSelectedId] = useState(null);
const navigation = useNavigation();

function filterArray(text){
  let search = text.toLowerCase();
  let array = persons.filter(obj => (obj == undefined) ? "" : obj.name.toLowerCase().includes(search));
  setPerson(array);
  settext(text);
}

function selected(item) {
  setSelectedId(item.id);
  navigation.navigate("ChatView",{
    person: item
  });
}

useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Image],
        });
        if (data.length > 0) {
            let result = Object.values(data)
        .sort((a,b) => (a.name > b.name) ? 1 : -1)
        .filter( item => item.imageAvailable);
        persons = result;
                  setPerson(result);
              setPerson(result);
        }
      }
    })();
  }, []);

    const renderItem = ({ item }) => {
      const checked = (item.id == selectedId) ? true : false;
      return (<TouchableWithoutFeedback  onPress={() => selected(item)}>
                <Chat 
                    name={item.name} 
                    id={item.id} 
                    date={item.registered}
                    selected={checked}
                    message={"Hallo dit is een test hall yes".substring(0,20)}
                    photo ={item.imageAvailable&&item.image.uri}/>
              </TouchableWithoutFeedback>);
      };
      return (
        <View style={styles.container}>
          <HeaderAnimated filterArray={(e) => filterArray(e)} text={text}/>
                  <FlatList
                          data={person}
                          renderItem={renderItem}
                          keyExtractor={item => item.id}
                          extraData={selectedId}
                          />
                      <Button icon={<Icon name="camera" color={colorWhite} borderRadius={50} iconStyle={{fontSize: 50}}  />} 
                          containerStyle={{position:'absolute', bottom:100,borderRadius:50,  right:20,shadowColor:"black",shadowOffset:{
                              width:0,
                              height:2
                          },
                          shadowRadius:3.5,
                          shadowOpacity:0.2,
                          elevation:11}} 
                          buttonStyle={{padding:2,backgroundColor:colorGreen}}
                          onPress={() => pickFromCamera()}/>
                
        </View>
      );
    }

export default ChatListView

const styles = StyleSheet.create({
    main:{
        flex:1
    },
    container:{
        backgroundColor:colorWhite,
        flex:1
    }
})
