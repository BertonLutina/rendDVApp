import iconSet from '@expo/vector-icons/build/FontAwesome5'
import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem,Avatar,Icon} from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colorblue, colorGreen, colorOrange, colorRose, colorYello } from '../../constants/Colors'




const Contact = ({name, date,message, photo}) => {
    const Naam = (name ? name : 'Geen Naam');
    return (
        <ListItem
        Component={TouchableOpacity}
        linearGradientProps={{
            colors: ['#fafafa', '#FFFFFF'],
            start: { x: 1, y: 0 },
            end: { x: 0.2, y: 0 },
          }}
        ViewComponent={LinearGradient}
        bottomDivider>
             {photo == "G" ? 
             <View style={{backgroundColor: colorblue, height:50,width:50, display: 'flex', justifyContent: 'center' , borderRadius:50}}>
                 <Text style={{color:"white", fontSize:18, textAlign:'center'}}>{Naam.charAt(0)}</Text>
             </View> :
             <Avatar rounded title={firstName} source={ photo && { uri: photo }} size="medium" />            
             }
            <ListItem.Content style={styles.content}>
                <ListItem.Title style={{fontWeight:"bold", fontSize:16}}>{Naam}</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:14,fontStyle:"italic", fontWeight:"bold"}}>
            <Text>
                <Icon  name="chat" color={"#241d1d"} iconStyle={{fontSize:22}}/>
                <Icon  name="local-phone" color={"#241d1d"} iconStyle={{fontSize:22}}/> 
                <Icon name="today" color={"#241d1d"} iconStyle={{fontSize:22}}/> 
                </Text>
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

export default Contact

const styles = StyleSheet.create({
    content:{
        padding:0
    }
})
