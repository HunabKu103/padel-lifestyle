// app/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase (reemplaza con tus credenciales reales cuando las tengas)
const firebaseConfig = {
  apiKey: "AIzaSyDGbQ073XV3y4kxJcF7tK9mNnO1pQ2rS3T",
  authDomain: "padel-lifestyle.firebaseapp.com",
  projectId: "padel-lifestyle",
  storageBucket: "padel-lifestyle.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;