// app/QRScannerScreen.tsx
import { useRouter } from 'expo-router';
import { collection, doc, getDocs, increment, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeReadEvent } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { db } from '../firebaseConfig';

export default function QRScannerScreen() {
  const [scanning, setScanning] = useState(true);
  const router = useRouter();

  const onSuccess = async (e: BarCodeReadEvent) => {
    setScanning(false);
    
    try {
      // Verificar si es un código QR de Padel Lifestyle
      if (e.data.startsWith('PAD-')) {
        const userIdNumber = e.data.replace('PAD-', '');
        
        // Buscar usuario en Firestore
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('userIdNumber', '==', parseInt(userIdNumber)));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          
          // Mostrar información del jugador
          Alert.alert(
            '¡Jugador Identificado!',
            `Nombre: ${userData.name}
Nivel: ${userData.level}
ID: #${userData.userIdNumber}`,
            [
              {
                text: 'Aplicar Descuento',
                onPress: () => applyDiscount(userDoc.id, userData)
              },
              {
                text: 'Cancelar',
                style: 'cancel',
                onPress: () => setScanning(true)
              }
            ]
          );
        } else {
          Alert.alert('Error', 'Jugador no encontrado', [
            { text: 'Reintentar', onPress: () => setScanning(true) }
          ]);
        }
      } else {
        Alert.alert('Error', 'Código QR no válido para Padel Lifestyle', [
          { text: 'Reintentar', onPress: () => setScanning(true) }
        ]);
      }
    } catch (error) {
      console.error('Error scanning QR:', error);
      Alert.alert('Error', 'No se pudo procesar el código QR', [
        { text: 'Reintentar', onPress: () => setScanning(true) }
      ]);
    }
  };

  const applyDiscount = async (userId: string, userData: any) => {
    try {
      // Incrementar contador de visitas
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        visits: increment(1)
      });
      
      // Registrar la visita en una colección separada
      const visitId = `${userId}_${Date.now()}`;
      await setDoc(doc(db, 'visits', visitId), {
        userId: userId,
        timestamp: new Date(),
        location: 'Local Afiliado',
        discountApplied: true
      });
      
      Alert.alert(
        '¡Descuento Aplicado!',
        `Descuento aplicado a ${userData.name}
Visitas totales: ${(userData.visits || 0) + 1}`,
        [
          {
            text: 'Nuevo Escaneo',
            onPress: () => setScanning(true)
          },
          {
            text: 'Volver',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      console.error('Error applying discount:', error);
      Alert.alert('Error', 'No se pudo aplicar el descuento');
      setScanning(true);
    }
  };

  return (
    <View style={styles.container}>
      {scanning ? (
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={'auto'}
          topContent={
            <Text style={styles.centerText}>
              Escanea el código QR de un jugador de Padel Lifestyle
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>Escaneando...</Text>
            </TouchableOpacity>
          }
        />
      ) : (
        <View style={styles.scanningContainer}>
          <Text style={styles.scanningText}>Procesando...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 30,
    color: 'white',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 21,
    color: 'white',
  },
  buttonTouchable: {
    padding: 16,
  },
  scanningContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  scanningText: {
    fontSize: 24,
    color: 'white',
  },
});