import React from "react";
import { StyleSheet, View, AsyncStorage, TextInput, TouchableWithoutFeedback, ScrollView } from "react-native";
import Constants from 'expo-constants';
import { IconButton, Text, Avatar, Portal, Modal, Provider, Button } from "react-native-paper";
import PrimaryButton from "./../components/PrimaryButton";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Colors from "../utils/Colors";
import CarCard from "../components/CarCard";
import SelectInput from "../components/SelectInput";

export default function Home() {
    const [search, setSearch] = React.useState("");
    
    const [clase, setClase] = React.useState("");
    const [type, setType] = React.useState("");
    const [brand, setBrand] = React.useState("");
    const [model, setModel] = React.useState("");
    const [year, setYear] = React.useState("");
    const [status, setStatus] = React.useState("");



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
                    <IconButton 
                        icon="message"
                        iconColor={Colors.secondary}
                        style={{margin: 0}}
                        onPress={() => {}}
                    />
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Text variant="titleLarge" style={styles.userName}>Juan Pérez</Text>
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
                        <PrimaryButton onPress={async () => {
                            await AsyncStorage.clear();
                        }}>
                            Click aquí
                        </PrimaryButton>
                        <CarCard
                            uri="https://loscoches.com/wp-content/uploads/2019/09/carro-nuevo-o-carro-usado.jpg"
                            brand="Audi"
                            model="A1"
                            year="2019"
                            status="En Renta"
                            actions={[
                                {key: 1, icon: 'car-key', callback: (e) => console.log("hola mundo")}
                            ]}
                        />
                        <CarCard
                            uri="https://loscoches.com/wp-content/uploads/2019/09/carro-nuevo-o-carro-usado.jpg"
                            brand="Audi"
                            model="A1"
                            year="2019"
                            status="En Renta"
                            actions={[
                                {key: 1, icon: 'car-key', callback: (e) => console.log("hola mundo")}
                            ]}
                        />
                        <CarCard
                            uri="https://loscoches.com/wp-content/uploads/2019/09/carro-nuevo-o-carro-usado.jpg"
                            brand="Audi"
                            model="A1"
                            year="2019"
                            status="En Renta"
                            actions={[
                                {key: 1, icon: 'car-key', callback: (e) => console.log("hola mundo")}
                            ]}
                        />
                        <CarCard
                            uri="https://loscoches.com/wp-content/uploads/2019/09/carro-nuevo-o-carro-usado.jpg"
                            brand="Audi"
                            model="A1"
                            year="2019"
                            status="En Renta"
                            actions={[
                                {key: 1, icon: 'car-key', callback: (e) => console.log("hola mundo")}
                            ]}
                        />
                        <CarCard
                            uri="https://loscoches.com/wp-content/uploads/2019/09/carro-nuevo-o-carro-usado.jpg"
                            brand="Audi"
                            model="A1"
                            year="2019"
                            status="En Renta"
                            actions={[
                                {key: 1, icon: 'car-key', callback: (e) => console.log("hola mundo")}
                            ]}
                        />
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
});