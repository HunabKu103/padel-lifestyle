# Pádel & Life Style

Aplicación móvil para la comunidad de pádel en Venezuela.

## ?? Tecnologías

- React Native + Expo
- TypeScript
- Firebase (Auth, Firestore)
- Node.js v18

## ?? Docker

### Construir imagen:
\\\ash
docker build -t padel-lifestyle .
\\\

### Ejecutar contenedor:
\\\ash
docker run -p 8081:8081 padel-lifestyle
\\\

## ?? Desarrollo Local

### Instalar dependencias:
\\\ash
npm install
\\\

### Ejecutar en modo desarrollo:
\\\ash
npx expo start --offline
\\\

## ?? Estructura

\\\
padel-lifestyle/
+-- app/              # Pantallas y navegación
+-- src/              # Componentes y lógica
+-- assets/           # Imágenes e íconos
+-- firebaseConfig.js # Configuración de Firebase
+-- ...
\\\

## ????? Equipo

Desarrollado por Nelson para la comunidad Pádel & Life Style.
