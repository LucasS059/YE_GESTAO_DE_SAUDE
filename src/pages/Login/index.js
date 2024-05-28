import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import * as Animatable from "react-native-animatable";
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../services/firebaseConnection";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  async function login() {
    await signInWithEmailAndPassword(auth, email, password)
      .then(value => {
        console.log('Fez login com sucesso! \n ' + value.user.uid);
        navigation.navigate('Principal'); // Redireciona para a tela principal após login
      })
      .catch(error => console.log(error));
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      navigation.navigate('Principal'); // Redireciona para a tela principal após login
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign-in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.log('Some other error:', error);
      }
    }
  };

  const handleFacebookSignIn = () => {
    // Lógica para autenticação com Facebook
    console.log("Autenticar com o Facebook");
  };

  return (
    <View style={estilos.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={estilos.containerHeader}>
        <Text style={estilos.message}>Bem Vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={estilos.containerForm}>
        <Text style={estilos.title}>Email</Text>
        <TextInput 
          placeholder='Digite seu email' 
          style={estilos.input} 
          keyboardType="email-address"
          value={email}
          onChangeText={value => setEmail(value)} 
        />

        <Text style={estilos.title}>Senha</Text>
        <TextInput 
          placeholder='Digite sua senha' 
          style={estilos.input} 
          secureTextEntry 
          value={password}
          onChangeText={value => setPassword(value)}        
        />

        <TouchableOpacity style={estilos.button} onPress={() => login()}>
          <Text style={estilos.buttonText}>Acessar</Text>
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

        <TouchableOpacity style={estilos.buttonRegister} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={estilos.registerText}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const estilos = StyleSheet.create({
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
    paddingEnd: '5%',
    paddingTop: 25,
  },
  title: {
    fontSize: 20,
    marginTop: 28,
    color: '#333'
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    borderColor: '#ccc',
    paddingLeft: 10
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
    color: '#fff',
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
