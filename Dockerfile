FROM node:18-alpine

WORKDIR /app


COPY package*.json ./


RUN npm install --omit=dev


COPY . .

ENV NODE_ENV=production


RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
