import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, TouchableOpacity, Platform, ScrollView, FlatList } from 'react-native';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../services/firebaseConnection";
import { auth } from "../../services/firebaseConnection";

export default function Agenda() {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [time, setTime] = useState('');
  const [medicationsList, setMedicationsList] = useState([]);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(firestore, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userDocData = userDocSnap.data();
            const agendaMedicacao = userDocData.agendaMedicacao || [];
            setMedicationsList(agendaMedicacao);
          } else {
            console.log("Documento do usuário não encontrado.");
          }
        } else {
          console.log("Usuário não está logado.");
        }
      } catch (error) {
        console.error("Erro ao buscar medicações do usuário:", error);
        Alert.alert('Erro', 'Ocorreu um erro ao buscar as medicações.');
      }
    };

    fetchMedications();
  }, []);

  const handleMedication = async () => {
    if (!medicationName || !dosage || !frequency || !time) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
      return;
    }

    const existingMedicationIndex = medicationsList.findIndex(item => item.name === medicationName);
    if (existingMedicationIndex > -1) {
      // Atualiza a medicação existente
      medicationsList[existingMedicationIndex] = { name: medicationName, dosage, frequency, time };
    } else {
      // Adiciona uma nova medicação
      medicationsList.push({ name: medicationName, dosage, frequency, time });
    }

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(firestore, "users", currentUser.uid);
        await setDoc(userDocRef, { agendaMedicacao: medicationsList }, { merge: true });

        Alert.alert('Medicação agendada', 'A medicação foi agendada com sucesso.');

        setMedicationName('');
        setDosage('');
        setFrequency('');
        setTime('');
      } else {
        console.log("Usuário não está logado.");
      }
    } catch (error) {
      console.error("Erro ao salvar medicação:", error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar a medicação.');
    }
  };

  const handleDeleteMedication = async (index) => {
    const updatedMedicationsList = [...medicationsList];
    updatedMedicationsList.splice(index, 1);

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(firestore, "users", currentUser.uid);
        await setDoc(userDocRef, { agendaMedicacao: updatedMedicationsList }, { merge: true });

        setMedicationsList(updatedMedicationsList);
      } else {
        console.log("Usuário não está logado.");
      }
    } catch (error) {
      console.error("Erro ao excluir medicação:", error);
      Alert.alert('Erro', 'Ocorreu um erro ao excluir a medicação.');
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.medicationItem}>
      <Text>Medicamento: {item.name}</Text>
      <Text>Dosagem: {item.dosage}</Text>
      <Text>Frequência: {item.frequency}</Text>
      <Text>Horário: {item.time}</Text>
      <TouchableOpacity onPress={() => handleDeleteMedication(index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={[styles.title, Platform.OS === 'ios' ? styles.titleIOS : styles.titleAndroid]}>Agendar Medicação</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Medicamento"
        value={medicationName}
        onChangeText={setMedicationName}
      />
      <TextInput
        style={styles.input}
        placeholder="Dosagem"
        value={dosage}
        onChangeText={setDosage}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Frequência (ex: 1 vez ao dia)"
        value={frequency}
        onChangeText={setFrequency}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário (HH:MM)"
        value={time}
        onChangeText={setTime}
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
        keyExtractor={item => item.name}
        style={styles.list}
      />
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
    elevation    : 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity:    0.25,
    shadowRadius: 3.84,
  },
  buttonText:{
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
  deleteButton: {
    backgroundColor: '#ff6347',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
  },
});


