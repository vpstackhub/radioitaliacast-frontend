# Stage 1: Build the Angular app
FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production --output-path=dist/radioitaliacast-frontend
# Stage 2: Serve with Nginx
FROM nginx:1.27.4-alpine-slim

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/radioitaliacast-frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



