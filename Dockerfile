FROM node:20-slim AS deps
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package.json server.js drizzle.config.ts start.sh ./
COPY database/schema.ts ./database/schema.ts

RUN chmod +x ./start.sh
EXPOSE 3000
CMD ["./start.sh"]