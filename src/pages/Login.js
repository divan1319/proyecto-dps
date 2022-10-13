import React from "react";
import { View, KeyboardAvoidingView, StyleSheet, AsyncStorage, ImageBackground, BackHandler } from "react-native";
import { IconButton, Text } from "react-native-paper";
import PrimaryInput from "./../components/PrimaryInput";
import PrimaryButton from './../components/PrimaryButton';
import SecondaryButton from './../components/SecondaryButton';
import Constants from 'expo-constants';
import Colors from "../utils/Colors";

class Login extends React.Component {

    state = {
        email: '',
        password: '',
    }

    _logIn = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ImageBackground style={styles.imgHeader} resizeMode='contain' source={require('./../../assets/img/single-car.png')}>
                        <IconButton 
                            icon="close" 
                            iconColor={Colors.secondary} 
                            size={26} 
                            style={styles.closeIcon}
                            onPress={() => BackHandler.exitApp()}    
                        />   
                    </ImageBackground>
                </View>
                <KeyboardAvoidingView enabled={true} behavior='height' keyboardVerticalOffset={40} style={styles.form}>
                    <View style={{flex: 1, marginBottom: 30}}>
                        <Text variant="titleLarge" style={{fontWeight: 'bold'}}>Inicio de sesión</Text>
                        <Text variant="bodyMedium" style={{fontWeight: '300', fontSize: 15}}>¡Introduce tus credenciales!</Text>
                    </View>
                    <View style={{marginBottom: 45}}>
                        <PrimaryInput
                            viewStyle={{
                                marginBottom: 25
                            }}
                            title="Correo electrónico"
                            placeholder="example@domain.com"
                            value={this.state.email}
                            onChangeText={(val) => this.setState({email: val})}
                        />
                        <PrimaryInput
                            title="Contraseña"
                            placeholder="••••••••••••"
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(val) => this.setState({password: val})}
                        />
                    </View>
                    <View style={{marginTop: 45}}>
                        <PrimaryButton 
                            onPress={this._logIn}
                        >
                            Iniciar sesión
                        </PrimaryButton>
                        <Text variant="bodySmall" 
                            style={{
                                textAlign: 'center', 
                                color: Colors.primary,
                                marginVertical: 8
                            }}
                        >
                            ¿Aún no tienes una cuenta? ¡Crea una!
                        </Text>
                        <SecondaryButton onPress={() => {}}>
                            Crear cuenta
                        </SecondaryButton>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: Colors.primary,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    form: {
        flex: 4,
        backgroundColor: Colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.backgroundScreen
    },
    closeIcon: {
        margin: 0,
    },
    imgHeader: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default Login;