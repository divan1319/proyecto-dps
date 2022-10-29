import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeNavigationStack from "./HomeNavigationStack";
import AddVehicle from './../pages/AddVehicle';
import Register from "../pages/Register";
import VehicleInformation from "../pages/VehicleInformation";
import StackProfile from "./StackProfile";

const Tab = createBottomTabNavigator();
function BottomTab() {
    return (
        <Tab.Navigator
        initialRouteName="HomeNavigation"
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    
                    if(route.name === "HomeNavigation") {
                        iconName = focused ? 'home' : 'home-outline';
                    }else if(route.name === "AddVehicle") {
                        iconName = 'plus-circle';
                        color = '#292929';
                        size = 45;
                    }else if(route.name === "StackProfile") {
                        iconName = focused ? 'account' : 'account-outline';
                    }else {
                        iconName = focused ? 'file-question' : 'file-question-outline';
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'gray',
                tabBarInactiveTintColor: 'gray',                
            })}
        >
            {/*Añadida el Componente HomeNavigation, que es un Stack 
                que está compuesto de las pantallas Home, ChatRoom y ChatUser*/}
            <Tab.Screen name="HomeNavigation" component={HomeNavigationStack}/>            
            <Tab.Screen name="AddVehicle" component={AddVehicle}/>
            <Tab.Screen name="StackProfile" component={StackProfile}/>
        </Tab.Navigator>
    );
}

export default BottomTab;