FROM node:18.18.0

WORKDIR /app

COPY . .

RUN npm install

CMD ["node", "app.js"]