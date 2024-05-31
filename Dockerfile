# stage 1
FROM docker.io/node:lts AS packing-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2
FROM docker.io/nginx:lts
COPY --from=packing-app-build /app/dist/packing-app /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80