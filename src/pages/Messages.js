import { Text, View, StyleSheet, ScrollView,TextInput } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import { Button,Badge } from 'react-native-paper';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollHeader}>
      <Badge style ={styles.badgeDate}>15 de septiembre de 2022</Badge>
        <Text style={styles.messagesSender}>
          Current documentation is prepared for the v5 release candidate. If you
          are looking for the documentation related to the latest stable
          version, please choose v4.x from the dropdown
        </Text>
        <Text style={styles.messageReciever}>
          Current documentation is prepared for the v5 release candidate. If you
          are looking for the documentation related to the latest stable
          version, please choose v4.x from the dropdown
        </Text>
        <Text style={styles.messageReciever}>
          Current documentation is prepared for the v5 release candidate. If you
          are looking for the documentation related to the latest stable
          version, please choose v4.x from the dropdown
        </Text>
                <Text style={styles.messagesSender}>
          Current documentation is prepared for the v5 release candidate. If you
          are looking for the documentation related to the latest stable
          version, please choose v4.x from the dropdown
        </Text>
                <Text style={styles.messagesSender}>
          Current documentation is prepared for the v5 release candidate. If you
          are looking for the documentation related to the latest stable
          version, please choose v4.x from the dropdown
        </Text>
                <Text style={styles.messageReciever}>
          Current documentation is prepared for the v5 release candidate. If you
          are looking for the documentation related to the latest stable
          version, please choose v4.x from the dropdown
        </Text>
                        <Text style={styles.messagesSender}>
          Current documentation is prepared for the v5 release candidate. If you
          are looking for the documentation related to the latest stable
          version, please choose v4.x from the dropdown
        </Text>
      </ScrollView>
      <View style={styles.boxMessage}>
      <TextInput
        style={styles.textMessage}
        placeholder="Escribe un mensaje..."
        multiline={true}
      >
      </TextInput>
      <Button style={styles.buttonMessage} icon="send" mode="contained" color="#43433A" compact={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeDate:{
    backgroundColor:'#ecf0f1',
    padding:6,
    height:30,
    alignSelf:'center'
  },
  messagesSender: {
    margin: 8,
    backgroundColor: '#3A3736',
    textAlign: 'justify',
    color: 'white',
    padding: 15,
    borderRadius: 25,
    borderTopLeftRadius: 1,
    
    
    
  },
  messageReciever: {
    margin: 8,
    backgroundColor: '#E3DFDD',
    textAlign: 'justify',
    color: 'black',
    padding: 15,
    borderRadius: 25,
    borderBottomRightRadius: 1,
    flexDirection:'column'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  textMessage:{
    width:320,
    backgroundColor:"#E3DFDD",
    borderRadius:10,
    padding:10
  
  },
  buttonMessage:{
    borderRadius:30,
    alignSelf:'center',
    marginLeft:10

  },
  boxMessage:{
    flexDirection:'row',
    margin:10,
  },
  scrollHeader:{
    marginTop:10
  }


});