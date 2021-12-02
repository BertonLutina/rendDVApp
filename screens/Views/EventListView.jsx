import React, { useState,useEffect } from 'react'
import { Alert, StyleSheet, Text, View,Modal } from 'react-native'
import { Agenda} from 'react-native-calendars'
import { Dimensions } from 'react-native';
import { buttonPrimaryColor, colorblue, colorGreen, colorOrange, colorRose, colorWhite, colorYello } from '../../constants/Colors';
import { Icon,Button } from 'react-native-elements';
import { getAll } from 'react-native-contacts';
import testID from '../Events/testID';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { Pressable } from 'react-native';
import { getCurrentDateReverse, getEventId } from '../../constants/constantFunction';
import { firestore, _firebase } from '../../auth/firebase';




const EventListView = () => {
let dateNow = new Date()
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const [items, setItems] = useState({});
const [userItem, setItem] = useState("");
const [dates, setDates] = useState({});
const [modalVisible, setModalVisible] = useState(false);

const [times, setTimes] = useState({});

  function ShowModal(item) {
    setItem(item);
    setModalVisible(true);
  }
  useEffect(() => {
    let unmouted = false;
    let ab = new AbortController();
    _firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      let array = {}
        firestore.collection(getEventId(user.uid))
        .onSnapshot((snapshot) => {
            //if(!unmouted){

              Object.values(snapshot.docs.map(doc => doc.data())).map((obj) => {
                Object.entries(obj).map(([date,values]) => {
                  if(array.hasOwnProperty(date)){
                    let val = array[date];
                    val.push(values)
                    array[date] = val;
                  }else{
                    array[date] = [values];
                  }
                });
                console.log(obj);
                setDates(obj); 
              })
              setTimes(array);
          //}
        });
      
    } else {
        Alert.alert("LogOut","You're LogOut please Login Again");
    }
    });

    return () => {
     // unmouted = true;
      ab.abort();
      }
    
}, [setDates,setTimes])

const renderItem = (item) => {

    return (
      <TouchableOpacity
        testID={testID.agenda.ITEM}
        style={[styles.item, {maxHeight: 500, flexDirection:"row",borderRightWidth:3, borderRightColor: item.selectedColor,
         borderLeftWidth:5, borderLeftColor: item.selectedColor}]}
        onPress={() => ShowModal(item)}
      >
          <View style={{maxHeight: 500, flexDirection:"column",justifyContent:"center", flex:2}}>
            <Text style={{fontSize:20, color:"gray", fontFamily:"notoserif"}}>{item.name}</Text>
            <Text style={{fontSize:11, color:"gray", fontFamily:"notoserif"}}>ACT: {item.activity}</Text>
            <Text style={{fontSize:11, color:"gray", alignItems:"center", fontFamily:"notoserif"}}><Icon name="person" containerStyle={{paddingTop:10}} 
            iconStyle={{fontSize:12}} color={"gray"}/> {item.contactname}</Text>
          </View>
          <View style={{maxHeight: 500,flex:1}}>
            <Text style={{fontSize:12, color:"gray", fontFamily:"notoserif",textAlign:"right"}}>{item.uurvan} - {item.uurtot}</Text>
          </View>
          
        
        
      </TouchableOpacity>
    );
  }

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
    return (
        <View style={{flex:1}}>
            {/* <Agenda
            testID={testID.agenda.CONTAINER}
            items={items}
            loadItemsForMonth={loadItems.bind(this)}
            selected={"2021-06-27"}
            renderItem={renderItem.bind(this)}
            renderEmptyDate={renderEmptyDate.bind(this)}
            rowHasChanged={rowHasChanged.bind(this)}/> */}
             <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{userItem.name} {JSON.stringify(userItem)}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
            <Agenda 
            items={times}
            firstDay={1} 
            markedDates={dates}
            minDate={getCurrentDateReverse}
            rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
            renderItem={renderItem.bind(this)} 
            renderEmptyData = {() => {return (<View />);}}
            scrollEnabled={true}
            renderEmptyDate={() => {return (<View />);}}
            selected={getCurrentDateReverse}/>
            <Button  icon={<Icon name="event-note" color={colorWhite} borderRadius={50} iconStyle={{fontSize: 40}}  />} 
         containerStyle={{position:'absolute', bottom:60,borderRadius:50,  right:20,shadowColor:"black",shadowOffset:{
            width:0,
            height:2
        },
        shadowRadius:3.5,
        shadowOpacity:0.2,
          elevation:11}} 
         buttonStyle={{padding:8,backgroundColor:buttonPrimaryColor}}
        />
        
        </View>
        
    )
}

export default EventListView

const styles = StyleSheet.create({
    item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 10
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    height:400,
    width:300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 11
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }})
