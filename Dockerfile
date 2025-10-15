FROM node:22-alpine3.22 AS base

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm prune --production

CMD ["npm", "run", "start:prod"]
