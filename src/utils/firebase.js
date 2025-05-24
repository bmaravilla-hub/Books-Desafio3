import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAfLQiHXCmBRUPYbOmxzMtUfs03tZW2Fm0",
  authDomain: "books-cce06.firebaseapp.com",
  projectId: "books-cce06",
  storageBucket: "books-cce06.firebasestorage.app",
  messagingSenderId: "686166743276",
  appId: "1:686166743276:web:89a0b114e540e939486dc9",
  measurementId: "G-ZTL06VY1H2"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db };