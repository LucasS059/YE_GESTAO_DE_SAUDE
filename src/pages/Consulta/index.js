import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, Animated } from 'react-native';

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
        setName('');
        setReason('');
        setDate('');
        setTime('');
        setSpecialty('');
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
                    <View style={styles.item}>
                        <Text>Paciente: {item.name}</Text>
                        <Text>Motivo: {item.reason}</Text>
                        <Text>Data: {item.date}</Text>
                        <Text>Hora: {item.time}</Text>
                        <Text>Especialidade: {item.specialty}</Text>
                        <Text>Status: {item.status}</Text>
                        {/* Botões para marcar como concluída e marcada */}
                        {item.status === 'Pendente' && (
                            <View style={styles.buttonContainer}>
                                <Button title="Concluída" onPress={() => handleMarkCompleted(item.id)} />
                                <Button title="Marcada" onPress={() => handleMarkScheduled(item.id)} />
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
                    <View style={styles.item}>
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
                        <Button title="Cancelar" onPress={() => {
                            slideDownAnimation();
                        }} />
                        <Button title="Agendar" onPress={() => {
                            handleSchedule();
                            slideDownAnimation();
                        }} />
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
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    item: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    formContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
