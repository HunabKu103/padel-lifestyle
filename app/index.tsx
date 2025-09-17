// app/(tabs)/index.tsx - Home
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Bienvenido a Padel Lifestyle!</Text>
        <Text style={styles.subtitle}>10,000 jugadores • 300 establecimientos</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximos Eventos</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>After Pádel - Club Central</Text>
          <Text style={styles.cardText}>Hoy 20:00 - DJ + Cena</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Torneo Nocturno</Text>
          <Text style={styles.cardText}>Viernes 19:00 - Premios + After</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Establecimientos Destacados</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Restaurante La Cancha</Text>
          <Text style={styles.cardText}>⭐ 4.8 • Especialidad: Parrilla</Text>
        </View>
      </View>
      
      {/* Botón Admin para testing */}
      <TouchableOpacity 
        style={styles.adminButton} 
        onPress={() => router.push('/admin')}
      >
        <Text style={styles.adminButtonText}>Panel Admin</Text>
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
    backgroundColor: '#2E7D32',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#B8E6B8',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  card: {
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
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  adminButton: {
    backgroundColor: '#FF6B35',
    margin: 20,
    padding: 15,
    borderRadius: 8,
  },
  adminButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});