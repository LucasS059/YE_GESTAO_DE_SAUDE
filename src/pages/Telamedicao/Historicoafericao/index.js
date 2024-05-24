import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

export default function HistoricoAvericoes() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Aferições</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicaoItem}>
            <Text style={styles.medicaoText}>Altura: {item.altura} cm</Text>
            <Text style={styles.medicaoText}>Peso: {item.peso} kg</Text>
            <Text style={styles.medicaoText}>IMC: {item.imc}</Text>
            <Text style={styles.medicaoText}>Pressão: {item.pressao}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  medicaoItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#d9d9d9',
    borderRadius: 8,
  },
  medicaoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
