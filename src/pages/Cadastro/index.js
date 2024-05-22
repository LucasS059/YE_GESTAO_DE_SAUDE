import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Cadastro() {
  const handleGoogleSignIn = () => {
    // Lógica para autenticação com Google
    console.log("Autenticar com o Google");
  };

  const handleFacebookSignIn = () => {
    // Lógica para autenticação com Facebook
    console.log("Autenticar com o Facebook");
  };

  const handleCadastro = () => {
    // Lógica para cadastro
    console.log("Cadastrado");
  };

  return (
    <View style={estilos.container}>
      <KeyboardAwareScrollView scrollEnabled={true}>
        <Animatable.View animation="fadeInLeft" delay={500} style={estilos.containerHeader}>
          <Text style={estilos.message}>Cadastro</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={estilos.containerForm}>
          <Text style={estilos.title}>Nome Completo</Text>
          <TextInput placeholder='Digite seu nome completo' style={estilos.input} />

          <Text style={estilos.title}>Email</Text>
          <TextInput placeholder='Digite um email' style={estilos.input} />

          <Text style={estilos.title}>Senha</Text>
          <TextInput placeholder='Digite a senha' style={estilos.input} secureTextEntry />

          <Text style={estilos.title}>Confirmar Senha</Text>
          <TextInput placeholder='Confirme sua senha' style={estilos.input} secureTextEntry />

          <Text style={estilos.title}>Data de Nascimento</Text>
          <TextInput placeholder='DD/MM/AAAA' style={estilos.input} />

          <TouchableOpacity style={estilos.button} onPress={handleCadastro}>
            <Text style={estilos.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <Text style={estilos.orText}>OU</Text>

          <View style={estilos.socialButtonsContainer}>
            <TouchableOpacity style={estilos.socialButton} onPress={handleGoogleSignIn}>
              <Image source={require('../../assets/logo_google.png')} style={estilos.socialLogo} />
            </TouchableOpacity>

            <TouchableOpacity style={estilos.socialButton} onPress={handleFacebookSignIn}>
              <Image source={require('../../assets/logo_facebook.png')} style={estilos.socialLogo} />
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#739489',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerForm: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    paddingTop: 25,
    paddingBottom: 85,
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 50,
    paddingVertical: 12,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 12,
    fontSize: 16,
    color: '#A1A1A1',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    marginHorizontal: 10,
  },
  socialLogo: {
    width: 40,
    height: 40,
  },
});
