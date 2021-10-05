import { useNavigation } from '@react-navigation/core';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Avatar, Icon } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createGroupsChatter } from '../../components/CRUD/crud';
import { backGroundColor, buttonPrimaryColor, colorDarkGreen, colorGreen, colorGreenIcon, colorOrange, colorRose, colorWhite, colorYello } from '../../constants/Colors';
import { RandomColor } from '../../constants/RandomColor';


const pickFromCamera = async () => {
    const {granted} = await Camera.requestPermissionsAsync();
    if(granted){
     let data = await launchCameraAsync({
        mediaTypes:MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[1,1],
        quality:1
      })
    }else{
      Alert.alert("you to get permissions");
    }
  
  }
const RandomColors = ({color,color2,h,w,c,firstName, id}) => {
    return (
        <View key={id} style={{height:h,width:w, borderRadius:c,display: 'flex', justifyContent: 'center', 
                padding:0,shadowColor:"black",margin:5,
                shadowOffset:{
                width:0,
                height:2
                    }, elevation:11}}>
                        
                    <LinearGradient
                        colors={[color2, color]}
                        style={{height:h,width:w, borderRadius:c,display: 'flex', justifyContent: 'center',  position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        padding:0}}
                    />
                    <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center",height:h,width:w  }}>
                        <View><Text style={{color:colorWhite, fontSize:16}}>{firstName}</Text></View>
                      </View>
                    </View>
    )
};

const GroepHeaderHeader = ({name,members}) => {
    let navigation = useNavigation();
    const Naam = ( name ? name : 'Geen Naam');
    return(
        <View >
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", backgroundColor:colorGreen, height:60}}>
                <Button  containerStyle={{flex:1}} type="clear" icon={<Icon name="arrow-back" color="white"/>} onPress={() => navigation.goBack()}/>
                <Text style={{flex:5, fontSize:15, color:"white"}}>{Naam}</Text>
                <View style={{flex:1, flexDirection:"row", alignItems:"center",}}>
                    <Text style={{ fontSize:15, color:"white"}}> {members} </Text>
                    <Icon name="group" color="white"/>
                </View>
            </View>
            </View>
    )
}

const GroepImage = ({name,image}) => {
    let navigation = useNavigation();
    const Naam = ( name ? name : 'Geen Naam');
    return(
        <View>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-around",borderRadius:20, backgroundColor:colorWhite, height:300, margin:15}}>
               {image && <Avatar source={{uri : image}} 
                    rounded={true} size={45} title={Naam} containerStyle={{borderColor:colorGreen, borderWidth:2, marginRight:5}} /> ||
                    <View style={{height:150,width:150, borderRadius:90,display: 'flex', justifyContent: 'center', marginVertical:10, marginHorizontal:10}}>
                    <LinearGradient
                        colors={[colorDarkGreen, colorGreen]}
                        style={styles.circle}
                    />
                <Text style={{color:"white", fontSize:32, textAlign:'center'}}>{Naam.split(" ")[0].charAt(0)}{(Naam.split(" ")[1])&&Naam.split(" ")[1].charAt(0)}</Text>
                </View> 
                    } 
                <Button icon={<Icon name="camera" color={colorDarkGreen} 
                  borderRadius={50} 
                  iconStyle={{fontSize: 40}}/>} 
                  containerStyle={styles.cont_btn_camera} 
                  buttonStyle={styles.btn_style_camera}
                  onPress={() => pickFromCamera()}/>
            </View>
        </View>
    )
}

const NewGroePSum = ({navigation,route}) => {
    const {id, name, group} = route.params;
    let total = 1;

    let wi = (Dimensions.get("window").width/2)-20;
    let _wi = (Dimensions.get("window").width)-30;

    const creatGroupChat = useCallback(() => {
        let groep = {
        groupname:name,
        members:group,
        message:{},
        photo:""
        };
        createGroupsChatter(groep,navigation);
      },[]);

    return (
        <View style={styles.container}>
            <GroepHeaderHeader name={name} members={group.length}/>
            <GroepImage name={name} image={""}/>
            <ScrollView style={{height:400}}>
            <View style={{flexDirection:"row", flexWrap:"wrap", margin:10, paddingVertical:10,backgroundColor:colorWhite}}>
               {
                (group.length > 0) && 
                    group.map((item,id) => {
                    return (
                        <RandomColors 
                            id={id}
                            h={80} w={wi} c={10}
                            firstName={item.firstName}
                            color={item.couleur}
                            color2={item.couleur2}/>
                        )
                    })
              }</View>
              </ScrollView>
              <Button title="Save" buttonStyle={{backgroundColor:colorGreen}} containerStyle={{padding:20}} onPress={creatGroupChat} />
        </View>
    )
}

export default NewGroePSum

const styles = StyleSheet.create({
    container:{
        backgroundColor:backGroundColor,
        flex:1
    },
    circle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:150,
        width:150,
        borderRadius:75,
    },
  cont_btn_chat:{
    position:'absolute', 
    bottom:100,
    borderRadius:50, 
    right:20,
    shadowColor:"black",
    shadowOffset:{
      width:0,
      height:2
  }
    }})
