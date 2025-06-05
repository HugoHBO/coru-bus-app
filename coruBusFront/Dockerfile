# Etapa de build
FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build:prod

# Etapa 2: Servir la app con Nginx
FROM nginx:alpine

# Copiar config personalizada de Nginx (la creao en el paso siguiente)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos de Angular
COPY --from=build /app/dist/coru-bus-front /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
