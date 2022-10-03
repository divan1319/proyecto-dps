import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from 'expo-constants';

export default function Profile() {
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    }
});