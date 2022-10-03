import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from 'expo-constants';
import SecondaryButton from "../components/SecondaryButton";
import PrimaryInput from "../components/PrimaryInput";
import Colors from "../utils/Colors";
import ImgPicker from "../components/ImgPicker";
import PrimaryBadge from './../components/PrimaryBadge';

export default function Home() {
    const [text, onChangeText] = React.useState('');
    const [image, setImage] = React.useState(null);

    return (
        //main container, use it for put your code
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <SecondaryButton onPress={() => console.log("oka")} icon="email">
                Click me
            </SecondaryButton>
            <PrimaryInput title="Introduce tu nombre" value={text} onChangeText={onChangeText} placeholder="nombre..." keyboardType='numeric'/>
            <ImgPicker image={image} setImage={setImage}></ImgPicker>
            <PrimaryBadge></PrimaryBadge>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: Colors.backgroundScreen,
        minHeight: '100%',
        paddingHorizontal: 20,
    }
});