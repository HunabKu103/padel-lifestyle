// app/events.tsx
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function EventsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Eventos</Text>
        <Text style={styles.subtitle}>Torneos, noches temáticas y clínicas sociales</Text>
      </View>

      {/* Evento 1: Noche After Pádel */}
      <View style={styles.card}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce' }} style={styles.image} />
        <Text style={styles.eventName}>Noche After Pádel</Text>
        <Text style={styles.eventDetail}>Sábado, 6 PM · El Hatillo</Text>
        <Text style={styles.description}>
          Música, cocteles y partidos sociales. Trae tu raqueta y tu mejor sonrisa.
        </Text>
        <Pressable style={styles.btnPrimary}>
          <Text style={styles.btnText}>Quiero ir</Text>
        </Pressable>
      </View>

      {/* Evento 2: Torneo Mixto 3.5 */}
      <View style={styles.card}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1540597350117-8eb6f1a27373' }} style={styles.image} />
        <Text style={styles.eventName}>Torneo Mixto 3.5</Text>
        <Text style={styles.eventDetail}>Domingo, 9 AM · Sabana Pádel</Text>
        <Text style={styles.description}>
          Formato por parejas, premios y after party incluido.
        </Text>
        <Pressable style={styles.btnPrimary}>
          <Text style={styles.btnText}>Inscribirme</Text>
        </Pressable>
      </View>

      {/* Evento 3: Clínica Social */}
      <View style={styles.card}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1619057085848-66b033d57228' }} style={styles.image} />
        <Text style={styles.eventName}>Clínica Social</Text>
        <Text style={styles.eventDetail}>Viernes, 7 PM · Chacao</Text>
        <Text style={styles.description}>
          Aprende con coaches y conéctate con jugadores de tu nivel.
        </Text>
        <Pressable style={styles.btnPrimary}>
          <Text style={styles.btnText}>Reservar cupo</Text>
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
  eventName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  eventDetail: {
    color: '#B0B0B0',
    fontSize: 14,
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