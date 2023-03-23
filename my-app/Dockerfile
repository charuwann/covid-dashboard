FROM node:10

WORKDIR /usr/src/app/my-app

COPY package*.json ./

RUN npm install
RUN npm install --save react-apexcharts apexcharts
RUN npm install react-dom react

EXPOSE 3000

CMD ["npm", "start"]