import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AdminPanel() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Panel de Administración</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>10,000</Text>
            <Text style={styles.statLabel}>Jugadores</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>300</Text>
            <Text style={styles.statLabel}>Establecimientos</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.adminCard}
          onPress={() => router.push('/admin/venues')}
        >
          <Ionicons name="restaurant" size={24} color="#FF6B35" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Gestionar Establecimientos</Text>
            <Text style={styles.cardDescription}>Agregar, editar y administrar los 300 locales</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#FF6B35', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20, flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 15 },
  content: { padding: 20 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  statCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, alignItems: 'center', flex: 0.48, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  statNumber: { fontSize: 28, fontWeight: 'bold', color: '#2E7D32' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 5 },
  adminCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  cardContent: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardDescription: { fontSize: 14, color: '#666', marginTop: 5 },
});