import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar,Icon,Button} from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { colorGreen, colorRose,colorDarkGreen,colorDarkGrey, colorWhite, selectedBackgroundColor,colorGreenIcon, colorDarkOrange } from '../../constants/Colors'

const GroepsChat = ({id, name, date,message, selected, photo, plan, seen,onPress}) => {
    const Naam = (name ? name : 'Geen Naam');
    return (
        <View key={id} style={{ display:'flex',
        elevation: 1,
        backgroundColor: selected ? selectedBackgroundColor : colorWhite , flexDirection:'row',
        }}>
        {photo && <Avatar containerStyle={{margin:15}} rounded title={Naam} source={{ uri: photo }} size="medium" /> ||
        <View style={{height:50,width:50, display: 'flex', justifyContent: 'center' , borderRadius:50, marginVertical:10, marginHorizontal:10}}>
        <LinearGradient
              colors={[colorDarkOrange, colorGreen]}
              style={styles.background}
          />
       <Text style={{color:"white", fontSize:18, textAlign:'center'}}>{Naam.split(" ")[0].charAt(0)}{(Naam.split(" ")[1])&&Naam.split(" ")[1].charAt(0)}</Text>
       </View> 
        }
        <View style={styles.content}>
                <View style={{marginVertical:15, flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <TouchableWithoutFeedback onPress={onPress}>
                            <Text style={{fontWeight:'700', fontSize:15, color:colorDarkGrey}}>{Naam}</Text>
                            <Text style={{fontSize:14,fontStyle:"italic", fontWeight:"500", color:"grey"}}>
                                "{message}"
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <Text style={{fontSize:11, textAlign:"right", marginRight:10,color:"grey"}}>
                           {/*  {date} */} 04/10/2021
                        </Text >
                        <Text style={{fontSize:11, textAlign:"right", marginRight:10}}>
                            {
                                plan == 1 ? 
                                <Button buttonStyle={{padding:2}} icon={<Icon  name="today" color={"black"} iconStyle={{fontSize:26}}/>} type="clear" /> :
                                plan == 2 ?
                                <Button buttonStyle={{padding:2}} icon={<Icon name="event-available" color={colorGreenIcon} iconStyle={{fontSize:26}}/>} type="clear" /> :
                                <Button buttonStyle={{padding:2}} icon={<Icon name="event-busy" color={colorRose} iconStyle={{fontSize:26}}/>} type="clear" />
                            }
                              {
                                  seen == 1 ? 
                                    <Icon style={{paddingVertical:6}} name="done" color={"lightgrey"} iconStyle={{fontSize:20}}/> :
                                  seen == 2 ? 
                                    <Icon style={{paddingVertical:6}} name="done-all" color={"lightgrey"} iconStyle={{fontSize:20}}/> :
                                    <Icon style={{paddingVertical:6}} name="north-east" color={colorGreenIcon} iconStyle={{fontSize:20}}/>
                              }  
                                </Text>
                    </View>
                    
                </View>
            </View>
        </View>
    )
}

export default GroepsChat

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