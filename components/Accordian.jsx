import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import {StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { colorDarkGreen, colorDarkGrey, colorGreen, colorGrey, colorLightGreen, colorLightGrey, colorOrange, colorRose, colorWhite } from '../constants/Colors'


const Accordian = ({List,name}) => {
    const [state, setstate] = useState({checked:false})

    function Update() {
        setstate({checked:!state.checked});
    }

    return (
        <View style={{marginHorizontal:1, marginVertical:0,
            borderBottomColor:colorLightGrey, borderBottomWidth:0,
            borderRadius:4,padding:1}}>
                   <LinearGradient colors={[colorWhite,"white"]} >
            <TouchableWithoutFeedback 
                style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",height:50,paddingHorizontal:10,
                marginHorizontal:2}} onPress={() => Update() }>
          
                <Text style={{color:colorDarkGrey, fontWeight:"600", fontSize:16}}>{name}</Text><Icon color={colorGreen} size={34} name={(state.checked) ? "arrow-drop-down" : "arrow-right"}/>
   
            </TouchableWithoutFeedback>
            </LinearGradient>
            {
                state.checked&&List
            }
        </View>
    )
}

export default Accordian

const styles = StyleSheet.create({})
