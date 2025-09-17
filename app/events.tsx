// app/(tabs)/events.tsx
import { StyleSheet, Text, View } from 'react-native';

export default function Events() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>
      <Text>Aquí mostrarás todos los eventos after-pádel</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});