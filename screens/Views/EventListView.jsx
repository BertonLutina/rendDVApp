import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Agenda} from 'react-native-calendars'
import { Dimensions } from 'react-native';
import { buttonPrimaryColor, colorWhite, colorYello } from '../../constants/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { getAll } from 'react-native-contacts';
import testID from '../Events/testID';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { Button } from 'react-native-elements/dist/buttons/Button';




const EventListView = () => {
    
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const [items, setItems] = useState({});

const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  }

const renderItem = (item) => {
    return (
      <TouchableOpacity
        testID={testID.agenda.ITEM}
        style={[styles.item, {height: item.height}]}
        onPress={() => alert(item.name)}
      >
        <Text>{item.name}</Text>
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
            <Agenda
            testID={testID.agenda.CONTAINER}
            items={items}
            loadItemsForMonth={loadItems.bind(this)}
            selected={"2021-06-10"}
            renderItem={renderItem.bind(this)}
            renderEmptyDate={renderEmptyDate.bind(this)}
            rowHasChanged={rowHasChanged.bind(this)}/>
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
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }})
