FROM node:16 AS build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/.deploy/production/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
