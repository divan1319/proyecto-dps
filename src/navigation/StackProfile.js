import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Profile from "./../pages/Profile";
import MyVehicles from './../pages/MyVehicles';

const Stack = createStackNavigator();

function StackProfile() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile"
        component={Profile} 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="MyVehicles"
        component={MyVehicles}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

export default StackProfile;