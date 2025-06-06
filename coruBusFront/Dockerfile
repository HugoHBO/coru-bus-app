# Etapa de build
FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build:prod || cat npm-debug.log

# Mostrar contenido de /app y las carpetas dist para verificar que se genera
RUN ls -l /app && ls -l /app/dist && ls -l /app/dist/coru-bus-front

# Etapa 2: Servir la app con Nginx
FROM nginx:alpine

# Copiar config personalizada de Nginx 
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Limpiar primero el contenido anterior
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos construidos de Angular
COPY --from=build /app/dist/coru-bus-front/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
