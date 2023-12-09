FROM node:19.6
WORKDIR /app
COPY package*.json ./ 
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8082
CMD ["npm", "start"]