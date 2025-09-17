// app/(auth)/login.tsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (email && password) {
      // Aquí integrarás con tu AuthContext
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos');
    }
  };

  const handleAdminAccess = () => {
    // Acceso directo al admin para testing
    router.push('/admin');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      {/* Botón temporal para admin */}
      <TouchableOpacity 
        style={[styles.button, styles.adminButton]} 
        onPress={handleAdminAccess}
      >
        <Text style={styles.buttonText}>Acceso Admin (Temporal)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#2E7D32',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  adminButton: {
    backgroundColor: '#FF6B35',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: '#2E7D32',
    textAlign: 'center',
    fontSize: 16,
  },
});