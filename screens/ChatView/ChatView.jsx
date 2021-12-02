import { useNavigation } from '@react-navigation/native'
import { launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync } from 'expo-image-picker'
import moment from 'moment'
import React, { useState,useEffect,useLayoutEffect } from 'react'
import { Camera } from 'expo-camera';
import { StyleSheet, Text, View,  Alert, Keyboard, Dimensions } from 'react-native'
import { Icon, Button, Avatar, Input} from 'react-native-elements'
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import {  colorDarkGreen, colorDarkGrey,  secundaireColor, colorLightGreen, colorLightGrey, colorWhite } from '../../constants/Colors'
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { firestore, _firebase } from '../../auth/firebase';
import { getChatterId } from '../../constants/constantFunction';
import { addChats } from '../../components/CRUD/crud';
import { Photosurl, pickFromGallerys } from '../../constants/cameras';
import { RandomAvatarTextColor } from '../../constants/RandomColor';


const ChatInput = ({text, ChangeText, addChat,pickFromGallery,pickFromCamera}) => {
    return(
        <View style={{flexDirection:"row", width:"100%",alignItems:"center", height:60, position:"absolute",bottom:0,
            backgroundColor:"transparent"}}>
            <View style={{flexDirection:"row", width:"100%", flex:1, marginLeft:5,
            height:50,backgroundColor:secundaireColor, alignItems:"center",borderRadius:50}}>
            <Button  type="clear" icon={<Icon name="camera" color={colorWhite} onPress={pickFromCamera}/>}/>
            <Button  type="clear" icon={<Icon name="image-search" color={colorWhite} onPress={pickFromGallery} />}/>
                <Input  placeholder="bericht maken" inputContainerStyle={{backgroundColor:colorWhite,borderRadius:10,paddingLeft:10, borderBottomWidth:0}}
                    style={{fontSize:13}} containerStyle={{padding:0, height:40, flex:1}} onChangeText={ChangeText} value={text}/>
                <Button  type="clear" icon={<Icon name="mood" color={colorWhite}/>}/> 
            </View>
            <Button buttonStyle={{backgroundColor:colorWhite, borderRadius:25, 
                    borderWidth:1, borderColor:secundaireColor, marginHorizontal:5}}  
                    type="clear" icon={<Icon name="send" color={colorDarkGreen}  onPress={addChat}/>}/>
            </View>
    )
}

const ChatView = ({route,navigation}) => {
    const [inputs, setInputs] = useState([]);
    const [text, settext] = useState("");
    const [photo, setPhoto] = useState("");
    const {person} = route.params;
    const [chatter, setChatter] = useState(person);


    function takePicture() {
        let obj = chatter;

        let obii = pickFromGallerys(obj);
            setChatter(obii);
    }

    const ChatHeader = ({item}) => {
        let navigation = useNavigation();
        const Naam = (item.name ? item.name : 'Geen Naam');
        let Dates = new Date(item.createDate).toLocaleTimeString();
    
        return(
            <View >
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", backgroundColor:secundaireColor,width:"100%"}}>
                <Button containerStyle={{flex:1}} 
                        type="clear" 
                        icon={<Icon name="wifi-calling" color="white"/>}/>
                    <Text style={{flex:5, fontSize:15, color:"white"}}>{Naam}</Text>
                    {item.photo && <Avatar source={{uri : item.photo}} onPress={takePicture}
                        rounded={true} size={45} title={Naam} containerStyle={{borderColor:colorWhite, borderWidth:2, marginRight:5}} /> ||
                        <TouchableWithoutFeedback style={{marginLeft:20}} onPress={takePicture}>
                            <RandomAvatarTextColor
                            name={Naam}
                            color={colorDarkGreen}
                            color2={secundaireColor}
                            h={45}
                            w={45}
                            c={50}
                            id={1}/>
                    </TouchableWithoutFeedback>
                        }
                        
                </View>
               
                </View>
        )
    }
        useLayoutEffect(() => {
            const {name, id, date, photo, plan, seen} = person;
            navigation.setOptions({
                headerTitle: () =>(
                    <ChatHeader item={chatter}/>
                  ),
                headerLeft:() => (
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between",width:"100%"}}>
                <Button  containerStyle={{flex:1}} 
                    type="clear" 
                    icon={<Icon name="arrow-back" color="white"/>} onPress={() => navigation.goBack()}/>
                <Button containerStyle={{flex:1}} 
                    type="clear" 
                    icon={<Icon name="event" color="white"/>}
                    onPress={() => navigation.navigate("EventCreater",{name, id, date, photo, plan, seen})} />
                    </View>
                ),
                headerStyle: {
                    backgroundColor: secundaireColor,
                  },
            });
        }, [navigation, person]);

    const renderItem = ({ item }) => {
        let code = item.chat.split(",")[0];
        let mess = item.chat.split(",")[1];
        if(code == "2"){
            return (<User id={item.id} times={item.timestamp} 
                            message={item.chat} height={item.height} width={item.width}
                            image={item.photoUrl}/>);  
        }else{
            return (<Contact id={item.id} times={item.timestamp} 
                            message={item.chat} height={item.height} width={item.width}
                            image={item.photoUrl}/>);  
        }
        
        };

    const pickFromGallery = async () => {
        moment.locale("nl-be");
        const {granted} = await requestMediaLibraryPermissionsAsync();
        if(granted){
            let data = await launchImageLibraryAsync({
            mediaTypes:MediaTypeOptions.Images,
            allowsEditing:false,
            aspect:[1,1],
            quality:0.5
            });
    
            if(!data.cancelled){
            addPhoto(data.uri, data.height, data.width);
            }
        }else{
            Alert.alert("you to get permissions");
        }
    
        }
    
    const pickFromCamera = async () => {
        moment.locale("nl-be");
        const {granted} = await Camera.requestPermissionsAsync();
        if(granted){
            let data = await launchCameraAsync({
            mediaTypes:MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
            });
            
            if(!data.cancelled){
            addPhoto(data.uri, data.height, data.width);
            setInputs({image: data.uri,
            message:"", imagecancelled: data.cancelled, height:data.heightdata.height , width:data.width});
            }

        }else{
            Alert.alert("you to get permissions");
        }
    
        }

    const User = ({times, message, id, image,imagecancelled, height, width}) => {
        return(
            <View key={id+"_"+times} style={{flexDirection:"row",justifyContent:"flex-start", padding:10}}>
                <View style={{backgroundColor:secundaireColor,borderColor:secundaireColor, borderWidth:1, height:10, width:10, borderRadius:25}}>
            </View>
                <View style={{backgroundColor:secundaireColor, borderColor:secundaireColor, borderWidth:1, borderRadius:10}}>
                    <Text style={{textAlign:'center', fontSize:9, color:colorWhite,padding:4, backgroundColor:colorLightGreen, 
                    borderTopRightRadius:10 , borderTopLeftRadius:10 }}>{times}</Text>
                    {
                            (image != "")&&<Image source={{uri: image}} style={{ width: width/3, height: height/3 }}/>
                        }
                    <Text style={{textAlign:'left', fontSize:12, color:colorWhite,padding:10}}>{message}</Text>
                </View>
            
    </View>
        )
    }

    const Contact = ({times, message, id, image,imagecancelled, height, width}) => {
            return(
            <View key={id+"_"+times} style={{flexDirection:"row", justifyContent:"flex-end",margin:10, elevation:1}}>
                    <View style={{backgroundColor:colorWhite, borderColor:secundaireColor, borderWidth:1, borderRadius:10}}>
                        <Text style={{textAlign:'center', fontSize:10, color:colorDarkGrey ,padding:4, 
                            backgroundColor:colorLightGrey, borderTopRightRadius:10 , borderTopLeftRadius:10}}>{times}</Text>
                        {
                            (image != "")&&<Image source={{uri: image}} style={{ width: width/8, height:height/8}}/> 
                        }
                        <Text style={{textAlign:'left', fontSize:12, color:colorDarkGrey ,padding:10,}}>{message}</Text>
                    </View>
                    <View style={{backgroundColor:colorWhite,borderColor:secundaireColor, borderWidth:1, height:10,width:10, borderRadius:25}}>
                    </View>
            </View>
            )
    }

    function ChangeText(e) {
            settext(e);
    }

    useEffect(() => {
        let unmouted = false;

        _firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firestore.collection(getChatterId(user.uid))
            .doc(person.id)
            .collection("messages").orderBy("timestamp","desc")
            .onSnapshot((snapshot) => {
                if(!unmouted){
                setInputs(snapshot.docs.map(doc => doc.data()));
                }
                return () => {
                unmouted = true;
                }
            });
        } else {
            Alert.alert("LogOut","You're LogOut please Login Again");
        }

        return () => {
            setInputs([]); // This worked for me
          };
        });
        
    }, [setInputs])

    function addChat() {
        let message = {
            chat:text,
            username: person.name,
            image:person.photo,
            photoUrl: "",
            height:0, 
            width:0
        };
        if(text){
            addChats(message, person.id);
            settext("");
        }
        Keyboard.dismiss();
    }

    function addPhoto(p_photoUrl, p_height, p_width) {
        let message = {
            chat:text,
            username: person.name,
            image:person.photo,
            photoUrl: p_photoUrl,
            height:p_height, 
            width:p_width
        }

        if(p_photoUrl){
            addChats(message, person.id);
            settext("");
        }

        Keyboard.dismiss();
    }
    return (
        <View style={{ backgroundColor:colorWhite, flex:1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
            {
                inputs.length != 0 ? <FlatList
                            
                            data={inputs}
                            inverted
                            keyboardShouldPersistTaps="never"
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            /> : <View style={{flex:1, alignItems:"center"}}>
                                    <Text style={{borderRadius:10, marginVertical:10,
                                                    backgroundColor:colorLightGrey, padding:10, 
                                                color:colorDarkGrey}}>Start uw chat</Text></View>
            }
            </>
          </TouchableWithoutFeedback>
            <ChatInput text={text} ChangeText={ChangeText} addChat={addChat} 
            pickFromGallery={pickFromGallery} pickFromCamera={pickFromCamera}/>
        </View>
    )
}

export default ChatView

const styles = StyleSheet.create({
    circle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:40,
        width:40,
        borderRadius:25,
      },
})
