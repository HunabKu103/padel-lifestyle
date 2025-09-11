// src/screens/main/SwipeScreen.tsx
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../../app/firebaseConfig';

type UserProfile = {
  id: string;
  name: string;
  level: string;
  location: string;
  interests?: string[];
  photo?: string;
};

export default function SwipeScreen() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Cargar perfiles y usuario actual
  useEffect(() => {
    loadCurrentUser();
    loadProfiles();
  }, []);

  const loadCurrentUser = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          // CORRECCIÓN: Evitar duplicación de id
          const userData = userDoc.data() as UserProfile;
          setCurrentUser({
            ...userData,
            id: user.uid  // Asegurar que el id sea el correcto
          });
        }
      } catch (error) {
        console.error('Error loading current user:', error);
      }
    }
  };

  const loadProfiles = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      // Obtener todos los usuarios excepto el actual
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);

      const profilesData: UserProfile[] = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== currentUser.uid) {
          // CORRECCIÓN: Evitar duplicación de id
          const docData = doc.data() as UserProfile;
          profilesData.push({
            ...docData,
            id: doc.id  // Asegurar que el id sea el correcto
          });
        }
      });

      setProfiles(profilesData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading profiles:', error);
      setLoading(false);
      Alert.alert('Error', 'No se pudieron cargar los perfiles');
    }
  };

  const saveConnection = async (targetUserId: string, type: 'like' | 'dislike') => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      // Guardar la conexión
      const connectionId = `${currentUser.uid}_${targetUserId}`;
      await setDoc(doc(db, 'connections', connectionId), {
        fromUserId: currentUser.uid,
        toUserId: targetUserId,
        type: type,
        timestamp: new Date(),
        status: type === 'like' ? 'pending' : 'rejected'
      });

      // Si es un like, verificar si hay match
      if (type === 'like') {
        await checkForMatch(targetUserId);
      }
    } catch (error) {
      console.error('Error saving connection:', error);
    }
  };

  const checkForMatch = async (targetUserId: string) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      // Verificar si el otro usuario también nos dio like
      const reverseConnectionId = `${targetUserId}_${currentUser.uid}`;
      const reverseConnectionDoc = await getDoc(doc(db, 'connections', reverseConnectionId));

      if (reverseConnectionDoc.exists() && reverseConnectionDoc.data()?.type === 'like') {
        // ¡Match! Actualizar ambos registros
        await setDoc(doc(db, 'connections', `${currentUser.uid}_${targetUserId}`), {
          fromUserId: currentUser.uid,
          toUserId: targetUserId,
          type: 'match',
          timestamp: new Date(),
          status: 'matched'
        }, { merge: true });

        await setDoc(doc(db, 'connections', `${targetUserId}_${currentUser.uid}`), {
          fromUserId: targetUserId,
          toUserId: currentUser.uid,
          type: 'match',
          timestamp: new Date(),
          status: 'matched'
        }, { merge: true });

        Alert.alert('¡Match!', '¡Han hecho match! 🎉');
      }
    } catch (error) {
      console.error('Error checking for match:', error);
    }
  };

  const handleLike = async () => {
    if (profiles.length === 0 || currentIndex >= profiles.length) return;

    const targetProfile = profiles[currentIndex];
    await saveConnection(targetProfile.id, 'like');

    // Avanzar al siguiente perfil
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert('¡Fin!', 'Has visto todos los perfiles por ahora');
    }
  };

  const handleDislike = async () => {
    if (profiles.length === 0 || currentIndex >= profiles.length) return;

    const targetProfile = profiles[currentIndex];
    await saveConnection(targetProfile.id, 'dislike');

    // Avanzar al siguiente perfil
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert('¡Fin!', 'Has visto todos los perfiles por ahora');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Cargando perfiles...</Text>
      </View>
    );
  }

  if (profiles.length === 0 || currentIndex >= profiles.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noProfilesText}>
          No hay más perfiles para mostrar
        </Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => {
            setCurrentIndex(0);
            loadProfiles();
          }}
        >
          <Text style={styles.refreshText}>↻ Recargar perfiles</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Padel Crush</Text>

      {/* Tarjeta de perfil */}
      <View style={styles.card}>
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>
            {currentProfile.name?.charAt(0) || 'P'}
          </Text>
        </View>

        <Text style={styles.profileName}>{currentProfile.name || 'Jugador'}</Text>
        <Text style={styles.profileLevel}>Nivel: {currentProfile.level || 'Principiante'}</Text>
        <Text style={styles.profileLocation}>
          {currentProfile.location || 'Ubicación no especificada'}
        </Text>

        {currentProfile.interests && (
          <View style={styles.interestsContainer}>
            <Text style={styles.interestsTitle}>Intereses:</Text>
            <Text style={styles.interestsText}>
              {currentProfile.interests.join(', ') || 'Sin intereses'}
            </Text>
          </View>
        )}
      </View>

      {/* Botones de acción */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.dislikeButton} onPress={handleDislike}>
          <Text style={styles.dislikeText}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
          <Text style={styles.likeText}>♥</Text>
        </TouchableOpacity>
      </View>

      {/* Contador */}
      <Text style={styles.counter}>
        {currentIndex + 1} de {profiles.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  card: {
    width: '90%',
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 40,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  placeholderText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileLevel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  profileLocation: {
    fontSize: 16,
    color: '#888',
    marginBottom: 15,
  },
  interestsContainer: {
    alignItems: 'center',
  },
  interestsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  interestsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 30,
  },
  dislikeButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dislikeText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  likeText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  noProfilesText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
  },
  refreshText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 16,
    color: '#666',
  },
});