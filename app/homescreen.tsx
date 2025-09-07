import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  const featuredEvents = [
    { id: 1, title: 'Torneo de Verano', date: '2023-08-15', location: 'Club Padel Central' },
    { id: 2, title: 'Clases de Iniciación', date: '2023-08-16', location: 'Padel Academy' },
  ];

  const upcomingMatches = [
    { id: 1, opponent: 'Equipo Alpha', date: '2023-08-17', time: '18:00' },
    { id: 2, opponent: 'Equipo Beta', date: '2023-08-18', time: '19:30' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido a Padel Lifestyle</Text>
        <Text style={styles.subtitle}>Tu comunidad de padel</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximos Eventos</Text>
        {featuredEvents.map(event => (
          <TouchableOpacity key={event.id} style={styles.eventCard}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDetails}>{event.date} - {event.location}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximos Partidos</Text>
        {upcomingMatches.map(match => (
          <TouchableOpacity key={match.id} style={styles.matchCard}>
            <Text style={styles.matchOpponent}>{match.opponent}</Text>
            <Text style={styles.matchDetails}>{match.date} a las {match.time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  eventCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    color: '#666',
  },
  matchCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  matchOpponent: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  matchDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;