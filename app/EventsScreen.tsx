// EventsScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Datos de ejemplo de eventos
const eventos = [
  {
    id: 1,
    nombre: "Torneo de Verano",
    fecha: "15 Jun 2024",
    lugar: "Club Padel Premium",
    descripcion: "Torneo abierto para todos los niveles",
    imagen: "https://placehold.co/300x200/000000/D4AF37?text=Torneo+Verano"
  },
  {
    id: 2,
    nombre: "Clínica de Padel",
    fecha: "22 Jun 2024",
    lugar: "Padel & Social",
    descripcion: "Mejora tu técnica con nuestros profesionales",
    imagen: "https://placehold.co/300x200/000000/D4AF37?text=Clínica+Padel"
  },
  {
    id: 3,
    nombre: "Noche de Padel Social",
    fecha: "29 Jun 2024",
    lugar: "Urban Padel Center",
    descripcion: "Juego amistoso seguido de cena",
    imagen: "https://placehold.co/300x200/000000/D4AF37?text=Noche+Social"
  }
];

export default function EventsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Eventos</Text>
      <Text style={styles.headerSubtitle}>Participa en torneos y actividades</Text>
      
      <ScrollView style={styles.eventsList}>
        {eventos.map((evento) => (
          <View key={evento.id} style={styles.eventCard}>
            <Image source={{ uri: evento.imagen }} style={styles.eventImage} />
            
            <View style={styles.eventInfo}>
              <Text style={styles.eventName}>{evento.nombre}</Text>
              <Text style={styles.eventDate}>{evento.fecha}</Text>
              <Text style={styles.eventLocation}>{evento.lugar}</Text>
              <Text style={styles.eventDescription}>{evento.descripcion}</Text>
              
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Inscribirse</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
          onPress={() => navigation.navigate('Connections' as never)}
        >
          <Text style={styles.navItemText}>Conexiones</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile' as never)}
        >
          <Text style={styles.navItemText}>Perfil</Text>
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
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  eventsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  eventCard: {
    backgroundColor: '#111111',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  eventImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  eventInfo: {
    padding: 15,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 16,
    color: '#D4AF37',
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 15,
    lineHeight: 20,
  },
  registerButton: {
    backgroundColor: '#D4AF37',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#000000',
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