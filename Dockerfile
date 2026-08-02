FROM node:24-alpine AS base

RUN apk add --no-cache bash

WORKDIR /app
COPY . .
RUN npm ci --omit=dev

RUN chmod +x /app/docker/entrypoint.sh

ENTRYPOINT ["/app/docker/entrypoint.sh"]
