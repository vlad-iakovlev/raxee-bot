FROM node:24-alpine AS base

WORKDIR /app
COPY . .
RUN npm ci --omit=dev

RUN chmod +x /app/docker/entrypoint.sh

ENTRYPOINT ["/app/docker/entrypoint.sh"]
