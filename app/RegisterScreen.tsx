// RegisterScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    // Validación básica
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        Alert.alert('Éxito', 'Registro completado exitosamente');
        // Navegar al login después del registro
        navigation.navigate('Login' as never);
      } else {
        Alert.alert('Error', 'Las contraseñas no coinciden');
      }
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Únete a la comunidad de Padel Lifestyle</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login' as never)}
        >
          <Text style={styles.secondaryButtonText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>

        {/* Botones de navegación a otras pantallas */}
        <View style={styles.navigationContainer}>
          <Text style={styles.navTitle}>Explorar la App</Text>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('Booking' as never)}
          >
            <Text style={styles.navButtonText}>Hotéis y Clubes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('Events' as never)}
          >
            <Text style={styles.navButtonText}>Eventos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('Connections' as never)}
          >
            <Text style={styles.navButtonText}>Conexiones</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('Profile' as never)}
          >
            <Text style={styles.navButtonText}>Mi Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#D4AF37',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  input: {
    backgroundColor: '#111111',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#D4AF37',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginBottom: 30,
  },
  secondaryButtonText: {
    color: '#D4AF37',
    textAlign: 'center',
  },
  navigationContainer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  navButton: {
    backgroundColor: '#111111',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  navButtonText: {
    color: '#D4AF37',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});