FROM node:20.19.5-alpine

WORKDIR /app

# Копируем package.json если есть зависимости
COPY package*.json ./

# Устанавливаем зависимости (если есть)
RUN npm ci --only=production 

COPY index.js .

COPY public/ ./public/

EXPOSE 5011

CMD ["node", "index.js"]