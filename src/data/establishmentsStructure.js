// src/data/establishmentsStructure.js
// Estructura base para los establecimientos en Firebase

export const establishmentCategories = {
  RESTAURANT: 'restaurante',
  BAR: 'bar',
  CAFE: 'cafe',
  ROOFTOP: 'rooftop',
  CLUB: 'club',
  LOUNGE: 'lounge'
};

// Plantilla para crear establecimientos
export const establishmentTemplate = {
  id: '', // rest_001, bar_002, etc.
  name: '',
  category: '', // usar establishmentCategories
  description: '',
  images: {
    main: '', // imagen principal de fachada
    gallery: [] // array de imágenes adicionales
  },
  location: {
    address: '',
    city: 'Guatemala',
    zone: '', // Zona 10, Zona 4, etc.
    coordinates: {
      lat: 0,
      lng: 0
    },
    googlePlaceId: '', // opcional
    nearbyClubs: [] // IDs de clubes de padel cercanos
  },
  contact: {
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    instagram: '',
    facebook: ''
  },
  businessInfo: {
    hours: {
      monday: { open: '12:00', close: '22:00', closed: false },
      tuesday: { open: '12:00', close: '22:00', closed: false },
      wednesday: { open: '12:00', close: '22:00', closed: false },
      thursday: { open: '12:00', close: '22:00', closed: false },
      friday: { open: '12:00', close: '24:00', closed: false },
      saturday: { open: '12:00', close: '24:00', closed: false },
      sunday: { open: '12:00', close: '22:00', closed: false }
    },
    priceRange: 'Q100-300', // rango de precios promedio
    capacity: 0,
    parking: true,
    wifi: true,
    outdoor: false
  },
  padelLifestyleInfo: {
    partnershipType: 'commission', // commission, flat_rate, partnership
    commissionRate: 0.20, // 20-25%
    qrCode: '', // codigo QR unico para tracking
    specialOffers: [], // ofertas especiales para jugadores
    verified: false,
    joinDate: null,
    totalVisits: 0,
    totalRevenue: 0
  },
  features: [], // ["ambiente_relajado", "musica_en_vivo", "terraza", "cockteles_premium"]
  rating: {
    average: 0,
    totalReviews: 0,
    breakdown: {
      food: 0,
      service: 0,
      atmosphere: 0,
      value: 0
    }
  },
  tags: [], // para filtrado y búsqueda
  active: true,
  createdAt: null,
  updatedAt: null,
  createdBy: 'admin' // ID del usuario admin que lo creó
};

// Función helper para crear un establecimiento
export const createEstablishment = (data) => {
  const timestamp = new Date();
  return {
    ...establishmentTemplate,
    ...data,
    createdAt: timestamp,
    updatedAt: timestamp,
    qrCode: `PAD-EST-${data.id.toUpperCase()}`,
    id: data.id || `est_${Date.now()}`
  };
};

// Ejemplos de establecimientos basados en tus fotos
export const sampleEstablishments = [
  {
    id: 'rest_001',
    name: 'La Terraza Premium',
    category: establishmentCategories.RESTAURANT,
    description: 'Ambiente relajado con vista panorámica, ideal para after padel',
    images: {
      main: 'rest_001_la_terraza.jpg',
      gallery: []
    },
    location: {
      address: 'Avenida Las Americas, Zona 10',
      zone: 'Zona 10',
      coordinates: { lat: 14.6118, lng: -90.5152 }
    },
    contact: {
      phone: '+502 2345-6789',
      whatsapp: '+502 2345-6789'
    },
    padelLifestyleInfo: {
      commissionRate: 0.22,
      specialOffers: [
        {
          title: '20% OFF para jugadores',
          description: 'Descuento especial presentando QR de Padel Lifestyle',
          validUntil: '2025-12-31'
        }
      ]
    },
    features: ['terraza', 'vista_panoramica', 'ambiente_relajado', 'cockteles'],
    tags: ['after_padel', 'cena', 'drinks', 'vista']
  },
  {
    id: 'bar_002',
    name: 'Cosmos Lounge',
    category: establishmentCategories.BAR,
    description: 'Bar moderno con ambiente nocturno y música selecta',
    images: {
      main: 'bar_002_cosmos.jpg',
      gallery: []
    },
    location: {
      address: 'Zona Rosa, Zona 10',
      zone: 'Zona 10',
      coordinates: { lat: 14.6100, lng: -90.5160 }
    },
    padelLifestyleInfo: {
      commissionRate: 0.25,
      specialOffers: [
        {
          title: '2x1 en cockteles',
          description: 'Happy hour extendido para jugadores de padel',
          validUntil: '2025-12-31'
        }
      ]
    },
    features: ['musica_en_vivo', 'cockteles_premium', 'ambiente_nocturno'],
    tags: ['drinks', 'nightlife', 'cockteles', 'musica']
  }
];

// Función para obtener establecimientos por categoría
export const getEstablishmentsByCategory = (establishments, category) => {
  return establishments.filter(est => est.category === category);
};

// Función para obtener establecimientos cercanos a un club
export const getNearbyEstablishments = (establishments, clubId, radiusKm = 5) => {
  return establishments.filter(est => 
    est.location.nearbyClubs.includes(clubId)
  );
};