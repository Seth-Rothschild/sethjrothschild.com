FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.23-alpine
COPY --from=build /app/build /app/build
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf