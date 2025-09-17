// src/services/firebaseAdminService.js
// Servicio para administración de contenido

import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore';
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes
} from 'firebase/storage';
import { db, storage } from '../firebaseConfig';

class FirebaseAdminService {
  
  // ESTABLECIMIENTOS
  async createEstablishment(establishmentData) {
    try {
      const docRef = doc(db, 'establishments', establishmentData.id);
      await setDoc(docRef, {
        ...establishmentData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { success: true, id: establishmentData.id };
    } catch (error) {
      console.error('Error creating establishment:', error);
      return { success: false, error: error.message };
    }
  }

  async updateEstablishment(establishmentId, updates) {
    try {
      const docRef = doc(db, 'establishments', establishmentId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating establishment:', error);
      return { success: false, error: error.message };
    }
  }

  async getAllEstablishments() {
    try {
      const querySnapshot = await getDocs(collection(db, 'establishments'));
      const establishments = [];
      querySnapshot.forEach((doc) => {
        establishments.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: establishments };
    } catch (error) {
      console.error('Error fetching establishments:', error);
      return { success: false, error: error.message };
    }
  }

  async getEstablishmentsByCategory(category) {
    try {
      const q = query(
        collection(db, 'establishments'), 
        where('category', '==', category),
        where('active', '==', true)
      );
      const querySnapshot = await getDocs(q);
      const establishments = [];
      querySnapshot.forEach((doc) => {
        establishments.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: establishments };
    } catch (error) {
      console.error('Error fetching establishments by category:', error);
      return { success: false, error: error.message };
    }
  }

  // EVENTOS
  async createEvent(eventData) {
    try {
      const docRef = await addDoc(collection(db, 'events'), {
        ...eventData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating event:', error);
      return { success: false, error: error.message };
    }
  }

  async updateEvent(eventId, updates) {
    try {
      const docRef = doc(db, 'events', eventId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating event:', error);
      return { success: false, error: error.message };
    }
  }

  async getAllEvents() {
    try {
      const q = query(collection(db, 'events'), orderBy('date', 'asc'));
      const querySnapshot = await getDocs(q);
      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: events };
    } catch (error) {
      console.error('Error fetching events:', error);
      return { success: false, error: error.message };
    }
  }

  // PUBLICIDAD
  async createAd(adData) {
    try {
      const docRef = await addDoc(collection(db, 'ads'), {
        ...adData,
        createdAt: new Date(),
        updatedAt: new Date(),
        impressions: 0,
        clicks: 0
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating ad:', error);
      return { success: false, error: error.message };
    }
  }

  async getActiveAds(adType = null) {
    try {
      let q;
      if (adType) {
        q = query(
          collection(db, 'ads'), 
          where('type', '==', adType),
          where('active', '==', true),
          where('validUntil', '>=', new Date())
        );
      } else {
        q = query(
          collection(db, 'ads'), 
          where('active', '==', true),
          where('validUntil', '>=', new Date())
        );
      }
      
      const querySnapshot = await getDocs(q);
      const ads = [];
      querySnapshot.forEach((doc) => {
        ads.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: ads };
    } catch (error) {
      console.error('Error fetching ads:', error);
      return { success: false, error: error.message };
    }
  }

  async trackAdImpression(adId) {
    try {
      const docRef = doc(db, 'ads', adId);
      const adDoc = await getDoc(docRef);
      if (adDoc.exists()) {
        const currentImpressions = adDoc.data().impressions || 0;
        await updateDoc(docRef, {
          impressions: currentImpressions + 1,
          lastImpression: new Date()
        });
      }
      return { success: true };
    } catch (error) {
      console.error('Error tracking impression:', error);
      return { success: false, error: error.message };
    }
  }

  async trackAdClick(adId) {
    try {
      const docRef = doc(db, 'ads', adId);
      const adDoc = await getDoc(docRef);
      if (adDoc.exists()) {
        const currentClicks = adDoc.data().clicks || 0;
        await updateDoc(docRef, {
          clicks: currentClicks + 1,
          lastClick: new Date()
        });
      }
      return { success: true };
    } catch (error) {
      console.error('Error tracking click:', error);
      return { success: false, error: error.message };
    }
  }

  // CLUBES
  async createClub(clubData) {
    try {
      const docRef = doc(db, 'clubs', clubData.id);
      await setDoc(docRef, {
        ...clubData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { success: true, id: clubData.id };
    } catch (error) {
      console.error('Error creating club:', error);
      return { success: false, error: error.message };
    }
  }

  async getAllClubs() {
    try {
      const querySnapshot = await getDocs(collection(db, 'clubs'));
      const clubs = [];
      querySnapshot.forEach((doc) => {
        clubs.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: clubs };
    } catch (error) {
      console.error('Error fetching clubs:', error);
      return { success: false, error: error.message };
    }
  }

  // COACHES/ESCUELAS
  async createCoach(coachData) {
    try {
      const docRef = await addDoc(collection(db, 'coaches'), {
        ...coachData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating coach:', error);
      return { success: false, error: error.message };
    }
  }

  async getAllCoaches() {
    try {
      const q = query(collection(db, 'coaches'), orderBy('name', 'asc'));
      const querySnapshot = await getDocs(q);
      const coaches = [];
      querySnapshot.forEach((doc) => {
        coaches.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: coaches };
    } catch (error) {
      console.error('Error fetching coaches:', error);
      return { success: false, error: error.message };
    }
  }

  // GESTIÓN DE ARCHIVOS
  async uploadImage(file, folder = 'general') {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `images/${folder}/${fileName}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return { success: true, url: downloadURL, path: snapshot.ref.fullPath };
    } catch (error) {
      console.error('Error uploading image:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteImage(imagePath) {
    try {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting image:', error);
      return { success: false, error: error.message };
    }
  }

  // ESTADÍSTICAS Y REPORTES
  async getEstablishmentStats(establishmentId) {
    try {
      // Aquí implementarías las consultas para obtener estadísticas
      // de visitas, ingresos, etc.
      const docRef = doc(db, 'establishments', establishmentId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          success: true,
          stats: {
            totalVisits: data.padelLifestyleInfo?.totalVisits || 0,
            totalRevenue: data.padelLifestyleInfo?.totalRevenue || 0,
            averageRating: data.rating?.average || 0,
            totalReviews: data.rating?.totalReviews || 0
          }
        };
      }
      
      return { success: false, error: 'Establishment not found' };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { success: false, error: error.message };
    }
  }

  async getAdPerformance(adId) {
    try {
      const docRef = doc(db, 'ads', adId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        const ctr = data.impressions > 0 ? (data.clicks / data.impressions * 100).toFixed(2) : 0;
        
        return {
          success: true,
          performance: {
            impressions: data.impressions || 0,
            clicks: data.clicks || 0,
            ctr: `${ctr}%`,
            lastImpression: data.lastImpression,
            lastClick: data.lastClick
          }
        };
      }
      
      return { success: false, error: 'Ad not found' };
    } catch (error) {
      console.error('Error fetching ad performance:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new FirebaseAdminService();