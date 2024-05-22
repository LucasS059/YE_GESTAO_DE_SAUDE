import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

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
          onPress={handleTeste}>
       </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.square}
          onPress={() => navigation.navigate('Agenda')}
        >
          <Text style={styles.buttonText}>Exame 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.square}
          onPress={handleTeste}
        >
          <Text style={styles.buttonText}>Exame 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.square}
          onPress={handleTeste}
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
    backgroundColor: '#739489', 
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold', 
    color: 'white', 
  },
  listContainer: {
    width: '80%',
  },
  square: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 14, 
    color: '#38a69d', 
  },
});
