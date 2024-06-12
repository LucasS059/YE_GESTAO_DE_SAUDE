import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";  
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAkEqRy21DwOLW7NZZAIWVNVYbwSm8oyOs",
  authDomain: "ye-gestao-de-saude-79630.firebaseapp.com",
  projectId: "ye-gestao-de-saude-79630",
  storageBucket: "ye-gestao-de-saude-79630.appspot.com",
  messagingSenderId: "732529427575",
  appId: "1:732529427575:web:d5604168888069cf897272",
  measurementId: "G-CBSQK5D5MR",
  databaseURL: "https://ye-gestao-de-saude-79630-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);  // Inicializar o storage

export { auth, firestore, database, storage };
