import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Avatar, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CarCard from "../components/CarCard";
import Colors from "../utils/Colors";

export default function MyVehicles(props) {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton 
                    icon="arrow-left"
                    iconColor={Colors.secondary}
                    style={{margin: 0}}
                    onPress={() => props.navigation.goBack()}
                />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Text variant="titleLarge" style={styles.userName}>Juan Pérez</Text>
                    <Avatar.Image size={60}/>
                </View>
                <View style={{flexDirection: "row"}}>
                    <MaterialCommunityIcons name="car-multiple" size={26} color="white" style={{marginRight: 15}}/>
                    <Text variant="titleLarge" style={{color: Colors.secondary}}>Mis vehiculos</Text>
                </View>
            </View>
            <ScrollView style={styles.mainContent}>
                <CarCard
                    uri="https://loscoches.com/wp-content/uploads/2019/09/carro-nuevo-o-carro-usado.jpg"
                    brand="Audi"
                    model="A1"
                    year="2019"
                    status="En Renta"
                    price="$34000"
                    actions={[
                        {key: 1, icon: 'delete', callback: (e) => console.log("hola mundo")},
                        {key: 2, icon: 'circle-edit-outline', callback: (e) => console.log("hola mundo")},
                        {key: 3, icon: 'eye', callback: (e) => console.log("hola mundo")}
                    ]}
                />
                <CarCard
                    uri="https://loscoches.com/wp-content/uploads/2019/09/carro-nuevo-o-carro-usado.jpg"
                    brand="Audi"
                    model="A1"
                    year="2019"
                    status="En Renta"
                    price="$34000"
                    actions={[
                        {key: 1, icon: 'delete', callback: (e) => console.log("hola mundo")},
                        {key: 2, icon: 'circle-edit-outline', callback: (e) => console.log("hola mundo")},
                        {key: 3, icon: 'eye', callback: (e) => console.log("hola mundo")}
                    ]}
                />
                <CarCard
                    uri="https://loscoches.com/wp-content/uploads/2019/09/carro-nuevo-o-carro-usado.jpg"
                    brand="Audi"
                    model="A1"
                    year="2019"
                    status="En Renta"
                    price="$34000"
                    actions={[
                        {key: 1, icon: 'delete', callback: (e) => console.log("hola mundo")},
                        {key: 2, icon: 'circle-edit-outline', callback: (e) => console.log("hola mundo")},
                        {key: 3, icon: 'eye', callback: (e) => console.log("hola mundo")}
                    ]}
                />
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