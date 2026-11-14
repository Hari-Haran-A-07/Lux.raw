# Deployment Guide — Lux.raw

This document covers deployment to Vercel (primary), Docker (self-hosted), environment variable configuration, and a production launch checklist.

---

## Vercel Deployment (Recommended)

Lux.raw is optimized for Vercel's Next.js runtime.

### Quick Deploy

```bash
pnpm vercel --prod
```

### Environment Variables (Vercel Dashboard)

Set these in **Settings → Environment Variables** for Production:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (e.g., Neon, Supabase) |
| `NEXTAUTH_SECRET` | Random secret for NextAuth — generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Production URL (e.g., `https://luxraw.com`) |
| `REDIS_URL` | Redis connection URL for caching and sessions |
| `STRIPE_SECRET_KEY` | Stripe secret key for payment processing |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `ALGOLIA_APP_ID` | Algolia application ID for search |
| `ALGOLIA_ADMIN_API_KEY` | Algolia admin API key |
| `ALGOLIA_SEARCH_API_KEY` | Algolia public search-only key |
| `CLOUDINARY_URL` | Cloudinary URL for media management |
| `SENDGRID_API_KEY` | SendGrid key for transactional emails |
| `NEXT_PUBLIC_APP_URL` | Public base URL (included in client bundle) |

### Vercel Project Settings

- **Framework Preset:** Next.js
- **Build Command:** `pnpm build`
- **Output Directory:** `.next`
- **Install Command:** `pnpm install --frozen-lockfile`
- **Node Version:** 20.x

---

## Docker Deployment

For self-hosted deployments on AWS, GCP, or bare metal.

### Build the Image

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t luxraw:latest .
docker run -p 3000:3000 --env-file .env.production luxraw:latest
```

---

## Database Migrations

Always run migrations **before** swapping traffic to a new deployment:

```bash
pnpm prisma migrate deploy
```

---

## Production Checklist

### Pre-deployment
- [ ] All environment variables set in target environment
- [ ] `pnpm build` succeeds locally (no TypeScript or lint errors)
- [ ] Database migrations are tested against a staging database
- [ ] Stripe webhook endpoint updated to production URL
- [ ] Algolia index rebuilt and production keys rotated if needed
- [ ] `NEXTAUTH_URL` points to production domain

### Post-deployment
- [ ] Smoke test: homepage, product listing, product detail, cart, checkout
- [ ] Verify Stripe test mode is **disabled** and live keys are active
- [ ] Check Vercel/server logs for unhandled errors
- [ ] Confirm CDN cache headers on static assets (`Cache-Control: public, max-age=31536000, immutable`)
- [ ] Run Lighthouse audit — target score ≥ 90 on all metrics
- [ ] Verify Open Graph / Twitter card previews using [opengraph.xyz](https://www.opengraph.xyz/)

---

## Rollback Procedure

On Vercel, roll back to a previous deployment from the **Deployments** tab → click any previous deployment → **Promote to Production**.

For Docker, re-tag and restart the previous image:

```bash
docker tag luxraw:previous luxraw:latest
docker service update --image luxraw:latest luxraw_app
```
