import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TestScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Hola Mundo!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TestScreen;