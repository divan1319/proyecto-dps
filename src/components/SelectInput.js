import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import SelectList from 'react-native-dropdown-select-list';
import Colors from "../utils/Colors";

export default function SelectInput(props) {
    /*
        Props available
        -data : object
        -setSelected : function
        -placeholder: string
        -title : string

        data structure:
        data = [
            {key: any, value: any}
        ]
    */
    
    return (
        <View>
            <Text variant="titleSmall">
                {props.title}
            </Text>
            <SelectList
                data={props.data}
                setSelected={props.setSelected}
                onSelect={props.onSelect}
                boxStyles={{
                    
                    borderWidth: 1,
                    borderColor: Colors.borders,
                    borderRadius: 25,
                    backgroundColor: Colors.secondary,
                    height: 45,
                    paddingHorizontal: 20,
                    marginTop: 8,
                    
                }}
                dropdownStyles={{
                    backgroundColor: Colors.tertiary,
                    borderColor: Colors.tertiary
                }}
                placeholder={props.placeholder}
                searchPlaceholder="Buscar..."
            />
        </View>
    );
}