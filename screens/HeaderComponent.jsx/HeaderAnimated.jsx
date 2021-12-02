import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, View,Text, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon, Button} from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { SearchBar } from 'react-native-elements';
import { colorDarkGreen, colorDarkGrey, primairColor, colorGrey, colorLightGreen, colorLightGrey, secundaireColor } from '../../constants/Colors';



const HeaderAnimated = ({text,filterArray,changeView, actionView, placeholder}) => {
    const navigation = useNavigation();

   
    return (
        <View style={styles.container}>
            <View style={{ width:"100%", display:'flex', backgroundColor:secundaireColor,
             flex:1, paddingLeft:10, flexDirection:'row',
            alignItems:"center",}}>
            <SearchBar onChangeText={filterArray} value={text}
              platform={(Platform.OS == "ios") ? "ios" :(Platform.OS == "android") ? "android" : "default"}
              inputContainerStyle={{backgroundColor:primairColor,height:40, borderRadius:10}}
              leftIconContainerStyle={{color:secundaireColor}}
              inputStyle={{color:secundaireColor,fontSize:16}}
              placeholder={placeholder ? placeholder : "Search"}
              placeholderTextColor={colorDarkGrey}
              containerStyle={{backgroundColor:"transparent", width:"70%"}}/>
              <Button icon={<Icon name="sensor-window" color={primairColor} iconStyle={{fontSize: 26}} />} onPress={changeView}  type="clear"/>
                {/* <Button icon={<Icon name="today" color="white" iconStyle={{fontSize: 26}} />}  type="clear"/> */}
                <Button icon={<Icon name="contacts" color={primairColor} iconStyle={{fontSize: 26}}/>} type="clear" onPress={() => navigation.navigate('Contacts')}/>
                <Button icon={<Icon name="more-vert" color={primairColor} iconStyle={{fontSize: 26}}/>} type="clear" onPress={actionView}/>
            </View>
    </View>
    )
}

export default HeaderAnimated

const styles = StyleSheet.create({
    container:{
        height:60,
        marginVertical:0,
        backgroundColor:primairColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
            }
})
