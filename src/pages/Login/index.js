import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import * as Animatable from "react-native-animatable";
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../services/firebaseConnection";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const errorMessages = {
    'auth/wrong-password': 'Senha incorreta. Tente novamente.',
    'auth/invalid-email': 'Usuário não encontrado. Verifique o email e tente novamente.',
    'auth/invalid-credential': 'Usuário não encontrado. Verifique a sua senha e tente novamente.',
    'auth/too-many-requests': 'Opa! Parece que algo deu errado. O acesso a esta conta foi temporariamente desativado devido a várias tentativas de login inválidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou tentar novamente mais tarde. Agradecemos sua compreensão e paciência enquanto trabalhamos para resolver isso.'
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('TelaPrincipal');
      }
    }, (error) => {
      console.error('Erro durante a verificação do estado de autenticação:', error);
    });

    return () => unsubscribe(); 
  }, []);

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('TelaPrincipal');
    } catch (error) {
      setErrorMessage(errorMessages[error.code] || 'Ocorreu um erro ao fazer login. Tente novamente.');
    }
  }

  async function resetPassword() {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu email para redefinir a senha.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Sucesso', 'Um email para redefinir sua senha foi enviado.');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar redefinir a senha.');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
          <Text style={styles.message}>Bem Vindo(a)</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.title}>Email</Text>
          <TextInput 
            placeholder='Digite seu email' 
            style={styles.input} 
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail} 
          />

          <Text style={styles.title}>Senha</Text>
          <TextInput 
            placeholder='Digite sua senha' 
            style={styles.input} 
            secureTextEntry 
            value={password}
            onChangeText={setPassword}        
          />

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={resetPassword}>
          <Text style={styles.resetButtonText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
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
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText: {
    color: '#A1A1A1'
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  resetButton: {
    marginTop: 12,
    alignSelf: 'center'
  },
  resetButtonText: {
    color: '#38a69d',
    fontSize: 14
  }
});

           
