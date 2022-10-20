import React from "react";
import { Text,TextInput } from "react-native";

export default function Texto(props){
    
    const {styletxt,styleinputtxt,txt1,txt2,ktype,SetValue}=props;
    return(
        <>
        <Text style={styletxt}>{txt1}</Text>
        <TextInput secureTextEntry={props.secureTextEntry} style={styleinputtxt} keyboardType={ktype} placeholder={txt2} onChangeText={txt=>SetValue(txt)}/>
        </>
    );
}
