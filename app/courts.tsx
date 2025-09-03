// app/courts.tsx
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function CourtsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Canchas</Text>
        <Text style={styles.subtitle}>Reserva tu cancha en los mejores clubes</Text>
      </View>

      {/* Cancha 1: El Hatillo Pádel */}
      <View style={styles.card}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1621481501856-5d3fd2e8854c' }} style={styles.image} />
        <Text style={styles.courtName}>El Hatillo Pádel</Text>
        <Text style={styles.courtZone}>El Hatillo</Text>
        <Text style={styles.rating}>★★★★★</Text>
        <Text style={styles.description}>
          6 canchas iluminadas, alquiler de raquetas y pelotas.
        </Text>
        <Pressable style={styles.btnPrimary}>
          <Text style={styles.btnText}>Ver disponibilidad</Text>
        </Pressable>
      </View>

      {/* Cancha 2: Sabana Pádel */}
      <View style={styles.card}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1579903241435-987684f392c7' }} style={styles.image} />
        <Text style={styles.courtName}>Sabana Pádel</Text>
        <Text style={styles.courtZone}>Sabana Grande</Text>
        <Text style={styles.rating}>★★★★☆</Text>
        <Text style={styles.description}>
          Clases para todos los niveles y torneos semanales.
        </Text>
        <Pressable style={styles.btnPrimary}>
          <Text style={styles.btnText}>Ver disponibilidad</Text>
        </Pressable>
      </View>

      {/* Cancha 3: Chacao Pádel */}
      <View style={styles.card}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1621481501856-5d3fd2e8854c' }} style={styles.image} />
        <Text style={styles.courtName}>Chacao Pádel</Text>
        <Text style={styles.courtZone}>Chacao</Text>
        <Text style={styles.rating}>★★★★☆</Text>
        <Text style={styles.description}>
          Canchas techadas y vestidores con duchas.
        </Text>
        <Pressable style={styles.btnPrimary}>
          <Text style={styles.btnText}>Ver disponibilidad</Text>
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
  card: {
    backgroundColor: '#111',
    borderRadius: 12,
    marginBottom: 20,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  courtName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  courtZone: {
    color: '#B0B0B0',
    fontSize: 14,
    marginVertical: 4,
  },
  rating: {
    color: '#FFD700',
    fontSize: 16,
    marginVertical: 4,
  },
  description: {
    color: '#B0B0B0',
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 8,
  },
  btnPrimary: {
    backgroundColor: '#D4AF37',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#000',
    fontWeight: 'bold',
  },
});