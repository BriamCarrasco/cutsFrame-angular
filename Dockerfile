# Etapa 1: Instala dependencias
FROM node:18.17.1 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Etapa 2: Sirve la app con Nginx
FROM nginx:1.23.3 AS prod

EXPOSE 80

# Copia el build de Angular al directorio de Nginx
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Opcional: Copia tu archivo de configuración personalizado de Nginx
# COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
