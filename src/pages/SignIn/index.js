import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import * as Animatable from "react-native-animatable";



import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'bancoteste',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL.');
});








const username = 'usuario';
const password = 'senha';

connection.query(
  'SELECT * FROM usuarios WHERE username = ? AND password = ?',
  [username, password],
  (error, results, fields) => {
    if (error) {
      console.error('Erro ao executar a consulta:', error.stack);
      return;
    }
    console.log('Resultado da consulta:', results);
    // Lógica para lidar com o resultado da consulta (por exemplo, autenticação do usuário).
  }
);







export default function SignIn() {
  const handleGoogleSignIn = () => {
    // Lógica para autenticação com Google
    console.log("Autenticar com o Google");
  };

  const handleFacebookSignIn = () => {
    // Lógica para autenticação com Facebook
    console.log("Autenticar com o Facebook");
  };

  const handleAcesso = () => {
    // Lógica para autenticação com Facebook
    console.log("Acessado");
  };

  const handleCriarConta = () => {
    // Lógica para autenticação com Facebook
    console.log("Cadastrar");
  };


  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem Vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animatable="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput placeholder='Digite um email' style={styles.input}></TextInput>

        <Text style={styles.title}>Senha</Text>
        <TextInput placeholder='Digite a senha' style={styles.input}></TextInput>

        <TouchableOpacity style={styles.button} onPress={handleAcesso}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OU</Text>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
            <Image source={require('../../assets/logo_google.png')} style={styles.socialLogo} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignIn}>
            <Image source={require('../../assets/logo_facebook.png')} style={styles.socialLogo} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonRegister} onPress={handleCriarConta}>
          <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#739489'
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 20,
    marginTop: 28
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16
  },
  button: {
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 50,
    paddingVertical: 12,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#Fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  orText: {
    textAlign: 'center',
    marginVertical: 12,
    fontSize: 16,
    color: '#A1A1A1'
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  socialButton: {
    marginHorizontal: 10
  },
  socialLogo: {
    width: 40,
    height: 40
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText: {
    color: '#A1A1A1'
  }
});
