import { useNavigation } from "@react-navigation/core";
import { Alert } from "react-native";
import { firestore, _firebase } from "../../auth/firebase"


let Date = _firebase.firestore.FieldValue.serverTimestamp();

export async function createChatter(data,back) {
     let user =  (await firestore.collection("Chatter").doc(data.id).get()).exists;
     data['createDate'] = Date;
     data['modifiyDate'] = _firebase.firestore.FieldValue.serverTimestamp();
        if (user == false){
                firestore.collection("Chatter")
                .doc(data.id)
                .set(Object.assign({}, data)).then(() => back.goBack());
            
        }else{
            Alert.alert("Gebruiker bestaat al "+data.firstName);
        }

}

export function readChatterAll() {
    firestore.collection('Chatter').onSnapshot((snapshot) => {
        return snapshot.docs.map(doc => doc.data());
      });
}

export async function createGroupsChatter(data,back) {
    //let user =  await firestore.collection("GroupsChatter").where('groupname', '==', data.groupname).get();
    const uid = firestore.collection("GroupsChatter").doc().id;
    data['createDate'] = Date;
    data['modifiyDate'] = _firebase.firestore.FieldValue.serverTimestamp();
    data['id']= uid;
       //if (user.empty){
               firestore.collection("GroupsChatter")
                .doc(uid)
                .set(Object.assign({}, data)).then(() => back.navigate("Tabs"));
       //}else{
        //   Alert.alert("Gebruiker bestaat al "+data.name);
       //}
}

export function readGroupsChatterAll() {
    firestore.collection('GroupsChatter').onSnapshot((snapshot) => {
        return snapshot.docs.map(doc => doc.data());
      });
}

export function createEvent(data) {
    firestore.collection("Event")
    .doc(data.id)
    .set({
        username : data.name, 
        id: data.id, 
        date: data.date,
        users: data.users,
        historychat: data.historychat,
        shortMessage: data.message, 
        photo: data.photo, 
        plan: data.plan
    });
}

export function createGroupsEvent(data) {
    firestore.collection("GroupsEvent")
    .doc(data.id)
    .set({
        eventName : data.name, 
        id: data.id, 
        date: data.date,
        users: data.users,
        historyChat: data.historychat,
        shortMessage: data.message, 
        photo: data.photo, 
        plan: data.plan
    });
}