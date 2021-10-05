import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actions-sheet';
import { Icon, Button, ListItem } from 'react-native-elements';
import { colorGreenIcon, colorWhite } from '../../../constants/Colors';
import HeaderAnimated from '../../HeaderComponent.jsx/HeaderAnimated';
import { Dimensions, StyleSheet, View ,Text, Alert} from 'react-native';

const ChatviewGroep = ({person,renderItem,renderSeparator,text,selectedId,filterArray,changeView,actionSheetRef,navigation,pickFromCamera}) => {
    return (
        <View style={styles.container}>
        <HeaderAnimated filterArray={(e) => filterArray(e)} placeholder="Search a group..." text={text} 
        changeView={changeView} />
          <FlatList
            data={person}
            ItemSeparatorComponent={renderSeparator}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            extraData={selectedId}/>
      
          <Button icon={<Icon name="camera" color={colorWhite} borderRadius={50} iconStyle={{fontSize: 40}}  />} 
            containerStyle={styles.cont_btn_camera} 
            buttonStyle={styles.btn_style_camera}
            onPress={() => pickFromCamera()}/>

          <Button icon={<Icon name="chat" color={colorGreenIcon} borderRadius={50} iconStyle={{fontSize: 30}}  />} 
            containerStyle={styles.cont_btn_chat} 
            buttonStyle={styles.btn_style_chat}
            onPress={() => navigation.navigate('NewGroep')}/>
            <ActionSheet ref={actionSheetRef}>
            <View>
                <ListItem bottomDivider>
                    <ListItem.Content>
                    <ListItem.Title>Create new</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </View>
        </ActionSheet> 
      </View>
    )
}

export default ChatviewGroep

const styles = StyleSheet.create({
    main:{
        flex:1
    },
    container:{
        backgroundColor:colorWhite,
        flex:1
    },
    cont_btn_camera_cr:{
      position:"relative",
      flex:1,
      justifyContent:"center",
      alignItems:'center',
      borderRadius:10,
    },
    btn_style_camera_cr:{
      padding:8,
      backgroundColor:colorGreenIcon,
    },
    cont_btn_camera:{
      position:'absolute', 
      bottom:100,
      borderRadius:50, 
      right:20,
      shadowColor:"black",
      shadowOffset:{
        width:0,
        height:2
    },
    shadowRadius:3.5,
    shadowOpacity:0.2,
    elevation:11
    },
    btn_style_camera:{
      padding:2,
      backgroundColor:colorGreenIcon,
    },
    cont_btn_chat:{
      position:'absolute', 
      bottom:170,
      borderRadius:50, 
      right:20,
      shadowColor:"black",
      shadowOffset:{
        width:0,
        height:2
    },
    shadowRadius:3.5,
    shadowOpacity:0.2,
    elevation:11
    },
    btn_style_chat:{
      padding:7,
      backgroundColor:colorWhite, 
    }
})
