import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button,Badge } from 'react-native-paper';
import App from "./Messages";
import api from "../data/api";
import axios from "axios";

export default function ChatUser({ route, navigation }) {
  //props.route.params.somedata Permite obtener parametros de otra Screen!!
    const [conver, setConver] = useState([]);
    const [message, setMessage] = useState("");
    
    const SendMessage = async () =>{
      let mensaje = new FormData();
      mensaje.append("user_sender",route.params.idReceiver);
      mensaje.append("user_receiver",route.params.idSender);
      mensaje.append("mensaje",message);
      if(message == undefined || message == null || mensaje === ""){
        Alert.alert("Advertencia","No puede enviar mensajes vacios");
      }else{
        await axios.post(api.server+'chat',mensaje,{
          headers:{
            "content-type":"multipart/form-data"
          }
        }).then(res => {
          if(res.data.status != 200){
            Alert.alert("¡Advertencia!","No se pudo enviar el mensaje");
          }else{
            setMessage("");
          }
        }).catch(err =>{
          console.log(err)
        });
      }
    }
    const UpdateEstado = async () =>{
      let dataestado = new FormData();
      dataestado.append("id",route.params.idReceiver);
      dataestado.append("idsender",route.params.idSender);
      await axios.post(api.server+'chat.php?op=updState',dataestado,{
        headers:{
          "content-type":"multipart/form-data"
        }
      }).then().catch();
    }

    const LoadConver = async () =>{
        let data = new FormData();
        data.append("id",route.params.idReceiver);
        data.append("idsender",route.params.idSender);
        await axios.post(api.server+'chat.php?op=getConver',data,{
            headers:{
                "content-type":"multipart/form-data"
            }
        }).then(res => {
            if(res.data.status == 200){
                setConver(res.data.chats);
            }
        }).catch(errr =>{
            console.log(errr)
        })
    }
    useEffect( ()=> {
        setInterval(LoadConver,1000);
        UpdateEstado();
    },[])
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableHighlight
          style={styles.regresar}
          onPress={() => {
            navigation.navigate("ChatRoom");
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" color={"white"} size={48} />
        </TouchableHighlight>
        <Image
          style={styles.perfil}
          source={{ uri: route.params.foto }}
        />
        <Text numberOfLines={1} style={styles.txtTitle}>
          {route.params.userSender}
        </Text>
      </View>
      
      <ScrollView style={styles.scrollHeader}>
        {
            conver.map( (c,index) => 
            c.EnviadoPor == route.params.userSender ?
            (
                <View key={index}>
                    <Text style={styles.messagesSender}>
                    {c.mensajes}
        </Text>
        </View>
            ):
            (
        <View key={index}>
                <Text style={styles.messageReciever}>
                {c.mensajes}
              </Text>
              </View>
            )
            )
        }
      </ScrollView>
      <View style={styles.boxMessage}>
        <TextInput
          style={styles.textMessage}
          placeholder="Escribe un mensaje..."
          multiline={true}
          value={message}
          onChangeText={setMessage}
          
        ></TextInput>
        <Button
          style={styles.buttonMessage}
          icon="send"
          textColor="white"
          buttonColor="black"
          compact={true}
          onPress={SendMessage}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  regresar: {
    marginTop: 6,
  },
  top: {
    backgroundColor: "#292929",
    height: 60,
    width: "100%",
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
  },
  txtTitle: {
    color: "white",
    fontSize: 22,
    textAlignVertical: "center",
    marginRight: 5,
    marginLeft: 10,
    width: "70%",
  },
  icono: {
    color: "white",
    backgroundColor: "gray",
    height: 24,
    width: 24,
    borderRadius: 100,
    fontSize: 14,
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 20,
  },
  perfil: {
    width: 45,
    height: 45,
    borderRadius: 100,
    alignSelf: "center",
  },
  container: {
    height: "100%",
    backgroundColor: "#F5F5F5",
  },
  badgeDate: {
    backgroundColor: "#ecf0f1",
    padding: 6,
    height: 30,
    alignSelf: "center",
  },
  messagesSender: {
    margin: 8,
    backgroundColor: "#3A3736",
    textAlign: "justify",
    color: "white",
    padding: 15,
    borderRadius: 25,
    borderTopLeftRadius: 1,
  },
  messageReciever: {
    margin: 8,
    backgroundColor: "#E3DFDD",
    textAlign: "justify",
    color: "black",
    padding: 15,
    borderRadius: 25,
    borderBottomRightRadius: 1,
    flexDirection: "column",
  },
  contain: {
    flex: 1,
  },
  textMessage: {
    width: 320,
    backgroundColor: "#E3DFDD",
    borderRadius: 10,
    padding: 10,
  },
  buttonMessage: {
    borderRadius: 30,
    alignSelf: "center",
    marginLeft: 10,
  },
  boxMessage: {
    flexDirection: "row",
    margin: 10,
  },
  scrollHeader: {
    marginTop: 10,
  },
});
