// HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Datos de ejemplo para eventos próximos
const eventosProximos = [
  {
    id: 1,
    nombre: "Torneo de Verano Pádel",
    fecha: "15 Jun 2024",
    lugar: "Club Padel Premium",
    imagen: "https://placehold.co/300x200/000000/D4AF37?text=Torneo"
  },
  {
    id: 2,
    nombre: "Clínica de Pádel Avanzado",
    fecha: "22 Jun 2024",
    lugar: "Urban Padel Center",
    imagen: "https://placehold.co/300x200/000000/D4AF37?text=Clínica"
  }
];

// Datos de ejemplo para partidos próximos
const partidosProximos = [
  {
    id: 1,
    rival: "Equipo Los Pumas",
    fecha: "18 Jun 2024",
    hora: "18:00",
    cancha: "Cancha 3"
  },
  {
    id: 2,
    rival: "Equipo Thunder",
    fecha: "20 Jun 2024",
    hora: "19:30",
    cancha: "Cancha 1"
  }
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header con fondo negro y texto dorado */}
      <View style={styles.header}>
        <Text style={styles.welcomeTitle}>¡Bienvenido de nuevo!</Text>
        <Text style={styles.welcomeSubtitle}>Listo para tu próxima partida</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Sección de eventos próximos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximos Eventos</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Events' as never)}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          {eventosProximos.map((evento) => (
            <View key={evento.id} style={styles.eventCard}>
              <Image source={{ uri: evento.imagen }} style={styles.eventImage} />
              <View style={styles.eventInfo}>
                <Text style={styles.eventName}>{evento.nombre}</Text>
                <Text style={styles.eventDate}>{evento.fecha}</Text>
                <Text style={styles.eventLocation}>{evento.lugar}</Text>
                <TouchableOpacity style={styles.eventButton}>
                  <Text style={styles.eventButtonText}>Quiero ir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Sección de partidos próximos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximos Partidos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          {partidosProximos.map((partido) => (
            <View key={partido.id} style={styles.matchCard}>
              <View style={styles.matchInfo}>
                <Text style={styles.matchRival}>vs {partido.rival}</Text>
                <Text style={styles.matchDetails}>{partido.fecha} a las {partido.hora}</Text>
                <Text style={styles.matchDetails}>Cancha: {partido.cancha}</Text>
              </View>
              <TouchableOpacity style={styles.matchButton}>
                <Text style={styles.matchButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Sección de acciones rápidas */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Booking' as never)}
            >
              <Text style={styles.actionIcon}>🎾</Text>
              <Text style={styles.actionText}>Reservar Cancha</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Connections' as never)}
            >
              <Text style={styles.actionIcon}>👥</Text>
              <Text style={styles.actionText}>Conexiones</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Profile' as never)}
            >
              <Text style={styles.actionIcon}>👤</Text>
              <Text style={styles.actionText}>Mi Perfil</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🏆</Text>
              <Text style={styles.actionText}>Torneos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={styles.navigationBar}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Home' as never)}
        >
          <Text style={styles.navItemText}>🏠</Text>
          <Text style={styles.navItemLabel}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Booking' as never)}
        >
          <Text style={styles.navItemText}>🎾</Text>
          <Text style={styles.navItemLabel}>Clubes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Events' as never)}
        >
          <Text style={styles.navItemText}>📅</Text>
          <Text style={styles.navItemLabel}>Eventos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Connections' as never)}
        >
          <Text style={styles.navItemText}>👥</Text>
          <Text style={styles.navItemLabel}>Conexiones</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile' as never)}
        >
          <Text style={styles.navItemText}>👤</Text>
          <Text style={styles.navItemLabel}>Perfil</Text>
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
  header: {
    backgroundColor: '#000000',
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  seeAllText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  eventCard: {
    backgroundColor: '#111111',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  eventImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  eventInfo: {
    padding: 15,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#D4AF37',
    marginBottom: 3,
  },
  eventLocation: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 15,
  },
  eventButton: {
    backgroundColor: '#D4AF37',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  eventButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  matchCard: {
    backgroundColor: '#111111',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchInfo: {
    flex: 1,
  },
  matchRival: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  matchDetails: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 2,
  },
  matchButton: {
    backgroundColor: '#D4AF37',
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  matchButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#111111',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  actionIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#111111',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  navItem: {
    alignItems: 'center',
    minWidth: 60,
  },
  navItemText: {
    fontSize: 20,
    color: '#D4AF37',
  },
  navItemLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 2,
  },
});