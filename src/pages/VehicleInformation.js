import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from 'expo-constants';
import Colors from "../utils/Colors";

export default function VehicleInformation() {
    return (
        //main container, use it for put your code
        <View style={styles.container}>
            <Text>Vehicle Information Screen</Text>
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