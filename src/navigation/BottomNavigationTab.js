import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './../pages/Home';
import AddVehicle from './../pages/AddVehicle';
import Profile from './../pages/Profile';
import Register from "../pages/Register";
import VehicleInformation from "../pages/VehicleInformation";

const Tab = createBottomTabNavigator();

function BottomTab() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    
                    if(route.name === "Home") {
                        iconName = focused ? 'home' : 'home-outline';
                    }else if(route.name === "AddVehicle") {
                        iconName = 'plus-circle';
                        color = '#292929';
                        size = 45;
                    }else if(route.name === "Profile") {
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
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="AddVehicle" component={AddVehicle}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    );
}

export default BottomTab;