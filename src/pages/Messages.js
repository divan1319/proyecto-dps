import { Text, View, StyleSheet, ScrollView,TextInput } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import { Button,Badge } from 'react-native-paper';

export default function App() {
  return (
    <View style={styles.contain}>

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
  contain: {
    flex: 1,

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