// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//⚠️Esto no debería compartirse en un proyecto real
//📚En este proyecto educativo, por simplicidad para todos, lo utilizamos así
//👉A futuro lo reemplazarían por vartiables de entorno y archivo .env😉

const firebaseConfig = {
  apiKey: "AIzaSyBhNiTUMtjuDkiNfs0frO0KPM55X24yF0w",
  authDomain: "fl-c26242-tp.firebaseapp.com",
  projectId: "fl-c26242-tp",
  storageBucket: "fl-c26242-tp.firebasestorage.app",
  messagingSenderId: "586997476139",
  appId: "1:586997476139:web:f6dfd27c15104ddf34736e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//para el login
const auth = getAuth(app);

export { db, auth };
