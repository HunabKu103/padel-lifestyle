// app/whatsapp-login.tsx
import * as WebBrowser from 'expo-web-browser';
import { Button, Linking, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function WhatsAppLogin() {
  const openWhatsApp = () => {
    const phoneNumber = '+584126141456'; // Tu número
    const message = `
Hola, quiero unirme a Pádel & Lifestyle.
¿Cómo hago el pago por Pago Móvil?
Mi nombre es [Nombre], y mi número es [Número].
    `;

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    Linking.openURL(url).catch(() => {
      WebBrowser.openBrowserAsync(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      );
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#000' }}>
      <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center', marginBottom: 20 }}>
        Paga por Pago Móvil y únete a Pádel & Lifestyle
      </Text>
      <Button 
        title="Pagar por Pago Móvil" 
        color="#D4AF37" 
        onPress={openWhatsApp} 
      />
    </View>
  );
}