import { LinearGradient } from 'expo-linear-gradient'
import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Avatar,Icon} from 'react-native-elements'
import {colorDarkGreen, colorDarkGrey, colorGreen, colorGrey,colorWhite, selectedBackgroundColor } from '../../constants/Colors'

const ChatSelection = ({name,selected, photo}) => {
    const Naam = (name ? name : 'Geen Naam');
    return (
        <View style={{ display:'flex',
        backgroundColor:selected ? selectedBackgroundColor :colorWhite , flexDirection:'row',
        borderWidth:1, borderRadius:10, borderColor:selected ? colorGreen : colorGrey,
        marginHorizontal:7, marginVertical:2}}>
             {photo && <Avatar containerStyle={{marginVertical:10, marginHorizontal:10}} rounded title={Naam} source={{ uri: photo }} size="medium" /> ||
             <View style={{height:50,width:50, display: 'flex', justifyContent: 'center' , borderRadius:10, marginVertical:10, marginHorizontal:10}}>
             <LinearGradient
                   colors={[colorDarkGreen, colorGreen]}
                   style={styles.background}
               />
            <Text style={{color:"white", fontSize:18, textAlign:'center'}}>{Naam.split(" ")[0].charAt(0)}{(Naam.split(" ")[1])&&Naam.split(" ")[1].charAt(0)}</Text>
            </View> 
             }
            <View style={styles.content}>
                <View style={{marginTop:15}}>
                <Text style={{fontWeight:'700', fontSize:15, color:colorDarkGrey}}>{Naam}</Text>
                </View>
            </View>
        </View>
    )
}

export default memo(ChatSelection)

const styles = StyleSheet.create({
    container:{
        display:'flex',
        backgroundColor:colorWhite , 
        flexDirection:'row',
        borderWidth:0.5,
        borderRadius:10,
        borderColor:colorGrey,
        marginHorizontal:7,
        marginVertical:2,
    },
    content:{
        padding:0,
        flex:1
    },
    date:{
        padding:0,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:50,width:50,
        borderRadius:25
      },
})
