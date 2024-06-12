import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { auth, firestore, storage } from "../../services/firebaseConnection";
import { addDoc, collection, serverTimestamp, query, getDocs, doc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const TelaExames = () => {
    const navigation = useNavigation();
    const [nomeExame, setNomeExame] = useState('');
    const [imagemExame, setImagemExame] = useState(null);
    const [exames, setExames] = useState([]);

    const buscarExames = useCallback(async () => {
        try {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(firestore, 'users', userId);
            const examesCollectionRef = collection(userDocRef, 'exames');
            const q = query(examesCollectionRef);
            const querySnapshot = await getDocs(q);
            const examesData = [];
            querySnapshot.forEach((doc) => {
                examesData.push({ id: doc.id, ...doc.data() });
            });
            setExames(examesData);
        } catch (error) {
            console.error('Erro ao buscar exames: ', error);
        }
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            buscarExames();
        }, [buscarExames])
    );

    const adicionarExame = async () => {
        if (!nomeExame || !imagemExame) {
            alert('Por favor, preencha todos os campos antes de adicionar o exame.');
            return;
        }

        const userId = auth.currentUser.uid;
        const imageUri = imagemExame;
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const storageRef = storage.ref().child(`exames/${userId}/${Date.now()}`);
        const snapshot = await storageRef.put(blob);
        const downloadURL = await snapshot.ref.getDownloadURL();

        const exame = {
            nomeExame,
            imagemURL: downloadURL,
            data: serverTimestamp(),
        };

        try {
            const userDocRef = doc(firestore, 'users', userId);
            const examesCollectionRef = collection(userDocRef, 'exames');
            await addDoc(examesCollectionRef, exame);
            setExames([...exames, exame]);
            setNomeExame('');
            setImagemExame(null);
            buscarExames();
        } catch (error) {
            console.error('Erro ao adicionar exame: ', error);
        }
    };

    const selecionarImagem = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Desculpe, precisamos da permissão para acessar a biblioteca de mídia para isso funcionar!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImagemExame(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.titulo}>Exames</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.formTitle}>Adicionar Exame</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Exame"
                    value={nomeExame}
                    onChangeText={setNomeExame}
                />
                <TouchableOpacity style={styles.button} onPress={selecionarImagem}>
                    <Text style={styles.buttonText}>Selecionar Imagem</Text>
                </TouchableOpacity>
                {imagemExame && (
                    <Image source={{ uri: imagemExame }} style={styles.image} />
                )}
                <TouchableOpacity style={styles.button} onPress={adicionarExame}>
                    <Text style={styles.buttonText}>Adicionar Exame</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={exames}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.exameItem}>
                        <Text>Nome: {item.nomeExame}</Text>
                        {item.imagemURL && (
                            <Image source={{ uri: item.imagemURL }} style={styles.image} />
                        )}
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
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
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
    exameItem: {
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
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default TelaExames;
