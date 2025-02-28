import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import * as Animatable from "react-native-animatable";

const windowWidth = Dimensions.get('window').width;

export default function Avericao() {
  const navigation = useNavigation();
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState('');
  const [pressao, setPressao] = useState('');
  const [ultimasMedicoes, setUltimasMedicoes] = useState([]);
  const [showHistorico, setShowHistorico] = useState(false);

  const calcularImc = () => {
    const alturaMetros = altura / 100;
    const imcCalculado = (peso / (alturaMetros * alturaMetros)).toFixed(2);
    setImc(imcCalculado);
    setUltimasMedicoes([{ altzzzzura, peso, imc: imcCalculado, pressao }, ...ultimasMedicoes.slice(0, 4)]);
  };

  const salvarInformacoes = () => {
    console.log('Altura:', altura);
    console.log('Peso:', peso);
    console.log('IMC:', imc);
    console.log('Pressão:', pressao);
    console.log('Últimas medições:', ultimasMedicoes);
  };

  const handleMostrarHistorico = () => {
    navigation.navigate('HistoricoAvericoes', { historico: ultimasMedicoes });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Altura (cm)"
              keyboardType="numeric"
              value={altura}
              onChangeText={text => setAltura(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Peso (kg)"
              keyboardType="numeric"
              value={peso}
              onChangeText={text => setPeso(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Pressão"
              keyboardType="numeric"
              value={pressao}
              onChangeText={text => setPressao(text)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={calcularImc}>
            <Text style={styles.buttonText}>Calcular IMC</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={salvarInformacoes}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Historicoafericao')}>
            <Text style={styles.buttonText}>Mostrar Histórico</Text>
          </TouchableOpacity>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>IMC Atual: {imc}</Text>
            <Text style={styles.infoText}>Pressão Atual: {pressao}</Text>
          </View>
        </Animatable.View>
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
  },
  containerLogo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
  },
  logo: {
    width: '50%', 
    height: '50%',
  },
  containerForm: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: '5%',
    width: windowWidth,
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
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#38a69d',
    paddingVertical: 12,
    borderRadius: 50,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
