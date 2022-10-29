import React from "react";
import { Text,StyleSheet, View, TouchableHighlight } from "react-native";
import  MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaskInput from "react-native-mask-input";


const style=StyleSheet.create({
    colorvalido:{
        color:'green',
        marginTop:0,
        lineHeight:20,
    },
    colornovalido:{
        color:'red',
        marginTop:0,
        lineHeight:20,
    },
    formato:{            
        marginBottom:10,
    },
    seeContrasena:{
        position:'absolute',
        right:0,
        paddingRight:10,
        paddingTop:18,

    },
    contenedorcontrasena:{
        flexDirection:'row',            
    }
})

export default function FieldPasword(props){
    const {mascara,seeContrasena,styleinputtxt,ktype,txt2,valuetext,setFocusedValue,setSeeContrasena,setValue}=props;
    return(
        <View style={style.contenedorcontrasena}>
            <MaskInput mask={mascara} secureTextEntry={seeContrasena} style={styleinputtxt} 
            keyboardType={ktype} placeholder={txt2} value={valuetext} onChangeText={(masked,unmasked)=>setValue(masked)} 
            onFocus={()=>setFocusedValue(true)} onBlur={()=>setFocusedValue(false)} />
            <TouchableHighlight onPress={()=>setSeeContrasena(!seeContrasena)} >
                {
                    //Dependiendo del estado del secureTextEntry, el icono del ojo cambiará
                }
                { 
                    seeContrasena==true ?(
                        <MaterialCommunityIcons style={style.seeContrasena} name={"eye"} size={24} />
                    ):(
                        <MaterialCommunityIcons style={style.seeContrasena} name={"eye-off"} size={24} />
                    )
                }                                
            </TouchableHighlight>
        </View>
    )
}

