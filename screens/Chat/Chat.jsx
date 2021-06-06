import iconSet from '@expo/vector-icons/build/FontAwesome5'
import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem,Avatar,Icon,Button} from 'react-native-elements'
import { colorblue, colorGreen, colorOrange, colorRose, colorYello } from '../../constants/Colors'




const Chat = ({name, id, date,message, active, photo}) => {
    return (
        <ListItem bottomDivider>
             <Avatar rounded title={name} source={ photo && { uri: photo }} size="medium" />
            <ListItem.Content style={styles.content}>
                <ListItem.Title style={{fontWeight:"bold", fontSize:16}}>{name}</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:14,fontStyle:"italic", fontWeight:"bold"}}>"{message}"</ListItem.Subtitle>
            </ListItem.Content>
            <View>
                <Text style={{fontSize:11, textAlign:"right"}}>
                    {moment().set({D:date}).format("DD/MM/YYYY")}
                </Text>
                <Text >
                <Button buttonStyle={{padding:2}} icon={<Icon  name="today" color={"black"} iconStyle={{fontSize:26}}/>} type="clear" />
                <Button buttonStyle={{padding:2}} icon={<Icon name="event-available" color={colorGreen} iconStyle={{fontSize:26}}/>} type="clear" />
                <Button buttonStyle={{padding:2}} icon={<Icon name="event-busy" color={colorRose} iconStyle={{fontSize:26}}/>} type="clear" />
                <Icon name="done" color={"lightgrey"} iconStyle={{fontSize:26}}/>
                <Icon name="done-all" color={"lightgrey"} iconStyle={{fontSize:26}}/>
                </Text>
            </View>
           
        </ListItem>
    )
}

export default Chat

const styles = StyleSheet.create({
    content:{
        padding:0
    }
})
