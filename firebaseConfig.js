// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDSKa_wozYTqypQvmzncBcDCJ--_XsY0Aw",
  authDomain: "padel-lifestyle.firebaseapp.com",
  projectId: "padel-lifestyle",
  storageBucket: "padel-lifestyle.appspot.com",
  messagingSenderId: "62178264222",
  appId: "1:62178264222:android:tu-app-id-aqui"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Servicios de Firebase
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
