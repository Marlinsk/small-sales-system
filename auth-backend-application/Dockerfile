FROM node:20.9.0-alpine3.17
WORKDIR /app
COPY package*.json ./ 
RUN npm install
COPY . .
RUN npm run build
RUN npm run prisma:generate
EXPOSE 8080
CMD ["npm", "start"]