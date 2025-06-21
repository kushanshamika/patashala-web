// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAO_Y63V3rUkqSc9OBQ7XQavo1JXeYz2No",
  authDomain: "patashala-lk.firebaseapp.com",
  projectId: "patashala-lk",
  storageBucket: "patashala-lk.firebasestorage.app",
  messagingSenderId: "417752899921",
  appId: "1:417752899921:web:c7af7cf36d25cc2b967370"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
