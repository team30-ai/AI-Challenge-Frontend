FROM node:18-alpine

WORKDIR /app

COPY . .

# Add this line to ensure your env file is copied
COPY .env.production .env.production

# install dotenv-cli to load env vars for build 
RUN npm install -g dotenv-cli

RUN npm install --omit=dev

ENV NODE_ENV=production

# Next.js reads from .env.production automatically during build
RUN npm run build

CMD ["npm", "start"]
