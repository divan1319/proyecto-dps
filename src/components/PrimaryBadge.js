import React from "react";
import { Badge } from "react-native-paper";
import Colors from "../utils/Colors";

export default function PrimaryBadge (props) {
    /*
        Props available
        -style : {{}} or StyleSheet
        -size : number
    */
    return (
        <Badge style={{...props.style, backgroundColor: Colors.primary, paddingHorizontal: 10}} size={props.size}>
            {props.children}
        </Badge>
    );
}