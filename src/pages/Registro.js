import React,{useState} from "react";
import { View,Text,Image,StyleSheet, 
ScrollView, StatusBar, Alert} from "react-native";
import Texto from '../components/Texto';
import Boton from "../components/Button";
import axios from "axios";
import server from '../data/api';


const styles=StyleSheet.create({
    titulo:{
        fontSize:20,
        fontStyle:'normal',
        fontWeight:'600',
        lineHeight:23,
        fontFamily:'Roboto',
        color:'#292929',   
        marginBottom:5,    
    },
    subtitulo:{
        fontFamily:'Roboto',
        fontStyle:'normal',
        fontWeight:'300',
        fontSize:15,
        lineHeight:18,
        marginBottom:15,
    },
    texto:{
        fontFamily:'Roboto',
        fontWeight:'500',
        lineHeight:16,
        fontSize:14,
        color:'#292929',
        marginTop:10,
    },
    InputText:{
        borderRadius:20,
        backgroundColor:'#FFFFFF',
        borderColor:'#EEEEEE',
        marginTop:10,
        marginBottom:17,
        height:40,
        paddingLeft:20,        
    },    
    img:{
        height:156,        
        marginTop:30,
        width:256,
        alignContent:'center',        
    },
    formulario:{
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:'#F5F5F5',
        paddingTop:20,
        paddingLeft:35,
        paddingRight:35,
        zIndex:1,       
        alignContent:'center',
    },
    banner:{
        backgroundColor:'#292929',
        marginTop:35,
        height:250,
        width:'100%',
        alignItems:'center',        
        zIndex:0,        
    },
    fondo:{
        backgroundColor:'#292929',
    },
    Icono:{        
        margin:10,
        alignSelf:'center'
    },
    exit:{        
        position:'absolute',
        top:10,
        right:25,        
        color:'#FFFFFF', 
        zIndex:1,       
    },
    Botoncamara:{
        margin:15,
        alignSelf:'center',
        alignContent:'center',
        width:70,
        height:70,
        backgroundColor:'#D9D9D9',
        borderRadius:40,
        
    },
    BotonCrear:{
        backgroundColor:'#292929',
        shadowRadius:'0, 1, 3',
        shadowColor:'rgba(0,0,0,0.25)',
        borderRadius:20,
        textAlign:'center',
        color:'#FFFFFF',
        height:40,
        marginTop:15,
        marginBottom:15,
        paddingTop:8,
        
    },
    BotonCancelar:{
        backgroundColor:'#FFFFFF',
        shadowRadius:'0, 1, 3',
        shadowColor:'rgba(0,0,0,0.25)',
        borderRadius:20,
        textAlign:'center',
        color:'#EA3333',
        height:40,        
        marginTop:15,
        marginBottom:15,
        paddingTop:8,
    }
    
})

export default function Registro(props){

    const [nombre,SetNombre]=useState('');
    const [correo,SetCorreo]=useState('');
    const [telefono,SetTelefono]=useState('');
    const [dui,SetDui]=useState('');
    const [contrasena,SetContrasena]=useState('');

    const registro = async () => {
        const datos = new FormData();
        datos.append("nombre",nombre);
        datos.append("contrasena",contrasena);
        datos.append("correo",correo);
        datos.append("dui",dui);
        datos.append("telefono",telefono);

        await axios.post(server.server+'usuarios',datos,{
            headers:{
              'content-type':'multipart/form-data'
            }
        }).then( (res) =>{
            Alert.alert("¡Aviso!","¡Registro exitoso!");
            props.navigation.navigate('Login');

        }).catch( err =>{
            console.log(err)
        })
    }
    return(        
        <>
            <StatusBar hidden={false} translucent={true} backgroundColor={"black"} barStyle={"default"}></StatusBar>                
            <ScrollView style={styles.fondo}>
            <View style={styles.banner}>              
                <Boton style={styles.exit} fuente="Octicons" tipo="Icono" nfuente="x" sfuente={null} iconcolor={"white"} evento={"Salir"} />                
                <Image style={styles.img} source={require('../img/Banner.png')} />
            </View>
            <View style={styles.formulario}>
                <Text style={styles.titulo}>Crea tu Cuenta</Text>
                <Text style={styles.subtitulo}>¡Introduce tus datos!</Text>
                <Text style={styles.texto}>Selecciona imagen de perfil</Text>
                <Boton style={styles.Botoncamara} fuente="FontAwesome5" tipo="Icono" nfuente="camera" sfuente={styles.Icono} evento={"Camara"} />                
                <Texto styletxt={styles.texto} styleinputtxt={styles.InputText} 
                ktype="ascii-capable" txt1="Tu nombre" txt2="Ingresa tu nombre" SetValue={SetNombre}/>
                <Texto styletxt={styles.texto} styleinputtxt={styles.InputText} 
                ktype="email-address" txt1="Correo Electrónico" txt2="example@domain.com" SetValue={SetCorreo}/>
                <Texto styletxt={styles.texto} styleinputtxt={styles.InputText} 
                ktype="number-pad" txt1="Número de teléfono" txt2="0000-0000" SetValue={SetTelefono}/>
                <Texto styletxt={styles.texto} styleinputtxt={styles.InputText} 
                ktype="number-pad" txt1="DUI" txt2="00000000-0" SetValue={SetDui}/>
                <Texto styletxt={styles.texto} styleinputtxt={styles.InputText} 
                ktype="ascii-capable" secureTextEntry={true} txt1="Crear una contraseña" txt2="Ingresa una contraseña" SetValue={SetContrasena}/>          
                <Boton style={styles.BotonCrear} texto={"¡Crear Cuenta!"} tipo="Boton" fuente={null} 
                onPress={registro}  />          
                <Boton style={styles.BotonCancelar} texto={"Cancelar"} tipo="Boton" fuente={null} onPress={ () => props.navigation.navigate('Login')} />                
                </View>                
            </ScrollView>
        </>        
    );
}