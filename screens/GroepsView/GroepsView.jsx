import { useNavigation } from '@react-navigation/native'
import { launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync } from 'expo-image-picker'
import moment from 'moment'
import React, { useState,useLayoutEffect } from 'react'
import { Camera } from 'expo-camera';
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Icon, Button, Avatar, Input} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { colorDarkGreen, colorDarkGrey,  secundaireColor, colorLightGreen, colorLightGrey, colorOrange, colorWhite, colorGreen } from '../../constants/Colors'
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RandomAvatarTextColor, RandomColors } from '../../constants/RandomColor';
import { firestore, _firebase } from '../../auth/firebase';
import { pickFromGallerys } from '../../constants/cameras';

const ChatInput = ({text, ChangeText, addChat,pickFromGallery,pickFromCamera}) => {
    return(
        <View style={{flexDirection:"row", width:"100%",alignItems:"center", height:60,
            backgroundColor:"transparent"}}>
            <View style={{flexDirection:"row", width:"100%", flex:1, marginLeft:5,
            height:50,backgroundColor:colorDarkGreen, alignItems:"center",borderRadius:50}}>
            <Button  type="clear" icon={<Icon name="camera" color={colorWhite} onPress={pickFromCamera}/>}/>
            <Button  type="clear" icon={<Icon name="image-search" color={colorWhite} onPress={pickFromGallery} />}/>
                <Input  placeholder="bericht maken" inputContainerStyle={{backgroundColor:colorWhite,borderRadius:10,paddingLeft:10, borderBottomWidth:0}}
                    style={{fontSize:13}} containerStyle={{padding:0, height:40, flex:1}} onChangeText={ChangeText} value={text}/>
                <Button  type="clear" icon={<Icon name="mood" color={colorWhite}/>}/> 
            </View>
            <Button buttonStyle={{backgroundColor:colorWhite, borderRadius:25, 
                    borderWidth:1, borderColor:secundaireColor, marginHorizontal:5}}  
                    type="clear" icon={<Icon name="send" color={colorOrange}  onPress={addChat}/>}/>
            </View>
    )
}

const ChatHeader = ({item}) => {
    let navigation = useNavigation();
    const Naam = (item.groupname ? item.groupname : 'Geen Naam');
    return(
        <View >
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", backgroundColor:secundaireColor}}>
                <Button containerStyle={{flex:1}} type="clear" icon={<Icon name="wifi-calling" color="white"/>}/>
                <Text style={{flex:5, fontSize:15, color:"white"}}>{Naam}</Text>
                {item.photo && <Avatar source={{uri : item.photo}} 
                    rounded={true} size={45} title={Naam} containerStyle={{borderColor:colorWhite, borderWidth:2, marginRight:1}} /> ||
                 <RandomAvatarTextColor
                 name={Naam}
                 color={colorDarkGreen}
                 color2={colorOrange}
                 h={45}
                 w={45}
                 c={50}
                 id={1}/> 
                    }
                <View style={{flex:1, flexDirection:"row", alignItems:"center",marginRight:10}}>
                    <Text style={{ fontSize:15, color:"white"}}> {item.members.length} </Text>
                    <Icon name="group" color="white"/>
                </View>
            </View>
            </View>
    )
}

const GroepsView = ({route,navigation}) => {
    const [inputs, setInputs] = useState([]);
    const [text, settext] = useState("");
    const {person} = route.params;
    const [chatter, setChatter] = useState(person);

    function takePicture() {
        let obj = chatter;

        let obii = pickFromGallerys(obj);
            setChatter(obii);
    }
    const renderItem= ({ item }) => {
        let code = item.message.split(",")[0];
        let mess = item.message.split(",")[1];
        if(code == "2"){
            return (<User id={item.id} times={item.times} 
                            message={mess} height={item.height} width={item.width}
                             image={item.image}/>);  
        }else{
            return (<Contact id={item.id} times={item.times} 
                            message={item.message} height={item.height} width={item.width}
                             image={item.image}/>);  
        }
        
        };

        useLayoutEffect(() => {
            const {name, id, date, photo, plan, seen} = person;
            navigation.setOptions({
                headerTitle: () =>(
                    <ChatHeader item={chatter}/>
                  ),
                headerLeft:() => (
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between",width:"100%"}}>
                <Button  containerStyle={{flex:1}} type="clear" icon={<Icon name="arrow-back" color="white"/>} onPress={() => navigation.goBack()}/>
                <Button containerStyle={{flex:1}} type="clear" icon={<Icon name="event" color="white"/>}/>
                    </View>
                ),
                headerStyle: {
                    backgroundColor: secundaireColor,
                  },
            });
        }, [navigation, person]);

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
                    setInputs(prevValues => [...prevValues,{id:(inputs.length + 1),times:moment().locale('nl-be').format('h:mm:ss'), image: data.uri,
                    message:"", imagecancelled: data.cancelled, height:data.height , width:data.width}]);
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
         
            }else{
              Alert.alert("you to get permissions");
            }
        
        }


        const User = ({times, message, id, image, height, width}) => {
            return(
                <View key={id} style={{flexDirection:"row", justifyContent:"flex-end", padding:10}}>
                    <View style={{backgroundColor:secundaireColor, borderColor:secundaireColor, borderWidth:1, borderRadius:10,width:"60%"}}>
                        <Text style={{textAlign:'center', fontSize:12, color:colorWhite,padding:4, backgroundColor:colorLightGreen, 
                        borderTopRightRadius:10 , borderTopLeftRadius:10 }}>{times}</Text>
                        {
                                (image != "")&&<Image source={{uri: image}} style={{ width: width/3, height: height/3 }}/>
                            }
                        <Text style={{textAlign:'left', fontSize:12, color:colorWhite,padding:10, }}>{message}</Text>
                    </View>
                <View style={{backgroundColor:secundaireColor,borderColor:secundaireColor, borderWidth:1, height:10, width:10, borderRadius:25}}>
                </View>
        </View>
            )
        }

        const Contact = ({times, message, id, image, height, width}) => {
                return(
                <View key={id} style={{flexDirection:"row", justifyContent:"flex-start",padding:10, elevation:1}}>
                        <View style={{backgroundColor:colorWhite,borderColor:secundaireColor, borderWidth:1, height:10,width:10, borderRadius:25}}>
                        </View>
                        <View style={{backgroundColor:colorWhite, borderColor:secundaireColor, borderWidth:1, borderRadius:10,minWidth:"60%"}}>
                            <Text style={{textAlign:'center', fontSize:12, color:colorDarkGrey ,padding:4, 
                                backgroundColor:colorLightGrey, borderTopRightRadius:10 , borderTopLeftRadius:10}}>{times}</Text>
                            {
                                (image != "")&&<Image source={{uri: image}} style={{ width: width/8, height:height/8}}/> 
                            }
                            <Text style={{textAlign:'left', fontSize:12, color:colorDarkGrey ,padding:10,}}>{message}</Text>
                        </View>
                </View>
                )
        }


function ChangeText(e) {
        settext(e);
}
function addChat(item) {
    moment.locale("nl-be");
    if(text){
        setInputs(prevValues => [...prevValues,{id:(inputs.length + 1),times:moment().format('hh:mm:ss'), image:"",
        message:text, imagecancelled: false}]);
        firestore.collection("Chatter").doc(item.id).collection("messages").add({
            timestamp: _firebase.firestore.FieldValue.serverTimestamp(),
            chat:text,
            groupname: item.groupname,
            members: item.members,
            photoUrl:item.photo
        });
    settext("");}
}

    return (
        <View style={{flex:1, backgroundColor:colorWhite}}>
            
            {
                inputs.length != 0 ? <FlatList
                            data={inputs}
                            keyboardShouldPersistTaps="never"
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            /> : <View style={{flex:1, alignItems:"center"}}>
                                    <Text style={{borderRadius:10, marginVertical:10,
                                                    backgroundColor:colorLightGrey, padding:10, 
                                                color:colorDarkGrey}}>Start uw chat</Text></View>
            }
          
            <ChatInput text={text} ChangeText={ChangeText} addChat={addChat} 
            pickFromGallery={pickFromGallery} pickFromCamera={pickFromCamera}/>
        </View>
    )
}

export default GroepsView

const styles = StyleSheet.create({
    circle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:50,
        width:50,
        borderRadius:25,
      },
})
