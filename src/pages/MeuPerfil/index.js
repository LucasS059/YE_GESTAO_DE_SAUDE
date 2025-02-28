import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth, firestore } from "../../services/firebaseConnection";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

export default function Perfil() {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.fullName);
            setBirthDate(userData.birthDate);
            setEmail(userData.email);
            setProfilePic(userData.profilePic);
            setPhone(userData.phone);
            setAddress(userData.address);
            setGender(userData.gender);
            setCountry(userData.country);
            setState(userData.state);
            setCity(userData.city);
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Email para redefinir a senha enviado!");
      Alert.alert("Sucesso", "Um e-mail para redefinir a senha foi enviado para o seu endereço de e-mail.");
    } catch (error) {
      console.error("Erro ao enviar email para redefinir a senha: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar o e-mail de redefinição de senha. Por favor, tente novamente mais tarde.");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const updatedData = {
          fullName: userName,
          birthDate: birthDate,
          email: email,
          phone: phone,
          address: address,
          gender: gender,
          country: country,
          state: state,
          city: city,
        };
  
        // Verifica se profilePic é uma string não vazia antes de adicionar ao updatedData
          if (typeof profilePic === 'string' && profilePic.trim() !== '') {
            updatedData.profilePic = profilePic;
          }

        await updateDoc(doc(firestore, "users", user.uid), updatedData);
        setIsEditing(false);
        console.log("Perfil do usuário atualizado!");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil do usuário: ", error);
    }
  };

  const handleSelectImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'A permissão para acessar a galeria de fotos é necessária.');
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.cancelled) {
      setProfilePic(result.uri);
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header simples */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TelaPrincipal')}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        {/* Avatar e informações básicas */}
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/usuario.png')}
            style={styles.avatar}
          />
          <Text style={styles.nameText}>{userName}</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>

        {/* Container com detalhes do perfil */}
        <View style={styles.detailsContainer}>
          <DetailRow
            icon="birthday-cake"
            label="Data de Nascimento"
            value={birthDate}
            onChangeText={setBirthDate}
            editable={isEditing}
          />
          <DetailRow
            icon="phone"
            label="Telefone"
            value={phone}
            onChangeText={setPhone}
            editable={isEditing}
          />
          <DetailRow
            icon="map-marker"
            label="Endereço"
            value={address}
            onChangeText={setAddress}
            editable={isEditing}
          />
          <DetailRow
            icon="venus-mars"
            label="Gênero"
            value={gender}
            onChangeText={setGender}
            editable={isEditing}
          />
          <DetailRow
            icon="globe"
            label="País"
            value={country}
            onChangeText={setCountry}
            editable={isEditing}
          />
          <DetailRow
            icon="flag"
            label="Estado"
            value={state}
            onChangeText={setState}
            editable={isEditing}
          />
          <DetailRow
            icon="building"
            label="Cidade"
            value={city}
            onChangeText={setCity}
            editable={isEditing}
          />
        </View>

        {/* Botão de Edição/Salvamento */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isEditing) {
              // Se já está editando, agora vamos salvar as mudanças
              handleSaveChanges();
            } else {
              // Se não está editando, ativa o modo de edição
              setIsEditing(true);
            }
          }}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? 'Salvar' : 'Editar'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const DetailRow = ({ icon, label, value, onChangeText, editable }) => {
  return (
    <View style={detailStyles.row}>
      <Icon name={icon} size={20} color="#739489" style={detailStyles.icon} />
      <Text style={detailStyles.label}>{label}</Text>
      <TextInput
        style={detailStyles.input}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholder="Não informado"
      />
    </View>
  );
};

const detailStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f1f3f5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    textAlign: 'right',
  },
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e9ecef', // Fundo que cobre a página inteira
  },
  container: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#739489',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -40,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#fff',
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  emailText: {
    fontSize: 16,
    color: '#739489',
    marginTop: 4,
  },
  detailsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  editButton: {
    backgroundColor: '#739489',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
