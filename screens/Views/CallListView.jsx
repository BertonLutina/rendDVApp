import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import chatters from '../../assets/data.json';
import Call from '../Call/Call';


const CallListView = () => {
    const [expanded,setExpanded] = useState(false);
    return (
        <View style={styles.main}>
            <ScrollView>
            {
                chatters.map( (person,id) =>
                {
                return <TouchableOpacity key={id}>
                    <Call 
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

export default CallListView

const styles = StyleSheet.create({})
