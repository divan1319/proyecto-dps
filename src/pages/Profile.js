import React,{useEffect,useState} from "react";
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View , BackHandler} from "react-native";
import Constants from 'expo-constants';
import Colors from "../utils/Colors";
import { Avatar, Card, Text, Button } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile() {
        const [userId,setId] = useState();
        const [userNameN,setName] = useState();
        const [userMail,setMail] = useState();
        const [userDui,setDui] = useState();
        const [userCel,setCel] = useState();
        
        const Logout = async () =>{
            await AsyncStorage.clear();
            BackHandler.exitApp();
        }

        const dataUsuario = async ()=>{
            const value = JSON.parse( await AsyncStorage.getItem('userData'));
            setId(value[0].id)
            setName(value[0].nombre)
            setMail(value[0].correo)
            setDui(value[0].dui)
            setCel(value[0].cel)

        }
        useEffect( () =>{
            dataUsuario()
        },[])
    
    return (
        //main container, use it for put your code
        <View style={styles.container}>
            <View style={styles.header}>
                <Text variant="titleLarge" style={styles.title}>
                    Mi perfil
                </Text>
                <Avatar.Image size={80} source={{uri:'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg'}} />
                <Text variant="headlineSmall" style={styles.userName}>{userNameN}</Text>
            </View>
            <ScrollView style={styles.mainContent}>
                <Text variant="titleLarge" style={{color: Colors.primary, fontWeight: 'bold', marginBottom: 10}}>
                    Mi información
                </Text>
                <Card style={styles.cardInfo} mode='elevated'>
                    <Text variant="titleMedium" style={{color: Colors.primary, fontWeight: 'bold'}}>
                        Correo electrónico
                    </Text>
                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="email" size={24} color={Colors.primary} style={{marginRight: 10}}/>
                        <Text variant="bodyLarge">{userMail}</Text>
                    </View>
                    <Text variant="titleMedium" style={{color: Colors.primary, fontWeight: 'bold'}}>
                        Número teléfonico
                    </Text>
                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="phone" size={24} color={Colors.primary} style={{marginRight: 10}}/>
                        <Text variant="bodyLarge">{userCel}</Text>
                    </View>
                    <Text variant="titleMedium" style={{color: Colors.primary, fontWeight: 'bold'}}>
                        DUI
                    </Text>
                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="clipboard-account" size={24} color={Colors.primary} style={{marginRight: 10}}/>
                        <Text variant="bodyLarge">{userDui}</Text>
                    </View>
                </Card>
                <View style={styles.options}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.optionItem}>
                            <MaterialCommunityIcons name="car" size={24} color={Colors.primary} style={{marginRight: 10, marginLeft: 5}}/>
                            <Text variant="bodyLarge">Ver mis vehículos</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.optionItem}>
                            <MaterialCommunityIcons name="form-textbox-password" size={24} color={Colors.primary} style={{marginRight: 10, marginLeft: 5}}/>
                            <Text variant="bodyLarge">Cambiar contraseña</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={Logout}>
                        <View style={styles.optionItem}>
                            <MaterialCommunityIcons name="logout" size={24} color={Colors.primary} style={{marginRight: 10, marginLeft: 5}}/>
                            <Text variant="bodyLarge">Cerrar sesión</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //paddingTop: Constants.statusBarHeight,
        backgroundColor: Colors.backgroundScreen,
        minHeight: '100%',
    },
    header: {
        paddingVertical: Constants.statusBarHeight,
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        color: Colors.secondary,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15
    },
    userName: {
        color: Colors.secondary,
        marginTop: 10,
    },
    mainContent: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    cardInfo: {
        padding: 15,
        margin: 5,
        borderRadius: 15
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 8
    },
    options: {
        marginTop: 30,
        paddingHorizontal: 10,
    },
    optionItem: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        paddingBottom: 8,
        marginBottom: 15,
    }
});