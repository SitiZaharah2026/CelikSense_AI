FROM node:20-alpine
WORKDIR /usr/src/app
COPY server.js ./server.js
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["node", "/usr/src/app/server.js"]
