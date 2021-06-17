import React, { useEffect,useState } from 'react';
import { StyleSheet, View, Platform} from 'react-native';
import * as Contacts from 'expo-contacts';
import {FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Contact from '../Contact/Contact';
import { backGroundColor,colorGreen,colorLightGreen,  colorWhite } from '../../constants/Colors';
import {SearchBar, Icon} from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { useNavigation } from '@react-navigation/core';

let persons = [];
const ContactListview = () => {
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

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.Image],
            });
            if (data.length > 0) {
              let expandedGroup = [];
              let datas = data.reduce((r, e, i) => {
                let group = e.name[0];
                if(!r[group]){
                    r[group] = {id: i, group, data: [e]}
                }
                else {r[group].data.push(e);}
               
                return r;
                }, {});
                let result = Object.values(data).sort((a,b) => (a.name > b.name) ? 1 : -1);
                persons = result;
                  setPerson(result);
            }
          }
        })();
      }, []);


        const renderItem = ({ item }) => {
          const checked = (item.id == selectedId) ? true : false;
        
          return (<TouchableWithoutFeedback onPress={() => setSelectedId(item.id)} >
                    <Contact
                        key={item.id}
                        name={item.name}
                        selected={checked}
                        photo ={item.imageAvailable&&item.image.uri}/>
                  </TouchableWithoutFeedback>);
          };

        return (
          <View style={styles.container}>
            <View style={{flexDirection:"row", width:"100%",justifyContent:"space-between", alignItems:"center", backgroundColor:colorWhite}}>
            <Button icon={<Icon name="arrow-back" />} type="clear" onPress={() => navigation.goBack()}/>
            <SearchBar onChangeText={(e) => filterArray(e)} value={text}
              platform={(Platform.OS == "ios") ? "ios" :(Platform.OS == "android") ? "android" : "default"}
              inputContainerStyle={{backgroundColor:colorGreen,height:40, borderRadius:10}}
              leftIconContainerStyle={{color:colorWhite}}
              inputStyle={{color:colorWhite}}
              placeholder="Contacts"
              placeholderTextColor="white"
              containerStyle={{backgroundColor:colorWhite, paddingHorizontal:10, flex:1}} />
               </View>
                  <FlatList
                  data={person}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  extraData={selectedId}
                  />
          </View>
        );
      }

export default ContactListview

const styles = StyleSheet.create({
    container:{
        backgroundColor:backGroundColor,
        flex:1
    }
})


