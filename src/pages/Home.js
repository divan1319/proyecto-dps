import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from 'expo-constants';
import SecondaryButton from "../components/SecondaryButton";
import PrimaryButton from "./../components/PrimaryButton";
import PrimaryInput from "../components/PrimaryInput";
import Colors from "../utils/Colors";
import ImgPicker from "../components/ImgPicker";
import PrimaryBadge from './../components/PrimaryBadge';
import SelectInput from "../components/SelectInput";

export default function Home() {
    const [text, onChangeText] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [selected, setSelected] = React.useState("");

    const data = [
        {key: '1dsd', value: 'uno'},
        {key: '2', value: 'dos'},
        {key: '3', value: 'tres'},
        {key: '4', value: 'cuatro'},
        {key: '5', value: 'cinco'},
        {key: '6', value: 'seis'},
        {key: '7', value: 'siete'},
    ];


    return (
        //main container, use it for put your code
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <PrimaryButton>Click aquí</PrimaryButton>
            <SecondaryButton onPress={() => console.log("ok")} icon="email">
                Click me
            </SecondaryButton>
            <PrimaryInput title="Introduce tu nombre" value={text} onChangeText={onChangeText} placeholder="nombre..." keyboardType='numeric'/>
            <ImgPicker image={image} setImage={setImage}></ImgPicker>
            <PrimaryBadge sieze={24}>
                En Renta
            </PrimaryBadge>
            <SelectInput onSelect={() => console.log(selected)} title="Clase de auto" data={data} setSelected={setSelected} placeholder="Holaa"/>
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