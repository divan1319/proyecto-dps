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
            paddingTop:17,

        },
        contenedorcontrasena:{
            flexDirection:'row',            
        }
    })
  
    
    //Componente que renderiza el texto segun las validaciones
    const IndicadorItem=({isValid, text})=>
    {        
        return(
            <>
                {isValid==true ?(<Text style={style.colorvalido}>*{text}</Text>):(
                    <Text style={style.colornovalido}>*{text}</Text>                
                )}                
            </>            
        )
    } 
    const Indicador=({validity:{validado,longitud,mayuscula,numero,specialcaracter},iditem})=>
    {        
        return(
            <View>
                {iditem==0?
                (
                    <View>
                        <IndicadorItem isValid={validado} text={"El nombre debe de ser válido"}  />
                    </View>
                ):
                iditem==1 ?(
                    <View>
                        <IndicadorItem isValid={validado} text={"El correo electrónico debe de ser válido"}  />
                    </View>
                ):
                iditem==2 ?(
                    <View>
                        <IndicadorItem isValid={validado} text={"El número de teléfono debe de tener un formato válido (Inicie con 6 o con 7)"}  />
                    </View>):
                iditem==3 ?(
                    <View>
                        <IndicadorItem isValid={validado} text={"El DUI debe de tener un formato válido (Empieza con cero)"}  />
                    </View>):
                iditem==4 ?(
                <View>
                    <Text style={style.formato}>La contraseña debe de cumplir con los siguientes requisitos:</Text>
                    <IndicadorItem isValid={longitud} text={"La contraseña debe de tener al menos 8 carácteres"} />
                    <IndicadorItem isValid={mayuscula} text={"La contraseña debe de tener al menos 1 letra mayúscula"} />
                    <IndicadorItem isValid={numero} text={"La contraseña debe de tener al menos 1 número"} />
                    <IndicadorItem isValid={specialcaracter} text={"La contraseña debe de tener al menos 1 carácter especial"} />
                </View>
                ):<></>}
                
            </View>
        )
    }

    export default Indicador;