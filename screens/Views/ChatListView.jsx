import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import chatters from '../../assets/data.json';
import Chat from '../Chat/Chat.jsx';
import { ListItem,Avatar,Icon } from 'react-native-elements';


const ChatListView = () => {
    
    const [expanded,setExpanded] = useState(false);
    return (
        <View style={styles.main}>
            <ScrollView>
            {
                chatters.map( (person,id) =>
                {
                    return <TouchableOpacity key={id}>
                        <Chat 
                    key={id}
                    name={person.name} 
                    id={person.guid} 
                    date={person.registered}
                    message={person.about.substring(0,20)}
                    active={person.isActive}
                    photo ={person.picture}/></TouchableOpacity>
                    
                }
                )
            }
            </ScrollView>
        </View>
    )
}

export default ChatListView

const styles = StyleSheet.create({
    main:{
        flex:1
    }
})
