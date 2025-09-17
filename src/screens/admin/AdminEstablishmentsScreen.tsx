// src/screens/admin/AdminEstablishmentsScreen.tsx
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { createEstablishment, establishmentCategories } from '../../data/establishmentsStructure';
import FirebaseAdminService from '../../services/firebaseAdminService';

export default function AdminEstablishmentsScreen() {
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEstablishment, setEditingEstablishment] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: establishmentCategories.RESTAURANT,
    description: '',
    address: '',
    zone: '',
    phone: '',
    whatsapp: '',
    commissionRate: '0.22',
    features: '',
    priceRange: '',
    selectedImage: null
  });

  useEffect(() => {
    loadEstablishments();
  }, []);

  const loadEstablishments = async () => {
    setLoading(true);
    try {
      const result = await FirebaseAdminService.getAllEstablishments();
      if (result.success) {
        setEstablishments(result.data);
      } else {
        Alert.alert('Error', 'No se pudieron cargar los establecimientos');
      }
    } catch (error) {
      console.error('Error loading establishments:', error);
      Alert.alert('Error', 'Error al cargar establecimientos');
    }
    setLoading(false);
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permiso requerido', 'Se necesita acceso a la galería para subir fotos');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled) {
        setFormData(prev => ({
          ...prev,
          selectedImage: result.assets[0]
        }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Error al seleccionar imagen');
    }
  };

  const generateEstablishmentId = (name, category) => {
    const categoryPrefix = {
      [establishmentCategories.RESTAURANT]: 'rest',
      [establishmentCategories.BAR]: 'bar',
      [establishmentCategories.CAFE]: 'cafe',
      [establishmentCategories.ROOFTOP]: 'roof',
      [establishmentCategories.CLUB]: 'club',
      [establishmentCategories.LOUNGE]: 'lounge'
    };

    const prefix = categoryPrefix[category] || 'est';
    const suffix = name.toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .substring(0, 15);
    const number = String(establishments.length + 1).padStart(3, '0');
    
    return `${prefix}_${number}_${suffix}`;
  };

  const saveEstablishment = async () => {
    try {
      // Validaciones
      if (!formData.name.trim()) {
        Alert.alert('Error', 'El nombre es requerido');
        return;
      }
      if (!formData.address.trim()) {
        Alert.alert('Error', 'La dirección es requerida');
        return;
      }
      if (!formData.selectedImage && !editingEstablishment) {
        Alert.alert('Error', 'Se requiere una imagen');
        return;
      }

      setLoading(true);

      let imageUrl = editingEstablishment?.images?.main || '';
      
      // Subir imagen si se seleccionó una nueva
      if (formData.selectedImage) {
        // Convertir la imagen a blob para subir
        const response = await fetch(formData.selectedImage.uri);
        const blob = await response.blob();
        
        const imageFile = new File([blob], `${formData.name.replace(/\s+/g, '_')}.jpg`, {
          type: 'image/jpeg'
        });

        const uploadResult = await FirebaseAdminService.uploadImage(imageFile, 'establishments');
        
        if (uploadResult.success) {
          imageUrl = uploadResult.url;
        } else {
          Alert.alert('Error', 'Error al subir la imagen');
          setLoading(false);
          return;
        }
      }

      const establishmentId = editingEstablishment ? 
        editingEstablishment.id : 
        generateEstablishmentId(formData.name, formData.category);

      const establishmentData = createEstablishment({
        id: establishmentId,
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim(),
        images: {
          main: imageUrl,
          gallery: []
        },
        location: {
          address: formData.address.trim(),
          zone: formData.zone.trim(),
          city: 'Guatemala',
          coordinates: { lat: 0, lng: 0 },
          nearbyClubs: []
        },
        contact: {
          phone: formData.phone.trim(),
          whatsapp: formData.whatsapp.trim() || formData.phone.trim(),
          email: '',
          website: '',
          instagram: '',
          facebook: ''
        },
        businessInfo: {
          priceRange: formData.priceRange.trim(),
          parking: true,
          wifi: true,
          outdoor: false
        },
        padelLifestyleInfo: {
          partnershipType: 'commission',
          commissionRate: parseFloat(formData.commissionRate),
          verified: false,
          totalVisits: 0,
          totalRevenue: 0,
          specialOffers: []
        },
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
        active: true
      });

      let result;
      if (editingEstablishment) {
        result = await FirebaseAdminService.updateEstablishment(establishmentId, establishmentData);
      } else {
        result = await FirebaseAdminService.createEstablishment(establishmentData);
      }

      if (result.success) {
        Alert.alert(
          'Éxito', 
          `Establecimiento ${editingEstablishment ? 'actualizado' : 'creado'} exitosamente`,
          [{ text: 'OK', onPress: () => {
            resetForm();
            setShowAddModal(false);
            loadEstablishments();
          }}]
        );
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      console.error('Error saving establishment:', error);
      Alert.alert('Error', 'Error al guardar establecimiento');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: establishmentCategories.RESTAURANT,
      description: '',
      address: '',
      zone: '',
      phone: '',
      whatsapp: '',
      commissionRate: '0.22',
      features: '',
      priceRange: '',
      selectedImage: null
    });
    setEditingEstablishment(null);
  };

  const editEstablishment = (establishment) => {
    setEditingEstablishment(establishment);
    setFormData({
      name: establishment.name || '',
      category: establishment.category || establishmentCategories.RESTAURANT,
      description: establishment.description || '',
      address: establishment.location?.address || '',
      zone: establishment.location?.zone || '',
      phone: establishment.contact?.phone || '',
      whatsapp: establishment.contact?.whatsapp || '',
      commissionRate: String(establishment.padelLifestyleInfo?.commissionRate || 0.22),
      features: establishment.features?.join(', ') || '',
      priceRange: establishment.businessInfo?.priceRange || '',
      selectedImage: null
    });
    setShowAddModal(true);
  };

  const CategoryPicker = () => {
    const categories = [
      { label: 'Restaurante', value: establishmentCategories.RESTAURANT },
      { label: 'Bar', value: establishmentCategories.BAR },
      { label: 'Café', value: establishmentCategories.CAFE },
      { label: 'Rooftop', value: establishmentCategories.ROOFTOP },
      { label: 'Club', value: establishmentCategories.CLUB },
      { label: 'Lounge', value: establishmentCategories.LOUNGE }
    ];

    return (
      <View style={styles.pickerContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.value}
            style={[
              styles.categoryButton,
              formData.category === cat.value && styles.selectedCategoryButton
            ]}
            onPress={() => setFormData(prev => ({ ...prev, category: cat.value }))}
          >
            <Text style={[
              styles.categoryButtonText,
              formData.category === cat.value && styles.selectedCategoryButtonText
            ]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const EstablishmentCard = ({ establishment }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: establishment.images?.main || 'https://via.placeholder.com/300x150' }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{establishment.name}</Text>
        <Text style={styles.cardCategory}>{establishment.category}</Text>
        <Text style={styles.cardAddress}>{establishment.location?.address}</Text>
        <Text style={styles.cardStats}>
          {establishment.padelLifestyleInfo?.totalVisits || 0} visitas • 
          Q{establishment.padelLifestyleInfo?.totalRevenue || 0} generados
        </Text>
        <View style={styles.cardActions}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => editEstablishment(establishment)}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <View style={styles.qrContainer}>
            <Text style={styles.qrText}>QR: {establishment.padelLifestyleInfo?.qrCode}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Administrar Establecimientos</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            resetForm();
            setShowAddModal(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{establishments.length}</Text>
          <Text style={styles.statLabel}>Establecimientos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {establishments.reduce((sum, est) => sum + (est.padelLifestyleInfo?.totalVisits || 0), 0)}
          </Text>
          <Text style={styles.statLabel}>Visitas Totales</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            Q{establishments.reduce((sum, est) => sum + (est.padelLifestyleInfo?.totalRevenue || 0), 0)}
          </Text>
          <Text style={styles.statLabel}>Ingresos</Text>
        </View>
      </View>

      {/* Lista de establecimientos */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D4AF37" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {establishments.map((establishment) => (
            <EstablishmentCard 
              key={establishment.id} 
              establishment={establishment}
            />
          ))}
          {establishments.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay establecimientos registrados</Text>
              <Text style={styles.emptySubtext}>Toca el botón "Agregar" para empezar</Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* Modal para agregar/editar */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingEstablishment ? 'Editar' : 'Agregar'} Establecimiento
            </Text>
            <TouchableOpacity onPress={saveEstablishment} disabled={loading}>
              <Text style={[styles.saveButton, loading && styles.disabledButton]}>
                {loading ? 'Guardando...' : 'Guardar'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Imagen */}
            <View style={styles.imageSection}>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {formData.selectedImage || editingEstablishment?.images?.main ? (
                  <Image 
                    source={{ 
                      uri: formData.selectedImage?.uri || editingEstablishment?.images?.main 
                    }}
                    style={styles.selectedImage}
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>+ Agregar Foto</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Campos del formulario */}
            <View style={styles.formSection}>
              <Text style={styles.label}>Nombre *</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                placeholder="Nombre del establecimiento"
              />

              <Text style={styles.label}>Categoría *</Text>
              <CategoryPicker />

              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                placeholder="Descripción del establecimiento"
                multiline
                numberOfLines={3}
              />

              <Text style={styles.label}>Dirección *</Text>
              <TextInput
                style={styles.input}
                value={formData.address}
                onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
                placeholder="Dirección completa"
              />

              <Text style={styles.label}>Zona</Text>
              <TextInput
                style={styles.input}
                value={formData.zone}
                onChangeText={(text) => setFormData(prev => ({ ...prev, zone: text }))}
                placeholder="Zona 10, Zona 4, etc."
              />

              <Text style={styles.label}>Teléfono</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                placeholder="+502 2345-6789"
                keyboardType="phone-pad"
              />

              <Text style={styles.label}>WhatsApp</Text>
              <TextInput
                style={styles.input}
                value={formData.whatsapp}
                onChangeText={(text) => setFormData(prev => ({ ...prev, whatsapp: text }))}
                placeholder="+502 2345-6789"
                keyboardType="phone-pad"
              />

              <Text style={styles.label}>Tasa de Comisión (ejemplo: 0.22 para 22%)</Text>
              <TextInput
                style={styles.input}
                value={formData.commissionRate}
                onChangeText={(text) => setFormData(prev => ({ ...prev, commissionRate: text }))}
                placeholder="0.22"
                keyboardType="numeric"
              />

              <Text style={styles.label}>Rango de Precios</Text>
              <TextInput
                style={styles.input}
                value={formData.priceRange}
                onChangeText={(text) => setFormData(prev => ({ ...prev, priceRange: text }))}
                placeholder="Q100-300"
              />

              <Text style={styles.label}>Características (separadas por comas)</Text>
              <TextInput
                style={styles.input}
                value={formData.features}
                onChangeText={(text) => setFormData(prev => ({ ...prev, features: text }))}
                placeholder="terraza, música en vivo, cockteles premium"
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardCategory: {
    fontSize: 14,
    color: '#D4AF37',
    marginBottom: 5,
  },
  cardAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cardStats: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  qrContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  qrText: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'monospace',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    color: '#ff3b30',
    fontSize: 16,
  },
  saveButton: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  formSection: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  // Category picker styles
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCategoryButton: {
    backgroundColor: '#D4AF37',
  },
  categoryButtonText: {
    color: '#666',
    fontSize: 14,
  },
  selectedCategoryButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});