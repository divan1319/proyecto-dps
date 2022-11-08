import React, { useEffect, useState,Suspense,lazy } from "react";
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, ScrollView, Alert, RefreshControl } from "react-native";
import { IconButton, Text, Avatar, Portal, Modal, Provider, Button,ActivityIndicator } from "react-native-paper";
import PrimaryButton from "./../components/PrimaryButton";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Colors from "../utils/Colors";
import CarCard from "../components/CarCard";
import SelectInput from "../components/SelectInput";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../data/api';
import axios from "axios";

export default function Home({navigation}) {    
    const [search, setSearch] = React.useState("");    
    const [marcaV, setMarcaV] = useState([]);
    const [modeloV, setModeloV] = useState([]);
    const [brand, setBrand] = React.useState();
    const [model, setModel] = React.useState();
    const [year, setYear] = React.useState();
    const [status, setStatus] = React.useState();
    const[vehicles, setVehicles] = useState([]);
    const [userId,setId] = useState();
    const [userNameN,setName] = useState();
    const [userFoto,setFoto] = useState();
    const [totalMsg, setTotalMsg] = useState("");

    const [refreshing, setRefreshing] = useState(false);
    //Recuperar la Informacion del usuario desde el servidor
    const dataUsuario = async ()=>{
        const value = JSON.parse( await AsyncStorage.getItem('userData'));
        setId(value[0].id)
        setName(value[0].nombre)
        setFoto(value[0].foto)
    }
    const TotalMsg = async () =>{
        let id = new FormData();
        id.append("id",userId);
        await axios.post(api.server+'chat.php?op=getTotal',id,{
            headers:{
                "content-type":"multipart/form-data"
            }
        }).then(res =>{
            setTotalMsg(res.data.totalmsg[0].total)
            
        }).catch(error =>{
            
        });
    }

    const DataVehicle = async () =>{
        await axios.get(api.server+'vehiculos/'+userId).then(res => {
            //console.log(res.data.results)
            if(res.status == "200"){
                setVehicles(res.data.results == undefined ? [] : res.data.results);
            }
        }).catch(error =>{
            console.log(error)
        })
    }

    const SearchVehicle = async () => {
        let id = new FormData();
        id.append("id",userId);
        await axios.post(api.server+'filters.php?search='+search,id,{
            headers:{
                "content-type":"multipart/form-data"
            }
        }).then(res =>{
            if(res.data.total > 0){
                setVehicles(res.data.vehicle);
                Alert.alert("¡Aviso!","Se han encontrado modelos según tu busqueda");
                setSearch("");
            }else{
                Alert.alert("¡Aviso!","No hay ningún resultado de acuerdo a tu búsqueda");
            }
        }).catch(error =>{
            console.log(error)
        });
    }
    const MostrarMarcaVehiculo = async () => {
    
        await axios
          .get(api.server + "marca")
          .then((res) => {
            if (res.data.status == "200") {
              setMarcaV(res.data.results);
    
            } else {
              console.log(res.data.status);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
      const MostrarModeloVehiculo = async () => {
        const idmarca = brand;
        await axios
          .get(api.server + "modelo/marca/" + idmarca)
          .then((res) => {
            if (res.data.status == "200") {
              setModeloV(res.data.results);
            } else {
              console.log(res.data.status);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
    const Filters = async () =>{
        let filtros = new FormData();
        filtros.append("marca",brand);
        filtros.append("modelo",model);
        filtros.append("year",year);
        filtros.append("estado",status);
        filtros.append("id",userId);
        await axios.post(api.server+'filters.php',filtros,{
            headers:{
                "content-type":"multipart/form-data"
            }
        }).then(res =>{
            if(res.data.total > 0){
                setVehicles(res.data.vehicle);
                Alert.alert("¡Aviso!","Se han encontrado vehiculos con los filtros aplicados");
                hideModal();
                
            }else{
                Alert.alert("¡Aviso!","No hay ningún resultado de acuerdo a tu búsqueda");
            }
            
        }).catch(error =>{
            console.log(error)
        });
    }

    //handle if the filter modal should be visible or not.
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    //styles for the modal
    const containerStyle = {backgroundColor: 'white', padding: 20, paddingBottom: 10, margin: 10, height: '80%'};
    //date options
    const actualDate = new Date();

    //data example for input
    const data = [
        {key: 2010, value: "2010"},
        {key: 2011, value: "2011"},
        {key: 2012, value: "2012"},
        {key: 2013, value: "2013"},
        {key: 2014, value: "2014"},
        {key: 2015, value: "2015"},
        {key: 2016, value: "2016"},
        {key: 2017, value: "2017"},
        {key: 2018, value: "2018"},
        {key: 2019, value: "2019"},
        {key: 2020, value: "2020"},
        {key: 2021, value: "2021"},
        {key: 2022, value: "2022"},
    ];
    const dataEstado = [
        { key: "1", value: "Nuevo" },
        { key: "2", value: "Semi-Nuevo" },
        { key: "3", value: "Usado" },
      ];
    const onRefresh = React.useCallback(async () =>{
        setRefreshing(true);
        await lazy(DataVehicle());
        setRefreshing(false);
    })

    useEffect( () =>{
        dataUsuario();
        lazy(DataVehicle());
        MostrarMarcaVehiculo();
        setInterval(TotalMsg,1000);
        
    },[userId])

    //Cantidad Mensajes
    let cantidaddemensajes=0; 

    return (
        //main container, use it for put your code
        <Provider>
            <View style={styles.container}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <ScrollView style={{flex: 1}}>
                            <SelectInput
                                containerStyle={{marginBottom: 10}}
                                title="Marca del vehículo"
                                placeholder="Seleccionar marca..."
                                data={marcaV.map((m) =>({ key: m.id, value: m.marca }))}
                                setSelected={setBrand}
                                onSelect={MostrarModeloVehiculo}
                            />
                            <SelectInput
                                containerStyle={{marginBottom: 10}}
                                title="Modelo del vehículo"
                                placeholder="Seleccionar modelo..."
                                data={modeloV.map((mm) => ({
                                    key: mm.id,
                                    value: mm.modelo,
                                  }))}
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
                                data={dataEstado}
                                setSelected={setStatus}
                            />
                        </ScrollView>
                        <Button textColor={Colors.primary} onPress={Filters} style={{marginTop: 10}}>Aceptar</Button>
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
                        onPress={() => {navigation.navigate('ChatRoom',{
                            id:userId
                        })}}
                    />
                    <Text style={styles.popupmensajes} >{totalMsg}</Text>
                    </View>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Text variant="titleLarge" style={styles.userName}>{userNameN}</Text>
                        <Avatar.Image source={{uri:userFoto}} size={60}/>
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
                            placeholder="Busca el modelo de tu vehiculo..."
                            value={search}
                            onChangeText={setSearch}
                        />
                        <Button onPress={SearchVehicle} textColor="black">Buscar</Button>
                        <FontAwesome5 name="search" size={24} color={Colors.primary} />
                    </View>
                    <TouchableWithoutFeedback onPress={showModal}>
                        <View style={styles.filterButton}>
                            <Ionicons name="filter" size={30} color="black" />
                            <Text variant="titleMedium" style={{marginLeft: 10}}>Filtros</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <ScrollView refreshControl={
                        <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        />
                    }>
                        {
                            vehicles.map( (v, index) => (
                                <View key={index}>     
                                    <CarCard
                                        uri={v.photo}
                                        brand={v.marca}
                                        model={v.modelo}
                                        year={v.year}
                                        status={v.servicio}
                                        price={"$"+v.precio}
                                        actions={[
                                            {key: v.idPublication, icon: 'eye', callback: (e) => navigation.navigate("VehicleInformation",{
                                                tipoV:v.tipo,
                                                claseV:v.clase,
                                                marcaV:v.marca,
                                                modeloV:v.modelo,
                                                estadoV:v.estado,
                                                descV:v.desc,
                                                userU:v.usuario,
                                                correoU:v.correo,
                                                celU:v.cel,
                                                yearV:v.year,
                                                servicioV:v.servicio,
                                                precioV:v.precio,
                                                photo1:v.photo,
                                                photo2:v.photo2,
                                                photo3:v.photo3,
                                                idvendedor:v.idvendedor,
                                                idcomprador:userId,
                                                userComprador:userNameN
                                            })}
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