
import { firestore, _firebase } from "../../auth/firebase";
import { getChatterId, getGroupsId } from "../../constants/constantFunction";



export async function addChats(data,id) {
    let dateTime  = _firebase.firestore.FieldValue.serverTimestamp();
    let times = new Date(Date(dateTime).toString()).toLocaleTimeString();
    let ref = firestore.collection(getChatterId(uid)).doc(id).collection("messages").doc().id;

    let uid =  await _firebase.auth().currentUser.uid;
     data['timestamp'] = times;
     data["id"] = ref;
     firestore.collection(getChatterId(uid)).doc(id).collection("messages").doc(ref).set(data);
}


export async function createChatter(data,back) {
    let uid =  await _firebase.auth().currentUser.uid;
    let dateTime  = _firebase.firestore.FieldValue.serverTimestamp();
    let Dates = new Date(Date(dateTime).toString()).toString();
     data['createDate'] = Dates;
     data['modifiyDate'] = Dates;
                firestore.collection(getChatterId(uid))
                .doc(data.id)
                .set(Object.assign({}, data)).then(() =>back.navigate("Tabs",{
                    view: 1
                }));

}



export function readChatterAll() {
    firestore.collection('Chatter').onSnapshot((snapshot) => {
        return snapshot.docs.map(doc => doc.data());
      });
}

export async function createGroupsChatter(data,back) {
    //let user =  await firestore.collection("GroupsChatter").where('groupname', '==', data.groupname).get();
    let uid =  await _firebase.auth().currentUser.uid;
    let dateTime  = _firebase.firestore.FieldValue.serverTimestamp();
    let Dates = new Date(Date(dateTime).toString()).toString();

    let g_uid = getGroupsId(uid);
    let ref = firestore.collection(g_uid).doc();
    data['createDate'] = Dates;
    data['modifiyDate'] = Dates;
    data['id']= ref.id;
       //if (user.empty){
               firestore.collection(g_uid).doc(ref.id)
               .set(Object.assign({}, data)).then(() => back.navigate("Tabs",{
                   view: 3
               }));
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