import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../services/firebaseConnection"; // Certifique-se de importar firestore

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  async function createUser() {
    if (!fullName || !email || !password || !confirmPassword || !birthDate) {
      Alert.alert("Erro", "Todos os campos são obrigatórios");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async value => {
        console.log('Cadastrado com sucesso! \n ' + value.user.uid);
        // Armazenar as outras informações no Firestore
        await firestore.collection('users').doc(value.user.uid).set({
          fullName,
          email,
          birthDate,
        });
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      })
      .catch(error => console.log(error));
  };

  const handleGoogleSignIn = () => {
    // Lógica para autenticação com Google
    console.log("Autenticar com o Google");
  };

  const handleFacebookSignIn = () => {
    // Lógica para autenticação com Facebook
    console.log("Autenticar com o Facebook");
  };

  const formatBirthDate = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '');

    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned.length > 4) {
      formatted = formatted.slice(0, 5) + '/' + cleaned.slice(4);
    }
    return formatted;
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

          <TouchableOpacity style={estilos.button} onPress={() => createUser()}>
            <Text style={estilos.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          {/* <Text style={estilos.orText}>OU</Text>

          <View style={estilos.socialButtonsContainer}>
            <TouchableOpacity style={estilos.socialButton} onPress={handleGoogleSignIn}>
              <Image source={require('../../assets/logo_google.png')} style={estilos.socialLogo} />
            </TouchableOpacity>

            <TouchableOpacity style={estilos.socialButton} onPress={handleFacebookSignIn}>
              <Image source={require('../../assets/logo_facebook.png')} style={estilos.socialLogo} />
            </TouchableOpacity>
          </View> */}
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
