# See https://github.com/nodejs/docker-node/issues/2175
FROM node:18-alpine3.20 AS base

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm prune --production

CMD npm run start:prod
