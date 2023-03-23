FROM node:10

WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm install
RUN npm install cors
RUN npm install request

EXPOSE 3080

CMD ["npm", "run", "dev"]