import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from "firebase/auth";
import { auth, firestore } from "../../services/firebaseConnection";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FontAwesome5 } from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');

const InputField = ({ value, placeholder, onChangeText, editable }) => {
  return (
    <TextInput
      style={styles.dataValue}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
    />
  );
};

const showAlert = (message) => {
  Alert.alert(
    "Aviso",
    message,
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );
};

const getIMCStatus = (bmi) => {
  if (bmi < 18.5) {
    return "Magro ou baixo peso";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal";
  } else if (bmi >= 25 && bmi < 30) {
    return "Sobrepeso";
  } else if (bmi >= 30 && bmi < 35) {
    return "Obesidade I";
  } else if (bmi >= 35 && bmi < 40) {
    return "Obesidade II";
  } else {
    return "Obesidade grave";
  }
};

const TelaPrincipal = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [userData, setUserData] = useState({});
  const [userPressure, setUserPressure] = useState('');
  const [userGlucose, setUserGlucose] = useState('');
  const [userWeight, setUserWeight] = useState('');
  const [userHeight, setUserHeight] = useState('');
  const [lastAfericao, setLastAfericao] = useState('');
  const [newPressure, setNewPressure] = useState('');
  const [newGlucose, setNewGlucose] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [imc, setIMC] = useState('');
  const [lastEditTime, setLastEditTime] = useState('');
  const [isIMCAlertShown, setIsIMCAlertShown] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.fullName || '');
            setCity(userData.city || '');
            setState(userData.state || '');
            setUserData(userData);
  
            // Exibir apenas aferições do dia atual
            const currentDate = new Date().toLocaleDateString();
            const latestAfericao = userData.afericoes && userData.afericoes[currentDate];
            if (latestAfericao) {
              setUserPressure(latestAfericao.pressure || '');
              setUserGlucose(latestAfericao.glucose || '');
              setUserWeight(latestAfericao.weight || '');
              setUserHeight(latestAfericao.height || '');
              setIMC(latestAfericao.imc || '');
              setLastAfericao(currentDate);
            } else {
              console.log("Aferição do dia não encontrada.");
            }
          } else {
            console.log("Documento não encontrado!");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário: ", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  
  
  useEffect(() => {
    if (!isEditing) {
      setUserPressure(newPressure);
      setUserGlucose(newGlucose);
      setUserWeight(newWeight);
      setUserHeight(newHeight);
    }
  }, [isEditing, newPressure, newGlucose, newWeight, newHeight]);

  async function saveUserData() {
    try {
      const user = auth.currentUser;
      if (user) {
        const currentDate = new Date().toLocaleDateString();
        const newIMC = calculateIMC(parseFloat(newWeight), parseFloat(newHeight));
        setIMC(newIMC.toFixed(2)); // Atualiza o estado do IMC com o novo valor
  
        const newAfericaoData = {
          pressure: newPressure,
          glucose: newGlucose,
          weight: newWeight,
          height: newHeight,
          imc: newIMC.toFixed(2), // Arredonda para 2 casas decimais
          date: currentDate
        };
  
        let updatedAfericoes = { ...userData.afericoes };
  
        // Adiciona a nova aferição à data atual
        updatedAfericoes[currentDate] = { ...newAfericaoData };
  
        // Atualiza o objeto userData com os novos dados de aferições
        const updatedUserData = { ...userData, afericoes: updatedAfericoes };
  
        // Salva os novos dados no Firestore
        await setDoc(doc(firestore, "users", user.uid), updatedUserData);
        console.log("Aferição salva com sucesso!");
  
        setLastAfericao(currentDate);
        setLastEditTime(new Date().toLocaleTimeString());
  
        setUserPressure('');
        setUserGlucose('');
        setUserWeight('');
        setUserHeight('');
  
        setIsEditing(false);
  
        // Exibindo nível de IMC e mensagem correspondente
        const bmi = parseFloat(newIMC);
        const status = getIMCStatus(bmi);
        let message = "";
  
        switch (status) {
          case "Magro ou baixo peso":
            message = `Você está um pouco abaixo do peso ideal (${status}), seria interessante mudar seus hábitos, que tal procurar um nutricionista para ganhar peso com saúde?`;
            break;
          case "Normal":
            message = `Wou, que incrível, você está no seu peso ideal (${status}), parabéns!, mas não se esquece, sempre mantenha uma alimentação saudável e busque fazer exercícios físicos`;
            break;
          case "Sobrepeso":
            message = `Eita, acho que está na hora de prestar atenção no seu peso (${status}), tome cuidado com sua alimentação, pratique exercícios físicos, sua saúde pode melhorar muito com isso`;
            break;
          case "Obesidade I":
          case "Obesidade II":
          case "Obesidade grave":
            message = `Huum, acho que está na hora de se cuidar um pouco mais (${status}), o que acha de passar com um endocrinologista ou um nutricionista para avaliar como você pode melhorar sua saúde e alimentação? Além disso, é sempre importante realizar algum tipo de atividade física, isso vai ajudar e muito sua saúde`;
            break;
          default:
            break;
        }
  
        showAlert(message); // Exibir alerta com a mensagem correspondente ao nível de IMC
      } else {
        console.log("Usuário não está logado!");
      }
    } catch (error) {
      console.error("Erro ao salvar dados do usuário: ", error);
    }
  }  
  
  async function logout() {
    try{
      const user = auth.currentUser;
      if (user) {
        await signOut(auth);
        console.log('Logout bem-sucedido!');
        navigation.navigate('BemVindo');
      }
    } catch (error) {
      console.log(error);
    }
  };

  function calculateIMC(weight, height) {
    if (!isNaN(weight) && !isNaN(height) && height !== 0) {
      const heightInMeters = height / 100;
      return weight / (heightInMeters * heightInMeters);
    } else {
      return 0;
    }
  }

  useEffect(() => {
    if (isEditing) {
      setIsIMCAlertShown(false); // Redefine o estado quando começamos a editar
    }
  }, [isEditing]);
  
  const checkAndShowIMCAlert = () => {
    if (!isEditing && imc !== '' && !isIMCAlertShown) {
      setIsIMCAlertShown(true); // Define que o alerta está sendo mostrado
      const bmi = parseFloat(imc);
      const status = getIMCStatus(bmi);
      let message = "";
  
      switch (status) {
        case "Magro ou baixo peso":
          message = `Você está um pouco abaixo do peso ideal (${status}), seria interessante mudar seus hábitos, que tal procurar um nutricionista para ganhar peso com saúde?`;
          break;
        case "Normal":
          message = `Wou, que incrível, você está no seu peso ideal (${status}), parabéns!, mas não se esquece, sempre mantenha uma alimentação saudável e busque fazer exercícios físicos`;
          break;
        case "Sobrepeso":
          message = `Eita, acho que está na hora de prestar atenção no seu peso (${status}), tome cuidado com sua alimentação, pratique exercícios físicos, sua saúde pode melhorar muito com isso`;
          break;
        case "Obesidade I":
        case "Obesidade II":
        case "Obesidade grave":
          message = `Huum, acho que está na hora de se cuidar um pouco mais (${status}), o que acha de passar com um endocrinologista ou um nutricionista para avaliar como você pode melhorar sua saúde e alimentação? Além disso, é sempre importante realizar algum tipo de atividade física, isso vai ajudar e muito sua saúde`;
          break;
        default:
          break;
      }
  
      showAlert(message);
      setTimeout(() => {
        setIsIMCAlertShown(false); // Define que o alerta não está mais sendo mostrado após alguns segundos
      }, 1000); // Ajuste o tempo conforme necessário
    }
  };
  
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/LogoYEgestãodesaude.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.greeting}>Olá, {userName}!</Text>
        <Text style={styles.location}>{city}, {state}</Text>
      </View>

      <View style={styles.dataContainer}>
        <View style={styles.row}>
          <View style={styles.dataBox}>
            <Text style={styles.dataTitle}>Pressão (mmHg)</Text>
            <InputField
              value={isEditing ? newPressure : userPressure}
              placeholder="Pressão"
              onChangeText={(text) => setNewPressure(text.replace(/[^\d./]/g, ''))}
              editable={isEditing}            
            />
          </View>
          <View style={styles.dataBox}>
            <Text style={styles.dataTitle}>Glicose (mg/dL)</Text>
            <InputField
              value={isEditing ? newGlucose : userGlucose
              }
              placeholder="Glicose"
              onChangeText={(text) => setNewGlucose(text.replace(/[^\d.]/g, ''))}
              editable={isEditing}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.dataBox}>
            <Text style={styles.dataTitle}>Peso (kg)</Text>
            <InputField
              value={isEditing ? newWeight : userWeight}
              placeholder="Peso"
              onChangeText={(text) => setNewWeight(text.replace(/[^\d.]/g, ''))}
              editable={isEditing}
            />
          </View>
          <View style={styles.dataBox}>
            <Text style={styles.dataTitle}>Altura (cm)</Text>
            <InputField
              value={isEditing ? newHeight : userHeight}
              placeholder="Altura"
              onChangeText={(text) => setNewHeight(text.replace(/[^\d.]/g, ''))}
              editable={isEditing}            
            />
          </View>
        </View>
        <View style={styles.imcContainer}>
          <Text style={styles.dataTitle}>IMC</Text>
          <View style={styles.imcValueContainer}>
            <TextInput
              value={imc}
              editable={false}
            />
            <Text style={[styles.imcUnit, { marginLeft: 5 }]}>kg/m²</Text>
          </View>
        </View>
        <View style={styles.lastAfericaoContainer}>
          <Text style={styles.lastAfericaoText}>Última Aferição Marcada: {lastAfericao}</Text>
          {lastEditTime !== '' && <Text style={styles.lastAfericaoText}>Última edição: {lastEditTime}</Text>}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Historicoafericao')} style={[styles.historyButton, styles.button]}>
          <FontAwesome5 name="history" size={20} color="#FFF" />
          <Text style={styles.navButtonText}>Histórico</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.editButton, styles.button]} onPress={isEditing ? saveUserData : () => setIsEditing(true)}>
          <Text style={[styles.buttonText, { fontSize: 18 }]}>{isEditing ? 'Salvar' : 'Editar'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.navButton}>
          <FontAwesome5 name="user" size={24} color="#FFF" />
          <Text style={styles.navButtonText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Consulta')} style={styles.navButton}>
          <FontAwesome5 name="calendar" size={24} color="#FFF" />
          <Text style={styles.navButtonText}>Consultas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Medicacao')} style={styles.navButton}>
          <FontAwesome5 name="medkit" size={24} color="#FFF" />
          <Text style={styles.navButtonText}>Medicação</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Exames')} style={styles.navButton}>
          <FontAwesome5 name="file" size={24} color="#FFF" />
          <Text style={styles.navButtonText}>Exames</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={[styles.navButton, styles.button]}>
          <FontAwesome5 name="sign-out-alt" size={24} color="#FFF" />
          <Text style={styles.navButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#739489',
    alignItems: 'center', 
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  }, 
  userInfo: {
    alignItems: 'center',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  location: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 5,
  },
  dataContainer: {
    alignItems: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  dataBox: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    margin: 10,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#739489',
    marginBottom: 5,
  },
  dataValue: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    width: '100%',
    textAlign: 'center',
  },
  imcContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    margin: 10,
  },
  imcValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  imcUnit: {
    fontSize: 14,
    color: '#000',
    alignSelf: 'center', 
  },
  lastAfericaoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  lastAfericaoText: {
    color: '#FFF',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
  editButton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#739489',
  },
  historyButton: {
    backgroundColor: '#739489',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#739489',
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 20,
    height: 60,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    paddingVertical: 5,
  },
});

export default TelaPrincipal

  
