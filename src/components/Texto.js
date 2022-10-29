import React from "react";
import { Text,StyleSheet, View, TouchableHighlight } from "react-native";
import  MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaskInput from "react-native-mask-input";
import Indicador from "./ValidationMessage";
import FieldPasword from "./FieldPassword";
export default function Texto(props){

    const { id,mascara,styletxt,styleinputtxt,txt1,txt2,ktype,setValue,setFocusedValue,
        isVisible,valuetext,validado,seeContrasena,setSeeContrasena}=props;    
    
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

    return(
        <>                
            <Text style={styletxt}>{txt1}</Text>
            {
                /*Se utiliza MaskInput en lugar de TextInput para añadir una máscara a los campos de Número de
                teléfono y de DUI para que cumplan con lo requerido*/
            }
            {
                id>=0&&id<4 ?(
                    <MaskInput mask={mascara} secureTextEntry={seeContrasena} style={styleinputtxt} 
                    keyboardType={ktype} placeholder={txt2} value={valuetext} onChangeText={(masked,unmasked)=>setValue(masked)} 
                    onFocus={()=>setFocusedValue(true)} onBlur={()=>setFocusedValue(false)} />):
                id==4?(                    
                        <FieldPasword mask={mascara} seeContrasena={seeContrasena} styleinputtxt={styleinputtxt} 
                        ktype={ktype} txt2={txt2} valuetext={valuetext} setSeeContrasena={setSeeContrasena} setValue={setValue}
                        setFocusedValue={setFocusedValue}/>                    
                    ):<></>
             }
                       {
                           /*Dependiendo del id del campo de texto será mostrado un mensaje que se pondrá rojo
                           si la validación no es correcta y será verde si sí lo es, siempre y cuando el campo de texto
                           tenga foco/esté seleccionado (funcion Onfocus?) */
                       }    
                {   (isVisible==true && id==4)?
                    (            
                    <Indicador validity={validado} iditem={id}/>
                    ):
                    (isVisible==true && id==3)?
                    (            
                        <Indicador validity={validado} iditem={id} />
                    ):
                    (isVisible==true && id==2)?
                    (            
                       <Indicador validity={validado} iditem={id} />
                    ):(isVisible==true && id==1)?
                    (            
                        <Indicador validity={validado} iditem={id} />
                    ):(isVisible==true && id==0)?
                    (            
                        <Indicador validity={validado} iditem={id} />
                    ):<></>
                 }                                          
        </>
    );
}
