import React from "react";
import { TouchableHighlight,Text} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons'

export default function Boton(props){
    const {style,texto,tipo,fuente,nfuente,sfuente,iconcolor}=props;    

    return(
        <>
        {(tipo==="Boton") ? (
            <>
            <TouchableHighlight underlayColor={null} onPress={props.onPress}>            
            <Text style={style}>{texto}</Text>
            </TouchableHighlight>
            </>
        ):(tipo==="Icono" && fuente==="FontAwesome5") ?(
            <>
            <TouchableHighlight style={style} underlayColor={null} onPress={props.onPress}>            
            <FontAwesome5 name={nfuente} style={sfuente} iconcolor={iconcolor} size={40}></FontAwesome5>
            </TouchableHighlight>
            </>
        ): (tipo==="Icono" && fuente==="Octicons") ?(
            <>
            <TouchableHighlight style={style} underlayColor={null} onPress={props.onPress}>            
            <Octicons name={nfuente} style={sfuente} color={iconcolor} size={40}></Octicons>
            </TouchableHighlight>
            </>
        ):(<></>)
        }        
        </>
    );
    
}