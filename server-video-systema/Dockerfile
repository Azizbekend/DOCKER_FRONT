FROM node:20.19.5-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache ffmpeg

RUN npm i

COPY src ./src/

EXPOSE 5012

CMD ["node", "src/server.js"]
