// app/ConnectionsScreen.tsx
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../firebaseConfig';

export default function ConnectionsScreen() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      // Obtener conexiones donde el usuario es parte y son matches
      const q = query(
        collection(db, 'connections'),
        where('status', '==', 'matched')
      );
      
      const querySnapshot = await getDocs(q);
      const matchesData = [];
      
      for (const doc of querySnapshot.docs) {
        const connection = doc.data();
        // Verificar si el usuario actual está en esta conexión
        if (connection.fromUserId === currentUser.uid || connection.toUserId === currentUser.uid) {
          // Obtener información del otro usuario
          const otherUserId = connection.fromUserId === currentUser.uid 
            ? connection.toUserId 
            : connection.fromUserId;
          
          const userDoc = await getDocs(query(collection(db, 'users'), where('userId', '==', otherUserId)));
          if (!userDoc.empty) {
            matchesData.push({
              id: doc.id,
              ...connection,
              otherUser: userDoc.docs[0].data()
            });
          }
        }
      }
      
      setMatches(matchesData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading matches:', error);
      setLoading(false);
      Alert.alert('Error', 'No se pudieron cargar las conexiones');
    }
  };

  const renderMatch = ({ item }: any) => (
    <View style={styles.matchCard}>
      <View style={styles.matchHeader}>
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>
            {item.otherUser?.name?.charAt(0) || 'P'}
          </Text>
        </View>
        <View style={styles.matchInfo}>
          <Text style={styles.matchName}>{item.otherUser?.name || 'Jugador'}</Text>
          <Text style={styles.matchLevel}>Nivel: {item.otherUser?.level || 'Principiante'}</Text>
        </View>
      </View>
      <Text style={styles.matchDate}>
        Conectados desde: {new Date(item.timestamp?.toDate()).toLocaleDateString()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando conexiones...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Conexiones</Text>
      
      {matches.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aún no tienes conexiones</Text>
          <Text style={styles.emptySubtext}>¡Sigue swiping para encontrar matches!</Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#4A90E2',
  },
  listContainer: {
    paddingBottom: 20,
  },
  matchCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  matchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  placeholderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  matchInfo: {
    flex: 1,
  },
  matchName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  matchLevel: {
    fontSize: 14,
    color: '#666',
  },
  matchDate: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
  },
});