import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

export default function TelaPrincipal() {
  const navigation = useNavigation();

  const handleTeste = () => {
    console.log("testado");
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Bem-vindo ao Aplicativo</Text>
    
      <TouchableOpacity style={estilos.containerQuadrado} onPress={() => navigation.navigate('Telamedicao')}>
        <View style={estilos.quadrado}>
          <Text style={estilos.textoBotao}>Aferições</Text>
        </View>
      </TouchableOpacity>
        
      <TouchableOpacity style={estilos.containerQuadrado} onPress={() => navigation.navigate('Medicacao')}>
        <View style={estilos.quadrado}>
          <Text style={estilos.textoBotao}>Medicação</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={estilos.containerQuadrado} onPress={handleTeste}>
        <View style={estilos.quadrado}>
          <Text style={estilos.textoBotao}>Consultas</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={estilos.containerQuadrado} onPress={handleTeste}>
        <View style={estilos.quadrado}>
          <Text style={estilos.textoBotao}>Exames</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={estilos.containerQuadrado} onPress={handleTeste}>
        <View style={estilos.quadrado}>
          <Text style={estilos.textoBotao}>Histórico de Exames</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#739489',
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    marginBottom: 30, // Aumentando o espaçamento abaixo do título
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  containerQuadrado: {
    marginBottom: 15, // Reduzindo o espaçamento entre os botões
    width: '100%',
    alignItems: 'center',
  },
  quadrado: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120, // Aumentando a altura dos botões
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Aumentando a sombra dos botões
    shadowOpacity: 0.35, // Aumentando a opacidade da sombra
    shadowRadius: 6,
    elevation: 8,
    padding: 15, // Aumentando o padding dentro dos botões
  },
  textoBotao: {
    fontSize: 20, // Aumentando o tamanho do texto dos botões
    fontWeight: 'bold',
    color: '#38a69d',
    textAlign: 'center', 
  },
});
