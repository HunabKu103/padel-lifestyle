// app/profile.tsx
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function ProfileScreen() {
  const [wantToMeet, setWantToMeet] = useState(true);

  return (
    <ScrollView style={styles.container}>
      {/* Foto de perfil */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1494790108782-66b033d57228' }} style={styles.avatar} />
        <Pressable onPress={() => alert('Editar foto')}>
          <Text style={styles.editPhoto}>Editar foto</Text>
        </Pressable>
      </View>

      {/* Nombre */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre</Text>
        <Pressable onPress={() => alert('Editar nombre')}>
          <Text style={styles.input}>Carlos Ríos</Text>
        </Pressable>
      </View>

      {/* Club */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Club de pádel</Text>
        <Pressable onPress={() => alert('Editar club')}>
          <Text style={styles.input}>El Hatillo Pádel</Text>
        </Pressable>
      </View>

      {/* Nivel */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nivel</Text>
        <Pressable onPress={() => alert('Editar nivel')}>
          <Text style={styles.input}>3.5</Text>
        </Pressable>
      </View>

      {/* Intereses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mis intereses</Text>
        <View style={styles.interests}>
          <View style={styles.interestBadge}>
            <Text style={styles.interestText}>☕ Café</Text>
          </View>
          <View style={styles.interestBadge}>
            <Text style={styles.interestText}>🍷 Coctel</Text>
          </View>
          <View style={styles.interestBadge}>
            <Text style={styles.interestText}>🎵 Música</Text>
          </View>
          <View style={styles.interestBadge}>
            <Text style={styles.interestText}>💬 Conversación</Text>
          </View>
          <View style={styles.interestBadge}>
            <Text style={styles.interestText}>🤝 Networking</Text>
          </View>
        </View>
      </View>

      {/* Frase personal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frase personal</Text>
        <Text style={styles.bio}>Busco buen juego y mejor compañía.</Text>
      </View>

      {/* Quiero conocer gente nueva */}
      <View style={styles.section}>
        <View style={styles.row}>
          <View>
            <Text style={styles.switchTitle}>Quiero conocer gente nueva</Text>
            <Text style={styles.switchSubtitle}>
              Activa sugerencias de conexión y eventos sociales
            </Text>
          </View>
          <Switch
            value={wantToMeet}
            onValueChange={setWantToMeet}
            thumbColor={wantToMeet ? '#D4AF37' : '#f4f3f4'}
            trackColor={{ false: '#777', true: '#D4AF3780' }}
          />
        </View>
      </View>

      {/* Botón: Editar perfil */}
      <Pressable style={styles.btnPrimary}>
        <Text style={styles.btnText}>Editar perfil</Text>
      </Pressable>
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
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  editPhoto: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#B0B0B0',
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestBadge: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  interestText: {
    color: '#FFF',
    fontSize: 14,
  },
  bio: {
    color: '#B0B0B0',
    fontSize: 16,
    lineHeight: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  switchSubtitle: {
    color: '#B0B0B0',
    fontSize: 14,
    marginTop: 4,
  },
  btnPrimary: {
    backgroundColor: '#D4AF37',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  btnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});