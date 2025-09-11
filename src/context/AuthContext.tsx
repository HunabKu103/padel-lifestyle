// src/context/AuthContext.tsx
import { initializeApp } from 'firebase/app';
import { User as FirebaseUser, getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';


// Configuración de Firebase (mismo contenido que app/firebaseConfig.js)
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
export const auth = getAuth(app);

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Exportación explícita del AuthProvider
export default AuthProvider;