FROM node:20.19.5-alpine

WORKDIR /app

# Копируем package.json если есть зависимости
COPY package*.json ./

# Устанавливаем зависимости (если есть)
RUN apk add --no-cache ffmpeg

RUN npm i

COPY connetc-many.js .

EXPOSE 5012

CMD ["node", "connetc-many.js"]