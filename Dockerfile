# stage 1
FROM docker.io/node:alpine AS packing-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2
FROM docker.io/nginx:alpine
COPY --from=packing-app-build /app/dist/packing-app /usr/share/nginx/html
EXPOSE 80