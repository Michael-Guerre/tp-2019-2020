FROM node:10

RUN npm install -g sails nodemon knex
RUN npm install kue
RUN npm install nodemailer

WORKDIR /app
EXPOSE 1337

CMD nodemon --watch . sails lift
