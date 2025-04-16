RadioItaliaCast Frontend

A sleek Angular app to stream live Italian radio stations from across the country — with station logos, modern UI, and Docker-ready deployment.

🚀 Features

Live streaming of multiple Italian radio stations

Modern UI with Bootstrap

Logos, play/pause buttons, responsive layout

Now Playing banner

Backend integration with Express API

Full Docker + Docker Compose setup

Ready for CI/CD and EC2 deployment

⚙️ Environment Configuration

In src/environments/environment.ts:
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};

In production (create environment.prod.ts):
export const environment = {
  production: true,
  apiUrl: 'http://13.58.141.188:3000/api'
};

🖥️ Local Development
npm install
ng serve

🐳 Dockerized Deployment

Dockerfile Highlights
Multi-stage build: Angular (Node 23 Alpine Slim)
Static file serving: Nginx 1.27.4 Alpine Slim

Build the Image
docker build -t radioitaliacast-frontend .

Run Locally
docker run -d -p 4200:80 radioitaliacast-frontend

📦 Docker Compose Setup
Works with the backend API to run both containers together:
docker-compose up -d

🧪 Future Enhancements

Station search/filter

Volume slider

Local favorites

Animated card UI

PWA support

📸 Preview

👉 Visit the live demo: http://13.58.141.188:4300

(Hosted on AWS EC2 with Docker)

👨‍💻 Author

Valerio Porcelli GitHub: @vpstackhub

🎯 This project is part of my Full Stack Developer journey — proudly coded, dockerized, and deployed from scratch!