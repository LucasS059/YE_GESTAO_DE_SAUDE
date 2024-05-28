import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import * as Animatable from "react-native-animatable";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../services/firebaseConnection";

export default function BemVindo() {
  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigation.navigate('TelaPrincipal');
  //     }
  //   }, (error) => {
  //     console.error('Erro durante a verificação do estado de autenticação:', error);
  //   });

  //   return () => unsubscribe(); 
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require('../../assets/LogoYEgestãodesaude.png')}
          resizeMode='contain'
          style={styles.logo}
        />
      </View>
      
      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Monitore e organize suas consultas de qualquer lugar</Text>
        <Text style={styles.text}>Faça Login para acessar sua conta</Text>

        <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#739489',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLogo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: '50%', 
    height: '50%',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: '5%',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
    color: '#38a69d',
  },
  text: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#38a69d',
    paddingVertical: 12,
    borderRadius: 50,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
