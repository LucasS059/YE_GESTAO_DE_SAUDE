import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from "../../services/firebaseConnection";
import { getDoc, doc } from "firebase/firestore";

const TelaHistoricoAfericoes = () => {
    const navigation = useNavigation();
    const [afericoes, setAfericoes] = useState([]);

    useEffect(() => {
        const fetchAfericoes = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(firestore, "users", user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        const afericoesData = userData.afericoes || {};
                        const afericoesList = Object.keys(afericoesData).map(date => ({
                            date,
                            ...afericoesData[date]
                        }));
                        setAfericoes(afericoesList);
                    } else {
                        console.log("Documento do usuário não encontrado.");
                    }
                } else {
                    console.log("Usuário não está logado.");
                }
            } catch (error) {
                console.error("Erro ao buscar aferições do usuário:", error);
            }
        };

        fetchAfericoes();
    }, []);

    return (
        <View style={styles.container}>
            {/* Lista de aferições */}
            <FlatList
                data={afericoes}
                keyExtractor={(item) => item.date}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Histórico de Aferições</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.afericaoContainer}>
                        <Text>Data: {item.date}</Text>
                        {item.pressure && <Text>Pressão: {item.pressure}</Text>}
                        {item.glucose && <Text>Glicose: {item.glucose}</Text>}
                        {item.weight && <Text>Peso: {item.weight}</Text>}
                        {item.height && <Text>Altura: {item.height}</Text>}
                        {item.imc && <Text>IMC: {item.imc}</Text>}
                    </View>
                )}
            />

            {/* Botão de voltar */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#739489',
    },
    header: {
        backgroundColor: '#739489',
        paddingVertical: 50,
        paddingHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    afericaoContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    afericaoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#739489',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default TelaHistoricoAfericoes;
