import React,{useEffect,useState} from "react";
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View , BackHandler, Alert} from "react-native";
import Constants from 'expo-constants';
import Colors from "../utils/Colors";
import { Avatar, Card, Text, Button, Portal, Modal, Provider } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryInput from './../components/PrimaryInput';


export default function Profile(props) {
        const [userId,setId] = useState();
        const [userNameN,setName] = useState();
        const [userMail,setMail] = useState();
        const [userDui,setDui] = useState();
        const [userCel,setCel] = useState();
        //new password
        const [newPassword, setNewPassword] = useState("");

        //handle if the modal should be visible or not.
        const [visible, setVisible] = React.useState(false);
        const showModal = () => setVisible(true);
        const hideModal = () => setVisible(false);
        //styles for the modal
        const containerStyle = {backgroundColor: 'white', padding: 20, paddingBottom: 10, margin: 10};
        
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

        //this function reset the information values when when the edition is canceled
        const editionCanceld = () => {
            dataUsuario();
            setNewPassword("");
            hideModal();
        }

        //validate the information to update the profile
        const validate = () => {
            let validate = true;
            const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            const phoneRegex = /^[0-9]{4}(-)[0-9]{4}$/i;

            if (userNameN.length <= 0) {
                validate = false;
                Alert.alert("¡Advertencia!", "El nombre de usuario no puede estar vacío.");
            }

            if (userMail.length <= 0 || !emailRegex.test(userMail)) {
                validate = false;
                Alert.alert("¡Advertencia!", "El correo electrónico es incorrecto.");
            }

            if (userCel.length <= 0 || !phoneRegex.test(userCel)) {
                validate = false;
                Alert.alert("¡Advertencia!", "El número de teléfonico es incorrecto, ej. (0000-0000)");
            }

            if (newPassword.length < 8) {
                validate = false;
                Alert.alert("¡Advertencia!", "La contraseña debe tener 8 o más caracteres.");
            }

            //return validate;
        }
    
    return (
        //main container, use it for put your code
        <Provider>
            <View style={styles.container}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Text variant="bodyLarge" style={{marginBottom: 20, fontWeight: 'bold'}}>
                            Editar información de la cuenta
                        </Text>
                        <PrimaryInput
                            viewStyle={{marginBottom: 15}}
                            title="Editar nombre"
                            value={userNameN}
                            onChangeText={setName}
                            placeholder="Nuevo nombre..."
                        />
                        <PrimaryInput
                            viewStyle={{marginBottom: 15}}
                            title="Editar correo"
                            value={userMail}
                            onChangeText={setMail}
                            placeholder="Nuevo correo..."
                            keyboardType="email-address"
                        />
                        <PrimaryInput
                            viewStyle={{marginBottom: 15}}
                            title="Editar número teléfonico"
                            value={userCel}
                            onChangeText={setCel}
                            placeholder="Nuevo número..."
                            keyboardType="phone-pad"
                        />
                        <PrimaryInput
                            viewStyle={{marginBottom: 15}}
                            title="Editar contraseña"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="Nueva contraseña..."
                            secureTextEntry={true}
                        />
                        <Button 
                            textColor={Colors.primary} 
                            style={{marginTop: 10}}
                            icon="content-save"
                            onPress={validate} 
                        >
                            Guardar
                        </Button>
                        <Button textColor="#EA3333" icon="cancel" onPress={editionCanceld}>
                            Cancelar
                        </Button>
                    </Modal>
                </Portal>
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
                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate("MyVehicles")}>
                            <View style={styles.optionItem}>
                                <MaterialCommunityIcons name="car" size={24} color={Colors.primary} style={{marginRight: 10, marginLeft: 5}}/>
                                <Text variant="bodyLarge">Ver mis vehículos</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={showModal}>
                            <View style={styles.optionItem}>
                                <MaterialCommunityIcons name="square-edit-outline" size={24} color={Colors.primary} style={{marginRight: 10, marginLeft: 5}}/>
                                <Text variant="bodyLarge">Editar información</Text>
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
        </Provider>
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