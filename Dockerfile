FROM node:18.17.1-alpine

WORKDIR /web-app

COPY package.json package-lock.json ./

RUN npm install

COPY . .
