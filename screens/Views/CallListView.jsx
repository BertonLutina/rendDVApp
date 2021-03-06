import React, { useEffect,useState } from 'react';
import { StyleSheet, View, Text, SectionList, Dimensions } from 'react-native';
import * as Contacts from 'expo-contacts';
import {FlatList, ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Contact from '../Contact/Contact';
import Call from '../Call/Call';
import Accordian from '../../components/Accordian.jsx';
import { backGroundColor, colorblue, colorDarkGreen, colorGreen, colorLightblue, colorLightGreen, colorLightGrey, colorLightOrange, colorLightYello, colorOrange, colorRose, colorWhite, colorYello, secundaireColor } from '../../constants/Colors';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import HeaderAnimated from '../HeaderComponent.jsx/HeaderAnimated';

let persons =[];


const CallListView = () => {
  const [person, setPerson] = useState([]);
  const [text, settext] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState(1);

  function filterArray(text){
    let search = text.toLowerCase();
    let array = persons.filter(obj => (obj == undefined) ? "" : obj.name.toLowerCase().includes(search));
    //setPerson(array);
    settext(text);
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
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers,Contacts.Fields.Image,Contacts.Fields.Emails],
          });
          if (data.length > 0) {
              let result = Object.values(data)
          .sort((a,b) => (a.name > b.name) ? 1 : -1)
          .filter( item => item.imageAvailable);
          persons = result;
          //setPerson(result);
          }
        }
      })();
    }, []);

    const renderSeparator = (groep) => {
      return (
        <View
          style={{
            height:0.5,
            marginLeft:"20%",
            backgroundColor:groep,
            width:"86%",
          }}/>
      )
    };

    const renderItem = ({ item }) => {
      const checked = (item.id == selectedId) ? true : false;
        return (<TouchableWithoutFeedback onPress={() => setSelectedId(item.id)}>
                  <Call
                  name={item.name} 
                  id={item.id} 
                  selected={checked}
                  message={"Hallo dit is een test hall yes".substring(0,20)}
                  photo ={item?.imageAvailable&&item?.image?.uri}/>
                </TouchableWithoutFeedback>);
    };

  if(person.length > 0){  
    if(view == 1){
      return (
        <View style={styles.container}>
          <HeaderAnimated filterArray={(e) => filterArray(e)} text={text} changeView={changeView}/>
           <FlatList
            data={person}
            renderItem={renderItem}
            ItemSeparatorComponent={() => renderSeparator(colorLightGreen)}
            keyExtractor={item => item.id.toString()}
            extraData={selectedId}
            /> 
                  <Button icon={<Icon name="phone" color={colorWhite} borderRadius={50} iconStyle={{fontSize: 45,padding:5}}  />} 
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
    }else if(view == 2){
      return (
        <View style={styles.container}>
          <HeaderAnimated filterArray={(e) => filterArray(e)} text={text} changeView={changeView}/>
          <Accordian name="Users" iconname="people" List={
            <FlatList
            data={person}
            renderItem={renderItem}
            ItemSeparatorComponent={() => renderSeparator(colorLightGreen)}
            style={{height:Dimensions.get("window").height / 2.7}}
            keyExtractor={item => item.id.toString()}
            extraData={selectedId}
            />
       }/>
       <Accordian name="Groeps" iconname="groups" List={
            <FlatList
            data={person}
            renderItem={renderItem}
            ItemSeparatorComponent={() => renderSeparator(colorLightblue)}
            keyExtractor={item => item.id.toString()}
            extraData={selectedId}
            />
       }/>
                      <Button icon={<Icon name="phone" color={colorWhite} borderRadius={50} iconStyle={{fontSize: 45,padding:5}}  />} 
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
    }else if(view == 3){
      return (
        <View style={styles.container}>
          <HeaderAnimated filterArray={(e) => filterArray(e)} text={text} changeView={changeView}/>
            <FlatList
            data={person}
            renderItem={renderItem}
            ItemSeparatorComponent={() => renderSeparator(colorLightblue)}
            keyExtractor={item => item.id.toString()}
            extraData={selectedId}
            />
       
            <Button icon={<Icon name="phone" color={colorWhite} borderRadius={50} iconStyle={{fontSize: 45,padding:5}}  />} 
                    containerStyle={{position:'absolute', bottom:100,borderRadius:50,right:20,shadowColor:"black",shadowOffset:{
                              width:0,
                              height:2
                          },
                          shadowRadius:3.5,
                          shadowOpacity:0.2,
                          elevation:11}} 
                          buttonStyle={{padding:2,backgroundColor:secundaireColor}}
                          onPress={() => pickFromCamera()}/>
        </View>
      );
    }
  }else{
      return (
      <View style={styles.container}>
          <Button icon={<Icon name="phone" color={colorWhite} borderRadius={50} iconStyle={{fontSize: 60,padding:5}}  />} 
                          containerStyle={styles.buttonCr} 
                          buttonStyle={{padding:2,backgroundColor:secundaireColor}}
                          onPress={() => pickFromCamera()}/>
          <View style={styles.buttonCr}>
            <Text style={{fontSize:18}}>Let's call...</Text>
          </View>
      </View>);
    }

}

export default CallListView

const styles = StyleSheet.create({
    container:{
        backgroundColor:colorWhite,
        flex:1
    },
    buttonCr:{
      position:"relative",
      flex:1,
      justifyContent:"center",
      alignItems:'center',
      borderRadius:10,
    }
})


