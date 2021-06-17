import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Image, Input,Button } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import UrlImage from '../../assets/rendv_images/icon.png'
import { colorblue, colorGreen, colorRose, colorYello, colorDarkGreen, colorWhite, colorLightGreen, colorLightblue,colorLightRose, colorDarkblue } from '../../constants/Colors'

const Register = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.subcont}>
            
            <View style={{position:'absolute', top:40, left:0, height:40, 
                    width:110, 
                    display:"flex", flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <Text style={{fontSize:24,color:"white"}}> <Icon name="arrow-left" size={24}/> Back</Text>
            </TouchableOpacity>

            </View>
            <Image style={{height:100, width:100, position:"relative", top:40}} source={UrlImage}/>
            <Input inputContainerStyle={styles.input} keyboardType="email-address" containerStyle={{height:50}} placeholder="Email"/>
            <Input inputContainerStyle={styles.input} containerStyle={{height:50}} placeholder="******"/>
            <Input inputContainerStyle={styles.input} keyboardType="numeric" containerStyle={{height:60}} placeholder="Phonenumber"/>
            <Button  
                buttonStyle={{ padding:10, borderWidth:2,borderColor: colorWhite , height:50,}} 
                containerStyle={styles.btn1} title="Sign up" type="outline"
                titleStyle={{color:colorWhite}} onPress={() => navigation.navigate('Tabs')}/>
            <View style={{display:'flex', flexDirection:'row', borderTopWidth: 1,borderTopColor: colorDarkblue, width:"94%", paddingVertical:30, marginTop:30}}>
                <View style={{display:'flex', flexDirection:'row'}}>
                <Button buttonStyle={{backgroundColor:colorLightblue, 
                        width:50, height:50, borderWidth:1, borderColor:colorblue,
                        borderTopLeftRadius:15,borderBottomRightRadius:15,}} 
                        icon={<Icon name="facebook-f" color={colorblue} style={{fontSize:20}}/>} onPress={() => navigation.navigate('Tabs')}/>
                <Button buttonStyle={{marginLeft:10,backgroundColor:colorWhite, 
                        width:50, height:50, borderWidth:1, borderColor:colorGreen,
                        borderTopLeftRadius:15,borderBottomRightRadius:15}} 
                        icon={<Icon name="whatsapp"  color={colorGreen}  style={{fontSize:20}} onPress={() => navigation.navigate('Tabs')}/>}/>
                <Button buttonStyle={{marginLeft:10,backgroundColor:colorLightRose, 
                        width:50, height:50, borderWidth:1, borderColor:colorRose,
                        borderTopLeftRadius:15,borderBottomRightRadius:15,}} 
                        icon={<Icon name="google" color={colorRose} style={{fontSize:20}}/>} onPress={() => navigation.navigate('Tabs')}/>
                </View>
                <View style={{display:'flex',  marginLeft:20, height:50}}>
                <Icon name="long-arrow-alt-left" color={colorWhite} style={{fontSize:20,marginRight:20,position:'relative', top:10}} /> 
                   <Text style={{position:"relative", bottom:15, color:colorDarkGreen}}>
{`          Sign up with your 
        socialmedia account`}</Text>
                </View>
            </View>
            </View>
            
        </View>
    )
}

export default memo(Register)

const styles = StyleSheet.create({
    container:{
        flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white",
    },
    subcont:{
        flex:1,
        display:"flex",
        position:"relative", 
        justifyContent:"center",
        alignItems:"center",
        borderWidth:2,
        borderColor:colorGreen,
        width:"100%",
        bottom:0,
        height:450,
        borderTopLeftRadius:4,
        borderBottomRightRadius:4,
        borderTopRightRadius:4,
        borderBottomLeftRadius:4,
        backgroundColor: "#91cfc1"
        
    },
    btn1:{
        width:"95%",
        marginBottom:10,
    },
    input:{
        borderStyle:"solid",
        borderColor:colorGreen,
        borderWidth:1,
        paddingLeft:10,
        borderRadius:4,
        width:"100%",
        fontSize: 12,
        height:48,
        backgroundColor:"white"
    }
})
