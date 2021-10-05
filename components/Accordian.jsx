import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import {StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { colorDarkGreen, colorDarkGrey, colorGreen, colorGreenIcon, colorGrey, colorLightGreen, colorLightGrey, colorOrange, colorRose, colorWhite } from '../constants/Colors'


const Accordian = ({List,name,iconname}) => {
    const [state, setstate] = useState({checked:false})

    function Expanded() {
        setstate({checked:!state.checked});
    }

    return (
        <View style={{marginHorizontal:1, marginVertical:0,
            borderTopColor:colorLightGrey, borderTopWidth:0.8,
            borderRadius:4,padding:1}}>
            <TouchableWithoutFeedback onPress={() => Expanded()}>
                   <LinearGradient colors={[colorWhite,"white"]}>
            
            <View 
                style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",height:50,paddingHorizontal:10,
                marginHorizontal:2, borderBottomWidth:0.5, borderBottomColor:colorGrey}} >
                <Icon name={iconname? iconname : "person"} color={colorGreenIcon}/>
          
                <Text style={{color:colorDarkGrey,flex:2, fontWeight:"600",marginLeft:10, fontSize:16}}>{name}</Text><Icon color={colorGreenIcon} size={34} name={(state.checked) ? "arrow-drop-down" : "arrow-right"}/>
   
            </View>
            </LinearGradient>
            </TouchableWithoutFeedback>
            {
                state.checked&&List
            }
        </View>
    )
}

export default Accordian

const styles = StyleSheet.create({})
