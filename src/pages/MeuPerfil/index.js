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
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('TelaPrincipal')} style={styles.homeButton}>
              <Icon name="home" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={isEditing ? handleSelectImage : null}>
              <Image 
                source={profilePic ? { uri: profilePic } : require('../../assets/usuario.png')}
                style={styles.profilePic}
              />
            </TouchableOpacity>
            <Text style={styles.userName}>{userName}</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput 
                style={styles.input} 
                value={userName}
                onChangeText={setUserName}
                editable={isEditing}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Data de Nascimento</Text>
              <TextInput 
                style={styles.input} 
                value={birthDate}
                onChangeText={setBirthDate}
                editable={isEditing}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput 
                style={styles.input} 
                value={email}
                onChangeText={setEmail}
                editable={isEditing}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefone</Text>
              <TextInput 
                style={styles.input} 
                value={phone}
                onChangeText={setPhone}
                editable={isEditing}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Endereço</Text>
              <TextInput 
                style={styles.input} 
                value={address}
                onChangeText={setAddress}
                editable={isEditing}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gênero</Text>
              <TextInput 
                style={styles.input} 
                value={gender}
                onChangeText={setGender}
                editable={isEditing}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>País</Text>
              <TextInput 
                style={styles.input} 
                value={country}
                onChangeText={setCountry}
                editable={isEditing}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Estado</Text>
            <TextInput 
             style={styles.input} 
             value={state}
             onChangeText={setState}
             editable={isEditing}
            />
            </View>
            <View style={styles.inputGroup}>
          <Text style={styles.label}>Cidade</Text>
          <TextInput 
            style={styles.input} 
            value={city}
            onChangeText={setCity}
            editable={isEditing}
          />
        </View>

        {isEditing ? (
          <TouchableOpacity 
            style={[styles.button, styles.buttonSave]} 
            onPress={handleSaveChanges}
          >
            <Text style={[styles.buttonText, styles.buttonTextSave]}>Salvar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Redefinir Senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
</KeyboardAvoidingView>

);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#739489',
padding: 20,
justifyContent: 'center',
},
header: {
alignItems: 'center',
marginBottom: 30,
},
homeButton: {
position: 'absolute',
top: 0,
left: 0,
marginTop: 30,
margin: 10,
},
profilePic: {
width: 120,
height: 120,
borderRadius: 60,
marginTop: 30,
marginBottom: 10,
},
userName: {
fontSize: 24,
fontWeight: 'bold',
color: 'white',
marginBottom: 10,
},
infoContainer: {
backgroundColor: 'white',
borderRadius: 20,
padding: 20,
},
inputGroup: {
marginBottom: 15,
},
label: {
fontSize: 16,
color: '#333',
marginBottom: 5,
},
input: {
backgroundColor: '#f9f9f9',
borderRadius: 10,
padding: 10,
fontSize: 16,
color: '#333',
},
button: {
backgroundColor: '#38a69d',
borderRadius: 20,
paddingVertical: 15,
paddingHorizontal: 25,
alignItems: 'center',
marginBottom: 15,
},
buttonText: {
fontSize: 18,
fontWeight: 'bold',
color: 'white',
},
buttonSave: {
backgroundColor: '#33cc99',
},
buttonTextSave: {
color: '#fff',
},
});
