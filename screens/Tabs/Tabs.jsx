import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon, Button} from 'react-native-elements'
import { colorDarkGreen, colorGreen, colorLightGreen } from '../../constants/Colors';
import TopNav from '../../topnavigation/TopNav';

const Tabs = ({route, users, person, group}) => {

    return (<View style={styles.containerstyle}>
                <StatusBar backgroundColor={colorGreen} />
                <TopNav users={users} group={group} person={person} />
            </View>);
}

export default Tabs

const styles = StyleSheet.create({
  containerstyle:{
    flex:1, 
    backgroundColor:colorLightGreen
  }
})
