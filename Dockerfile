# Usar imagen base oficial de Node.js
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar todo el código fuente
COPY . .

# Exponer puerto 8081 (puerto por defecto de Expo)
EXPOSE 8081

# Comando por defecto para iniciar la app
CMD [""npx"", ""expo"", ""start"", ""--offline""]
