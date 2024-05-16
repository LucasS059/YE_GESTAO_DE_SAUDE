
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
// import PushNotification from 'react-native-push-notification';

// PushNotification.configure({
//   // Configurações adicionais aqui, se necessário
// });

export default function Agendamento() {
  const [medicationName, setMedicationName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleMedication = () => {
    // Verifica se todos os campos estão preenchidos
    if (!medicationName || !date || !time) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
      return;
    }

    // Lógica para salvar a data e hora da medicação
    console.log("Medicamento:", medicationName);
    console.log("Data:", date);
    console.log("Hora:", time);

    // Configuração da notificação
    PushNotification.localNotificationSchedule({
      message: `Hora de tomar o medicamento: ${medicationName}`,
      date: new Date(Date.parse(`${date} ${time}`)),
    });

    Alert.alert('Medicação agendada', 'A notificação foi agendada com sucesso.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Medicação</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Medicamento"
        value={medicationName}
        onChangeText={(text) => setMedicationName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (DD/MM/AAAA)"
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        value={time}
        onChangeText={(text) => setTime(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleMedication}
      >
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#739489',
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
    width: '80%',
  },
  button: {
    backgroundColor: '#38a69d',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
