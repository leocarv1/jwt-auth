FROM node:latest

WORKDIR /jwt

COPY . . 

RUN npm install
RUN cp .env.example .env

CMD ["npm", "start"]

EXPOSE 3333