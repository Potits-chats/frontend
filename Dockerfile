# Stage 1
FROM node:18 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 4200
# Stage 2
FROM nginx:alpine
COPY --from=node /app/www /usr/share/nginx/html