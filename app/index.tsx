// app/index.tsx
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo} 
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>Pádel & Lifestyle</Text>

      {/* Slogan en dos líneas */}
      <Text style={styles.sloganLine1}>El juego termina en la cancha.</Text>
      <Text style={styles.sloganLine2}>La vida empieza después.</Text>

      {/* Bienvenida */}
      <View style={styles.section}>
        <Text style={styles.description}>
          Conectamos a los mejores jugadores de pádel con los mejores lugares para después del partido.
        </Text>
      </View>

      {/* CTA */}
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaText}>¿Listo para vivir el estilo?</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 8,
  },
  sloganLine1: {
    fontSize: 16,
    color: '#D4AF37',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  sloganLine2: {
    fontSize: 16,
    color: '#D4AF37',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  section: {
    paddingHorizontal: 20,
  },
  description: {
    color: '#B0B0B0',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  ctaContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
  },
});