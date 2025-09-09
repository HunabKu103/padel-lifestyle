// app/_layout.tsx
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4A90E2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="LoginScreen" 
        options={{ 
          title: 'Iniciar Sesión',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="RegisterScreen" 
        options={{ 
          title: 'Crear Cuenta',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="homescreen" 
        options={{ 
          title: 'Padel Lifestyle',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="ProfileScreen" 
        options={{ 
          title: 'Mi Perfil'
        }} 
      />
      <Stack.Screen 
        name="EventsScreen" 
        options={{ 
          title: 'Eventos'
        }} 
      />
      <Stack.Screen 
        name="BookingScreen" 
        options={{ 
          title: 'Reservar Pista'
        }} 
      />
      <Stack.Screen 
        name="ConnectionsScreen" 
        options={{ 
          title: 'Conexiones'
        }} 
      />
      <Stack.Screen 
        name="SwipeScreen" 
        options={{ 
          title: 'Padel Crush'
        }} 
      />
      <Stack.Screen 
        name="QRScannerScreen" 
        options={{ 
          title: 'Escanear QR'
        }} 
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});