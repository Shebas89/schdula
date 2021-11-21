FROM node:14-alpine

WORKDIR /src
COPY package*.json /src/
EXPOSE 3001
