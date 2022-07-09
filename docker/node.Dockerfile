FROM node:14

WORKDIR /var/www/granite/

COPY package.json . 
# COPY package-lock.json .

RUN touch test.txt

RUN cat package.json

RUN npm i

RUN npm install nodemon -g
# RUN npm install pm2 -g

RUN pwd

RUN ls -la

EXPOSE 3000
