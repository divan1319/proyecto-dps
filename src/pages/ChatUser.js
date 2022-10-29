import React,{useState,useEffect} from 'react';
import { StyleSheet,Text,View,ScrollView,Image,FlatList,TouchableOpacity, TouchableHighlight } from 'react-native';
import  MaterialIcons  from '@expo/vector-icons/MaterialIcons';
import DataMessage from '../utils/DataMessage';


const styles=StyleSheet.create({
    regresar:{
        marginTop:6,        
    },
    top:{
        backgroundColor: '#292929',
        height:60,
        width:'100%',
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',        
    },
    txtTitle:{
        color: 'white',
        fontSize: 22,        
        textAlignVertical:'center',
        marginRight:5,
        marginLeft:10,
        width:'70%',
    },
    icono:{
        color: 'white',
        backgroundColor: 'gray',
        height: 24,
        width:24,
        borderRadius:100,
        fontSize: 14,
        textAlign:'center',
        textAlignVertical:'center',
        marginTop:20,
   },
   perfil:{
    width:45,
    height:45,
    borderRadius:100,
    alignSelf: 'center',
    
   },
   container:{
    height:'100%',
    backgroundColor:'#F5F5F5',
   }

  
});


    const item=(item)=>{

    }

    const renderItem=()=>{

    }

export default function ChatUser(props) {
     //props.route.params.somedata Permite obtener parametros de otra Screen!!
    console.log(props.route.params);
    DataMessage[0].chat[props.route.params.id].quantity =0;    
   
   
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableHighlight style={styles.regresar} onPress={()=>{props.navigation.navigate('HomeNavigation',{screen:'ChatRoom',
                params:{
                id:props.route.params.id,
                uri:props.route.params.uri,
                username:props.route.params.username,
                textmessage:props.route.params.textmessage,
                date:props.route.params.date,
                quantity:props.route.params.quantity,
                status:props.route.params.status,                
            }})}}>
                <MaterialIcons name='keyboard-arrow-left'color={"white"} size={48}/>            
                </TouchableHighlight>   
                <Image style={styles.perfil} source={{uri:props.route.params.uri}}             />
                <Text numberOfLines={1} style={styles.txtTitle}>{props.route.params.username}</Text>                
            </View>  
            <FlatList
            />
        </View>
    )
    
}