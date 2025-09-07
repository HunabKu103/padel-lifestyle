// BookingScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Datos de ejemplo de clubes aliados
const clubesAliados = [
  {
    id: 1,
    nombre: "Club Padel Premium",
    ubicacion: "Zona 10, Ciudad",
    tipo: "Club de alto rendimiento",
    precioAprox: "Q150/hora",
    telefono: "+502 2345-6789",
    whatsapp: "+502 2345-6789",
    imagen: "https://placehold.co/300x200/000000/D4AF37?text=Club+Premium",
    favorito: false
  },
  {
    id: 2,
    nombre: "Padel & Social",
    ubicacion: "Zona 4, Ciudad",
    tipo: "Club familiar",
    precioAprox: "Q100/hora",
    telefono: "+502 2345-1234",
    whatsapp: "+502 2345-1234",
    imagen: "https://placehold.co/300x200/000000/D4AF37?text=Padel+Social",
    favorito: true
  },
  {
    id: 3,
    nombre: "Urban Padel Center",
    ubicacion: "Zona 14, Ciudad",
    tipo: "Centro urbano",
    precioAprox: "Q120/hora",
    telefono: "+502 2345-5678",
    whatsapp: "+502 2345-5678",
    imagen: "https://placehold.co/300x200/000000/D4AF37?text=Urban+Padel",
    favorito: false
  }
];

export default function BookingScreen() {
  const [clubes, setClubes] = useState(clubesAliados);
  const navigation = useNavigation();

  const toggleFavorito = (id: number) => {
    setClubes(clubes.map(club => 
      club.id === id ? {...club, favorito: !club.favorito} : club
    ));
  };

  const llamarClub = (telefono: string) => {
    Linking.openURL(`tel:${telefono}`).catch(() => {
      Alert.alert("Error", "No se pudo iniciar la llamada");
    });
  };

  const enviarWhatsApp = (numero: string) => {
    Linking.openURL(`whatsapp://send?phone=${numero}`).catch(() => {
      // Si WhatsApp no está disponible, abrir en el navegador
      Linking.openURL(`https://wa.me/${numero}`).catch(() => {
        Alert.alert("Error", "No se pudo abrir WhatsApp");
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Clubes Aliados</Text>
      <Text style={styles.headerSubtitle}>Lugares donde jugar y disfrutar</Text>
      
      <ScrollView style={styles.clubList}>
        {clubes.map((club) => (
          <View key={club.id} style={styles.clubCard}>
            <Image source={{ uri: club.imagen }} style={styles.clubImage} />
            
            <View style={styles.clubInfo}>
              <View style={styles.clubHeader}>
                <Text style={styles.clubName}>{club.nombre}</Text>
                <TouchableOpacity onPress={() => toggleFavorito(club.id)}>
                  <Text style={styles.favoritoIcon}>
                    {club.favorito ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.clubTipo}>{club.tipo}</Text>
              <Text style={styles.clubUbicacion}>{club.ubicacion}</Text>
              <Text style={styles.clubPrecio}>Desde {club.precioAprox}</Text>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.callButton]}
                  onPress={() => llamarClub(club.telefono)}
                >
                  <Text style={styles.actionButtonText}>📞 Llamar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.whatsappButton]}
                  onPress={() => enviarWhatsApp(club.whatsapp)}
                >
                  <Text style={styles.actionButtonText}>💬 WhatsApp</Text>
                </TouchableOpacity>
              </View>
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
  clubList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  clubCard: {
    backgroundColor: '#111111',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  clubImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  clubInfo: {
    padding: 15,
  },
  clubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clubName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  favoritoIcon: {
    fontSize: 24,
    color: '#D4AF37',
  },
  clubTipo: {
    fontSize: 16,
    color: '#AAAAAA',
    marginBottom: 5,
  },
  clubUbicacion: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 5,
  },
  clubPrecio: {
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  callButton: {
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
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