import { useNavigation } from '@react-navigation/native'
import { launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync } from 'expo-image-picker'
import moment from 'moment'
import React, { useState } from 'react'
import { Camera } from 'expo-camera';
import { ScrollView, StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import { Icon, Button, Avatar, Input} from 'react-native-elements'
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-android'
import { FlatList } from 'react-native-gesture-handler'
import { backGroundColor, colorDarkblue, colorDarkGreen, colorDarkGrey, colorGreen, colorLightGreen, colorLightGrey, colorRose, colorWhite } from '../../constants/Colors'
import { Image } from 'react-native';

const ChatInput = ({text, ChangeText, addChat,pickFromGallery,pickFromCamera}) => {
    return(
        <View style={{flexDirection:"row", width:"100%",alignItems:"center", height:60,
            backgroundColor:"transparent"}}>
            <View style={{flexDirection:"row", width:"100%", flex:1, marginLeft:5,
            height:50,backgroundColor:colorGreen, alignItems:"center",borderRadius:50}}>
            <Button  type="clear" icon={<Icon name="camera" color={colorWhite} onPress={pickFromCamera}/>}/>
            <Button  type="clear" icon={<Icon name="image-search" color={colorWhite} onPress={pickFromGallery} />}/>
                <Input  placeholder="bericht maken" inputContainerStyle={{backgroundColor:colorWhite,borderRadius:10,paddingLeft:10, borderBottomWidth:0}}
                    style={{fontSize:13}} containerStyle={{padding:0, height:40, flex:1}} onChangeText={ChangeText} value={text}/>
                <Button  type="clear" icon={<Icon name="mood" color={colorWhite}/>}/> 
            </View>
            <Button buttonStyle={{backgroundColor:colorWhite, borderRadius:25, 
                    borderWidth:1, borderColor:colorGreen, marginHorizontal:5}}  
                    type="clear" icon={<Icon name="send" color={colorGreen}  onPress={addChat}/>}/>
            </View>
    )
}

const ChatHeader = ({item}) => {
    let navigation = useNavigation();
    return(
        <View >
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", backgroundColor:colorGreen, height:60}}>
                <Button  containerStyle={{flex:1}} type="clear" icon={<Icon name="arrow-back" color="white"/>} onPress={() => navigation.goBack()}/>
                <Button containerStyle={{flex:1}} type="clear" icon={<Icon name="event" color="white"/>}/>
                <Button containerStyle={{flex:1}} type="clear" icon={<Icon name="wifi-calling" color="white"/>}/>
                <Text style={{flex:5, fontSize:18, color:"white"}}>{item.name}</Text>
                <Avatar source={{uri : item.image.uri}} 
                rounded={true} size={45} title={item.name} containerStyle={{borderColor:colorWhite, borderWidth:2, marginRight:5}} />
            </View>
            <View style={{backgroundColor:colorGreen, padding:4,}}>
                <Text style={{textAlign:'center', fontSize:12, color:colorWhite}}>Verbonden om: 10/06/2021</Text>
            </View>
            </View>
    )
}



const ChatView = ({route,navigation}) => {
    const [inputs, setInputs] = useState([]);
    const [text, settext] = useState("");
    const renderItem = ({ item }) => {
        let code = item.message.split(",")[0];
        let mess = item.message.split(",")[1];
        if(code == "2"){
            return (<User id={item.id} times={item.times} 
                            message={mess} height={item.height} width={item.width}
                            imagecancelled={item.imagecancelled} image={item.image}/>);  
        }else{
            return (<Contact id={item.id} times={item.times} 
                            message={item.message} height={item.height} width={item.width}
                            imagecancelled={item.imagecancelled} image={item.image}/>);  
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
              console.log("gallery: ",data);
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
              console.log("camera: ",data);
            }else{
              Alert.alert("you to get permissions");
            }
        
          }


const User = ({times, message, id, image,imagecancelled, height, width}) => {
    return(
        <View key={id} style={{flexDirection:"row", justifyContent:"flex-end", padding:10}}>
            <View style={{backgroundColor:colorGreen, borderColor:colorGreen, borderWidth:1, borderRadius:25,width:"60%"}}>
                <Text style={{textAlign:'center', fontSize:12, color:colorWhite,padding:4, backgroundColor:colorLightGreen, borderTopRightRadius:25 , borderTopLeftRadius:25 }}>{times}</Text>
                {
                        (image != "")&&<Image source={{uri: image}} style={{ width: width/3, height: height/3 }}/>
                    }
                <Text style={{textAlign:'left', fontSize:12, color:colorWhite,padding:10, }}>{message}</Text>
            </View>
        <View style={{backgroundColor:colorGreen,borderColor:colorGreen, borderWidth:1, height:10, width:10, borderRadius:25}}>
        </View>
</View>
    )
}

const Contact = ({times, message, id, image,imagecancelled, height, width}) => {
        return(
        <View key={id} style={{flexDirection:"row", justifyContent:"flex-start",padding:10}}>
                <View style={{backgroundColor:colorWhite,borderColor:colorGreen, borderWidth:1, height:10,width:10, borderRadius:25}}>
                </View>
                <View style={{backgroundColor:colorWhite, borderColor:colorGreen, borderWidth:1, borderRadius:25,minWidth:"60%"}}>
                    <Text style={{textAlign:'center', fontSize:12, color:colorDarkGrey ,padding:4, 
                    backgroundColor:colorLightGrey, borderTopRightRadius:25 , borderTopLeftRadius:25}}>{times}</Text>
                    {
                        (image != "")&&<Image source={{uri: image}} style={{ width: width/10, height:height/10}}/> 
                    }
                    <Text style={{textAlign:'left', fontSize:12, color:colorDarkGrey ,padding:10,}}>{message}</Text>
                </View>
        </View>
        )
}


function ChangeText(e) {
        settext(e);
}
function addChat() {
    moment.locale("nl-be");
    if(text){
        setInputs(prevValues => [...prevValues,{id:(inputs.length + 1),times:moment().format('h:mm:ss'), image:"",
        message:text, imagecancelled: false}]);
    settext("");}
}
   const {person} = route.params;
    return (
        <View style={{flex:1, backgroundColor:backGroundColor}}>
            <ChatHeader item={person}/>
            {
                inputs&&(<FlatList
                            data={inputs}
                            keyboardShouldPersistTaps="never"
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            />) || (<Text>Start uw chat</Text>)
            }
          
            <ChatInput text={text} ChangeText={ChangeText} addChat={addChat} 
            pickFromGallery={pickFromGallery} pickFromCamera={pickFromCamera}/>
        </View>
    )
}

export default ChatView

const styles = StyleSheet.create({})
