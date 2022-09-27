import React from "react";
import { TouchableHighlight,Text} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

export default function Boton(props){
    const {style,texto,tipo,fuente,evento,nfuente,sfuente}=props;    

    return(
        <>
        {(tipo==="Boton") ? (
            <>
            <TouchableHighlight underlayColor={null} onPress={()=>{console.log(evento)}}>            
            <Text style={style}>{texto}</Text>
            </TouchableHighlight>
            </>
        ):(tipo==="Icono" && fuente==="FontAwesome5") ?(
            <>
            <TouchableHighlight style={style} underlayColor={null} onPress={()=>{console.log(evento)}}>            
            <FontAwesome5 name={nfuente} style={sfuente} size={40}></FontAwesome5>
            </TouchableHighlight>
            </>
        ): (tipo==="Icono" && fuente==="Feather") ?(
            <>
            <TouchableHighlight style={style} underlayColor={null} onPress={()=>{console.log(evento)}}>            
            <Feather name={nfuente} style={sfuente} size={40}></Feather>
            </TouchableHighlight>
            </>
        ):(<></>)
        }        
        </>
    );
    
}