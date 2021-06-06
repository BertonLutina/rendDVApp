import React, { useEffect,useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import { ListItem,Icon } from 'react-native-elements';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Chat from '../Chat/Chat';
import Contact from '../Contact/Contact';
import { colorblue, colorGreen, colorRose, colorYello } from '../../constants/Colors';

let dubbel = '';

const ContactListview = () => {

 const [person, setPerson] = useState([]);

 const setExpanded = (user) => {
  let NewArr = [...person];
   if(user.hasOwnProperty('group') ){
    NewArr[user.group].expanded = !NewArr[user.group].expanded;
  }
   setPerson(NewArr);
  //  console.log("person: ",person);
  };

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.Image],
            });

            if (data.length > 0) {
                // data.map((person) => {
                //     if(person.imageAvailable)
                //     console.log("Yeah: ",person);

                // })
                let teller = [];
               let datas = data.reduce((r, e) => {
                // get first letter of name of current element

                let group = e.name[0];
                // if there is no property in accumulator with this letter create it
                if(!r[group]){
                    r[group] = {group,expanded:true, children: [e]}
                    teller.push({group:true});

                }
                // if there is push current element to children array for that letter
                else {r[group].children.push(e);}
                // return accumulator
                return r;
                }, {})

                let result = Object.values(datas);
                //console.log("Group: ",result);
              setPerson(result);
            }

          }
        })();
      }, []);
      return (
        <View style={styles.container}>
          <ScrollView>
            {
                 person.map((user,id) =>
                { 
                   return (
                        <View key={id}>
                      {  <ListItem.Accordion
                            key={id}
                            containerStyle={{backgroundColor:"#ede6e6"}}
                            content={
                                <>
                                <Icon name="person" color={colorGreen} size={30} />
                                <ListItem.Content>
                                    <ListItem.Title style={{color:"#363434"}}>{user.group}</ListItem.Title>
                                </ListItem.Content>
                                </>
                                    }
                                    isExpanded={(user.expanded) ? user.expanded : false}
                                    onPress={() => setExpanded(user)}
                                    >
                          {user.children.map((ps,keys) => {
                            return <Contact
                                        key={keys}
                                        name={ps.name} 
                                        photo ={"G"}/>
                        })}
                       </ListItem.Accordion>}
                      </View>
                    )
                 
                            
                    }
    
                )
                
            }
            </ScrollView>
        </View>
      );
    }

export default ContactListview

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#e3dede"
    }
})


