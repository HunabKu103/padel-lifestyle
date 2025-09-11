// app/RegisterScreen.tsx
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDocs, limit, orderBy, query, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebaseConfig';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [level, setLevel] = useState('Principiante');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userIdNumber, setUserIdNumber] = useState('');
  const router = useRouter();

  // Generar ID único para el usuario
  const generateUserIdNumber = async () => {
    try {
      // Obtener el último ID generado
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('userIdNumber', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      
      let newIdNumber = 1000; // ID inicial
      if (!querySnapshot.empty) {
        const lastUser = querySnapshot.docs[0].data();
        newIdNumber = (lastUser.userIdNumber || 1000) + 1;
      }
      
      return newIdNumber;
    } catch (error) {
      console.error('Error generating user ID:', error);
      return Math.floor(Math.random() * 10000) + 1000; // ID aleatorio como fallback
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword || !location) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios (*)');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Generar ID único
      const userIdNumber = await generateUserIdNumber();

      // Guardar información adicional en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        userId: user.uid,
        userIdNumber: userIdNumber,
        name: name,
        email: email,
        level: level,
        location: location,
        createdAt: new Date(),
        photo: '',
        interests: ['Partidos', 'After Pádel'],
        qrCode: `PAD-${userIdNumber}`,
        matches: 0,
        connections: 0,
        verified: false
      });

      setUserIdNumber(userIdNumber.toString());
      setShowSuccess(true);
      
      Alert.alert(
        '¡Éxito!', 
        'Cuenta creada correctamente. Tu ID es: ' + userIdNumber,
        [
          {
            text: 'Continuar',
            onPress: () => router.replace('/LoginScreen')
          }
        ]
      );
    } catch (error: any) {
      console.error('Registration error:', error);
      Alert.alert('Error', error.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successTitle}>¡Bienvenido a Padel Lifestyle!</Text>
        <Text style={styles.successSubtitle}>Tu ID de jugador: #{userIdNumber}</Text>
        <Text style={styles.successMessage}>
          Muestra este ID para identificarte en clubes y eventos
        </Text>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.replace('/LoginScreen')}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <Text style={styles.subtitle}>Únete a la comunidad Padel Lifestyle</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Nombre completo *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tu nombre completo"
          value={name}
          onChangeText={setName}
        />
        
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="tu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Text style={styles.label}>Ubicación *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ciudad donde juegas"
          value={location}
          onChangeText={setLocation}
        />
        
        <Text style={styles.label}>Nivel de juego</Text>
        <View style={styles.levelContainer}>
          {['Principiante', 'Intermedio', 'Avanzado', 'Profesional'].map((lvl) => (
            <TouchableOpacity
              key={lvl}
              style={[
                styles.levelButton,
                level === lvl && styles.selectedLevelButton
              ]}
              onPress={() => setLevel(lvl)}
            >
              <Text style={[
                styles.levelButtonText,
                level === lvl && styles.selectedLevelButtonText
              ]}>
                {lvl}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.label}>Contraseña *</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <Text style={styles.label}>Confirmar contraseña *</Text>
        <TextInput
          style={styles.input}
          placeholder="Repite tu contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        
        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => router.push('/LoginScreen')}
        >
          <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
    color: '#4A90E2',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  levelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  levelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedLevelButton: {
    backgroundColor: '#4A90E2',
  },
  levelButtonText: {
    color: '#666',
    fontSize: 14,
  },
  selectedLevelButtonText: {
    color: 'white',
  },
  registerButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    alignItems: 'center',
  },
  loginText: {
    color: '#4A90E2',
    fontSize: 16,
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#4A90E2',
  },
  successSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    paddingHorizontal: 20,
  },
  continueButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});