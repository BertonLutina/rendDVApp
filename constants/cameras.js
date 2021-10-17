
import { Camera } from 'expo-camera';
import { launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import { Alert } from 'react-native';
import { auth, firestore, _firebase } from '../auth/firebase';
import { getChatterId } from './constantFunction';

export let Photosurl = "";

export const pickFromGallerys = async (obj) => {
    let user_id = auth.currentUser.uid;
    const {granted} = await requestMediaLibraryPermissionsAsync();
    if(granted){
        let data = await launchImageLibraryAsync({
        mediaTypes:MediaTypeOptions.Images,
        allowsEditing:false,
        aspect:[1,1],
        quality:0.5
        });

        if(!data.cancelled){
            obj.photo = data.uri;
            Photosurl = data.uri;
            firestore.collection(getChatterId(user_id)).doc(obj.id).update({"photo":data.uri});
        }
        }else{
             null;
        }
}

export const pickFromCameras = async (obj) => {
    let user_id = auth.currentUser.uid;
    const {granted} = await Camera.requestPermissionsAsync();
    if(granted){
        let data = await launchCameraAsync({
        mediaTypes:MediaTypeOptions.Images,
        allowsEditing:true,
        aspect:[1,1],
        quality:0.5
        });
        if(!data.cancelled){
            firestore.collection(getChatterId(user_id)).doc(obj.id).update({"photo":data.uri});
        }
        }else{
            null;
        } 
    }

