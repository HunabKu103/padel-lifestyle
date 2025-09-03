// app/afterpadel.tsx
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AfterPadelScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>After Pádel</Text>
        <Text style={styles.subtitle}>Los mejores lugares para después del partido</Text>
      </View>

      {/* Lugar 1: La Terraza */}
      <View style={styles.card}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b' }} 
          style={styles.image} 
        />
        <Text style={styles.placeName}>La Terraza</Text>
        <Text style={styles.placeZone}>El Hatillo</Text>
        <Text style={styles.rating}>★★★★☆</Text>
        <Text style={styles.description}>
          Ambiente relajado, cocteles premium y música en vivo los sábados.
        </Text>
        <Pressable style={styles.btnPrimary}>
          <Text style={styles.btnText}>Mostrar cupón 15% OFF</Text>
        </Pressable>
      </View>

      {/* Lugar 2: Sabana Lounge */}
      <View style={styles.card}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1555244162-803834f70033' }} 
          style={styles.image} 
        />
        <Text style={styles.placeName}>Sabana Lounge</Text>
        <Text style={styles.placeZone}>Sabana Grande</Text>
        <Text style={styles.rating}>★★★★★</Text>
        <Text style={styles.description}>
          Terraza abierta, DJ los viernes y menú especial para jugadores de pádel.
        </Text>
        <Pressable style={styles.btnPrimary}>
          <Text style={styles.btnText}>Mostrar cupón 10% OFF</Text>
        </Pressable>
      </View>

      {/* Lugar 3: Padel & Co */}
      <View style={styles.card}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1519669556878-63bdad8a1a49' }} 
          style={styles.image} 
        />
        <Text style={styles.placeName}>Padel & Co</Text>
        <Text style={styles.placeZone}>Chacao</Text>
        <Text style={styles.rating}>★★★★☆</Text>
        <Text style={styles.description}>
          Coctelería artesanal y ambiente sofisticado. Ideal para cerrar la noche.
        </Text>
        <Pressable style={styles.btnPrimary}>
          <Text style={styles.btnText}>Mostrar cupón 2x1 en cócteles</Text>
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
  placeName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  placeZone: {
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