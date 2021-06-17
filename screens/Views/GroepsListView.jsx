import React, { useEffect,useState } from 'react';
import { StyleSheet, View, Platform, Text, Alert, TextInput} from 'react-native';
import * as Contacts from 'expo-contacts';
import {FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Contact from '../Contact/Contact';
import { backGroundColor,colorLightGreen,  colorRose,  colorWhite } from '../../constants/Colors';
import {SearchBar, Icon} from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { useNavigation } from '@react-navigation/core';
import GroepSelection from '../GroepSelection/GroepSelection';

let persons = [];
const GroepsListView = ({navigation}) => {
const [person, setPerson] = useState([]);
const [text, settext] = useState("");
const [selectedId, setSelectedId] = useState(null);
const [list, setList] = useState([]);


function filterArray(text){
  let search = text.toLowerCase();
  let array = persons.filter(obj => (obj == undefined) ? "" : obj.name.toLowerCase().includes(search));
  setPerson(array);
  settext(text);
}

function selectedItems(id, item, index) {
  setSelectedId(id);
  let newArr = [...person];
  if(!list.includes(item)){
  setList(prev => [...prev,item]);
  newArr[index].checked = true; 
  setPerson(newArr);
}


}

function removeItem(id) {
  let remove = list.filter(item => item.id != id);
    setList(remove);
    let newArr = [...person];
    newArr.map((item) => {
      if(item.id == id){
        item.checked = false;
      }
    });
    setPerson(newArr);
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
                let result = Object.values(data)
                            .sort((a,b) => (a.name > b.name) ? 1 : -1)
                            .map((item) => Object.assign(item,{checked:false}));
                persons = result;
                setPerson(result);
            }
          }
        })();
      }, []);


        const renderItem = ({ item,index }) => {
          const checked = (item.id == selectedId) ? true : false;
        
          return (<TouchableWithoutFeedback onPress={() => selectedItems(item.id, item, index)} >
                    <GroepSelection
                        key={item.id}
                        name={item.name}
                        selected={item.checked}
                        photo ={item.imageAvailable&&item.image.uri}/>
                  </TouchableWithoutFeedback>);
          };


        return (
          <View style={styles.container}>
            <View style={{height:40, backgroundColor:colorLightGreen}}></View>
            <View style={{backgroundColor:colorLightGreen, flexDirection:"row", justifyContent:"space-between", padding:10}}>
            <Button icon={<Icon name="arrow-back" />} type="clear" onPress={() => navigation.goBack()}/>
              <TextInput style={{backgroundColor:"white", flex:1, borderRadius:10}}/>
              <Button title="Aanmaken"/>
            </View>
            <View style={{flexDirection:"row", width:"100%",justifyContent:"space-between", alignItems:"center", backgroundColor:colorWhite}}>
            <SearchBar onChangeText={(e) => filterArray(e)} value={text}
              platform={(Platform.OS == "ios") ? "ios" :(Platform.OS == "android") ? "android" : "default"}
              inputContainerStyle={{backgroundColor:colorLightGreen,height:40, borderRadius:10}}
              leftIconContainerStyle={{color:colorWhite}}
              inputStyle={{color:colorWhite}}
              placeholder="Contacts"
              placeholderTextColor="white"
              containerStyle={{backgroundColor:colorWhite, paddingHorizontal:10, flex:1}} />
               </View>
               <View style={{flexDirection:"row", flexWrap:"wrap"}}>
               {
                (list.length > 0) && 
                list.map((item,id) => {
                  return (
                    <TouchableWithoutFeedback key={id}
                      style={{borderWidth:1, marginVertical:2, borderRadius:10, alignItems:"center", backgroundColor:"white",
                              marginLeft:10, padding:0}}>
                      <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center",paddingLeft:10 }}>
                        <View><Text>{item.name}</Text></View>
                        <Button icon={<Icon color={colorRose} name="clear"/>} onPress={() => removeItem(item.id)} />
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })
              }</View>
                  <FlatList
                  data={person}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  extraData={selectedId}
                  />
          </View>
        );
      }

export default GroepsListView

const styles = StyleSheet.create({
    container:{
        backgroundColor:backGroundColor,
        flex:1
    }
})


