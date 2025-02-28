// Login.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  // Mapeamento de mensagens de erro
  const errorMessages = {
    'auth/wrong-password': 'Senha incorreta. Tente novamente.',
    'auth/invalid-email': 'Usuário não encontrado. Verifique o email e tente novamente.',
    'auth/invalid-credential': 'Usuário não encontrado. Verifique sua senha e tente novamente.',
    'auth/too-many-requests': 'A conta foi temporariamente desativada devido a várias tentativas de login inválidas. Tente redefinir sua senha ou aguarde um pouco.'
  };

  // Listener para mudanças de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Se o usuário estiver logado, redireciona para a tela principal
        navigation.navigate('TelaPrincipal');
      }
    }, (error) => {
      console.error('Erro ao verificar o estado de autenticação:', error);
    });
    return () => unsubscribe();
  }, []);

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('TelaPrincipal');
    } catch (error) {
      const msg = errorMessages[error.code] || 'Ocorreu um erro ao fazer login. Tente novamente.';
      setErrorMessage(msg);
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
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
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
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.registerText}>Não possui conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#739489',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10
  },
  button: {
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 8,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  resetButton: {
    marginTop: 10
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16
  },
  registerButton: {
    marginTop: 20
  },
  registerText: {
    color: '#fff',
    fontSize: 16
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center'
  }
});
