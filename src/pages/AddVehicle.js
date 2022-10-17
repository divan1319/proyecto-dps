import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert

} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Boton from "../components/PrimaryButton";
import ImgPicker from "../components/ImgPicker";
import SelectInput from "../components/SelectInput";
import PrimaryInput from "../components/PrimaryInput";
import Boton2 from "../components/SecondaryButton";
import api from "../data/api";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddVehicle({navigation}) {

  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [clase, setClase] = React.useState();
  const [tipo, setTipo] = React.useState();
  const [marca, setMarca] = React.useState();
  const [modelo, setModelo] = React.useState();
  const [anio, setAnio] = React.useState();
  const [estado, setEstado] = React.useState();
  const [descripcion, setDescripcion] = React.useState("");
  const [precio, setPrecio] = React.useState();
  const [service, setService] = useState(1);
  const [claseVehiculo, setClaseVehiculo] = useState([]);
  const [tipoVehiculo, setTipoVehiculo] = useState([]);
  const [marcaVehiculo, setMarcaVehiculo] = useState([]);
  const [modeloVehiculo, setModeloVehiculo] = useState([]);
  const [usuario,setUsuario] = useState([]);

  const IdUsuario = async () =>{
    let profile = JSON.parse(await AsyncStorage.getItem('userData'));
    setUsuario(profile[0].id)
  }

  const MostratClaseVehiculo = async () => {
    await axios
      .get(api.server + "clase")
      .then((res) => {
        if (res.status == "200") {
          setClaseVehiculo(res.data.results);
        } else {
          console.log("no hay datos");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const MostrarTipoVehiculo = async () => {
    const idclase = clase;
    await axios
      .get(api.server + "tipo/clase/" + idclase)
      .then((res) => {
        if (res.data.status == "200") {
          setTipoVehiculo(res.data.results);
        } else {
          console.log(res.data.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const MostrarMarcaVehiculo = async () => {
    
    await axios
      .get(api.server + "marca")
      .then((res) => {
        if (res.data.status == "200") {
          setMarcaVehiculo(res.data.results);

        } else {
          console.log(res.data.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const MostrarModeloVehiculo = async () => {
    const idmarca = marca;
    await axios
      .get(api.server + "modelo/marca/" + idmarca)
      .then((res) => {
        if (res.data.status == "200") {
          setModeloVehiculo(res.data.results);
        } else {
          console.log(res.data.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const blobto64 = (blob) =>{
    return new Promise((resolve,reject) =>{
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () =>{
        resolve(reader.result.split(','[1]))
      };
    });
  }

  const UploadVehicle =  async () =>{

    const response =  await fetch(image);
    const blob1 =  await response.blob();
    const response2 =  await fetch(image2);
    const blob2 =  await response2.blob();
    const response3 =  await fetch(image3);
    const blob3 =  await response3.blob();

    const tt = await blobto64(blob1);
    const tt2 = await blobto64(blob2);
    const tt3 = await blobto64(blob3);

    let dataVehicle = new FormData();
    dataVehicle.append("tipo",tipo);
    dataVehicle.append("modelo",modelo);
    dataVehicle.append("anio",anio);
    dataVehicle.append("estado_vehiculo",estado);
    dataVehicle.append("descripcion",descripcion);
    dataVehicle.append("precio",precio);
    dataVehicle.append("isRented",service);
    dataVehicle.append("usuario",usuario);
    dataVehicle.append("foto1",tt);
    dataVehicle.append("foto2",tt2);
    dataVehicle.append("foto3",tt3);

    await fetch(api.server+'AddVehicle.php',{
      method:'POST',
      body:dataVehicle,
      headers:{
        'content-type':'multipart/form-data'
      }
    }).then((res) =>{
      if(res.status == 200){
        Alert.alert("Vehículo Publicado Exitosamente");
        navigation.navigate('Home');
      }else{
        Alert.alert("Hubo un error para publicar tu Vehículo");
        
      }
    }).catch(err =>{
      console.log(JSON.stringify(err));
    })

  }

  useEffect(() => {
    MostratClaseVehiculo();
    MostrarMarcaVehiculo();
    IdUsuario();
  }, []);

  const dataEstado = [
    { key: "1", value: "Nuevo" },
    { key: "2", value: "Semi-Nuevo" },
    { key: "3", value: "Usado" },
  ];
  return (
    <>
      <StatusBar></StatusBar>
      <ScrollView>
        <View style={styles.Header}>
          <AntDesign name="" style={styles.circle} />
          <AntDesign name="user" style={styles.user} />
          <AntDesign name="car" style={styles.car} />
          <Text style={styles.name}>Juan Perez</Text>
          <Text style={styles.Tagregar}>Agregando un nuevo vehículo</Text>
        </View>
        <View style={styles.imp1}>
          <Text style={styles.Timag}>Imágenes de vehículos</Text>
          <View style={styles.imag}>
            <ImgPicker image={image} setImage={setImage} />
            <ImgPicker image={image2} setImage={setImage2} />
            <ImgPicker image={image3} setImage={setImage3} />
          </View>
          <SelectInput
            setSelected={setClase}
            data={claseVehiculo.map((c) => ({ key: c.id, value: c.clase }))}
            onSelect={MostrarTipoVehiculo}
            placeholder="Seleccione la clase de vehículo"
            title="Clase"
          />
          <SelectInput
            setSelected={setTipo}
            data={tipoVehiculo.map((t) => ({ key: t.id, value: t.tipo }))}
            
            placeholder="Seleccione el tipo de vehículo"
            title="Tipo"
          />
          <SelectInput
            setSelected={setMarca}
            data={marcaVehiculo.map((m) => ({ key: m.id, value: m.marca }))}
            onSelect={MostrarModeloVehiculo}
            placeholder="Seleccione la marca del vehículo"
            title="Marca"
          />
          <SelectInput
            setSelected={setModelo}
            data={modeloVehiculo.map((mm) => ({
              key: mm.id,
              value: mm.modelo,
            }))}
            
            placeholder="Seleccione el modelo del vehículo"
            title="Modelo"
          />

          <PrimaryInput
            title="Año"
            onChangeText={setAnio}
            value={anio}
            placeholder="Ingrese el año del vehículo"
            keyboardType="numeric"
          />
          <SelectInput
            setSelected={setEstado}
            data={dataEstado}
            onSelect={() => console.log(estado)}
            placeholder="Estado del vehículo"
            title="Estado"
          />
          <PrimaryInput
            title="Descripción"
            onChangeText={setDescripcion}
            value={descripcion}
            placeholder="Descripción"
            keyboardType="string"
          />
          <PrimaryInput
            title="Precio"
            onChangeText={setPrecio}
            value={precio}
            placeholder="$000.00"
            keyboardType="numeric"
          />
          <Text style={styles.Tservicio}>Tipo de servicio</Text>
          {service == 1 ? (
            <>
              <Boton style={styles.botonRentar}>Rentar</Boton>
              <Boton2 style={styles.botonComprar} onPress={() => setService(3)}>
                Vender
              </Boton2>
            </>
          ) : (
            <>
              <Boton style={styles.botonRentar}>Vender</Boton>
              <Boton2 style={styles.botonComprar} onPress={() => setService(1)}>
                Rentar
              </Boton2>
            </>
          )}

          <Boton style={styles.agg} onPress={UploadVehicle}>Agregar carro</Boton>
          <Boton2 style={styles.cancelar}>Cancelar</Boton2>
          <Text></Text>
          <Text></Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  imp1: {
    justifyContent: "space-evenly",
    width: "95%",
    left: 11,
  },
  Header: {
    backgroundColor: "#292929",
    width: "100%",
    height: 170,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
  },
  left: {
    fontSize: 15,
    position: "absolute",
    top: 36,
    width: 11.79,
    height: 20,
    left: 20,
  },
  name: {
    fontSize: 20,
    position: "absolute",
    fontStyle: "normal",
    width: 101,
    height: 23,
    left: 231,
    top: 63,
    color: "#FFFFFF",
  },
  circle: {
    position: "absolute",
    backgroundColor: "#F9F9F9",
    borderRadius: 37.5,
    width: 39.12,
    height: 39.12,
    left: 343.79,
    top: 57.09,
  },
  user: {
    position: "absolute",
    color: "#292929",
    fontSize: 25,
    width: 29.12,
    height: 29.12,
    left: 350.79,
    top: 65.09,
  },
  car: {
    position: "absolute",
    color: "#F9F9F9",
    fontSize: 25,
    width: 24.5,
    height: 22,
    left: 29,
    top: 122,
  },
  Tagregar: {
    position: "absolute",
    fontFamily: "Roboto",
    fontSize: 17,
    color: "#F9F9F9",
    fontStyle: "normal",
    width: 238,
    height: 23,
    left: 72,
    top: 121,
  },
  Timag: {
    fontFamily: "Roboto",
    fontWeight: "500",
    //lineHeight:16.41,
    fontSize: 16,
    color: "#292929",
    left: 32,
    width: 201,
    height: 29,
    top: 7,
  },
  imag: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  botonRentar: {
    width: 175,
    height: 40,
    backgroundColor: "#292929",
    top: 20,
    left: 12,
    borderBottomLeftRadius: 20,
  },
  botonComprar: {
    backgroundColor: "#F9F9F9",
    left: 190,
    width: 175,
    height: 40,
    borderBottomRightRadius: 20,
    borderWidth: 1.5,
    borderColor: "black",
    top: -20,
  },
  agg: {
    borderRadius: 20,
    width: 350,
    height: 40,
    left: 12,
  },
  cancelar: {
    width: 350,
    height: 40,
    left: 12,
    borderWidth: 1.5,
    borderColor: "black",
    top: 7,
    color: "red",
  },
});
