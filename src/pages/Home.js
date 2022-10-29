import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, ScrollView } from "react-native";
import { IconButton, Text, Avatar, Portal, Modal, Provider, Button } from "react-native-paper";
import PrimaryButton from "./../components/PrimaryButton";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Colors from "../utils/Colors";
import CarCard from "../components/CarCard";
import SelectInput from "../components/SelectInput";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataMessage from "../utils/DataMessage";
import api from '../data/api';
import axios from "axios";

export default function Home(props) {    
    const [search, setSearch] = React.useState("");    
    const [clase, setClase] = React.useState("");
    const [type, setType] = React.useState("");
    const [brand, setBrand] = React.useState("");
    const [model, setModel] = React.useState("");
    const [year, setYear] = React.useState("");
    const [status, setStatus] = React.useState("");
    const[vehicles, setVehicles] = useState([]);
    const [userId,setId] = useState();
    const [userNameN,setName] = useState();
    const [userMail,setMail] = useState();
    const [userDui,setDui] = useState();
    const [userCel,setCel] = useState();

    //Recuperar la Informacion del usuario desde el servidor
    const dataUsuario = async ()=>{
        const value = JSON.parse( await AsyncStorage.getItem('userData'));
        console.log(value);
        setId(value[0].id)
        setName(value[0].nombre)
        setMail(value[0].correo)
        setDui(value[0].dui)
        setCel(value[0].cel)

    }

    useEffect( () =>{
        dataUsuario()
    },[])

    const DataVehicle = async () =>{
        await axios.get(api.server+'vehiculos').then(res => {
            //console.log(res.data.results)
            if(res.status == "200"){
                setVehicles(res.data.results);
                console.log("Datos cargados")
            }
        }).catch(error =>{
            console.log(error)
        })
    }

    //handle if the filter modal should be visible or not.
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    //styles for the modal
    const containerStyle = {backgroundColor: 'white', padding: 20, paddingBottom: 10, margin: 10, height: '80%'};

    //date options
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const actualDate = new Date();

    //data example for input
    const data = [
        {key: 1, value: "Primero"},
        {key: 2, value: "Segundo"},
        {key: 3, value: "Tercero"},
        {key: 4, value: "Cuarto"},
    ];

    useEffect( () =>{
        DataVehicle();        
    },[])

    //Cantidad Mensajes
    let cantidaddemensajes=0;    
    cantidaddemensajes=DataMessage[0].chat.map(element =>element.quantity).reduce((a,b)=>a+b,0);

    return (
        //main container, use it for put your code
        <Provider>
            <View style={styles.container}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <ScrollView style={{flex: 1}}>
                            <SelectInput
                                containerStyle={{marginBottom: 10}}
                                title="Clase del vehículo"
                                placeholder="Seleccionar clase..."
                                data={data}
                                setSelected={setClase}
                            />
                            <SelectInput
                                containerStyle={{marginBottom: 10}}
                                title="Tipo vehículo"
                                placeholder="Seleccionar tipo..."
                                data={data}
                                setSelected={setType}
                            />
                            <SelectInput
                                containerStyle={{marginBottom: 10}}
                                title="Marca del vehículo"
                                placeholder="Seleccionar marca..."
                                data={data}
                                setSelected={setBrand}
                            />
                            <SelectInput
                                containerStyle={{marginBottom: 10}}
                                title="Modelo del vehículo"
                                placeholder="Seleccionar modelo..."
                                data={data}
                                setSelected={setModel}
                            />
                            <SelectInput
                                containerStyle={{marginBottom: 10}}
                                title="Año del vehículo"
                                placeholder="Seleccionar año..."
                                data={data}
                                setSelected={setYear}
                            />
                            <SelectInput
                                containerStyle={{marginBottom: 10}}
                                title="Estatus del vehículo"
                                placeholder="Seleccionar estatus..."
                                data={data}
                                setSelected={setStatus}
                            />
                        </ScrollView>
                        <Button textColor={Colors.primary} onPress={() => {}} style={{marginTop: 10}}>Aceptar</Button>
                        <Button textColor="#EA3333" onPress={hideModal}>Cancelar</Button>
                    </Modal>
                </Portal>
                <View style={styles.header}>
                    <View style={{flexDirection:'row'}}>
                    <IconButton 
                        icon="message"
                        iconColor={Colors.secondary}
                        style={{margin: 0}}
                        size={28}
                        onPress={() => {props.navigation.navigate('HomeNavigation',{screen:'ChatRoom'})}}
                    />
                    {cantidaddemensajes>0&&<Text style={styles.popupmensajes} >{cantidaddemensajes}</Text>}
                    </View>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Text variant="titleLarge" style={styles.userName}>{userNameN}</Text>
                        <Avatar.Image size={60}/>
                    </View>
                    <Text variant="headlineSmall" style={{color: Colors.secondary}}>{actualDate.toDateString()}</Text>
                </View>
                <View style={styles.mainContent}>
                    <Text variant="titleLarge" style={styles.title}>
                        Mercado
                    </Text>
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar un vehículo..."
                            value={search}
                            onChangeText={setSearch}
                        />
                        <FontAwesome5 name="search" size={24} color={Colors.primary} />
                    </View>
                    <TouchableWithoutFeedback onPress={showModal}>
                        <View style={styles.filterButton}>
                            <Ionicons name="filter" size={30} color="black" />
                            <Text variant="titleMedium" style={{marginLeft: 10}}>Filtros</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <ScrollView>
                        {
                            vehicles.map( (v, index) => (
                                <View key={index}>
                                    <CarCard
                                        uri={v.photo}
                                        brand={v.marca}
                                        model={v.modelo}
                                        year={v.year}
                                        status={v.servicio}
                                        price="$10000"
                                        actions={[
                                            {key: 1, icon: 'car-key', callback: (e) => console.log("hola mundo")}
                                        ]}
                                    />
                                </View>
                            ))
                        }

                    </ScrollView>
                </View>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        minHeight: '100%',
    },
    header: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        height: '25%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    mainContent: {
        backgroundColor: Colors.backgroundScreen,
        height: '75%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 20
    },
    title: {
        color: Colors.primary,
        fontWeight: 'bold',
        marginBottom: 15
    },
    searchBar: {
        borderWidth: 1,
        borderColor: Colors.borders,
        borderRadius: 25,
        backgroundColor: Colors.secondary,
        height: 40,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchInput: {
        paddingHorizontal: 20,
        height: '100%',
        flex: 1
    },
    filterButton: {
        marginHorizontal: 5,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems:'center'
    },
    userName: {
        color: Colors.secondary,
        marginRight: 10,
    },
    popupmensajes:{        
        position:'absolute',
        top:15,
        left:20,
        color: 'white',
        fontSize:12,
        paddingHorizontal:3,
        paddingVertical:3,
        fontWeights:'bold',
        backgroundColor:'red',
        textAlign: 'center',
        borderRadius:100,
        width:22,
        height:22,        
    }
});