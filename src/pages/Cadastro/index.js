import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from "../../services/firebaseConnection"; 
import { doc, setDoc } from "firebase/firestore"; 

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [fieldsFilled, setFieldsFilled] = useState(false); // Novo estado para controlar se os campos estão preenchidos
  const navigation = useNavigation();

  // Função para verificar se todos os campos obrigatórios estão preenchidos
  const checkFields = () => {
    if (email && password && confirmPassword && fullName && birthDate) {
      setFieldsFilled(true);
    } else {
      setFieldsFilled(false);
      const emptyFields = [];
      if (!email) emptyFields.push('Email');
      if (!password) emptyFields.push('Senha');
      if (!confirmPassword) emptyFields.push('Confirmação de Senha');
      if (!fullName) emptyFields.push('Nome Completo');
      if (!birthDate) emptyFields.push('Data de Nascimento');
      Alert.alert('Erro', `Por favor, preencha todos os campos obrigatórios:\n${emptyFields.join(', ')}`);
    }
  };

  async function checkEmailExists(email) {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods && methods.length > 0) {
        // E-mail já foi usado
        return true;
      } else {
        // E-mail ainda não foi usado
        return false;
      }
    } catch (error) {
      console.error("Erro ao verificar e-mail: ", error);
      return true; // Considerando um erro como um e-mail já existente para evitar falsos negativos
    }
  }
  
  async function createUser() {
    if (!fieldsFilled) {
      checkFields(); // Verifica se todos os campos estão preenchidos antes de tentar cadastrar
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
  
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      Alert.alert('Erro', 'Este e-mail já está sendo usado por outra conta.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(firestore, 'users', user.uid), {
        uid: user.uid,
        email: email,
        fullName: fullName,
        birthDate: birthDate,
      });
  
      console.log('Cadastrado com sucesso! \n ' + user.uid);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error("Erro ao cadastrar usuário: ", error);
      Alert.alert('Erro', error.message);
    }
  }
  
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
            value={fullName}
            onChangeText={value => setFullName(value)}
          />

          <Text style={estilos.title}>Email</Text>
          <TextInput 
            placeholder='Digite um email' 
            style={estilos.input} 
            value={email}
            onChangeText={value => setEmail(value)}
          />

          <Text style={estilos.title}>Senha</Text>
          <TextInput 
            placeholder='Digite a senha' 
            style={estilos.input} 
            secureTextEntry 
            value={password}
            onChangeText={value => setPassword(value)} 
          />

          <Text style={estilos.title}>Confirme a Senha</Text>
          <TextInput 
            placeholder='Confirme sua senha' 
            style={estilos.input} 
            secureTextEntry 
            value={confirmPassword}
            onChangeText={value => setConfirmPassword(value)} 
          />

          <Text style={estilos.title}>Data de Nascimento</Text>
          <TextInput 
            placeholder='DD/MM/AAAA' 
            style={estilos.input}
            keyboardType='numeric'
            value={birthDate}
            onChangeText={value => setBirthDate(formatBirthDate(value))}
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

   
