import React, { useEffect,useState } from 'react';
import { StyleSheet, View, Platform, Text, Alert, TextInput} from 'react-native';
import * as Contacts from 'expo-contacts';
import {FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Contact from '../Contact/Contact';
import { backGroundColor,buttonPrimaryColor,colorDarkblue,colorGreen,colorGreenIcon,colorLightblue,colorLightGreen,  colorRose,  colorWhite, colorYello } from '../../constants/Colors';
import {SearchBar, Icon} from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import GroepSelection from '../GroepSelection/GroepSelection';
import { useNavigation, useRoute } from '@react-navigation/core';
import { RandomColor } from '../../constants/RandomColor';

let persons = [];
const NewGroepsListView = ({navigation,persony}) => {
let total = 0;
  const [person, setPerson] = useState(persony);
  const [personfilterd, setPersonfilterd] = useState(persony);
  const [text, settext] = useState("");
  const [changeText, setChangeText] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [list, setList] = useState([]);
  const nav = useNavigation();

  function filterArray(text){
    let search = text.toLowerCase();
    let array = person.filter(obj => (obj == undefined) ? "" : obj.name.toLowerCase().includes(search));
    setPersonfilterd(array);
    settext(text);
  }

  function selectedItems(id, item, index) {
    setSelectedId(id);
  
    let newArr = [...person];
    if(!list.includes(item)){
      total++;
      let couleur = RandomColor(total);
      let couleur2 = RandomColor((total+1));
      item['couleur'] = couleur;
      item['couleur2'] = couleur2;
      setList(prev => [...prev,item]);
      newArr[index].checked = true; 
      setPersonfilterd(newArr);
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
      setPersonfilterd(newArr);
  }



  const renderItem = ({ item,index }) => {        
    return (<TouchableWithoutFeedback onPress={() => selectedItems(item.id, item, index)} >
              <GroepSelection
                  key={item.id}
                  name={item.name}
                  selected={item.checked}
                  photo ={item?.imageAvailable&&item?.image?.uri}/>
            </TouchableWithoutFeedback>);
    };


        return (
          <View style={styles.container}>
            <View style={{backgroundColor:colorGreen, flexDirection:"row", justifyContent:"space-between", padding:10}}>
            <Button icon={<Icon name="arrow-back" color={colorWhite}  />} type="clear"  onPress={() => nav.goBack()}/>
              <TextInput style={{backgroundColor:"white", flex:1, borderRadius:10, paddingLeft:10}} placeholder="Give a group's name" value={changeText} 
                onChangeText={(e) => setChangeText(e)} />
              <Button icon={<Icon name="add-circle" color={colorWhite} />} type="clear"  />
            </View>
            <View style={{flexDirection:"row", width:"100%",justifyContent:"space-between", alignItems:"center", backgroundColor:colorWhite}}>
            <SearchBar onChangeText={(e) => filterArray(e)} value={text}
              platform={(Platform.OS == "ios") ? "ios" :(Platform.OS == "android") ? "android" : "default"}
              inputContainerStyle={{backgroundColor:colorGreen,height:40, borderRadius:10}}
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
                  data={personfilterd}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  extraData={selectedId}
                  />
                  <Button icon={<Icon name="chevron-right" color={colorWhite} 
                  borderRadius={50} 
                  iconStyle={{fontSize: 40}}/>} 
                  containerStyle={styles.cont_btn_chat} 
                  buttonStyle={styles.btn_style_chat}
                  onPress={() => nav.navigate('NewGroePSum',{
                    id:1,
                    name: changeText,
                    group:list
                  })}/>
          </View>
        );
      }

export default NewGroepsListView

const styles = StyleSheet.create({
    container:{
        backgroundColor:backGroundColor,
        flex:1
    }, cont_btn_chat:{
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
    btn_style_chat:{
      padding:7,
      backgroundColor:colorYello, 
    }
})


