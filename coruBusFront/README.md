# CoruBusFront

# Etapa 1: Build de la app Angular

FROM node:18-alpine AS build

# Crear directorio de trabajo

WORKDIR /app

# Copiar package.json y package-lock.json (o yarn.lock si usas yarn)

COPY coruBusFront/package\*.json ./

# Instalar dependencias

RUN npm install

# Copiar el resto del código

COPY coruBusFront/ .

# Build en modo producción

RUN npm run build -- --configuration production

# Etapa 2: Servir la app con un servidor web ligero (nginx)

FROM nginx:alpine

# Copiar los archivos estáticos del build al directorio que nginx sirve

COPY --from=build /app/dist/coru-bus-front /usr/share/nginx/html

# Copiar configuración personalizada de nginx (opcional)

# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto 80

EXPOSE 80

# Comando por defecto para ejecutar nginx en primer plano

CMD ["nginx", "-g", "daemon off;"]
