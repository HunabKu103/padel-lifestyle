// src/services/qrTrackingService.js
// Sistema para trackear visitas y comisiones mediante QR

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

class QRTrackingService {

  // GENERAR QR CODES
  generateUserQR(userId, userIdNumber) {
    return `PAD-USER-${userIdNumber}`;
  }

  generateEstablishmentQR(establishmentId) {
    return `PAD-EST-${establishmentId.toUpperCase()}`;
  }

  generateEventQR(eventId) {
    return `PAD-EVENT-${eventId.toUpperCase()}`;
  }

  // CHECK-IN: Usuario llega al establecimiento
  async checkInUser(userQR, establishmentQR, additionalData = {}) {
    try {
      const checkInData = {
        userQR: userQR,
        establishmentQR: establishmentQR,
        establishmentId: establishmentQR.replace('PAD-EST-', '').toLowerCase(),
        userId: userQR.replace('PAD-USER-', ''),
        checkInTime: new Date(),
        checkOutTime: null,
        totalSpent: 0,
        commission: 0,
        commissionRate: 0.22, // default 22%
        status: 'checked_in',
        metadata: {
          device: additionalData.device || 'mobile',
          location: additionalData.location || null,
          referralSource: additionalData.source || 'app'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Crear el registro de visita
      const docRef = await addDoc(collection(db, 'visits'), checkInData);
      
      // Actualizar stats del establecimiento
      await this.updateEstablishmentStats(checkInData.establishmentId, 'visit');
      
      return { 
        success: true, 
        visitId: docRef.id,
        message: 'Check-in registrado exitosamente' 
      };
    } catch (error) {
      console.error('Error en check-in:', error);
      return { success: false, error: error.message };
    }
  }

  // CHECK-OUT: Usuario paga y sale del establecimiento
  async checkOutUser(visitId, totalAmount, receiptData = {}) {
    try {
      const visitRef = doc(db, 'visits', visitId);
      const visitDoc = await getDoc(visitRef);

      if (!visitDoc.exists()) {
        return { success: false, error: 'Visita no encontrada' };
      }

      const visitData = visitDoc.data();
      
      // Obtener info del establecimiento para commission rate
      const establishmentRef = doc(db, 'establishments', visitData.establishmentId);
      const establishmentDoc = await getDoc(establishmentRef);
      
      let commissionRate = 0.22; // default
      if (establishmentDoc.exists()) {
        commissionRate = establishmentDoc.data().padelLifestyleInfo?.commissionRate || 0.22;
      }

      const commission = totalAmount * commissionRate;
      
      const updateData = {
        checkOutTime: new Date(),
        totalSpent: totalAmount,
        commission: commission,
        commissionRate: commissionRate,
        status: 'completed',
        receiptInfo: {
          receiptNumber: receiptData.receiptNumber || null,
          items: receiptData.items || [],
          tax: receiptData.tax || 0,
          tip: receiptData.tip || 0
        },
        updatedAt: new Date()
      };

      await updateDoc(visitRef, updateData);
      
      // Actualizar stats del establecimiento
      await this.updateEstablishmentStats(visitData.establishmentId, 'revenue', {
        amount: totalAmount,
        commission: commission
      });

      // Actualizar gamificación del usuario
      await this.updateUserGamification(visitData.userId, {
        visitCompleted: true,
        amountSpent: totalAmount,
        establishmentCategory: establishmentDoc.data()?.category || 'restaurant'
      });

      return { 
        success: true, 
        commission: commission,
        message: `Check-out completado. Comisión: Q${commission.toFixed(2)}` 
      };
    } catch (error) {
      console.error('Error en check-out:', error);
      return { success: false, error: error.message };
    }
  }

  // BUSCAR VISITA ACTIVA POR QR DE USUARIO
  async findActiveVisit(userQR, establishmentQR) {
    try {
      const q = query(
        collection(db, 'visits'),
        where('userQR', '==', userQR),
        where('establishmentQR', '==', establishmentQR),
        where('status', '==', 'checked_in'),
        orderBy('checkInTime', 'desc'),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return { success: false, error: 'No hay visita activa' };
      }

      const visitDoc = querySnapshot.docs[0];
      return { 
        success: true, 
        visit: { id: visitDoc.id, ...visitDoc.data() }
      };
    } catch (error) {
      console.error('Error buscando visita activa:', error);
      return { success: false, error: error.message };
    }
  }

  // ACTUALIZAR ESTADÍSTICAS DEL ESTABLECIMIENTO
  async updateEstablishmentStats(establishmentId, type, data = {}) {
    try {
      const establishmentRef = doc(db, 'establishments', establishmentId);
      const establishmentDoc = await getDoc(establishmentRef);

      if (!establishmentDoc.exists()) {
        return { success: false, error: 'Establecimiento no encontrado' };
      }

      const currentData = establishmentDoc.data();
      const currentStats = currentData.padelLifestyleInfo || {};

      let updateData = {};

      if (type === 'visit') {
        updateData = {
          'padelLifestyleInfo.totalVisits': (currentStats.totalVisits || 0) + 1,
          'padelLifestyleInfo.lastVisit': new Date(),
          updatedAt: new Date()
        };
      } else if (type === 'revenue') {
        updateData = {
          'padelLifestyleInfo.totalRevenue': (currentStats.totalRevenue || 0) + data.amount,
          'padelLifestyleInfo.totalCommission': (currentStats.totalCommission || 0) + data.commission,
          'padelLifestyleInfo.lastSale': new Date(),
          updatedAt: new Date()
        };
      }

      await updateDoc(establishmentRef, updateData);
      return { success: true };
    } catch (error) {
      console.error('Error actualizando stats:', error);
      return { success: false, error: error.message };
    }
  }

  // GAMIFICACIÓN DEL USUARIO
  async updateUserGamification(userId, activityData) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return { success: false, error: 'Usuario no encontrado' };
      }

      const currentData = userDoc.data();
      const currentGamification = currentData.gamification || {
        points: 0,
        level: 1,
        badges: [],
        totalVisits: 0,
        totalSpent: 0,
        achievements: []
      };

      let pointsEarned = 0;
      let newBadges = [];
      let newAchievements = [];

      if (activityData.visitCompleted) {
        pointsEarned += 10; // 10 puntos por visita completada
        
        // Puntos extra por amount spent
        pointsEarned += Math.floor(activityData.amountSpent / 50); // 1 punto por cada Q50 gastados

        // Check for new badges
        const newTotalVisits = currentGamification.totalVisits + 1;
        const newTotalSpent = currentGamification.totalSpent + activityData.amountSpent;

        // Badge por visitas
        if (newTotalVisits === 5 && !currentGamification.badges.includes('first_explorer')) {
          newBadges.push('first_explorer');
        }
        if (newTotalVisits === 25 && !currentGamification.badges.includes('regular_visitor')) {
          newBadges.push('regular_visitor');
        }
        if (newTotalVisits === 100 && !currentGamification.badges.includes('super_explorer')) {
          newBadges.push('super_explorer');
        }

        // Badge por spending
        if (newTotalSpent >= 1000 && !currentGamification.badges.includes('big_spender')) {
          newBadges.push('big_spender');
        }

        // Badge por categoría específica
        const categoryKey = `${activityData.establishmentCategory}_lover`;
        const categoryVisits = currentGamification.categoryVisits?.[activityData.establishmentCategory] || 0;
        if (categoryVisits + 1 >= 10 && !currentGamification.badges.includes(categoryKey)) {
          newBadges.push(categoryKey);
        }
      }

      const newLevel = Math.floor((currentGamification.points + pointsEarned) / 100) + 1;
      const leveledUp = newLevel > currentGamification.level;

      const updateData = {
        'gamification.points': currentGamification.points + pointsEarned,
        'gamification.level': newLevel,
        'gamification.badges': [...currentGamification.badges, ...newBadges],
        'gamification.totalVisits': (currentGamification.totalVisits || 0) + 1,
        'gamification.totalSpent': (currentGamification.totalSpent || 0) + activityData.amountSpent,
        'gamification.lastActivity': new Date(),
        [`gamification.categoryVisits.${activityData.establishmentCategory}`]: 
          ((currentGamification.categoryVisits?.[activityData.establishmentCategory]) || 0) + 1,
        updatedAt: new Date()
      };

      if (leveledUp) {
        updateData['gamification.achievements'] = [
          ...currentGamification.achievements,
          {
            type: 'level_up',
            level: newLevel,
            date: new Date(),
            description: `¡Has alcanzado el nivel ${newLevel}!`
          }
        ];
      }

      await updateDoc(userRef, updateData);

      return { 
        success: true, 
        pointsEarned,
        newBadges,
        leveledUp,
        newLevel: leveledUp ? newLevel : null
      };
    } catch (error) {
      console.error('Error actualizando gamificación:', error);
      return { success: false, error: error.message };
    }
  }

  // OBTENER REPORTES PARA ESTABLECIMIENTO
  async getEstablishmentReport(establishmentId, startDate, endDate) {
    try {
      const q = query(
        collection(db, 'visits'),
        where('establishmentId', '==', establishmentId),
        where('checkInTime', '>=', startDate),
        where('checkInTime', '<=', endDate),
        where('status', '==', 'completed'),
        orderBy('checkInTime', 'desc')
      );

      const querySnapshot = await getDocs(q);
      
      let totalVisits = 0;
      let totalRevenue = 0;
      let totalCommission = 0;
      let averageSpent = 0;
      const visits = [];

      querySnapshot.forEach((doc) => {
        const visitData = doc.data();
        visits.push({ id: doc.id, ...visitData });
        totalVisits++;
        totalRevenue += visitData.totalSpent || 0;
        totalCommission += visitData.commission || 0;
      });

      averageSpent = totalVisits > 0 ? totalRevenue / totalVisits : 0;

      return {
        success: true,
        report: {
          period: { startDate, endDate },
          totalVisits,
          totalRevenue,
          totalCommission,
          averageSpent: Math.round(averageSpent * 100) / 100,
          visits
        }
      };
    } catch (error) {
      console.error('Error generando reporte:', error);
      return { success: false, error: error.message };
    }
  }

  // OBTENER REPORTES GENERALES (TODOS LOS ESTABLECIMIENTOS)
  async getGeneralReport(startDate, endDate) {
    try {
      const q = query(
        collection(db, 'visits'),
        where('checkInTime', '>=', startDate),
        where('checkInTime', '<=', endDate),
        where('status', '==', 'completed'),
        orderBy('checkInTime', 'desc')
      );

      const querySnapshot = await getDocs(q);
      
      let totalVisits = 0;
      let totalRevenue = 0;
      let totalCommission = 0;
      const establishmentStats = {};
      const userStats = {};

      querySnapshot.forEach((doc) => {
        const visitData = doc.data();
        
        totalVisits++;
        totalRevenue += visitData.totalSpent || 0;
        totalCommission += visitData.commission || 0;

        // Stats por establecimiento
        const estId = visitData.establishmentId;
        if (!establishmentStats[estId]) {
          establishmentStats[estId] = {
            visits: 0,
            revenue: 0,
            commission: 0
          };
        }
        establishmentStats[estId].visits++;
        establishmentStats[estId].revenue += visitData.totalSpent || 0;
        establishmentStats[estId].commission += visitData.commission || 0;

        // Stats por usuario
        const userId = visitData.userId;
        if (!userStats[userId]) {
          userStats[userId] = {
            visits: 0,
            spent: 0
          };
        }
        userStats[userId].visits++;
        userStats[userId].spent += visitData.totalSpent || 0;
      });

      return {
        success: true,
        report: {
          period: { startDate, endDate },
          totals: {
            visits: totalVisits,
            revenue: totalRevenue,
            commission: totalCommission,
            averagePerVisit: totalVisits > 0 ? Math.round((totalRevenue / totalVisits) * 100) / 100 : 0
          },
          topEstablishments: Object.entries(establishmentStats)
            .map(([id, stats]) => ({ establishmentId: id, ...stats }))
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 10),
          topUsers: Object.entries(userStats)
            .map(([id, stats]) => ({ userId: id, ...stats }))
            .sort((a, b) => b.spent - a.spent)
            .slice(0, 10)
        }
      };
    } catch (error) {
      console.error('Error generando reporte general:', error);
      return { success: false, error: error.message };
    }
  }

  // VALIDAR QR CODE
  async validateQRCode(qrCode) {
    try {
      if (qrCode.startsWith('PAD-USER-')) {
        const userIdNumber = qrCode.replace('PAD-USER-', '');
        const q = query(
          collection(db, 'users'),
          where('userIdNumber', '==', parseInt(userIdNumber)),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          return {
            success: true,
            type: 'user',
            data: {
              id: querySnapshot.docs[0].id,
              name: userData.name,
              level: userData.level,
              verified: userData.verified || false
            }
          };
        }
      } else if (qrCode.startsWith('PAD-EST-')) {
        const establishmentId = qrCode.replace('PAD-EST-', '').toLowerCase();
        const docRef = doc(db, 'establishments', establishmentId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const estData = docSnap.data();
          return {
            success: true,
            type: 'establishment',
            data: {
              id: docSnap.id,
              name: estData.name,
              category: estData.category,
              active: estData.active || false
            }
          };
        }
      } else if (qrCode.startsWith('PAD-EVENT-')) {
        const eventId = qrCode.replace('PAD-EVENT-', '').toLowerCase();
        const docRef = doc(db, 'events', eventId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const eventData = docSnap.data();
          return {
            success: true,
            type: 'event',
            data: {
              id: docSnap.id,
              title: eventData.title,
              date: eventData.date,
              active: eventData.active || false
            }
          };
        }
      }

      return { success: false, error: 'QR Code no válido o no encontrado' };
    } catch (error) {
      console.error('Error validando QR:', error);
      return { success: false, error: error.message };
    }
  }

  // OBTENER VISITAS DE UN USUARIO
  async getUserVisits(userId, limit = 20) {
    try {
      const q = query(
        collection(db, 'visits'),
        where('userId', '==', userId),
        orderBy('checkInTime', 'desc'),
        limit(limit)
      );

      const querySnapshot = await getDocs(q);
      const visits = [];

      for (const doc of querySnapshot.docs) {
        const visitData = doc.data();
        
        // Obtener info del establecimiento
        const estRef = doc(db, 'establishments', visitData.establishmentId);
        const estSnap = await getDoc(estRef);
        
        visits.push({
          id: doc.id,
          ...visitData,
          establishment: estSnap.exists() ? {
            name: estSnap.data().name,
            category: estSnap.data().category
          } : null
        });
      }

      return { success: true, visits };
    } catch (error) {
      console.error('Error obteniendo visitas del usuario:', error);
      return { success: false, error: error.message };
    }
  }

  // GAMIFICATION BADGES DEFINITIONS
  getBadgeInfo(badgeKey) {
    const badges = {
      first_explorer: {
        name: 'Primer Explorador',
        description: 'Completa tu primera visita',
        icon: '🏃‍♂️',
        requirement: '1 visita'
      },
      regular_visitor: {
        name: 'Visitante Regular', 
        description: 'Completa 25 visitas',
        icon: '⭐',
        requirement: '25 visitas'
      },
      super_explorer: {
        name: 'Super Explorador',
        description: 'Completa 100 visitas',
        icon: '🏆',
        requirement: '100 visitas'
      },
      big_spender: {
        name: 'Gran Gastador',
        description: 'Gasta más de Q1,000 en total',
        icon: '💎',
        requirement: 'Q1,000 gastados'
      },
      restaurant_lover: {
        name: 'Amante de Restaurantes',
        description: 'Visita 10 restaurantes diferentes',
        icon: '🍽️',
        requirement: '10 restaurantes'
      },
      bar_lover: {
        name: 'Conocedor de Bares',
        description: 'Visita 10 bares diferentes', 
        icon: '🍻',
        requirement: '10 bares'
      },
      cafe_lover: {
        name: 'Adicto al Café',
        description: 'Visita 10 cafeterías diferentes',
        icon: '☕',
        requirement: '10 cafeterías'
      },
      rooftop_lover: {
        name: 'Rey de las Azoteas',
        description: 'Visita 10 rooftops diferentes',
        icon: '🌃',
        requirement: '10 rooftops'
      }
    };

    return badges[badgeKey] || {
      name: 'Badge Desconocido',
      description: 'Badge especial',
      icon: '🏅',
      requirement: 'Requisito especial'
    };
  }
}

export default new QRTrackingService();