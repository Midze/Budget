FROM node:14.18-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

ENV NODE_PATH=/node_modules

ENV PATH=$PATH:/node_modules/.bin

RUN npm install

ADD . /app

RUN npm run build

FROM nginx:1.21.4-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
