import React,{ useState,useLayoutEffect } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View, TextInput, Keyboard } from 'react-native'
import {getUseDayString, useDay } from '../../constants/date';
import {Picker} from '@react-native-picker/picker';
import { getCurrentDateReverse } from '../../constants/constantFunction';
import { backGroundColor, colorblue, colorDarkblue, colorDarkGreen, 
        colorDarkGrey, colorDarkOrange, colorDarkRose, colorDarkYello, 
        secundaireColor, colorGrey, colorLightblue, colorLightGreen, 
        colorLightGrey, colorLightOrange, colorLightRose, colorLightYello, 
        colorOrange, colorRose, primairColor, colorYello, disabledColor, 
        disabledDarkColor, colorWhite, colorGreenIcon, tertaireColor } from '../../constants/Colors';
import { Button, CheckBox, Icon} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import {Calendar} from 'react-native-calendars';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createEvent } from '../../components/CRUD/crud';


const EventCreaterGroup = ({navigation,route}) => {
    const group = route.params;
    useLayoutEffect(() => {
        nav.setOptions({
          title: group.name === '' ? 'No title' : group.name,
          headerBackTitleVisible:false,
          headerStyle: {
            backgroundColor: tertaireColor, //Set Header color
          },
          headerLeft: () => (
            <Button type="clear" 
            icon={<Icon name="arrow-back" 
                    style={{fontSize:20, padding:5}}  color={primairColor}
                    onPress={() => navigation.navigate("Tabs",{screen: "Event" })}/>} />  
            ),
          headerTitle: () =>(
            <View style={{flexDirection:"row",  alignItems:"center"}}>
                <Text style={{fontSize:17, color:primairColor}}>{group.name}</Text>
            </View>
          ),
          headerRight:() => (
            <View style={{flex:1, flexDirection:"row", alignItems:"center",paddingRight:10}}>
                <Text style={{ fontSize:15, color:"white"}}> {group.members.length} </Text>
                <Icon name="group" color="white"/>
            </View>
              )
        });
      }, [nav, group]);

      //name, id, date, photo, plan, seen, members

    
    const timeExp = new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$");
    const [kleurkeuze, setKleurKeuze] = useState(colorLightGreen);
    const [text, setText] = useState("")
    const [selectmarked, setSelectMarked] = useState(colorRose);
    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState();
    const [vanUur, setVanuur] = useState("08:00");
    const [totUur, setTotuur] = useState("18:00");
    const [dates, setDates] = useState({});
    const [showCalender, setshowCalender] = useState(true);
    const [view, setView] = useState(2);
    const [uurVan, setUurVan] = useState()
    
    const [disabled, setdisabled] = useState(true);
    const nav = useNavigation();
   

    function getValuePick(color) {
      let val = "";
      switch (color) {
        case colorRose: val = "Activiteiten"
          break;
        case colorblue: val = "Afspraak"
          break;
        case colorOrange: val = "Etentje"
          break;
        case colorYello: val = "Etentje met vrienden"
          break;
        case secundaireColor: val = "Uitstap"
          break;
        case colorGrey: val = "Uitstap met familie"
          break;
        case colorLightOrange: val = "Werken"
          break;
        case colorDarkRose: val = "Studeren"
          break;
        case colorDarkblue: val = "Concert"
          break;
        case colorLightYello: val = "Teambuildig"
          break;
        case colorLightGreen: val = "Avondtuur"
          break;
        default: val = "nada"
          break;
      }
      return val; 
    }

    function changeChecked(date) {
      let newDate = dates;
      newDate[date].checked = !newDate[date].checked;
      let combineDate = {...newDate, ...dates}
      setDates(combineDate); 
    }

    function changeView(date){
      let newDate = dates;
      newDate[date].view = !newDate[date].view;
      let combineDate = {...newDate, ...dates};
      setVanuur(newDate[date].uurvan);
      setTotuur(newDate[date].uurtot);
      setshowCalender(false);
      setDates(combineDate); 
    }

    function changeHours(date) {
      let newDate = dates;
      newDate[date].uurvan = vanUur;
      newDate[date].uurtot = totUur;
      newDate[date].view = !newDate[date].view;
      let combineDate = {...newDate, ...dates};
      setshowCalender(true);
      setVanuur("08:00");
      setTotuur("18:00");
      setDates(combineDate);
    }

    function addEvents(){
      if(dates && Object.keys(dates).length === 0 && Object.getPrototypeOf(dates) === Object.prototype){
          Alert.alert("Error","No data found, Choose a date");
      }else{
        createEvent(group.id,group.name,dates, navigation);
      }
    }

    function ChangeText(e) {
        if(e.length > 0){
          setdisabled(false);
        }else{
          setdisabled(true);
        }
        setText(e);
    }
      
    function addDates(dateString,obj) {
      if(text.length > 0){
        let newDate = {};
        newDate[dateString] = {id:group.id, contactname: group.name ,selected: true, selectedColor: selectmarked,title:text,
                              activity:getValuePick(selectmarked),color: selectmarked,
                              uurvan:"08:00", uurtot:"18:00",view:false,
                              checked:false, name:text, textColor:"white", ...obj};
        let combineDate = {...newDate, ...dates};
        setDates(combineDate); 
      }else{
        Alert.alert("Error","Fill the title field!");
      }
    }

    return (
        <View style={styles.container}>   
            <View style={{
                    borderRadius:8,
                    marginHorizontal:10,
                    marginVertical:5,
                  }}>
                {
                  disabled ? 
                  (<View style={{ flexDirection:"row", alignItems:"center",margin:2}}>
                    <TextInput onChangeText={(e) => setText(e)}
                      placeholder="Title" 
                      style={{borderWidth:0.5,flex:2,borderColor:disabledColor,fontSize:16, 
                      borderRadius:10, padding:10, margin:2,
                      color:colorDarkGreen,
                      backgroundColor:colorWhite}}
                      value={text}/>  
                    <Button buttonStyle={{borderRadius:50,marginLeft:5, backgroundColor:tertaireColor}} onPress={()=> setdisabled(!disabled)} icon={<Icon name="add" size={14} 
                          style={{paddingHorizontal:2,paddingVertical:2}} iconStyle={{fontSize: 20}}  color={primairColor}/>}/>
                  </View>) : (
                  <View style={{ flexDirection:"row", alignItems:"center", margin:2}}>
                    <Text onLongPress={()=> setdisabled(!disabled)}
                      style={{flex:2,fontSize:16, 
                      borderRadius:10, padding:10, margin:2,
                      color:colorDarkGreen,
                      backgroundColor:colorLightGrey}}
                      >{text}</Text></View>)
                }         
                  <View style={{flexDirection:"row", 
                          justifyContent:"space-between", 
                          borderWidth:1, backgroundColor:primairColor, 
                          borderColor:colorGrey,
                          borderRadius:10, margin:2, 
                          alignItems:"center", paddingHorizontal:5}}>
                  
                    <Picker
                      onValueChange={(itemValue, itemIndex) => setSelectMarked(itemValue)}
                      selectedValue={selectmarked}
                      style={{
                        borderRadius:10,
                        width:"90%"
                      }}
                      dropdownIconColor={secundaireColor}
                      >
                      <Picker.Item label="Activiteiten"  value={colorRose} /> 
                      <Picker.Item label="Afspraak"  value={colorblue} />
                      <Picker.Item label="Etentje" value={colorOrange} />
                      <Picker.Item label="Etentje met vrienden" value={colorYello} />
                      <Picker.Item label="Uitstap" value={secundaireColor} />
                      <Picker.Item label="Uitstap met familie" value={colorGrey} />
                      <Picker.Item label="Werken" value={colorLightOrange} />
                      <Picker.Item label="Studeren" value={colorDarkRose} />
                      <Picker.Item label="Concert" value={colorDarkblue} />
                      <Picker.Item label="Teambuildig" value={colorLightYello} />
                      <Picker.Item label="Avondtuur" value={colorLightGreen} />
                    </Picker>
                    <View style={{backgroundColor:selectmarked, 
                                  height:30,width:30, 
                                  borderRadius:10, borderWidth:4, 
                                  borderColor:colorLightGrey}}></View>
                  </View>
                  {(showCalender) &&
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                      <Calendar
                        style={{
                          borderRadius:8,
                          borderWidth:1,
                          borderColor:colorLightGrey,
                          margin:2,
                          height: 320
                        }}
                          minDate={getCurrentDateReverse}
                          onDayPress={(day) => addDates(day.dateString, day)}
                          onDayLongPress={(day) => {console.log('selected day', day)}}
                          firstDay={1}
                          selected={'2021-10-26'}
                          markedDates={dates}
                          disabledByDefault={disabled}
                          disableAllTouchEventsForDisabledDays={disabled}
                      />
                    </>
                  </TouchableWithoutFeedback>
                  }
            </View>
            <View style={{
                    borderRadius:8,
                    marginHorizontal:10,
                    marginVertical:0,
                    backgroundColor:primairColor, maxHeight:320
                  }}>
                  <ScrollView contentContainerStyle={{borderRadius:8,padding:0}} sty>
                    {Object.entries(dates).map(([date,data],key) => {
                      return(
                      <TouchableWithoutFeedback key={key} onLongPress={() => Alert.alert(date)}
                          style={{margin:1, 
                                  flexDirection:"row",
                                  justifyContent:"space-between",
                                  borderLeftColor:data.color,
                                  borderRightColor:data.color,borderRightWidth:4,
                                  borderBottomWidth:0.5,borderBottomColor:colorGrey,
                                  borderTopWidth:0.5,borderTopColor:colorGrey,
                                  borderRadius:8, borderLeftWidth:10, padding:5}}>
                        <View style={{flex:1}}>
                          <Text style={{fontSize:22}}>{data.day}</Text>
                          <Text style={{fontSize:10,color:disabledDarkColor, fontStyle:"italic"}}>{data.month}/{data.year} - {getUseDayString("l",useDay(data.timestamp))}</Text>
                        </View>
                          {
                            (data.view == true)? (
                              <View style={{flexDirection:"column",flex:2, justifyContent:"center", height:140, padding:5}}>
                                  <TextInput style={{borderWidth:1, borderColor: colorGrey,  
                                    fontSize:15, borderRadius:5 ,padding: 5}} 
                                        keyboardType="phone-pad" maxLength={5} 
                                        placeholder={"08:00"} value={vanUur} 
                                        onChangeText={(e) => setVanuur(e)} />
                                  <TextInput style={{borderWidth:1,  borderColor: colorGrey, fontSize:15, marginTop: 10 ,borderRadius:5, padding: 5}}
                                   keyboardType="phone-pad" maxLength={5} placeholder={"18:00"} value={totUur} onChangeText={(e) => setTotuur(e)} />
                                  <Button title="Save" buttonStyle={{height:30, width:60 , marginTop: 10}} onPress={() => changeHours(date)}/>
                              </View>
                            ) : ( 
                            <TouchableOpacity style={{alignItems:"center", justifyContent:"center"}} onPress={() => changeView(date)}>
                                  <Text>{data.uurvan} - {data.uurtot}</Text>
                            </TouchableOpacity>) 
                        }
                        <View style={{flex:1}}>
                        <CheckBox
                          checkedColor={secundaireColor}
                            right
                            checked={data.checked}
                            onPress={() => changeChecked(date)}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            size={20}
                            containerStyle={{padding:0}}
                          />
                          <Text style={{fontSize:10, textAlign:"right", fontStyle:"italic"}}>{getValuePick(data.color)}</Text>
                        </View>
                      </TouchableWithoutFeedback>)
                        })}
                    
                      </ScrollView>
                      
              </View>
                 {
                   (dates && Object.keys(dates).length > 0 && Object.getPrototypeOf(dates) === Object.prototype)&&
                   <Button  icon={<Icon name="chevron-right" color={colorWhite} borderRadius={50} iconStyle={{fontSize: 40}}  />} 
                            containerStyle={{ position:'absolute', 
                            bottom:50,
                            borderRadius:50, 
                            right:20,
                            shadowColor:"black",
                            shadowOffset:{
                              width:0,
                              height:2
                            },
                            shadowRadius:3.5,
                            shadowOpacity:0.2,
                            elevation:11}} 
                            buttonStyle={{
                              padding:8,
                              backgroundColor:colorGreenIcon,
                            }} onPress={addEvents}
                            />
                 } 
        </View>
    )
}

export default EventCreaterGroup

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
            margin: 1,
            height:700,
            width:"95%",
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
            borderRadius: 4,
            padding: 10,
            elevation: 2
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
