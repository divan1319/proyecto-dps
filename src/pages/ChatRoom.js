import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useInsertionEffect,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Card, Badge } from "react-native-paper";
import api from "../data/api";
import axios from "axios";

let quantity = 0;

export default function ChatRoom({ navigation, route }) {
  const [chats, setChats] = useState([]);
  const [Id, setId] = useState();

  const LeftContent = (props) => (
    <Image
      source={{ uri: "https://picsum.photos/700" }}
      style={{ width: 45, height: 45, borderRadius: 25 }}
    />
  );
  const RightContent = (props) => (
    <Badge
      size={12}
      style={{ backgroundColor: "red", marginRight: 15 }}
    ></Badge>
  );

  const LoadChats = async () => {
    let data = new FormData();
    data.append("id", route.params.id);

    await axios
      .post(api.server + "chat.php?op=getChats", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          setChats(res.data.chats);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setInterval(LoadChats,1000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {}
        <TouchableHighlight
          style={styles.regresar}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" color={"white"} size={48} />
        </TouchableHighlight>
        <Text style={styles.txtTitle}>Mensajes</Text>
      </View>
      <ScrollView>
        {chats.map((c) => (
          <TouchableHighlight
            key={c.user_sender}
            style={styles.regresar}
            onPress={() => {
              navigation.navigate("ChatUser",{
                idSender:c.user_sender,
                idReceiver:c.user_receiver,
                userSender:c.userSender,
                userRec:c.userRece,
                foto:c.foto
              });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                margin: 2,
                padding: 15,
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
              }}
            >
              <Image
                source={{ uri: c.foto }}
                style={{ width: 45, height: 45, borderRadius: 25 }}
              />
              <Text
                style={{ fontSize: 19, alignSelf: "center", marginLeft: 13 }}
              >
                {c.userSender}
              </Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
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
    display: "flex",
    flexDirection: "row",
  },
  txtTitle: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    textAlignVertical: "center",
    marginRight: 10,
    fontFamily: "Roboto",
  },
  icono: {
    color: "white",
    backgroundColor: "#706F6F",
    height: 24,
    width: 24,
    borderRadius: 100,
    fontSize: 14,
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 20,
  },
  container: {
    height: "100%",
    backgroundColor: "#F5F5F5",
  },
});
