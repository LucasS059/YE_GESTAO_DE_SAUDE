import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import * as Animatable from "react-native-animatable";

export default function Welcome() {
  const navigation = useNavigation();

  const handleTeste = () => {
    // Lógica para autenticação com Facebook
    console.log("testado");
  };

  return (
    <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Aplicativo</Text>
            <View style={styles.listContainer}>
                <TouchableOpacity
                    style={styles.square}
                    onPress={(handleTeste)}
                >
                    <Text style={styles.buttonText}>Agendamento Medicação</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.square}
                    onPress={ () => navigation.navigate('Agendamento')}
                >
                    <Text style={styles.buttonText}>Exame 2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.square}
                    onPress={(handleTeste)}
                >
                    <Text style={styles.buttonText}>Exame 3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.square}
                    onPress={(handleTeste)}
                >
                    <Text style={styles.buttonText}>Exame 4</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#739489', // Cor verde água
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        fontWeight: 'bold', // Estilo mais gordo (negrito)
        color: 'white', // Cor #38a69d
    },
    listContainer: {
        width: '80%',
    },
    square: {
        backgroundColor: '#FFFFFF', // Cor branca
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 14, // Tamanho do texto reduzido para 14
        color: '#38a69d', // Cor #38a69d
    },
});