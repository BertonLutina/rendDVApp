import React, {useState} from 'react';
import {View,  Platform, Alert, TextInput, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Icon, Input } from 'react-native-elements';
import { colorblue, colorGreen, colorGrey, colorLightGrey, colorWhite } from '../constants/Colors';

export const Datepicker = ({datum,setDate, modus,tonen,kleurIcon,kleurBack   }) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate.toString());
    Alert.alert(currentDate.toString());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
        <View style={{flexDirection:"column", flexWrap:"wrap"}}>
            <View style={{ justifyContent:"center", alignItems:"center",  flexDirection:"row", width:"90%", marginLeft:10}}>
               <Input inputContainerStyle={{backgroundColor:kleurIcon,borderRadius:20, borderBottomWidth:0, margin:0}}
                containerStyle={{padding:0,width:"90%", margin:0}}
                value={date} onChangeText={setDate}  
                rightIcon={<Icon name="today" onPress={showDatepicker} iconStyle={{color:kleurIcon}}/>} 
                                rightIconContainerStyle={{backgroundColor:kleurBack, padding:5
                                ,borderRadius:30, marginRight:5}}/> 
            </View>
            <View style={{ justifyContent:"center", alignItems:"center", flexDirection:"row", width:"90%", marginLeft:10}}>
               <Input inputContainerStyle={{backgroundColor:colorWhite,borderRadius:20, borderBottomWidth:0, margin:0}}
                containerStyle={{padding:0,width:"90%", margin:0}}
                value={date} onChangeText={(e) => setDate(e)}  
                rightIcon={<Icon name="today" onPress={showDatepicker} 
                                iconStyle={{color:colorWhite}}/>} 
                                rightIconContainerStyle={{backgroundColor:colorblue, padding:5,borderRadius:30, marginRight:5}}/> 
            </View>
            
        </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          minimumDate={new Date()}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};