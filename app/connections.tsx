// app/connections.tsx
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ConnectionsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Conexiones</Text>
        <Text style={styles.subtitle}>Personas que podrían interesarte</Text>
      </View>

      {/* Sugerencia 1 */}
      <View style={styles.matchCard}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956' }} style={styles.matchImage} />
        <View style={styles.matchInfo}>
          <Text style={styles.matchName}>Ana Gómez</Text>
          <Text style={styles.matchDetail}>3.5 · Sabana Pádel</Text>
          <Text style={styles.matchInterests}>💬 Conversación · 🍷 Coctel</Text>
        </View>
        <Pressable style={styles.btnOutline}>
          <Text style={[styles.btnText, { color: '#D4AF37' }]}>Enviar interés sutil</Text>
        </Pressable>
      </View>

      {/* Sugerencia 2 */}
      <View style={styles.matchCard}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' }} style={styles.matchImage} />
        <View style={styles.matchInfo}>
          <Text style={styles.matchName}>Luis Fernández</Text>
          <Text style={styles.matchDetail}>4.0 · El Hatillo</Text>
          <Text style={styles.matchInterests}>🤝 Networking · 🎵 Música</Text>
        </View>
        <Pressable style={styles.btnOutline}>
          <Text style={[styles.btnText, { color: '#D4AF37' }]}>¿Jugamos un dobles?</Text>
        </Pressable>
      </View>

      {/* Sugerencia 3 */}
      <View style={styles.matchCard}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' }} style={styles.matchImage} />
        <View style={styles.matchInfo}>
          <Text style={styles.matchName}>Carla Rivas</Text>
          <Text style={styles.matchDetail}>3.0 · Chacao</Text>
          <Text style={styles.matchInterests}>☕ Café · 💬 Conversación</Text>
        </View>
        <Pressable style={styles.btnOutline}>
          <Text style={[styles.btnText, { color: '#D4AF37' }]}>Invitar a clínica</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: '600',
  },
  subtitle: {
    color: '#B0B0B0',
    fontSize: 16,
    marginTop: 4,
  },
  matchCard: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  matchImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  matchInfo: {
    flex: 1,
  },
  matchName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  matchDetail: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  matchInterests: {
    color: '#D4AF37',
    fontSize: 14,
    marginTop: 4,
  },
  btnOutline: {
    borderColor: '#D4AF37',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  btnText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '600',
  },
});