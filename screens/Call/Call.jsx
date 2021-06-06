import iconSet from '@expo/vector-icons/build/FontAwesome5'
import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem,Avatar,Icon} from 'react-native-elements'
import { colorblue, colorGreen, colorOrange, colorRose, colorYello } from '../../constants/Colors'

const Call = ({name, id, date,message, active, photo}) => {
    return (
        <ListItem bottomDivider>
             <Avatar rounded title={name} source={ photo && { uri: photo }} size="medium" />
            <ListItem.Content style={styles.content}>
                <ListItem.Title style={{fontWeight:"bold", fontSize:16}}>{name}</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:14,fontStyle:"italic", fontWeight:"bold"}}>
                    <Icon name="phone-missed" color={colorRose} iconStyle={{fontSize:22}}/> 
                    <Icon name="wifi-calling" color={colorGreen} iconStyle={{fontSize:22}}/> 
                </ListItem.Subtitle>
            </ListItem.Content>
            <View>
                <Text style={{fontSize:11, textAlign:"right"}}>
                    {moment().set({D:date}).format("DD/MM/YYYY")}
                </Text>
            </View>
           
        </ListItem>
    )
}

export default Call

const styles = StyleSheet.create({
    content:{
        padding:0
    }
})
