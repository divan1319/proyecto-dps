import React,{useState} from "react";
import { View,Text,Image,StyleSheet, 
ScrollView, StatusBar, Alert} from "react-native";
import ImgPicker from "../components/ImgPicker";
import Texto from '../components/Texto';
import Boton from "../components/Button";
import axios from "axios";
import api from '../data/api';

//Validaciones Regex
const regexdui=new RegExp(/^[0]\d{7}[-]\d{1}$/);
const regextelefono=new RegExp(/^(6|7)\d{3}[-]\d{4}$/);
const regexcorreoelectronico=new RegExp(/^[a-zA-Z0-9]+[a-zA-Z0-9._-]+[a-zA-Z0-9]+@+([(gmail|hotmail|outlook|yahoo)]+\.com|(alumno+\.+udb+\.+edu+\.+sv))$/);
const regexnombre=new RegExp(/^[a-zA-Z]*\s?[a-zA-Z]*\s?[a-zA-Z]*\s?[a-zA-Z]*$/);
const regexpassword=new RegExp(/(?=^.{8,})(?=.*[0-9]{1,})(?=.*[A-Z]{1,})(?=.*[^A-Za-z0-9]{1,})(?!.* $).+/);
const regexpasswordMayusculas=new RegExp(/[A-Z]+/);
const regexpasswordNumeros=new RegExp(/(?=.*[0-9]+).*/);
const regexpasswordSimbolos=new RegExp(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
const regexpasswordcondicion4=new RegExp(/ $/);
const regexpasswordLongitudminima=new RegExp(/.{8,}/);


export default function Registro(props){

    const [nombre,setNombre]=useState('');
    const [nombreVisible,setNombreVisible]=useState(false);
    const [nombreValidado,setNombreValidado]=useState({
        validado:null,
    });
    const [correo,setCorreo]=useState('');
    const [correoVisible,setCorreoVisible]=useState(false);
    const [correoValidado,setCorreoValidado]=useState({
        validado:null,
    });
    const [telefono,setTelefono]=useState('');
    const [telefonoVisible,setTelefonoVisible]=useState(false);
    const [telefonoValidado,setTelefonoValidado]=useState({
        validado:null,
    });
    const [dui,setDui]=useState('');
    const [duiVisible,setDuiVisible]=useState(false);
    const [duiValidado,setDuiValidado]=useState({
        validado:null,
    });
    const [contrasena,setContrasena]=useState('');
    const [constrasenaVisible,setContrasenaVisible]=useState(false);    
    const [contrasenaValidada,setContrasenaValidada]=useState({
        longitud:null,
        numero:null,
        specialcaracter:null,
        mayuscula:null
    })
    const [seeTextContrasena,setSeeTextContrasena]=useState(true);
    const [image,setImage]=useState(null);
    
    const handleChangeContrasena=password=>{
        setContrasena(password);
        setContrasenaValidada({
            longitud:password.length>=8? true:false,
            numero:regexpasswordNumeros.test(password) ? true : false,
            specialcaracter:regexpasswordSimbolos.test(password) ? true:false,
            mayuscula:regexpasswordMayusculas.test(password) ? true :false
        });
    }
    const handleChangeCorreo=text=>{
        setCorreo(text);
        if(regexcorreoelectronico.test(text))
        {
            setCorreoValidado({
                validado:true
            });
        }else
        {
            setCorreoValidado({
                validado:false,
            });
        }        
    }
    const handleChangeNombre=text=>{
        setNombre(text);
        if(regexnombre.test(text))
        {
            setNombreValidado({
                validado:true
            });
        }else
        {
            setNombreValidado({
                validado:false,
            });
        }        
    }
    const handleChangeTelefono=text=>{
        setTelefono(text);
        if(regextelefono.test(text))
        {
            setTelefonoValidado({
                validado:true
            });
        }else
        {
            setTelefonoValidado({
                validado:false,
            });
        }        
    }
    const handleChangeDui=text=>{
        setDui(text);
        if(regexdui.test(text))
        {
            setDuiValidado({
                validado:true
            });
        }else
        {
            setDuiValidado({
                validado:false,
            });
        }        
    }
    const blobto64 = (blob) =>{
        return new Promise((resolve,reject) =>{
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () =>{
            resolve(reader.result.split(','[1]))
          };
        });
      }

    const registro = async () => {
                      
        console.log(contrasenaValidada.longitud);
        if(!contrasenaValidada.longitud)    
        {
            setContrasenaVisible(true);
        }
        if(!contrasenaValidada.mayuscula)
        {
            setContrasenaVisible(true);
        }
        if(!contrasenaValidada.numero)
        {
            setContrasenaVisible(true);
        }
        if(!contrasenaValidada.specialcaracter)
        {
            setContrasenaVisible(true);
        }
        if(!correoValidado.validado)
        {
            setCorreoVisible(true);
        }
        if(!telefonoValidado.validado)
        {
            setTelefonoVisible(true);
        }
        if(!nombreValidado.validado)
        {
            setNombreVisible(true);
        }
        if(!duiValidado.validado)
        {
            setDuiVisible(true);
        }

        if(contrasenaValidada.longitud&&contrasenaValidada.mayuscula&&contrasenaValidada.numero&&contrasenaValidada.specialcaracter
            &&correoValidado.validado&&nombreValidado.validado&&telefonoValidado.validado&&duiValidado.validado)
            {
                const response =  await fetch(image);
                const blob =  await response.blob();
                const photo = await blobto64(blob);

                let dataform = new FormData();
                dataform.append("nombre",nombre);
                dataform.append("correo",correo);
                dataform.append("dui",dui);
                dataform.append("telefono",telefono);
                dataform.append("contrasena",contrasena);
                dataform.append("foto",photo);
                console.log(contrasena);
                console.log(nombre)
                console.log(correo)
                console.log(dui)
                console.log(telefono)
                
                await axios.post(api.server+'register.php?op=newUser',dataform,{
                    headers:{
                      "content-type":"multipart/form-data"
                    }
                }).then( res =>{
                    console.log(res.data.error)
                    if(res.data.error == false){
                        Alert.alert("¡Aviso!","¡Registro exitoso!");
                        props.navigation.navigate('Login');
                    }else{
                        Alert.alert("¡Advertencia!","¡No pudimos registrarte, intentalo nuevamente!");
                    }
                    
                }).catch( err =>{
                    console.log(err)
                })        
            }
    }
    return(        
        <>
            <StatusBar hidden={false} translucent={true} backgroundColor={"black"} barStyle={"default"}></StatusBar>                
            <ScrollView style={styles.fondo}>
            <View style={styles.banner}>              
                <Boton style={styles.exit} fuente="Octicons" tipo="Icono" nfuente="x" sfuente={null} iconcolor={"white"} evento={"Salir"} />                
                <Image style={styles.img} source={require('../../assets/img/Banner.png')} />
            </View>
            <View style={styles.formulario}>
                <Text style={styles.titulo}>Crea tu Cuenta</Text>
                <Text style={styles.subtitulo}>¡Introduce tus datos!</Text>
                <Text style={styles.texto}>Selecciona imagen de perfil</Text>
                <View style={{alignItems:'center',paddingVertical:5}} >
                    <ImgPicker image={image} setImage={setImage} />
                </View>                
                <Texto styletxt={styles.texto} styleinputtxt={styles.InputText} stylerrortxt={styles.txterror} mascara={null} id={0}
                ktype="ascii-capable" txt1="Tu nombre" txt2="Ingresa tu nombre" 
                setValue={handleChangeNombre} valuetext={nombre} setFocusedValue={setNombreVisible} isVisible={nombreVisible} validado={nombreValidado}/>

                <Texto styletxt={styles.texto} styleinputtxt={styles.InputText} stylerrortxt={styles.txterror} mascara={null} id={1}
                ktype="email-address" txt1="Correo Electrónico" txt2="example@domain.com" 
                setValue={handleChangeCorreo} valuetext={correo} setFocusedValue={setCorreoVisible} isVisible={correoVisible} validado={correoValidado}/>

                <Texto styletxt={styles.texto} styleinputtxt={styles.InputText} stylerrortxt={styles.txterror} id={2}
                mascara={[/\d/, /\d/, /\d/, /\d/,'-',  /\d/, /\d/, /\d/,  /\d/] }
                ktype="number-pad" txt1="Número de teléfono" txt2="0000-0000" 
                setValue={handleChangeTelefono} valuetext={telefono} setFocusedValue={setTelefonoVisible} isVisible={telefonoVisible} validado={telefonoValidado} />

                <Texto styletxt={styles.texto} styleinputtxt={styles.InputText} stylerrortxt={styles.txterror} id={3}
                mascara={[[0], /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,  /\d/, '-', /\d/]}
                ktype="number-pad" txt1="DUI" txt2="00000000-0"
                 setValue={handleChangeDui} valuetext={dui} setFocusedValue={setDuiVisible} isVisible={duiVisible} validado={duiValidado} />

                <Texto styletxt={styles.texto} styleinputtxt={styles.InputText} stylerrortxt={styles.txterror} id={4} mascara={null}
                ktype="ascii-capable" secureTextEntry={true} txt1="Crear una contraseña" txt2="Ingresa una contraseña" 
                setFocusedValue={setContrasenaVisible} isVisible={constrasenaVisible} setSeeContrasena={setSeeTextContrasena} seeContrasena={seeTextContrasena}
                setValue={handleChangeContrasena} valuetext={contrasena} validado={contrasenaValidada} />          

                <Boton style={styles.BotonCrear} texto={"¡Crear Cuenta!"} tipo="Boton" fuente={null} 
                onPress={registro}  />          

                <Boton style={styles.BotonCancelar} texto={"Cancelar"} tipo="Boton" fuente={null} onPress={()=>props.navigation.navigate('Login')}  />                
                </View>                
            </ScrollView>
        </>        
    );
}

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
        marginBottom:5,
    },
    InputText:{
        borderRadius:20,
        backgroundColor:'#FFFFFF',
        borderColor:'#EEEEEE',
        marginTop:10,
        marginBottom:5,
        height:40,
        paddingLeft:20,        
        width:'100%',
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
        marginBottom:-5,
        
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
    },
    txterror:{
        marginTop:-10,
        color:'red',
    }
    
})
