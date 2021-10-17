import 'react-native-gesture-handler';
import React, { useState,useLayoutEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon, Button} from 'react-native-elements'
import { colorDarkGreen, colorGreen, colorLightGreen } from '../../constants/Colors';
import TopNav from '../../topnavigation/TopNav';
import { useNavigation, useRoute } from '@react-navigation/core';

const Tabs = ({route, users, person, group}) => {
  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
     headerShown:false
    });
  }, [nav, person]);
const {params} = useRoute();
    return (<View style={styles.containerstyle}>
                <StatusBar backgroundColor={colorGreen} />
                <TopNav users={users} group={group} person={person}  view={params?.view}/>
            </View>);
}

export default Tabs

const styles = StyleSheet.create({
  containerstyle:{
    flex:1, 
    backgroundColor:colorLightGreen
  }
})
