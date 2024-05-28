import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail} from "firebase/auth";
import { auth, firestore } from "../../services/firebaseConnection"; 
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native';


export default function Cadastro() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    birthDate: '',
  });

  const createUser = async () => {
    const { email, password, confirmPassword, fullName, birthDate } = userData;
  
    if (!email || !password || !confirmPassword || !fullName || !birthDate) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(firestore, 'users', user.uid), {
        uid: user.uid,
        email,
        fullName,
        birthDate,
      });
  
      console.log('Cadastrado com sucesso! \n ' + user.uid);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.navigate('Login'); 
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Erro', 'Este e-mail já está sendo usado por outra conta.');
      } else {
        console.error("Erro ao cadastrar usuário: ", error);
        Alert.alert('Erro', error.message);
      }
    }
  };
  

  const checkEmailExists = async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods && methods.length > 0;
    } catch (error) {
      console.error("Erro ao verificar e-mail: ", error);
      return true;
    }
  };

  const formatBirthDate = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d+)$/, '$1');
  };
  
  return (
    <View style={estilos.container}>
      <KeyboardAwareScrollView contentContainerStyle={estilos.scrollContainer}>
        <Animatable.View animation="fadeInLeft" delay={500} style={estilos.containerHeader}>
          <Text style={estilos.message}>Cadastro</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={estilos.containerForm}>
          <Text style={estilos.title}>Nome Completo</Text>
          <TextInput 
            placeholder='Digite seu nome completo' 
            style={estilos.input}
            value={userData.fullName}
            onChangeText={(value) => setUserData({ ...userData, fullName: value })}
          />

          <Text style={estilos.title}>Email</Text>
          <TextInput 
            placeholder='Digite um email' 
            style={estilos.input} 
            value={userData.email}
            onChangeText={(value) => setUserData({ ...userData, email: value })}
          />

          <Text style={estilos.title}>Senha</Text>
          <TextInput 
            placeholder='Digite a senha' 
            style={estilos.input} 
            secureTextEntry 
            value={userData.password}
            onChangeText={(value) => setUserData({ ...userData, password: value })}
          />

          <Text style={estilos.title}>Confirme a Senha</Text>
          <TextInput 
            placeholder='Confirme sua senha' 
            style={estilos.input} 
            secureTextEntry 
            value={userData.confirmPassword}
            onChangeText={(value) => setUserData({ ...userData, confirmPassword: value })}
          />

          <Text style={estilos.title}>Data de Nascimento</Text>
          <TextInput 
            placeholder='DD/MM/AAAA' 
            style={estilos.input}
            keyboardType='numeric'
            value={userData.birthDate}
            onChangeText={(value) => setUserData({ ...userData, birthDate: formatBirthDate(value) })}
            maxLength={10} 
          />

          <TouchableOpacity style={estilos.button} onPress={createUser}>
            <Text style={estilos.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
    paddingBottom: 25,
    flex: 1,
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
});


