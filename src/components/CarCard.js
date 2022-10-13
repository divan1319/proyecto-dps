import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import Colors from "../utils/Colors";
import PrimaryBadge from "./PrimaryBadge";

export default function CarCard(props) {
    /*
        --- PROPS DEFINITION ---
        status (venta o renta): string
        uri: uriString,
        brand (marca): string,
        model: string,
        year: string,
        actions: [
            {key: number, icon: string MaterialCommunityIcons, callback: function for onPress event}
            we can define up to 3 actions
        ]

    */
    return (
        <Card style={styles.container}>
            <View style={{display: 'flex', flexDirection: 'row',}}>
                <Image style={styles.carImg} source={{uri: props.uri}}/>
                <View style={styles.carInfo}>
                    <View>
                        <Text variant="titleSmall" style={{fontWeight: 'bold'}}>
                            {props.brand}
                        </Text>
                        <Text variant="bodyMedium">{props.model}</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text variant="bodyMedium" style={{fontWeight: 'bold'}}>
                            Año: 
                        </Text>
                        <Text variant="bodyMedium"> {props.year}</Text>
                    </View>
                </View>
                <View style={styles.options}>
                    <PrimaryBadge size={20}>{props.status}</PrimaryBadge>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        {props.actions.map(action =>(
                            <IconButton
                            key={action.key}
                            icon={action.icon}
                            size={20}
                            iconColor={Colors.secondary}
                            style={{margin: 0, marginLeft: 2, backgroundColor: Colors.primary}}
                            onPress={action.callback}
                        />
                        ))}
                    </View>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginVertical: 5,
        padding: 5,
        borderRadius: 10,
    },
    carInfo: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 5
    },
    carImg: {
        width: 110,
        height: 80,
        borderRadius: 10
    },
    options: {
        marginVertical: 5,
        marginHorizontal: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});