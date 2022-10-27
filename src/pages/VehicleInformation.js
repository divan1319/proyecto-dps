import React from "react";
import { StyleSheet, View,ScrollView,Dimensions,Image} from "react-native";
import Constants from 'expo-constants';
import {Badge,Text,DataTable,Button} from 'react-native-paper';
import Colors from "../utils/Colors";

export default function VehicleInformation() {
    return (
<ScrollView style={styles.container}>
      <ScrollView horizontal={true}>
        <Image
          style={styles.carrousel}
          source={{
            uri: "https://media.sketchfab.com/models/0741fd5bec5e4c6cb1cf2774763d1601/thumbnails/c594ba23ef8645a9a51cbab6cd7512bd/1d8541ab54724319a306ccb985d5863e.jpeg",
          }}
        />
        <Image
          style={styles.carrousel}
          source={{
            uri: "https://www.racedepartment.com/attachments/__custom_showroom_1571903652-jpg.331077/",
          }}
        />
      </ScrollView>
      <View style={styles.boxHeader}>
        <Badge style={styles.servicio}>En venta</Badge>
        <Text style={styles.price}>$1500</Text>
      </View>
      <View>
        <Text style={{ margin: 10, fontWeight: "700" }}>Detalles</Text>
        <DataTable style={styles.tabla}>
          <DataTable.Header>
            <DataTable.Title>Clase</DataTable.Title>
            <DataTable.Title>Tipo</DataTable.Title>
            <DataTable.Title>Estado</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Automovil</DataTable.Cell>
            <DataTable.Cell>Deportivo</DataTable.Cell>
            <DataTable.Cell>Semi-Nuevo</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <DataTable style={styles.tabla}>
          <DataTable.Header>
            <DataTable.Title>Marca</DataTable.Title>
            <DataTable.Title>Modelo</DataTable.Title>
            <DataTable.Title>Año</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Mazda</DataTable.Cell>
            <DataTable.Cell>RX8</DataTable.Cell>
            <DataTable.Cell>2019</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
      <View>
        <Text style={{ margin: 10, marginTop: 30, fontWeight: "700" }}>
          Descripción
        </Text>
        <Text
          style={{
            margin: 20,
            textAlign: "justify",
            backgroundColor: "#FFFFFF",
            padding: 20,
            borderRadius: 20,
          }}
        >
          
          Encontrar ese color perfecto con nuestro selector de color y descubrir
          bellas armonías de color, tintes, matices y tonos; códigos de color de
          entrada Hex, los valores RGB y HSL, y generar HTML, CSS y estilos
          SCSS.
        </Text>
      </View>
      <Text style={{ margin: 10, marginTop: 20, fontWeight: "700" }}>
        Anunciante
      </Text>
      <View style={styles.anunciante}>
        <Text style={{ fontSize: 20, fontWeight: "400" }}>Juan Valdez</Text>
        <Text>valdez@gmail.com</Text>
        <Text>71732101</Text>
      </View>
      <Button icon="email" textColor="#FFFFFF" style={{margin:20,width:200,backgroundColor:'black',alignSelf:'center'}}>Contactar</Button>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundScreen,
        minHeight: '100%'
    },
    carrousel: {
      width: Dimensions.get("window").width,
      height: 250,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    servicio: {
      backgroundColor: "#292923",
      fontSize: 13,
      width: 80,
      height: 30,
    },
    price: {
      marginTop: 1,
      marginLeft: 225,
      fontSize: 20,
    },
    boxHeader: {
      flexDirection: "row",
      margin: 10,
    },
    tabla: {
      marginTop: 10,
    },
    anunciante: {
      flexDirection: "column",
      backgroundColor: "#fff",
      margin: 20,
      padding: 10,
      borderRadius: 20,
    },
});