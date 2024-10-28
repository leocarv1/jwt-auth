FROM node:latest

WORKDIR /jwt

COPY . . 

RUN npm install

CMD ["npm", "start"]

EXPOSE 3333