FROM node:lts
WORKDIR /app
COPY . .
COPY package*.json .
RUN npm install
RUN npm run build
CMD ["npm", "run", "preview"]
