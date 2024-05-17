import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn"; 
import { Header } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
import SignUp from '../pages/SignUp';
import { Agendamento } from "../pages/Agendamento";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
            <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
            <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}}/>
            {/* <Stack.Screen name="Agendamento" component={Agendamento} options={{headerShown: false}}/> */}
        </Stack.Navigator>   
    );
}