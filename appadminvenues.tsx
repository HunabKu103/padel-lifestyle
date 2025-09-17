import { StyleSheet, Text, View } from 'react-native';

export default function Venues() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Establecimientos</Text>
      <Text>Aquí se mostrarán los 300 locales</Text>
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