// app/homescreen.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut();
    router.replace('/LoginScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Padel Lifestyle</Text>
      
      <View style={styles.grid}>
        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('/Profile')}
        >
          <Text style={styles.gridItemText}>👤</Text>
          <Text style={styles.gridItemLabel}>Mi Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('/Events')}
        >
          <Text style={styles.gridItemText}>🎾</Text>
          <Text style={styles.gridItemLabel}>Eventos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('/Booking')}
        >
          <Text style={styles.gridItemText}>📅</Text>
          <Text style={styles.gridItemLabel}>Reservar Pista</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('/Swipe')}
        >
          <Text style={styles.gridItemText}>♥</Text>
          <Text style={styles.gridItemLabel}>Padel Crush</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('/Connections')}
        >
          <Text style={styles.gridItemText}>👥</Text>
          <Text style={styles.gridItemLabel}>Conexiones</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
    color: '#4A90E2',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  gridItem: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gridItemText: {
    fontSize: 40,
    marginBottom: 10,
  },
  gridItemLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 30,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});