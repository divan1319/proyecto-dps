import React, {useState,useEffect} from "react";
import { StyleSheet, View, ScrollView, Alert, RefreshControl } from "react-native";
import { Text, Avatar, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CarCard from "../components/CarCard";
import Colors from "../utils/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../data/api';
import axios from "axios";
export default function MyVehicles({route,navigation}) {

    const [myVehicles, setMyVehicle] = useState([]);
    const [datosUser, setDatosUser] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const dataUsuario = async ()=>{
        const value = JSON.parse( await AsyncStorage.getItem('userData'));
        setDatosUser(value);

    }
    const myVehicle = async () =>{
        let id = route.params.id
        await axios.get(api.server+'myvehiculos/'+id).then( res=>{
            if(res.status == "200"){
                setMyVehicle(res.data.results);
                
            }else {
                Alert.alert("¡Atención!","Aún no has publicado ningún vehículo");
            }
        }
        ).catch(err => {
            
            Alert.alert("¡Atención!","Aún no has publicado ningún vehículo");
        });
    }

    const onRefresh = React.useCallback(async () =>{
        setRefreshing(true);
        await myVehicle();
        setRefreshing(false);
    })
    useEffect( () =>{
        dataUsuario();
        myVehicle();
    },[])
    return(
        <View style={styles.container} refre>
            <View style={styles.header}>
                <IconButton 
                    icon="arrow-left"
                    iconColor={Colors.secondary}
                    style={{margin: 0}}
                    onPress={() => navigation.goBack()}
                />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>

                </View>
                <View style={{flexDirection: "row"}}>
                    <MaterialCommunityIcons name="car-multiple" size={26} color="white" style={{marginRight: 15}}/>
                    <Text variant="titleLarge" style={{color: Colors.secondary}}>Mis vehiculos</Text>
                </View>
            </View>
            <ScrollView style={styles.mainContent} refreshControl={
                <RefreshControl 
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                {
                    myVehicles.map( (v) => (
                        <View key={v.idPublication}>
                            <CarCard 
                                uri={v.photo1}
                                brand={v.marca}
                                model={v.modelo}
                                year={v.year}
                                status={v.servicio}
                                price={"$"+v.precio}
                                actions={[
                                    {key: 1, icon: 'delete', callback: (e) => console.log("hola mundo")},
                                    {key: 2, icon: 'circle-edit-outline', callback: () => navigation.navigate("EditVehicle",{
                                        id:v.idPublication,
                                        photo:v.photo1,
                                        photo2:v.photo2,
                                        photo3:v.photo3,
                                        yearV:v.year,
                                        descV:v.desc,
                                        priceV:v.precio,
                                        claseid:v.idclase,
                                        tipoid:v.idtipo,
                                        marcaid:v.idmarca,
                                        modeloid:v.idmodelo,
                                        servicioid:v.idservicio,
                                        estadoid:v.idestado
                                    })},
                                    {key: 3, icon: 'eye', callback: (e) => console.log("hola mundo")}
                                ]}
                            />
                        </View>
                    )
                    )
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundScreen,
        minHeight: '100%'
    },
    header: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    userName: {
        color: Colors.secondary,
        marginRight: 10,
    },
    mainContent: {
        height: '100%',
        padding: 20
    },
});