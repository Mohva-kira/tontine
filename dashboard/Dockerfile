# RUN
FROM node:latest AS build

ARG envType=staging

RUN echo ${envType}

RUN mkdir /dashboard

WORKDIR /dashboard

COPY ./ /dashboard
RUN npm install


CMD ["npm", "start"]

EXPOSE 3001
