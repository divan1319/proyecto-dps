import React,{useState,useEffect,useLayoutEffect, useCallback,useInsertionEffect} from 'react';
import { StyleSheet,Text,View,ScrollView,Image,FlatList,TouchableOpacity, TouchableHighlight } from 'react-native';
import  MaterialIcons  from '@expo/vector-icons/MaterialIcons';
import MessageCard from '../components/MessageCard';
import DataMessage from '../utils/DataMessage';
import ChatUser from './ChatUser';

/**<TouchableOpacity onPress={()=>{props.navigation.navigate('HomeNavigation',{screen:'ChatUser'});}}>
        <MaterialIcons name='keyboard-arrow-left' size={48} style={styles.container}/>            
    </TouchableOpacity>                 */
const styles=StyleSheet.create({
    regresar:{
        marginTop:6,        
    },
    top:{
        backgroundColor: '#292929',
        height:60,        
        display: 'flex',
        flexDirection: 'row',        
    },
    txtTitle:{
        color: 'white',
        fontSize: 24,
        textAlign:'center',
        textAlignVertical:'center',
        marginRight:10,
        fontFamily: 'Roboto',
    },
    icono:{
        color: 'white',
        backgroundColor: '#706F6F',
        height: 24,
        width:24,
        borderRadius:100,
        fontSize: 14,
        textAlign:'center',
        textAlignVertical:'center',
        marginTop:20,
   },
   container:{
    height:'100%',
    backgroundColor:'#F5F5F5',
   }

  
});
let quantity =0;

export default function ChatRoom(props) {
    
    //Se extraen las cantidades de mensajes de cada chat en forma de arreglo
    //Y luego en el render se suman con el método reduce    
    let cantidaddemensajes=0;    
    cantidaddemensajes=DataMessage.map(element =>element.quantity).reduce((a,b)=>a+b,0);

    const Item=({uri,username,textmessage,date,quantity,status,id})=>{
        
        return(
            <MessageCard id={id} status={status} username={username} uri={uri} textmessage={textmessage} quantity={quantity} date={date}
            />
        )
       
    };    
    
    const renderItem=({item})=>{        
        
        return(
            <TouchableHighlight  underlayColor="#F5F5F6" onPress={()=>{props.navigation.navigate('HomeNavigation',{screen:'ChatUser',
            params:{
                id:item.id,
                uri:item.uri,
                username:item.username,
                textmessage:item.textmessage,
                date:item.date,
                quantity:item.quantity,
                status:item.status,
                totalmsg:quantity,                

            }})}}>
                <Item id={item.id} uri={item.uri} username={item.username} 
                textmessage={item.textmessage} date={item.date} quantity={item.quantity} 
                status={item.status}   />
            </TouchableHighlight >
        )
        
    };   
    console.log(quantity);
   
   
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableHighlight style={styles.regresar} onPress={()=>{props.navigation.navigate('HomeNavigation',{screen:'Home',
                params:{
                    totalmensajes:cantidaddemensajes,
                }})}}>
                <MaterialIcons name='keyboard-arrow-left'color={"white"} size={48}/>            
                </TouchableHighlight>                
                <Text style={styles.txtTitle}>Mensajes</Text>
                <Text style={styles.icono}>{cantidaddemensajes}</Text>                
            </View>            
                <FlatList
                    data={DataMessage}
                    renderItem={renderItem}
                    keyExtractor={item=>item.id}
                />                        
        </View>
        
    )    
}