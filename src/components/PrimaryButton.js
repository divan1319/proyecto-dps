import React from "react";
import { Button } from "react-native-paper";
import Colors from "../utils/Colors";

export default function PrimaryButton(props) {
    
    return (
        <Button 
            mode="contained" 
            buttonColor={Colors.primary}
            onPress={props.onPress}
            icon={props.icon} //just MaterialCommunityIcons are allowed : string
            style={{
                ...props.style,
            }}
        >
            {props.children}
        </Button>
    );
}