import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Agenda() {
  const [medicationName, setMedicationName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleMedication = () => {
    if (!medicationName || !date || !time) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
      return;
    }

    console.log("Medicamento:", medicationName);
    console.log("Data:", date);
    console.log("Hora:", time);

    // Aqui você pode adicionar a lógica para salvar o agendamento, como enviar os dados para um servidor, por exemplo.
    // Em vez de apenas exibir os dados no console.

    Alert.alert('Medicação agendada', 'A medicação foi agendada com sucesso.');

    // Limpa os campos após o agendamento
    setMedicationName('');
    setDate('');
    setTime('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Medicação</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Medicamento"
        value={medicationName}
        onChangeText={setMedicationName}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (DD/MM/AAAA)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        value={time}
        onChangeText={setTime}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleMedication}
      >
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#739489',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#38a69d',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
