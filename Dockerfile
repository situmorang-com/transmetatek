# ── Stage 1: Build ─────────────────────────────────────────────────────────────
FROM node:23-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
# Install all deps including devDependencies (needed for astro build + drizzle-kit)
RUN npm ci --include=dev

COPY . .

RUN npm run build

# ── Stage 2: Run ───────────────────────────────────────────────────────────────
FROM node:23-alpine AS runner

WORKDIR /app

# sqlite3 CLI for debugging inside the container
RUN apk add --no-cache sqlite

RUN mkdir -p /data

COPY --from=builder /app/dist         ./dist
COPY --from=builder /app/drizzle      ./drizzle
COPY --from=builder /app/migrate.mjs  ./migrate.mjs
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production
ENV DB_PATH=/data/applications.db

EXPOSE 4321

CMD ["sh", "-c", "node migrate.mjs && node dist/server/entry.mjs"]
