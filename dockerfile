FROM node:20.11.0-slim

WORKDIR /app

COPY package* /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]