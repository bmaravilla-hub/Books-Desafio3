import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB9DiHH-ywebm4EIz6Dyw472dFxbYEP0CE",
  authDomain: "books-desafio3-eff7b.firebaseapp.com",
  projectId: "books-desafio3-eff7b",
  storageBucket: "books-desafio3-eff7b.firebasestorage.app",
  messagingSenderId: "548775027275",
  appId: "1:548775027275:web:932b5e47cb584a25cea3ce"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp();

export default firebase;
