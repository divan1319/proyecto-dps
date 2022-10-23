import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import Colors from "../utils/Colors";
import PrimaryBadge from "./PrimaryBadge";

export default function MessageCard(props) {      
         
    return (
        <Card style={styles.card} key={props.key}>
            
                {props.quantity == 0 &&(
                <>
                       <View style={{display: 'flex', flexDirection: 'row',}}>
                        <View style={styles.imgcontainer}>
                            <Image style={styles.carImg} source={{uri: props.uri}}/>
                        </View>                        
                        <View style={styles.view2}>                            
                            <Text variant="titleSmall" style={styles.textusername}>
                            {props.username}
                            </Text>
                            <Text numberOfLines={1} style={styles.textmessagenobold} variant="bodyMedium">{props.textmessage}</Text>
                        </View>
                        <View style={styles.view3}>
                            <Text style={styles.textdatenobold}>
                            {props.date}
                            </Text>                            
                        </View>
                    </View>
                </>)
                }
                {props.quantity>0 &&(
                <>
                    <View style={{display: 'flex', flexDirection: 'row',}}>
                        <View style={styles.imgcontainer}>
                            <Image style={styles.carImg} source={{uri: props.uri}}/>
                        </View>                        
                        <View style={styles.view2}>                            
                            <Text variant="titleSmall" style={styles.textusername}>
                            {props.username}
                            </Text>
                            <Text numberOfLines={1} style={styles.textdatebold} variant="bodyMedium">{props.textmessage}</Text>
                        </View>
                        <View style={styles.view3}>
                            <Text style={styles.textdatebold}>
                            {props.date}
                            </Text>
                            <Text style={styles.quantity}> {props.quantity}</Text>
                        </View>
                    </View>
                </>)}                            
        </Card>   
    );
}

const styles = StyleSheet.create({   
    card:{
        marginTop:7,
        marginHorizontal:15,                
        marginBottom:7,
        borderRadius: 15,
        padding:5,
        height:70,
        width:365,
    }, 
    imgcontainer:{
        marginVertical:2,
        marginHorizontal:2,
    },
    carImg: {
        width: 55,
        height: 55,
        borderRadius: 100,
        alignSelf:'center',             
    },
    view2:{
        display: 'flex',
        flexDirection: 'column',
        width:'60%',
        paddingHorizontal:15,
    },
    view3:
    {
        display: 'flex',
        flexDirection: 'column',                        
        flex:1,        
    },
    textusername:{
        paddingTop:4,
        textAlign: 'left',        
        fontWeight: 'bold',                    
        fontSize:16,
        fontFamily:'Roboto',
    },
    textmessagenobold:{        
        textAlign: 'left',                
        fontFamily:'Roboto',
        fontSize:14,
        marginTop:4,        
    },
    textmessagebold:{        
        textAlign: 'left',                
        fontFamily:'Roboto',
        fontWeight: 'bold',
        fontSize:14,
        marginTop:4,        
    },
    textdatenobold:{
        textAlign: 'left',
        fontFamily:'Roboto',
        fontSize:14,
        marginTop:4,      
    },    
    textdatebold:{
        textAlign: 'left',
        fontFamily:'Roboto',
        fontWeight: 'bold',
        fontSize:14,
        marginTop:4,      
    },    
    quantity:{
        position:'absolute',
        fontStyle: 'Roboto',
        color: 'white',       
        marginRight:5,  
        right:0,        
        top:27,                	
        width:24,
        height:24,       
        borderRadius:100,        
        fontSize: 14,                        
        paddingRight:4,
        paddingTop:1,
        backgroundColor:'#706F6F',
        textAlign:'center',                
    },    
});