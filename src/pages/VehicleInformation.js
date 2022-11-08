import React from "react";
import { StyleSheet, View,ScrollView,Dimensions,Image} from "react-native";
import Constants from 'expo-constants';
import {Badge,Text,DataTable,Button} from 'react-native-paper';
import Colors from "../utils/Colors";

export default function VehicleInformation({route, navigation}) {
    const {tipoV,
      claseV,
      marcaV,
      modeloV,
      estadoV,
      descV,
      userU,
      correoU,
      celU,
      yearV,
      servicioV,
      precioV,
      photo1,
      photo2,
      photo3} = route.params;
    return (
<ScrollView style={styles.container}>
      <ScrollView horizontal={true}>
        <Image
          style={styles.carrousel}
          source={{
            uri:photo1,
          }}
        />
        <Image
          style={styles.carrousel}
          source={{
            uri:photo2,
          }}
        />
        <Image
          style={styles.carrousel}
          source={{
            uri:photo3,
          }}
        />
      </ScrollView>
      <View style={styles.boxHeader}>
        <Badge style={styles.servicio}>{servicioV}</Badge>
        <Text style={styles.price}>${precioV}</Text>
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
            <DataTable.Cell>{claseV}</DataTable.Cell>
            <DataTable.Cell>{tipoV}</DataTable.Cell>
            <DataTable.Cell>{estadoV}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <DataTable style={styles.tabla}>
          <DataTable.Header>
            <DataTable.Title>Marca</DataTable.Title>
            <DataTable.Title>Modelo</DataTable.Title>
            <DataTable.Title>Año</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>{marcaV}</DataTable.Cell>
            <DataTable.Cell>{modeloV}</DataTable.Cell>
            <DataTable.Cell>{yearV}</DataTable.Cell>
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
          {descV}
        </Text>
      </View>
      <Text style={{ margin: 10, marginTop: 20, fontWeight: "700" }}>
        Anunciante
      </Text>
      <View style={styles.anunciante}>
        <Text style={{ fontSize: 20, fontWeight: "400" }}>{userU}</Text>
        <Text>{correoU}</Text>
        <Text>{celU}</Text>
      </View>
      <Button icon="email" textColor="#FFFFFF" style={{margin:20,width:200,backgroundColor:'black',alignSelf:'center'}} onPress={ () => {navigation.navigate("ChatUser",{
      idSender:route.params.idvendedor,
      idReceiver:route.params.idcomprador,
      userSender:userU,
      userRec:route.params.userNameN
      })}} >Contactar</Button>
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
      backgroundColor: "#FFFFFF",
      margin: 20,
      padding: 10,
      borderRadius: 20,
    },
});