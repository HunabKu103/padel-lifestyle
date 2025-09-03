// src/screens/HomeScreen.js
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.slogan}>Donde el juego se convierte en vida.</Text>
      </View>

      {/* Eventos próximos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Eventos próximos</Text>
        <View style={styles.eventCard}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.eventImage} />
          <View style={styles.eventInfo}>
            <Text style={styles.eventName}>Noche After Pádel</Text>
            <Text style={styles.eventDetail}>Sábado, 6 PM · El Hatillo</Text>
            <Pressable style={styles.btnPrimary}>
              <Text style={styles.btnText}>Quiero ir</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* After Pádel recomendado */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>After Pádel recomendado</Text>
        <View style={styles.placeCard}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.placeImage} />
          <Text style={styles.placeName}>La Terraza</Text>
          <Text style={styles.placeZone}>El Hatillo</Text>
          <Text style={styles.rating}>★★★★☆</Text>
          <Pressable style={styles.btnSecondary}>
            <Text style={styles.btnTextSmall}>Mostrar cupón</Text>
          </Pressable>
        </View>
      </View>

      {/* Sugerencia de conexión */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Conoces a alguien nuevo?</Text>
        <View style={styles.matchCard}>
          <Image source={{ uri: 'https://via.placeholder.com/60' }} style={styles.matchImage} />
          <Text style={styles.matchText}>
            Ana juega en tu club y le gusta el vino. ¿Quieres que te presentemos?
          </Text>
          <Pressable style={styles.btnOutline}>
            <Text style={[styles.btnTextSmall, { color: '#D4AF37' }]}>Enviar interés sutil</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  slogan: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 12,
    fontWeight: '600',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  eventImage: {
    width: 80,
    height: 80,
  },
  eventInfo: {
    flex: 1,
    padding: 12,
  },
  eventName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  eventDetail: {
    color: '#B0B0B0',
    fontSize: 14,
    marginVertical: 4,
  },
  placeCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  placeImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  placeName: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
  },
  placeZone: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  rating: {
    color: '#FFD700',
    marginVertical: 6,
  },
  matchCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },
  matchImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    top: 16,
    left: 16,
  },
  matchText: {
    marginLeft: 70,
    color: '#B0B0B0',
    fontSize: 14,
    lineHeight: 20,
  },
  btnPrimary: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  btnSecondary: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
  },
  btnOutline: {
    borderColor: '#D4AF37',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  btnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  btnTextSmall: {
    color: '#FFF',
    fontSize: 12,
  },
});

export default HomeScreen;