# Imagine de bază
FROM node:20

# Directorul de lucru în container
WORKDIR /app

# Copiază fișierele și instalează dependențele
COPY package*.json ./
RUN npm install

# Copiază tot proiectul
COPY . .

# Expune portul aplicației
EXPOSE 5000

# Rulează aplicația
CMD ["npm", "start"]
