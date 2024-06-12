import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { auth, firestore } from "../../services/firebaseConnection";
import { addDoc, collection, serverTimestamp, query, where, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons';

const TelaHistoricoConsultas = () => {
    const navigation = useNavigation();
    const [nomePaciente, setNomePaciente] = useState('');
    const [dataConsulta, setDataConsulta] = useState('');
    const [horaConsulta, setHoraConsulta] = useState('');
    const [motivoConsulta, setMotivoConsulta] = useState('');
    const [consultas, setConsultas] = useState([]);

    const buscarConsultas = useCallback(async () => {
        try {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(firestore, 'users', userId);
            const consultasCollectionRef = collection(userDocRef, 'consultas');
            const q = query(consultasCollectionRef);
            const querySnapshot = await getDocs(q);
            const consultasData = [];
            querySnapshot.forEach((doc) => {
                consultasData.push({ id: doc.id, ...doc.data() });
            });
            setConsultas(consultasData.filter(consulta => !consulta.concluida));
        } catch (error) {
            console.error('Erro ao buscar consultas: ', error);
        }
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            buscarConsultas();
        }, [buscarConsultas])
    );

    const adicionarConsulta = async () => {
        if (!nomePaciente || !dataConsulta || !horaConsulta || !motivoConsulta) {
            alert('Por favor, preencha todos os campos antes de adicionar a consulta.');
            return;
        }
    
        const consulta = {
            nomePaciente,
            dataConsulta,
            horaConsulta,
            motivoConsulta,
            data: serverTimestamp(),
            concluida: false
        };
    
        try {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(firestore, 'users', userId);
            const consultasCollectionRef = collection(userDocRef, 'consultas');
            await addDoc(consultasCollectionRef, consulta);
            setConsultas([...consultas, consulta]);
            setNomePaciente('');
            setDataConsulta('');
            setHoraConsulta('');
            setMotivoConsulta('');
            buscarConsultas();
        } catch (error) {
            console.error('Erro ao adicionar consulta: ', error);
        }
    };
    

    const excluirConsulta = async (consultaId) => {
        try {
            if (!consultaId) {
                console.error('ID da consulta inválido');
                return;
            }
    
            const userId = auth.currentUser.uid;
            const userDocRef = doc(firestore, 'users', userId);
            const consultaDocRef = doc(userDocRef, 'consultas', consultaId);
            await deleteDoc(consultaDocRef);
            const novasConsultas = consultas.filter((consulta) => consulta.id !== consultaId);
            setConsultas(novasConsultas);
        } catch (error) {
            console.error('Erro ao excluir consulta: ', error);
        }
    };
    
    const marcarConcluida = async (consultaId) => {
        try {
            if (!consultaId) {
                console.error('ID da consulta inválido');
                return;
            }
    
            const userId = auth.currentUser.uid;
            const userDocRef = doc(firestore, 'users', userId);
            const consultaDocRef = doc(userDocRef, 'consultas', consultaId);
            await updateDoc(consultaDocRef, { concluida: true });
            const consultasAtualizadas = consultas.map((consulta) =>
                consulta.id === consultaId ? { ...consulta, concluida: true } : consulta
            );
            setConsultas(consultasAtualizadas.filter(consulta => !consulta.concluida));
        } catch (error) {
            console.error('Erro ao marcar consulta como concluída: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <FontAwesome name="home" size={24} color="black" onPress={() => navigation.goBack()} />
            </View>
            <Text style={styles.instrucoes}>Marque sua consulta:</Text>
            <View style={styles.form}>
                <Text style={styles.formTitle}>Histórico de Consultas</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Paciente"
                    value={nomePaciente}
                    onChangeText={setNomePaciente}
                />
                <View style={styles.dataHoraContainer}>
                    <TextInput
                        style={[styles.input, styles.inputData]}
                        placeholder="DD/MM/AAAA"
                        keyboardType="numeric"
                        value={dataConsulta}
                        onChangeText={(text) => {
                            // Remover somente o último caractere se for um não-numérico
                            if (text.length < dataConsulta.length && !/\d$/.test(text)) {
                                setDataConsulta(text.slice(0, -1));
                            } else {
                                const formattedText = text
                                    .replace(/\D/g, '')
                                    .replace(/(\d{2})(\d)/, '$1/$2')
                                    .replace(/(\d{2})(\d)/, '$1/$2')
                                    .replace(/(\d{4})(\d+)$/, '$1');
                                setDataConsulta(formattedText);
                            }
                        }}
                    />
                    <TextInput
                        style={[styles.input, styles.inputHora]}
                        placeholder="HH:MM"
                        keyboardType="numeric"
                        value={horaConsulta}
                        onChangeText={(text) => {
                            // Remover somente o último caractere se for um não-numérico
                            if (text.length < horaConsulta.length && !/\d$/.test(text)) {
                                setHoraConsulta(text.slice(0, -1));
                            } else {
                                const formattedText = text
                                    .replace(/\D/g, '') // Remove caracteres não numéricos
                                    .replace(/(\d{2})(\d+)/, '$1:$2') // Adiciona ":" após os dois primeiros dígitos
                                    .replace(/^(.*):(.*)$/, (match, p1, p2) => {
                                        // Limita o segundo grupo de dígitos a dois caracteres
                                        return `${p1}:${p2.slice(0, 2)}`;
                                    });
                                setHoraConsulta(formattedText);
                            }
                        }}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Motivo da Consulta"
                    value={motivoConsulta}
                    onChangeText={setMotivoConsulta}
                />
                <TouchableOpacity style={styles.button} onPress={adicionarConsulta}>
                    <Text style={styles.buttonText}>Adicionar Consulta</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={consultas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.consultaItem}>
                        <Text>Paciente: {item.nomePaciente}</Text>
                        <Text>Data: {item.dataConsulta}</Text>
                        <Text>Hora: {item.horaConsulta}</Text>
                        <Text>Motivo: {item.motivoConsulta}</Text>
                        <View style={styles.buttonsContainer}>
                            {!item.concluida && (
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() =>
                                        Alert.alert(
                                            'Marcar como Concluída',
                                            'Deseja marcar esta consulta como concluída?',
                                            [
                                                { text: 'Cancelar', style: 'cancel' },
                                                {
                                                    text: 'Confirmar',
                                                    onPress: () => marcarConcluida(item.id),
                                                },
                                            ],
                                            { cancelable: true }
                                        )
                                    }
                                >
                                    <Text>Concluir</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                style={[styles.button, styles.buttonDelete]}
                                onPress={() =>
                                    Alert.alert(
                                        'Excluir Consulta',
                                        'Deseja realmente excluir esta consulta?',
                                        [
                                            { text: 'Cancelar', style: 'cancel' },
                                            {
                                                text: 'Confirmar',
                                                onPress: () => excluirConsulta(item.id),
                                            },
                                        ],
                                        { cancelable: true }
                                    )
                                }
                            >
                                <Text>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#739489',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    nomeUsuario: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    instrucoes: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
    },
    form: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
    },
    dataHoraContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputData: {
        flex: 2,
        marginRight: 5,
    },
    inputHora: {
        flex: 1,
        marginLeft: 5,
    },
    button: {
        backgroundColor: '#38a69d',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    consultaItem: {
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
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    buttonDelete: {
        backgroundColor: 'red',
    },
});

export default TelaHistoricoConsultas;

