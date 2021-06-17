import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem,Avatar,Icon,Button} from 'react-native-elements'
import { colorGreen, colorRose,colorDarkGreen,colorGrey, colorLightGreen, colorDarkGrey, colorWhite, selectedBackgroundColor, colorLightRose, colorLightblue } from '../../constants/Colors'

const Chat = ({name, id, date,message, selected, photo}) => {
    const Naam = (name ? name : 'Geen Naam');
    return (
        <View style={{ display:'flex',
        elevation: 1,
        backgroundColor: selected ? selectedBackgroundColor : colorWhite , flexDirection:'row',
        borderWidth:selected ? 1: 0.5, borderRadius:10, borderColor:selected ? colorGreen : colorWhite,
        marginHorizontal:7, marginVertical:3}}>
        {photo && <Avatar containerStyle={{marginVertical:10, marginHorizontal:10}} rounded title={Naam} source={{ uri: photo }} size="medium" /> ||
        <View style={{height:50,width:50, display: 'flex', justifyContent: 'center' , borderRadius:50, marginVertical:10, marginHorizontal:10}}>
        <LinearGradient
              colors={[colorDarkGreen, colorGreen]}
              style={styles.background}
          />
       <Text style={{color:"white", fontSize:18, textAlign:'center'}}>{Naam.split(" ")[0].charAt(0)}{(Naam.split(" ")[1])&&Naam.split(" ")[1].charAt(0)}</Text>
       </View> 
        }
        <View style={styles.content}>
                <View style={{marginVertical:15, flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:'700', fontSize:15, color:colorDarkGrey}}>{Naam}</Text>
                        <Text style={{fontSize:14,fontStyle:"italic", fontWeight:"500", color:"grey"}}>
                            "{message}"
                        </Text>
                    </View>
                    <View>
                        <Text style={{fontSize:11, textAlign:"right", marginRight:10,color:"grey"}}>
                            {moment().set({D:date}).format("DD/MM/YYYY")}
                        </Text >
                        <Text style={{fontSize:11, textAlign:"right", marginRight:10}}>
                                <Button buttonStyle={{padding:2}} icon={<Icon  name="today" color={"black"} iconStyle={{fontSize:26}}/>} type="clear" />
                                <Button buttonStyle={{padding:2}} icon={<Icon name="event-available" color={colorGreen} iconStyle={{fontSize:26}}/>} type="clear" />
                                <Button buttonStyle={{padding:2}} icon={<Icon name="event-busy" color={colorRose} iconStyle={{fontSize:26}}/>} type="clear" />
                                <Icon name="done" color={"lightgrey"} iconStyle={{fontSize:26}}/>
                                <Icon name="done-all" color={"lightgrey"} iconStyle={{fontSize:26}}/>
                                </Text>
                    </View>
                    
                </View>
            </View>
            
           
        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    content:{
        padding:0,
        flex:1,
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
        borderRadius:25,
      },
})