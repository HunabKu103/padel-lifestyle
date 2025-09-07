// ProfileScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Datos de ejemplo del perfil
const perfilUsuario = {
  nombre: "Juan Pérez",
  nivel: "Intermedio",
  edad: 28,
  ubicacion: "Ciudad de Guatemala",
  descripcion: "Apasionado del pádel, buscando nuevos amigos y competencias emocionantes.",
  estadisticas: {
    partidos: 45,
    victorias: 28,
    torneos: 12
  }
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [activo, setActivo] = useState('perfil');

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mi Perfil</Text>
      
      <ScrollView style={styles.profileContent}>
        {/* Header del perfil */}
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: "https://placehold.co/100x100/000000/D4AF37?text=JP" }} 
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{perfilUsuario.nombre}</Text>
            <Text style={styles.profileLevel}>{perfilUsuario.nivel}</Text>
            <Text style={styles.profileLocation}>{perfilUsuario.ubicacion}</Text>
          </View>
        </View>

        {/* Descripción */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acerca de mí</Text>
          <Text style={styles.description}>{perfilUsuario.descripcion}</Text>
        </View>

        {/* Estadísticas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{perfilUsuario.estadisticas.partidos}</Text>
              <Text style={styles.statLabel}>Partidos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{perfilUsuario.estadisticas.victorias}</Text>
              <Text style={styles.statLabel}>Victorias</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{perfilUsuario.estadisticas.torneos}</Text>
              <Text style={styles.statLabel}>Torneos</Text>
            </View>
          </View>
        </View>

        {/* Intereses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis Intereses</Text>
          <View style={styles.interestsContainer}>
            <TouchableOpacity style={styles.interestTag}>
              <Text style={styles.interestText}>Pádel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.interestTag}>
              <Text style={styles.interestText}>Viajes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.interestTag}>
              <Text style={styles.interestText}>Gastronomía</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.interestTag}>
              <Text style={styles.interestText}>Música</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>Configuración</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Barra de navegación inferior */}
      <View style={styles.navigationBar}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Login' as never)}
        >
          <Text style={styles.navItemText}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Booking' as never)}
        >
          <Text style={styles.navItemText}>Clubes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Events' as never)}
        >
          <Text style={styles.navItemText}>Eventos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Connections' as never)}
        >
          <Text style={styles.navItemText}>Conexiones</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 40,
  },
  profileContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  profileLevel: {
    fontSize: 16,
    color: '#D4AF37',
    marginBottom: 3,
  },
  profileLocation: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  section: {
    backgroundColor: '#111111',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#AAAAAA',
    marginTop: 5,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  interestText: {
    color: '#D4AF37',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#D4AF37',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  editButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  settingsButton: {
    flex: 1,
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginLeft: 10,
  },
  settingsButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#111111',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
  },
});