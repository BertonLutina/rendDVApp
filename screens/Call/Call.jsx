import iconSet from '@expo/vector-icons/build/FontAwesome5'
import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem,Avatar,Icon} from 'react-native-elements'
import {  colorGreen, colorRose,colorDarkGreen, colorLightGreen, colorGrey, colorDarkGrey, colorWhite, selectedBackgroundColor, colorGreenIcon } from '../../constants/Colors'



const Call = ({name, date,photo, selected,call}) => {
    const Naam = (name ? name : 'Geen Naam');
    return (
        <View style={{ display:'flex',
        backgroundColor:selected ? selectedBackgroundColor :colorWhite, borderLeftColor:colorGreen , flexDirection:'row',
        elevation:1}}>
        {photo && <Avatar containerStyle={{margin:15, backgroundColor:colorLightGreen}} rounded title={Naam} source={{ uri: photo }} size="medium" /> ||
        <View style={{height:50,width:50, display: 'flex', justifyContent: 'center' , borderRadius:50, marginVertical:10, marginHorizontal:10}}>
        <LinearGradient
              colors={[colorDarkGreen, colorGreen]}
              style={styles.background}
          />
       <Text style={{color:"white", fontSize:18, textAlign:'center'}}>{Naam.split(" ")[0].charAt(0)}{(Naam.split(" ")[1])&&Naam.split(" ")[1].charAt(0)}</Text>
       </View> 
        }
            <View style={styles.content}>
                <View style={{marginTop:15, flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'700', fontSize:15, color:colorDarkGrey}}>{Naam}</Text>
                        <Text style={{fontSize:16,fontStyle:"italic", fontWeight:"bold"}}>
                            {
                                call == 1 ? <Icon name="phone-missed" color={colorRose} iconStyle={{fontSize:22}}/> :
                                <Icon name="wifi-calling" color={colorGreenIcon} iconStyle={{fontSize:22}}/> 
                            }
                        </Text>
                    </View>
                    <View>
                        <Text style={{fontSize:11, textAlign:"right", marginRight:10}}>
                            {moment().set({D:date}).format("DD/MM/YYYY")}
                        </Text>
                    </View>
                    
                </View>
                <View style={{fontSize:14,fontStyle:"italic",
                    backgroundColor:"white", flexDirection:'row',width:"auto",  
                    justifyContent:"space-between",fontWeight:"bold", marginBottom:15}}>
            </View>
            </View>
            
           
        </View>
    )
}

export default Call

const styles = StyleSheet.create({
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
