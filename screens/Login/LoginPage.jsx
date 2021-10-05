import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Image, Input,Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';
import UrlImage from '../../assets/rendv_images/icon.png'
import { firestore } from '../../auth/firebase';
import * as Contacts from 'expo-contacts';
import { colorblue, colorGreen, colorRose, colorYello, colorDarkGreen, colorWhite, colorLightGreen, colorLightblue,colorLightRose, colorDarkblue } from '../../constants/Colors'

const LoginPage = ({navigation}) => {
    const [person, setPerson] = useState([]);
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      let unmouted = false;
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.PhoneNumbers,Contacts.Fields.Image,Contacts.Fields.Emails],
            });
            if (data.length > 0) {
                let result = Object.values(data).sort((a,b) => (a.name > b.name) ? 1 : -1);
                setPerson(result);
               
            }
          }
          return () => {
            unmouted = true;
          }
  
          
        })();
      }, []);
  
      useEffect(() => {
        let unmouted = false;
          const unsubscribe = firestore.collection('Chatter').onSnapshot((snapshot) => {
          
              setUsers(snapshot.docs.map(doc => doc.data()));
            
            
            return () => {
              unmouted = true;
            }
          });
        },[]);

    return (
        <View style={styles.container}>
            <View style={styles.subcont}>
            <Image style={{height:100, width:100, position:"relative", top:40}} source={UrlImage}/>
            <Input keyboardType="numeric" inputContainerStyle={styles.input} containerStyle={{height:50}} placeholder="Phonenumber"/>
            <Button 
                buttonStyle={{borderColor: "white", borderWidth:2,padding:10, height:50}} 
                containerStyle={styles.btn1}  title="Sign in" type="outline"
                titleStyle={{color:"white"}} onPress={() => navigation.navigate('Tabs',{person: person, users: users})}/>
                <Text style={{ padding:10, color: colorWhite , height:40}} >Or, is this your first time?</Text>
            <Button  
                buttonStyle={{backgroundColor: colorWhite, padding:10, borderWidth:2,borderColor: colorGreen , height:50}} 
                containerStyle={styles.btn1} title="Sign up" type="outline"
                titleStyle={{color:colorGreen}} onPress={() => navigation.navigate('Register')}/>
        
       {/*      <View style={{display:'flex', flexDirection:'row', borderTopWidth: 1,borderTopColor: colorDarkblue, paddingVertical:30, marginTop:30}}>
                <View style={{display:'flex', flexDirection:'row'}}>
                <Button buttonStyle={{backgroundColor:colorLightblue, 
                        width:50, height:50, borderWidth:1, borderColor:colorblue,
                        borderTopLeftRadius:15,borderBottomRightRadius:15,}} 
                        icon={<Icon name="facebook-f" color={colorblue} style={{fontSize:20}}/>} 
                        onPress={() => navigation.navigate('Tabs')}/>
                <Button buttonStyle={{marginLeft:10,backgroundColor:colorWhite, 
                        width:50, height:50, borderWidth:1, borderColor:colorGreen,
                        borderTopLeftRadius:15,borderBottomRightRadius:15}} 
                        icon={<Icon name="whatsapp"  color={colorGreen}  style={{fontSize:20}}/>} 
                        onPress={() => navigation.navigate('Tabs')}/>
                <Button buttonStyle={{marginLeft:10,backgroundColor:colorLightRose, 
                        width:50, height:50, borderWidth:1, borderColor:colorRose,
                        borderTopLeftRadius:15,borderBottomRightRadius:15,}} 
                        icon={<Icon name="google" color={colorRose} style={{fontSize:20}}/>}
                        onPress={() => navigation.navigate('Tabs')} />
                </View>
            </View> */}
            </View>
            
        </View>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    container:{
        flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white",
    },
    subcont:{
        flex:1,
        display:"flex",
        position:"relative", 
        justifyContent:"center",
        alignItems:"center",
        borderWidth:2,
        borderColor:colorGreen,
        width:"100%",
        bottom:0,
        height:450,
        borderTopLeftRadius:4,
        borderBottomRightRadius:4,
        borderTopRightRadius:4,
        borderBottomLeftRadius:4,
        backgroundColor: "#91cfc1"
        
    },
    btn1:{
        width:"95%",
        marginBottom:0,
    },
    input:{
        borderStyle:"solid",
        borderColor:colorGreen,
        borderWidth:1,
        paddingLeft:10,
        borderRadius:4,
        width:"100%",
        fontSize: 12,
        height:48,
        backgroundColor:"white"
    }
})

