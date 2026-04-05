FROM node:22-alpine3.22 AS base

WORKDIR /app
COPY . .
RUN npm ci --omit=dev

RUN chmod +x /app/docker/entrypoint.sh

ENTRYPOINT ["/app/docker/entrypoint.sh"]
