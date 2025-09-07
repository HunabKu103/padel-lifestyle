// ConnectionsScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

// Datos de ejemplo para usuarios
const mockUsers = [
  {
    id: 1,
    name: "Ana Gómez",
    age: 28,
    level: "Intermedio",
    interests: ["Interés Sutil", "Cocktail", "Conversación"],
    icons: ["💬", "🍸", "💭"],
    image: "https://placehold.co/300x400/000000/D4AF37?text=Ana",
    matchPercentage: 85
  },
  {
    id: 2,
    name: "Luis Fernández",
    age: 32,
    level: "Avanzado",
    interests: ["Networking", "Música", "Tecnología"],
    icons: ["💼", "🎵", "💻"],
    image: "https://placehold.co/300x400/000000/D4AF37?text=Luis",
    matchPercentage: 78
  },
  {
    id: 3,
    name: "María Rodríguez",
    age: 25,
    level: "Principiante",
    interests: ["Yoga", "Viajes", "Arte"],
    icons: ["🧘", "✈️", "🎨"],
    image: "https://placehold.co/300x400/000000/D4AF37?text=María",
    matchPercentage: 92
  }
];

export default function ConnectionsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUser = mockUsers[currentIndex];
  const navigation = useNavigation();

  const handleSwipe = (direction: 'left' | 'right' | 'super') => {
    if (direction === 'right') {
      // Like - Potencial conexión
      console.log(`Te interesa ${currentUser.name}`);
    } else if (direction === 'left') {
      // Pass - Siguiente usuario
      console.log(`Pasando a ${currentUser.name}`);
    } else if (direction === 'super') {
      // Super like - Interés especial
      console.log(`Super like a ${currentUser.name}`);
    }
    
    // Avanzar al siguiente usuario
    if (currentIndex < mockUsers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reiniciar cuando se terminan los usuarios
      setCurrentIndex(0);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Conexiones</Text>
        <Text style={styles.headerSubtitle}>Encuentra tu compañero perfecto</Text>
      </View>

      {/* Tarjeta de Usuario Principal */}
      <View style={styles.cardContainer}>
        <View style={styles.userCard}>
          {/* Imagen de perfil con efecto de luz dorada */}
          <Image 
            source={{ uri: currentUser.image }} 
            style={styles.profileImage}
          />
          
          {/* Información del usuario */}
          <View style={styles.userInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>{currentUser.name}</Text>
              <Text style={styles.userAge}>{currentUser.age}</Text>
            </View>
            
            <Text style={styles.userLevel}>{currentUser.level}</Text>
            
            {/* Intereses con íconos */}
            <View style={styles.interestsContainer}>
              {currentUser.interests.map((interest, index) => (
                <View key={index} style={styles.interestItem}>
                  <Text style={styles.interestIcon}>{currentUser.icons[index]}</Text>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
            
            {/* Porcentaje de compatibilidad */}
            <View style={styles.compatibilityContainer}>
              <Text style={styles.compatibilityText}>
                {currentUser.matchPercentage}% compatible
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.passButton]}
          onPress={() => handleSwipe('left')}
        >
          <Text style={styles.actionButtonText}>✕</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.superLikeButton]}
          onPress={() => handleSwipe('super')}
        >
          <Text style={styles.actionButtonText}>⭐</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.likeButton]}
          onPress={() => handleSwipe('right')}
        >
          <Text style={styles.actionButtonText}>❤️</Text>
        </TouchableOpacity>
      </View>

      {/* Indicador de progreso */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentIndex + 1} de {mockUsers.length}
        </Text>
      </View>
      
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
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  userCard: {
    width: width * 0.85,
    height: height * 0.65,
    backgroundColor: '#111111',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D4AF37',
    shadowColor: '#D4AF37',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  profileImage: {
    width: '100%',
    height: '65%',
    resizeMode: 'cover',
  },
  userInfo: {
    padding: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 10,
  },
  userAge: {
    fontSize: 18,
    color: '#D4AF37',
  },
  userLevel: {
    fontSize: 16,
    color: '#AAAAAA',
    marginBottom: 15,
  },
  interestsContainer: {
    marginBottom: 15,
  },
  interestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    padding: 8,
    borderRadius: 10,
  },
  interestIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  interestText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  compatibilityContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  compatibilityText: {
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  passButton: {
    backgroundColor: '#333333',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  superLikeButton: {
    backgroundColor: '#333333',
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  likeButton: {
    backgroundColor: '#333333',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  actionButtonText: {
    fontSize: 30,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    color: '#AAAAAA',
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