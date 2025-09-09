// app/ProfileScreen.tsx
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebaseConfig';

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        router.replace('/LoginScreen');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        setUser({ id: currentUser.uid, ...userDoc.data() });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      Alert.alert('Error', 'No se pudo cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    router.replace('/LoginScreen');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No se encontró el perfil</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitials}>
            {user.name?.charAt(0) || 'P'}
          </Text>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userLevel}>Nivel: {user.level}</Text>
        <Text style={styles.userLocation}>📍 {user.location}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Información del Jugador</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ID de Jugador:</Text>
          <Text style={styles.infoValue}>#{user.userIdNumber}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Miembro desde:</Text>
          <Text style={styles.infoValue}>
            {user.createdAt?.toDate().toLocaleDateString() || 'Fecha no disponible'}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Partidos jugados:</Text>
          <Text style={styles.infoValue}>{user.matches || 0}</Text>
        </View>
      </View>

      <View style={styles.interestsCard}>
        <Text style={styles.cardTitle}>Intereses</Text>
        <View style={styles.interestsContainer}>
          {user.interests?.map((interest: string, index: number) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          )) || <Text style={styles.noInterests}>Sin intereses definidos</Text>}
        </View>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 30,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileInitials: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  userLevel: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 5,
  },
  userLocation: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  infoCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  interestsCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  interestText: {
    color: '#4A90E2',
    fontSize: 14,
  },
  noInterests: {
    color: '#999',
    fontStyle: 'italic',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});