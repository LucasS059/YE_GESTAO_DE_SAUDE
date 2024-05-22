import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';

export default function Geral() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tela de Início</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite algo aqui"
        />
        <TextInput
          style={styles.input}
          placeholder="Digite algo aqui"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    flex: 1,
  },
});


