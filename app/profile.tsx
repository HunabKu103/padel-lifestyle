import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileScreen = () => {
  const user = {
    name: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    level: 'Intermedio',
    matchesPlayed: 24,
    wins: 18,
    losses: 6,
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/100' }} 
          style={styles.avatar}
        />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user.matchesPlayed}</Text>
          <Text style={styles.statLabel}>Partidos Jugados</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user.wins}</Text>
          <Text style={styles.statLabel}>Victorias</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user.losses}</Text>
          <Text style={styles.statLabel}>Derrotas</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Mis Reservas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Configuración</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  optionsContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  optionButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;