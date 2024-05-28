import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

export default function TelaPrincipal() {
  const navigation = useNavigation();

  const handleTeste = () => {
    console.log("testado");
  };

  async function logout() {
    try {
      await signOut(auth);
      console.log('Saiu com sucesso!');
      navigation.navigate('BemVindo');
    } catch (error) {
      console.log(error);
    }
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

      <TouchableOpacity style={estilos.containerQuadrado} onPress={() => navigation.navigate('Consulta')}>
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

      {/* Botão para sair da conta */}
      <TouchableOpacity style={estilos.botaoSair} onPress={() => logout()}>
        <Text style={estilos.textoBotaoSair}>Sair da Conta</Text>
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
    marginBottom: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  containerQuadrado: {
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  quadrado: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
    padding: 15,
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38a69d',
    textAlign: 'center', 
  },
  botaoSair: {
    marginTop: 20, // Adicionando espaço acima do botão de sair
    backgroundColor: '#FF6347', // Cor de fundo vermelha para o botão de sair
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  textoBotaoSair: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center', 
  },
});
