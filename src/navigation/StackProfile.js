import React from "react";
import { createStackNavigator } from 'react-navigation-stack';
import Profile from "./../pages/Profile";
import MyVehicles from './../pages/MyVehicles';

const Stack = createStackNavigator();

function StackProfile() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MyVehicles" component={MyVehicles} />
    </Stack.Navigator>
  );
}

export default StackProfile;