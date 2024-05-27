import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, Animated, TouchableOpacity } from 'react-native';

export default function Consulta() {
    const [consultations, setConsultations] = useState([]);
    const [name, setName] = useState('');
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [showScheduler, setShowScheduler] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const handleSchedule = () => {
        const newConsultation = {
            id: Math.random().toString(),
            name: name,
            reason: reason,
            date: date,
            time: time,
            specialty: specialty,
            status: 'Pendente' // Inicializa como pendente
        };
        setConsultations(prevConsultations => [...prevConsultations, newConsultation]);
        // Limpa os campos após agendar a consulta
        clearFields();
        // Esconde a seção de agendamento após agendar a consulta
        setShowScheduler(false);
    };

    const handleMarkCompleted = (id) => {
        setConsultations(prevConsultations =>
            prevConsultations.map(consultation =>
                consultation.id === id ? { ...consultation, status: 'Concluída' } : consultation
            )
        );
    };

    const handleMarkScheduled = (id) => {
        setConsultations(prevConsultations =>
            prevConsultations.map(consultation =>
                consultation.id === id ? { ...consultation, status: 'Marcada' } : consultation
            )
        );
    };

    const slideUpAnimation = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const slideDownAnimation = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setShowScheduler(false));
    };

    const clearFields = () => {
        setName('');
        setReason('');
        setDate('');
        setTime('');
        setSpecialty('');
    };

    const animatedStyle = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [400, 0],
                }),
            },
        ],
    };

    // Ordenar as consultas marcadas da mais recente para a última
    const markedConsultations = consultations.filter(consultation => consultation.status === 'Marcada').reverse();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Suas Consultas</Text>
            <FlatList
                data={consultations.filter(consultation => consultation.status !== 'Marcada')}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.item, item.status === 'Concluída' ? styles.completedItem : null]}>
                        <Text>Paciente: {item.name}</Text>
                        <Text>Motivo: {item.reason}</Text>
                        <Text>Data: {item.date}</Text>
                        <Text>Hora: {item.time}</Text>
                        <Text>Especialidade: {item.specialty}</Text>
                        <Text>Status: {item.status}</Text>
                        {/* Botões para marcar como concluída e marcada */}
                        {item.status === 'Pendente' && (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => handleMarkCompleted(item.id)}>
                                    <Text style={styles.buttonText}>Concluída</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => handleMarkScheduled(item.id)}>
                                    <Text style={styles.buttonText}>Marcada</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            />
            {/* Lista das consultas marcadas */}
            <FlatList
                data={markedConsultations}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.item, styles.scheduledItem]}>
                        <Text>Paciente: {item.name}</Text>
                        <Text>Motivo: {item.reason}</Text>
                        <Text>Data: {item.date}</Text>
                        <Text>Hora: {item.time}</Text>
                        <Text>Especialidade: {item.specialty}</Text>
                        <Text>Status: {item.status}</Text>
                    </View>
                )}
            />
            {/* Botão para exibir a seção de agendamento */}
            <Button title="Agendar Consulta" onPress={() => {
                setShowScheduler(true);
                slideUpAnimation();
            }} />
            {/* Seção de agendamento (inicialmente invisível) */}
            {showScheduler && (
                <Animated.View style={[styles.formContainer, animatedStyle]}>
                    <Text style={styles.title}>Agendar Consulta</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Nome do Paciente"
                    />
                    <TextInput
                        style={styles.input}
                        value={reason}
                        onChangeText={setReason}
                        placeholder="Motivo da Consulta"
                    />
                    <TextInput
                        style={styles.input}
                        value={date}
                        onChangeText={setDate}
                        placeholder="Data (DD/MM/AAAA)"
                    />
                    <TextInput
                        style={styles.input}                   
                        value={time}
                        onChangeText={setTime}
                        placeholder="Hora (HH:MM)"
                    />
                    <TextInput
                        style={styles.input}
                        value={specialty}
                        onChangeText={setSpecialty}
                        placeholder="Especialidade"
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => {
                                clearFields();
                                slideDownAnimation();
                            }}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.scheduleButton]}
                            onPress={() => {
                                handleSchedule();
                                slideDownAnimation();
                            }}
                        >
                            <Text style={styles.buttonText}>Agendar</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        </View>
    );
    };
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#38a69d', // Cor de fundo alterada para #38a69d
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            color: '#fff', // Cor do texto alterada para branco
        },
        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            backgroundColor: '#fff', // Cor de fundo do input alterada para branco
        },
        item: {
            backgroundColor: '#f9f9f9',
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
        },
        completedItem: {
            backgroundColor: '#d6f5d6', // Cor de fundo para consultas concluídas
        },
        scheduledItem: {
            backgroundColor: '#fff7cc', // Cor de fundo para consultas marcadas
        },
        formContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff', // Cor de fundo do formulário alterada para branco
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: '#ccc',
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            width: 100,
            borderRadius: 5,
            marginHorizontal: 5,
        },
        cancelButton: {
            backgroundColor: '#ccc', // Cor de fundo para o botão de cancelar
        },
        scheduleButton: {
            backgroundColor: '#007bff', // Cor de fundo para o botão de agendar
        },
        cancelButtonText: {
            color: '#fff', // Cor do texto para o botão de cancelar
            fontWeight: 'bold',
        },
        scheduleButtonText: {
            color: '#fff', // Cor do texto para o botão de agendar
            fontWeight: 'bold',
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold',
        },
    });
    