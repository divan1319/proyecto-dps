import React,{useState} from "react";
import { View,Text,StyleSheet, SafeAreaView, StatusBar, ScrollView, TextInput, Button} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Constants from 'expo-constants';
import Colors from "../utils/Colors";
import Boton from "../components/PrimaryButton";
import ImgPicker from "../components/ImgPicker";
import SelectInput from "../components/SelectInput";
import PrimaryInput from "../components/PrimaryInput";
import Boton2 from "../components/SecondaryButton";

export default function AddVehicle() {
   const [image, setImage] = React.useState(null);
    const [clase, setClase] = React.useState("");
    const [tipo, setTipo] = React.useState("");
    const [marca, setMarca] = React.useState("");
    const [modelo, setModelo] = React.useState("");
    const [anio, setAnio] = React.useState("");
    const [estado, setEstado] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [precio, setPrecio] = React.useState("");
    const dataclase = [
      {key:'1',value:'Automovil'},
      {key: '2',value:'Autobus'},
      {key:'3',value:'Motocicleta'},
      {key:'4',value:'Pick up'},
      {key:'5',value:'Microbus'},
      {key:'6',value:'Camion'},
      {key:'7',value:'Cuadrimoto'},
      {key:'8',value:'Remolde'},
    ];
    const dataTipo = [
      {key:'1',value:'Estandar'},
      {key:'2',value:'Automatico'},
    ];
    const dataEstado= [
      {key:'1', value:'nuevo'},
      {key:'2', value:'usado'},
      {key:'3', value:'como nuevo'}
    ];
    return (
        <>
         <StatusBar></StatusBar>
         <ScrollView>
         <View style={styles.Header}>
         <Boton icon="chevron-left" style={styles.left} onPress={"regresar"}/>
         <AntDesign name='' style={styles.circle}/>
         <AntDesign name='user' style={styles.user} />
         <AntDesign name="car" style={styles.car}/>
         <Text style={styles.name}>Juan Perez</Text>
         <Text style={styles.Tagregar}>Agregando un nuevo vehículo</Text>
         </View>
         <View style={styles.imp1}>
         <Text style= {styles.Timag}>Imágenes de vehículos</Text>
          <View style={styles.imag}>
         <ImgPicker image={image} setImage={setImage} /> 
         <ImgPicker image={image} setImage={setImage} />
         <ImgPicker image={image} setImage={setImage} /> 
         </View>
         <SelectInput setSelected={setClase} data={dataclase} onSelect={() => alert(clase)} placeholder="Seleccione la clase de vehículo" title="Clase" />
         <SelectInput setSelected={setTipo} data={dataTipo} onSelect={() => alert(tipo)} placeholder="Seleccione el tipo de vehículo" title="Tipo" />
         <PrimaryInput title="Marca" onChangeText={setMarca} value={marca} placeholder="Ingrese la marca del vehículo" keyboardType='string' />
         <PrimaryInput title="Modelo" onChangeText={setModelo}  value={modelo} placeholder="Ingrese el modelo del vehículo" keyboardType='string' />
         <PrimaryInput title="Año"  onChangeText={setAnio} value={anio} placeholder="Ingrese el año del vehículo" keyboardType='numeric' />
         <SelectInput setSelected={setEstado} data={dataEstado} onSelect={() => alert(estado)} placeholder="Estado del vehículo" title="Estado" />
         <PrimaryInput title="Descripción"  onChangeText={setDescripcion} value={descripcion} placeholder="Descripción" keyboardType='string' />
         <PrimaryInput title="Precio"  onChangeText={setPrecio} value={precio} placeholder="$000.00" keyboardType='numeric' />
         <Text style={styles.Tservicio}>Tipo de servicio</Text>
         <Boton style={styles.botonRentar}>Rentar</Boton>
         <Boton2 style={styles.botonComprar}>Comprar</Boton2>
         <Boton style={styles.agg}>Agregar carro</Boton>
         <Boton2 style={styles.cancelar}>Cancelar</Boton2>
         <Text></Text>
         <Text></Text>
         </View>
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
   imp1:{
    justifyContent:"space-evenly",
    width:'95%',
    left:11
   },
    Header:{
        backgroundColor: '#292929',
        width:'100%',
        height: 170,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20,
        alignItems: 'center',
      },
      left: {
        fontSize:15,
        position: 'absolute',
        top: 36,
        width: 11.79,
        height: 20,
        left:20
       },
       name: {
         fontSize: 20,
         position: 'absolute',
         fontStyle: 'normal',
         width: 101,
         height: 23,
         left: 231,
         top: 63,
         color: '#FFFFFF',
       },
      circle:{
       position: "absolute",
       backgroundColor: '#F9F9F9',
       borderRadius: 37.5,
       width: 39.12,
       height: 39.12,
       left: 343.79,
       top: 57.09,
      },
      user:{
       position: "absolute",
       color: '#292929',
       fontSize: 25,
       width: 29.12,
       height: 29.12,
       left: 350.79,
       top: 65.09,
      },
      car:{
       position: "absolute",
       color: '#F9F9F9',
       fontSize:25,
       width: 24.5,
       height:22,
       left: 29,
       top:122,
     
      },
      Tagregar:{
        position: 'absolute',
        fontFamily: 'Roboto',
        fontSize: 17,
        color: '#F9F9F9',
        fontStyle: 'normal',
        width: 238,
        height: 23,
        left: 72,
        top: 121,
       },
       Timag: {
        fontFamily:'Roboto',
        fontWeight:'500',
        //lineHeight:16.41,
        fontSize:16,
        color:'#292929',
        left: 32,
        width: 201,
        height:29,
        top:7,
 },
 imag:{
  flexDirection:"row",
  justifyContent:"space-evenly"
 },
 botonRentar:{
  width: 175,
  height:40,
  backgroundColor:'#292929',
  top:20,
  left:12,
  borderBottomLeftRadius: 20,

 },
 botonComprar:{
   backgroundColor:'#F9F9F9',
   left:190,
   width:175,
   height:40,
   borderBottomRightRadius:20,
   borderWidth:1.5,
   borderColor:'black',
   top:-20,
 },
 agg:{
  borderRadius:20,
  width:350,
  height:40,
  left:12,
 },
 cancelar:{
  width:350,
  height:40,
  left:12,
  borderWidth:1.5,
  borderColor:'black',
  top:7,
  color:'red',
 },
});