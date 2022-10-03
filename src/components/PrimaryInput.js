import React from "react";
import { View, TextInput } from "react-native";
import { Text } from "react-native-paper";
import Colors from "../utils/Colors";

export default function PrimaryInput(props) {
    return (
        <View>
            <Text variant="titleSmall">
                {props.title}
            </Text>
            <TextInput
                style={{
                    borderWidth: 1,
                    borderColor: Colors.borders,
                    borderRadius: 25,
                    backgroundColor: Colors.secondary,
                    height: 40,
                    paddingHorizontal: 20,
                    marginTop: 8,
                }}
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType}
            />
        </View>
    );
}