import { useNavigation } from '@react-navigation/core';
import { Camera } from 'expo-camera';
import { launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState,useLayoutEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Avatar, Icon } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createGroupsChatter } from '../../components/CRUD/crud';
import { backGroundColor, buttonPrimaryColor, colorDarkGreen, secundaireColor, colorGreen, colorOrange, colorRose, colorWhite, colorYello } from '../../constants/Colors';
import { RandomColor, RandomColors } from '../../constants/RandomColor';



const NewGroePSum = ({navigation,route}) => {
    const {id, name, group} = route.params;
    const [photo, setPhoto] = useState("");
    let total = 1;

    const pickFromGallery = async () => {
 
        const {granted} = await requestMediaLibraryPermissionsAsync();
        if(granted){
            let data = await launchImageLibraryAsync({
            mediaTypes:MediaTypeOptions.Images,
            allowsEditing:false,
            aspect:[1,1],
            quality:0.5
            });
    
            if(!data.cancelled){
                setPhoto(data.uri);
            }
        }else{
            Alert.alert("you to get permissions");
        }
    
    }
    
    const pickFromCamera = async () => {
        const {granted} = await Camera.requestPermissionsAsync();
        if(granted){
            let data = await launchCameraAsync({
            mediaTypes:MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
            });
            
            if(!data.cancelled){
                setPhoto(data.uri);
    
        }else{
            Alert.alert("you to get permissions");
        }
    
    }
    }
    
    const GroepImage = ({name,image}) => {
        
        let navigation = useNavigation();
        const Naam = ( name ? name : 'Geen Naam');
        return(
            <View>
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-around",borderRadius:20, backgroundColor:colorWhite, height:150, margin:10}}>
                   {image && <Avatar source={{uri : image}} 
                        rounded={true} size={130} title={Naam} containerStyle={{borderColor:secundaireColor, borderWidth:2, marginRight:5}} /> ||
                        <View style={{height:100,width:100, borderRadius:90,display: 'flex', justifyContent: 'center', marginVertical:10, marginHorizontal:10}}>
                        <LinearGradient
                            colors={[colorDarkGreen, colorGreen]}
                            style={styles.circle}
                        />
                    <Text style={{color:"white", fontSize:32, textAlign:'center'}}>{Naam.split(" ")[0].charAt(0)}{(Naam.split(" ")[1])&&Naam.split(" ")[1].charAt(0)}</Text>
                    </View> 
                        } 
                <View>
                <Button icon={<Icon name="camera" color={colorDarkGreen} 
                      borderRadius={50} 
                      iconStyle={{fontSize: 40}}/>} 
                      containerStyle={styles.cont_btn_camera} 
                      buttonStyle={styles.btn_style_camera}
                      onPress={() => pickFromCamera()}/>
                 <Button icon={<Icon name="image-search" color={colorDarkGreen} 
                      borderRadius={50} 
                      iconStyle={{fontSize: 40}}/>} 
                      containerStyle={styles.cont_btn_camera} 
                      buttonStyle={styles.btn_style_camera}
                      onPress={() => pickFromGallery()}/>
                </View>
                   
                </View>
            </View>
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () =>(
                <Text style={{ fontSize:15, color:"white"}}>{name}</Text>
              ),
            headerLeft:() => (
                <Button  type="clear" icon={<Icon name="arrow-back" color="white"/>} onPress={() => navigation.goBack()}/>
            ),
            headerRight:() => (
            <View style={{flex:1, flexDirection:"row", alignItems:"center",paddingRight:10}}>
                <Text style={{ fontSize:15, color:"white"}}> {group.length} </Text>
                <Icon name="group" color="white"/>
            </View>
              ),
            headerStyle: {
                backgroundColor: secundaireColor,
              },
        });
      }, [navigation ]);

    let wi = (Dimensions.get("window").width/2)-20;


    const creatGroupChat = useCallback(() => {
        let groep = {
        groupname:name,
        members:group,
        message:{},
        photo:photo || "",
        plan:1
        };
        createGroupsChatter(groep,navigation);
      },[]);

    return (
        <View style={styles.container}>
            <GroepImage name={name} image={photo|| ""}/>
            <ScrollView style={{height:400}}>
            <View style={{flexDirection:"row", flexWrap:"wrap", margin:10, paddingVertical:10,backgroundColor:colorWhite}}>
               {
                (group.length > 0) && 
                    group.map((item,id) => {
                    return (
                        <RandomColors 
                            key={id}
                            id={id}
                            h={80} w={wi} c={10}
                            name={item.firstName}
                            color={item.couleur}
                            color2={item.couleur2}/>
                        )
                    })
              }</View>
              </ScrollView>
              <Button title="Save" buttonStyle={{backgroundColor:secundaireColor}} containerStyle={{padding:20}} onPress={creatGroupChat} />
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
        height:100,
        width:100,
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
