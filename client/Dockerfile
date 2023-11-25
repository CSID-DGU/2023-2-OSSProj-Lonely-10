FROM node:21.1.0-alpine3.18 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lcokfile
COPY . .
RUN yarn build

FROM node:21.1.0-alpine3.18
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]