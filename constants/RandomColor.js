import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from 'react';
import { Text, View } from "react-native";
import { colorblue, colorDarkblue, colorDarkGreen, colorDarkOrange, colorDarkYello, colorGreen, colorOrange, colorRose, colorWhite, colorYello } from "./Colors";

export function RandomColor(num) {
    let color = "";
    let ran = Math.floor(Math.random() * 10) + 1;
    switch (ran) {
        case 1: color = colorblue;
            break;
        case 2: color = colorYello;
            break;
        case 3: color = colorOrange;
            break;
        case 4: color = colorRose;
            break;
        case 5: color = colorGreen;
            break;
        case 6: color = colorDarkGreen;
            break;
        case 7: color = colorDarkYello;
            break;
        case 8: color = colorDarkblue;
            break;
        case 9: color = colorDarkOrange;
            break;
        case 10: color = colorRose;
            break;
        default:
            break;
    }

    return color;
}

export const RandomColors = ({color,color2,h,w,c,name, id}) => {
    console.log(id);
    return (
        <View key={id} style={{height:h,width:w, borderRadius:c,display: 'flex', justifyContent: 'center', 
                padding:0,shadowColor:"black",margin:5,
                shadowOffset:{
                width:0,
                height:2
                    }, elevation:11}}>
                    <LinearGradient
                        colors={[color2, color]}
                        style={{height:h,width:w, borderRadius:c,display: 'flex', justifyContent: 'center',  position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        padding:0}}
                    />
                    <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center",height:h,width:w  }}>
                        <View><Text style={{color:colorWhite, fontSize:16}}>{name}</Text></View>
                      </View>
                    </View>
    )
};

export const RandomAvatarTextColor = ({color,color2,h,w,c,name, id}) => {

    return (
        <View key={id} style={{height:h,width:w, borderRadius:c,display: 'flex', justifyContent: 'center', 
                padding:0,shadowColor:"black",margin:5,
                shadowOffset:{
                width:0,
                height:2
                    }, elevation:11}}>
                        
                    <LinearGradient
                        colors={[color2, color]}
                        style={{height:h,width:w, borderRadius:c,display: 'flex', justifyContent: 'center',  position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        padding:0}}
                    />
                    <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center",height:h,width:w  }}>
                        <View><Text style={{color:colorWhite, fontSize:16}}>{name.split(" ")[0].charAt(0)}{(name.split(" ")[1])&&name.split(" ")[1].charAt(0)}</Text></View>
                      </View>
                    </View>
    )
};