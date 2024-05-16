import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignUp() {
  const handleGoogleSignIn = () => {
    // Lógica para autenticação com Google
    console.log("Autenticar com o Google");
  };

  const handleFacebookSignIn = () => {
    // Lógica para autenticação com Facebook
    console.log("Autenticar com o Facebook");
  };

  const handleCadastro = () => {
    // Lógica para autenticação com Facebook
    console.log("Cadastrado");
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView scrollEnabled={true}>
        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
          <Text style={styles.message}>Cadastro</Text>
        </Animatable.View>

        <Animatable.View animatable="fadeInUp" style={styles.containerForm}>
          <Text style={styles.title}>Nome Completo</Text>
          <TextInput placeholder='Digite seu nome completo' style={styles.input}></TextInput>

          <Text style={styles.title}>Email</Text>
          <TextInput placeholder='Digite um email' style={styles.input}></TextInput>

          <Text style={styles.title}>Senha</Text>
          <TextInput placeholder='Digite a senha' style={styles.input}></TextInput>

          <Text style={styles.title}>Confirmar Senha</Text>
          <TextInput placeholder='Confirme sua senha' style={styles.input}></TextInput>

          <Text style={styles.title}>Data de Nascimento</Text>
          <TextInput placeholder='DD/MM/AAAA' style={styles.input}></TextInput>

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
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
        </Animatable.View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#739489'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    paddingTop: 25,
    paddingBottom:85,  
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
  }
});
