import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function AdicionarConsulta({ route, navigation }) {
  const { day, saveConsulta } = route.params;
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    const selectedTime = selectedDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setTime(selectedTime);
    hideDatePicker();
  };

  const handleSaveConsulta = () => {
    if (name && time) {
      saveConsulta(day.dateString, { name, time });
      navigation.goBack();
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Consulta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Médico"
        onChangeText={setName}
        value={name}
      />
      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Text>{time || 'Selecionar Horário'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveConsulta}>
        <Text style={styles.buttonText}>Salvar Consulta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#38a69d',
    paddingVertical: 12,
    borderRadius: 50,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
