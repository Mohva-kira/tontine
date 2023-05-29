# RUN
FROM node:latest AS build

ARG envType=staging

RUN echo ${envType}

RUN mkdir /app

WORKDIR /app

COPY ./ /app
RUN npm install


CMD ["npm", "start"]

