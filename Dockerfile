# stage 1
FROM docker.io/node:lts AS packing-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2
FROM docker.io/nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=packing-app-build /app/dist/packing-app/browser /usr/share/nginx/html
EXPOSE 80