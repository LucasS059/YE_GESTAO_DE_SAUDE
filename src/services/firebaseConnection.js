import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '732529427575-blkk4fjl5m7gmaeouhk47j4sb43t28b6.apps.googleusercontent.com',
// });

const firebaseConfig = {
    apiKey: "AIzaSyAkEqRy21DwOLW7NZZAIWVNVYbwSm8oyOs",
    authDomain: "ye-gestao-de-saude-79630.firebaseapp.com",
    projectId: "ye-gestao-de-saude-79630",
    storageBucket: "ye-gestao-de-saude-79630.appspot.com",
    messagingSenderId: "732529427575",
    appId: "1:732529427575:web:d5604168888069cf897272",
    measurementId: "G-CBSQK5D5MR"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);