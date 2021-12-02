import React from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import ActionSheet from 'react-native-actions-sheet'
import { Button, Icon, ListItem } from 'react-native-elements'
import Accordian from '../../../components/Accordian'
import { secundaireColor, colorWhite } from '../../../constants/Colors'
import HeaderAnimated from '../../HeaderComponent.jsx/HeaderAnimated'

const ChatviewUserGroep = ({person,group,renderItem,renderItemGroup,renderSeparator,text,selectedId,filterArray,changeView,actionSheetRef,navigation,pickFromCamera}) => {
    return (
        <View style={styles.container}>
          <HeaderAnimated filterArray={(e) => filterArray(e)} text={text} placeholder="Search user..." 
          changeView={changeView} />
          <Accordian name="Users" iconname="people" List={
            <FlatList
            data={person}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator}
            style={{height:Dimensions.get("window").height / 2.7}}
            keyExtractor={item => item.id.toString()}
            extraData={selectedId}
            />
        }/>
        <Accordian name="Group" iconname="groups" List={
            <FlatList
            data={group}
            renderItem={renderItemGroup}
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={item => item.id.toString()}
            extraData={selectedId}
            />
        }/>
          <Button icon={<Icon name="camera" color={colorWhite} borderRadius={50} iconStyle={{fontSize: 40}}  />} 
            containerStyle={styles.cont_btn_camera} 
            buttonStyle={styles.btn_style_camera}
              onPress={() => pickFromCamera()}/>
          <Button icon={<Icon name="chat" 
                color={secundaireColor} borderRadius={50} iconStyle={{fontSize: 30}}  />} 
                containerStyle={styles.cont_btn_chat} 
                buttonStyle={styles.btn_style_chat}
                onPress={() => {actionSheetRef.current?.setModalVisible();}}/>
          <ActionSheet ref={actionSheetRef}>
          <View>
            <ListItem bottomDivider onPress={() => navigation.navigate('NewChat')}>
                <ListItem.Content>
                  <ListItem.Title>Create new chat</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider onPress={() => navigation.navigate('NewGroep')}>
                <ListItem.Content>
                  <ListItem.Title>Create new groupchat</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
          </View>
        </ActionSheet> 
    </View>
    )
}

export default ChatviewUserGroep

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
      backgroundColor:secundaireColor,
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
      backgroundColor:secundaireColor,
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
