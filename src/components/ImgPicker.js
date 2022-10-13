import React, { useEffect } from "react";
import { Platform, View, ImageBackground, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Colors from "../utils/Colors";

export default function ImgPicker(props) {

    /*
        Props available
        -image : variable
        -setImage : function
    */

    useEffect(() => {
        async function getMediaLibraryPermission() {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    console.log("permission denied");
                    Alert.alert(
                        "Permiso denegado",
                        "El permiso a la galería a sido denegado",
                        [
                          {
                            text: "Cancel",
                            onPress: () => {},
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => {} }
                        ]
                    );
                }
            }
        }
        getMediaLibraryPermission();
    }, []);

    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1
        });
        console.log(result);
        if (!result.cancelled) {
            props.setImage(result.uri);
        }
    }

    return (
        <View>
            {
                props.image === null &&
                <IconButton 
                    onPress={PickImage}
                    icon='camera'
                    iconColor={Colors.primary}
                    size={40}
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: Colors.tertiary,
                        borderRadius: 20,
                        margin: 0
                    }}
                >
                </IconButton>
            }
            {
                props.image &&
                <ImageBackground 
                    source={{uri: props.image}}
                    style={{width: 100, height: 100}}
                >
                    <IconButton 
                        icon='close-circle'
                        iconColor={Colors.primary}
                        onPress={() => {props.setImage(null)}}
                    />
                </ImageBackground>
            }
        </View>
    );
}