import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, FlatList } from 'react-native';

export default function Agenda() {
  const [medicationName, setMedicationName] = useState('');
  const [time, setTime] = useState('');
  const [medicationsList, setMedicationsList] = useState([]);

  const handleMedication = () => {
    if (!medicationName || !time) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
      return;
    }

    const newMedication = { id: Date.now().toString(), name: medicationName, time: time };
    setMedicationsList([...medicationsList, newMedication]);

    console.log("Medicamento:", medicationName);
    console.log("Hora:", time);

    Alert.alert('Medicação agendada', 'A medicação foi agendada com sucesso.');

    setMedicationName('');
    setTime('');
  };

  const handleTimeChange = (text) => {
    let formatted = text.replace(/[^0-9]/g, '');
    if (formatted.length >= 3) {
      formatted = formatted.slice(0, 2) + ':' + formatted.slice(2);
    }
    setTime(formatted);
  };

  const renderItem = ({ item }) => (
    <View style={styles.medicationItem}>
      <Text>{item.name}</Text>
      <Text>{item.time}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[styles.title, Platform.OS === 'ios' ? styles.titleIOS : styles.titleAndroid]}>Agendar Medicação</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Medicamento"
          value={medicationName}
          onChangeText={setMedicationName}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora (HH:MM)"
          value={time}
          onChangeText={handleTimeChange}
          keyboardType="numeric"
          maxLength={5}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleMedication}
        >
          <Text style={styles.buttonText}>Agendar</Text>
        </TouchableOpacity>
        <FlatList
          data={medicationsList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#739489',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  titleIOS: {
    marginTop: 40,
  },
  titleAndroid: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  button: {
    backgroundColor: '#38a69d',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  list: {
    marginTop: 20,
    width: '100%',
  },
  medicationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});
