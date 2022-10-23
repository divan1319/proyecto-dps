import React from "react";
import { createStackNavigator, } from "@react-navigation/stack";
import ChatRoom from "../pages/ChatRoom";
import Home from "../pages/Home";
import ChatUser from "../pages/ChatUser";

const Stack = createStackNavigator();

export default function HomeNavigationStack() {
    return (        
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen        
        name="Home"
        component={Home}
        options={{ headerShown: false }}
    />        
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatUser"
        component={ChatUser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    );
}
