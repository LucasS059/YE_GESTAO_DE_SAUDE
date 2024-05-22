import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BemVindo from "../pages/BemVindo";
import Login from "../pages/Login"; 
import TelaPrincipal from '../pages/TelaPrincipal';
import Cadastro from '../pages/Cadastro';
import Medicacao from "../pages/Medicacao";
import Geral from "../pages/Geral";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BemVindo" component={BemVindo} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
            <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} options={{ headerShown: false }} />
            <Stack.Screen name="Medicacao" component={Medicacao} options={{ headerShown: false }} />
            <Stack.Screen name="Geral" component={Geral} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
