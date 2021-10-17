import React,{ useState,useLayoutEffect } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View,Modal, Pressable, TextInput } from 'react-native'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {getUseDate } from '../../constants/date';
import {Picker} from '@react-native-picker/picker';
import { getCurrentDateReverse } from '../../constants/constantFunction';
import { backGroundColor, colorblue, colorDarkblue, colorDarkGreen, colorDarkGrey, colorDarkOrange, colorDarkRose, colorDarkYello, colorGreen, colorGrey, colorLightblue, colorLightGreen, colorLightGrey, colorLightOrange, colorLightRose, colorLightYello, colorOrange, colorRose, colorWhite, colorYello } from '../../constants/Colors';
import { Button, Input, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/core';


const EventCreater = ({navigation,route}) => {
    useLayoutEffect(() => {
        nav.setOptions({
          title: person.name === '' ? 'No title' : person.name,
          headerBackTitleVisible:false,
          headerLeft: () => (
            <Button type="clear" 
            icon={<Icon name="arrow-left" 
                    style={{fontSize:20, padding:5}} 
                    onPress={() => navigation.navigate("Tabs",{screen: "Event" })}/>} />  
            ),
          headerTitle: () =>(
            <View style={{flexDirection:"row", backgroundColor:colorWhite, alignItems:"center"}}>
                <Text style={{fontSize:20}}>{person.name}</Text>
            </View>
          ),
        });
      }, [nav, person]);

    const person = route.params;
    const [kleurkeuze, setKleurKeuze] = useState(colorLightGreen);
    const [selectmarked, setSelectMarked] = useState("marked");
    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState();
    const nav = useNavigation();


    

function ShowModal(item) {
    setItem(item);
    setModalVisible(true);
    }

function MarkerType(type) {
    setSelectMarked(type);
}

function SelectionColor() {
    let light = [colorLightGreen,colorLightYello,colorLightblue, colorLightRose, colorLightOrange, colorLightGrey];
    let normal = [colorGreen,colorYello,colorblue, colorRose, colorOrange, colorGrey];
    let dark = [colorDarkGreen,colorDarkYello,colorDarkblue, colorDarkRose, colorDarkOrange, colorDarkGrey];

    let colors = [...light, ...normal, ...dark];
    let arr = [];

    colors.map((e) => {
         arr.push(
            <View style={{padding:1}}>
                <Button buttonStyle={{backgroundColor:e, borderRadius:20,padding:18, margin:5}} onPress={() => setKleurKeuze(e)}/>
            </View>
        )
    })
    
    return arr;

}
   


    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
            <View style={{borderRadius:10,margin:1, backgroundColor:colorWhite}}>
                <View style={{borderBottomWidth:1, borderBottomColor:colorLightGrey}}>
                    <Text style={{margin:10, textAlign:"center", fontSize:16}}>{item}</Text>
                </View>
           
                <Input placeholder="08:00" keyboardType="numbers" style={{backgroundColor:colorWhite,height:40,fontSize:16, borderRadius:1}}/>
                <Input placeholder="08:00" keyboardType="numbers" style={{backgroundColor:colorWhite,height:40,fontSize:16, borderRadius:1}}/>

                
                <View style={{borderTopWidth:1, borderTopColor:colorLightGrey}}>
                    <View style={{height: 130}} >
                        <ScrollView scrollEnabled={true} horizontal  style={{flexDirection:"row", height:100}}>
                            <SelectionColor/>
                        </ScrollView>
                        <View style={{flexDirection:"row", alignItems:"center",backgroundColor:colorWhite}}>
                            <View style={{backgroundColor:kleurkeuze, borderRadius:25,padding:1, 
                                marginLeft:10, height:30, width:30}}></View>
                            <Input placeholder="Eventname" inputContainerStyle={{borderRadius:10, 
                                marginTop:15,height:40,paddingLeft:10, width:"85%"}}/>
                        </View>   
                    </View>
                 </View>
                 <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
            </View>
            </View>
        </Modal>
            
            <Calendar
                // Enable horizontal scrolling, default = false
                horizontal={true}
                // Enable paging on horizontal, default = false
                pagingEnabled={true}
                style={{
                    margin:10,
                    borderRadius:10
                  }}
                minDate={getCurrentDateReverse}
                // Set custom calendarWidth.
                calendarWidth={320}
                markingType={'multi-period'}
                onDayPress={(day) => ShowModal(getUseDate(day.timestamp,"dd/mm/yyyy"))}
                // Callback that gets called when day changes while scrolling agenda list
                onDayChange={(day) => {console.log('day changed')}}
                markedDates={{
                    '2021-10-15': {marked: true, dotColor: '#50cebb'},
                    '2021-10-16': {marked: true, dotColor: '#50cebb'},
                    '2021-10-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
                    '2021-10-22': {color: '#70d7c7', textColor: 'white'},
                    '2021-10-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
                    '2021-10-24': {color: '#70d7c7', textColor: 'white'},
                    '2021-10-25': {endingDay: true, color: '#50cebb', textColor: 'white'},
                    '2021-10-14': {
                      periods: [
                        {startingDay: false, endingDay: true, color: '#5f9ea0'},
                        {startingDay: false, endingDay: true, color: '#ffa500'},
                        {startingDay: true, endingDay: false, color: '#f0e68c'}
                      ]
                    },
                    '2021-10-15': {
                      periods: [
                        {startingDay: true, endingDay: false, color: '#ffa500'},
                        {color: 'transparent'},
                        {startingDay: false, endingDay: false, color: '#f0e68c'}
                      ]
                    }}}
                />

        </View>
    )
}

export default EventCreater

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:backGroundColor},
        centeredView: {
            flex:1,
            flexDirection:"row",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
            position:"relative",
            padding:0,
            width:"100%"
          },
        modalView: {
            margin: 2,
            height:700,
            width:"90%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 70
          },
          button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2
          },
          buttonOpen: {
            backgroundColor: "#F194FF",
          },
          buttonClose: {
            backgroundColor: "#2196F3",
          },
          textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          },
          modalText: {
            marginBottom: 15,
            textAlign: "center"
          }})
