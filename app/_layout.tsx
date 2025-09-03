// app/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarStyle: { backgroundColor: '#000' },
        headerShown: false,
      }}
    >
      {/* Pestaña: Inicio */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Pestaña: Perfil */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      {/* Pestaña: After Pádel */}
      <Tabs.Screen
        name="afterpadel"
        options={{
          title: 'After Pádel',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wine" size={size} color={color} />
          ),
        }}
      />

      {/* Pestaña: Eventos */}
      <Tabs.Screen
        name="events"
        options={{
          title: 'Eventos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />

      {/* Pestaña: Conexiones */}
      <Tabs.Screen
        name="connections"
        options={{
          title: 'Conexiones',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />

      {/* Pestaña: Canchas */}
      <Tabs.Screen
        name="courts"
        options={{
          title: 'Canchas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tennisball" size={size} color={color} />
          ),
        }}
      />

      {/* Pestaña: WhatsApp */}
      <Tabs.Screen
        name="whatsapp-login"
        options={{
          title: 'WhatsApp',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-whatsapp" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}