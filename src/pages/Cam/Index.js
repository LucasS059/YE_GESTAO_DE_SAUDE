// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; 
// import { Camera } from 'expo-camera';
// import { FontAwesome } from '@expo/vector-icons';

// export default function Welcome() {
//   const navigation = useNavigation();
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraRef, setCameraRef] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleTakePicture = async () => {
//     if (cameraRef) {
//       let photo = await cameraRef.takePictureAsync();
//       // Aqui você pode salvar a foto ou processá-la conforme necessário
//       console.log('Foto tirada:', photo);
//     }
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>Sem acesso à câmera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera 
//         style={styles.camera} 
//         type={Camera.Constants.Type.back} 
//         ref={(ref) => {
//           if (ref) {
//             setCameraRef(ref);
//           }
//         }}
//       >
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity onPress={handleTakePicture} style={styles.button}>
//             <FontAwesome name="camera" size={30} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   camera: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#38a69d',
//     borderRadius: 50,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//   },
// });
