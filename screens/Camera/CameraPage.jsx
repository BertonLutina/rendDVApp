import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { colorBlack, colorDarkGreen,colorRose, colorWhite } from '../../constants/Colors';


const CameraPage = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const pickFromGallery = async () => {
    const {granted} = await requestMediaLibraryPermissionsAsync();
    if(granted){
     let data = await launchImageLibraryAsync({
        mediaTypes:MediaTypeOptions.Images,
        allowsEditing:true,
        aspect:[1,1],
        quality:0.5
      })
      
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
      })
    }else{
      Alert.alert("you to get permissions");
    }

  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    return () => {
      setHasPermission(null); // This worked for me
    };

  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <View style={{flex:1, flexDirection:'column'}}>
            <View style={{flex:1, flexDirection:'row'}}>
            <TouchableOpacity style={styles.button2}
            onPress={() => { setType( type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.flip}> 
              <Icon 
              size={40}
              containerStyle={{
                   }} name="flip-camera-android" color={colorWhite}/></Text>
          </TouchableOpacity>
            </View>
            <View style={{flex:1,  display:"flex",
                    justifyContent:"center"}}>
            
            </View>
            <View style={{flex:1,flexDirection:"row",
                    justifyContent:"space-between",alignItems:"center", opacity:1}}>
            <TouchableOpacity style={styles.button} onPress={() => pickFromGallery()}>
            <Text style={styles.text}> 
              <Icon 
              size={40}
              containerStyle={{
                   }} name="collections" color={colorWhite}/></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => pickFromCamera()}>
            <Text style={styles.text2}> 
              <Icon 
              size={60}
              containerStyle={{
                   }} name="camera" color={colorWhite}/></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.text3}> 
              <Icon 
              size={40}
              containerStyle={{
                   }} name="clear" color={colorWhite}/></Text>
          </TouchableOpacity>
            </View>
          </View>
          
        </View>
      </Camera>
    </View>
  );
}

export default CameraPage
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    width:170,
    height:170,
  },
  button2: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-end',
    width:170,
    height:170,
  },
  text: {
    color: 'white',
    opacity:0.5,
    padding:10,
    backgroundColor:colorBlack,
    borderRadius:50
  },
  text2: {
    color: 'white',
    opacity:0.8,
    padding:5,
    backgroundColor:colorDarkGreen,
    borderRadius:50
  },
  text3: {
    color: 'white',
    opacity:0.8,
    padding:10,
    backgroundColor:colorBlack,
    borderRadius:50
  },
  flip: {
    color: 'white',
    opacity:0.3,
    padding:5,
    backgroundColor:colorRose,
    borderRadius:50
  },
});