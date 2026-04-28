# ---- Base ----
FROM node:18-alpine AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci --no-audit --prefer-offline

# ---- Builder ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

RUN npm run build

# ---- Runner ----
FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Копируем node_modules. Теперь они не включают Prisma Client,
# что правильно, так как он будет сгенерирован ниже.
COPY --from=deps /app/node_modules ./node_modules

# Копируем Prisma схему (Обязательно для генерации!)
COPY prisma ./prisma

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000
ENV NODE_ENV=production

# 👇 КЛЮЧЕВАЯ ИСПРАВЛЕННАЯ ЧАСТЬ
# Генерируем Prisma Client ПЕРЕД запуском приложения.
CMD npx prisma generate && npm start