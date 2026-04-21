# Crewqa

Rigorous closed-testing for indie Android developers. Twelve verified testers,
four structured deliverables over fourteen days, one exportable report a Play
Console reviewer will respect.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind v4)
- **Prisma 7** + **Postgres 16** (Dockerised locally, Dockerised in prod)
- **Auth.js v5** (NextAuth) with Google + GitHub OAuth
- **Inngest** for the 14-day durable workflow
- **Stripe** (ingress payments + Stripe Identity)
- **Tremendous** (tester payouts)
- **Cloudflare R2** (screen recording storage)
- **Resend** (transactional email)
- **Anthropic Claude** (LLM-assisted QA triage)
- **GSAP** for motion (follows the in-repo `frontend-design` skill)

## Getting started

```bash
# 1. install deps
pnpm install

# 2. copy env template and fill in secrets
cp .env.example .env
#    - generate AUTH_SECRET:  openssl rand -base64 32
#    - fill AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET (console.cloud.google.com)
#    - fill AUTH_GITHUB_ID / AUTH_GITHUB_SECRET (github.com/settings/developers)

# 3. start local Postgres
pnpm db:up

# 4. sync Prisma schema to it
pnpm db:push

# 5. dev
pnpm dev
```

Open <http://localhost:3000>.

## Database

Local dev Postgres runs in Docker via `docker-compose.dev.yml`.

| Command | What it does |
|---|---|
| `pnpm db:up` | Start the local Postgres container (bound to `127.0.0.1:5435`) |
| `pnpm db:down` | Stop it (data volume persists) |
| `pnpm db:logs` | Tail Postgres logs |
| `pnpm db:push` | Sync schema to DB without a migration |
| `pnpm db:migrate` | Create + apply a migration |
| `pnpm db:studio` | Launch Prisma Studio |

Host port `5435` is used because `5432–5434` are taken by sibling projects on
this dev VM.

## Auth

OAuth-only, no passwords. On first sign-in, Auth.js creates a `User` row and
links it to a `Google` or `GitHub` `Account` via the Prisma adapter. JWT
session strategy — `src/proxy.ts` reads the JWT cookie to enforce the
protected route prefixes (`/app`, `/t`, `/admin`).

To add a new provider: add it to `src/auth.config.ts`, add the OAuth callback
URL at the provider's console (`<host>/api/auth/callback/<provider>`), fill
the corresponding env vars.

## Repo layout

```
src/
  app/
    (marketing)/   public site (/, /how-it-works, /pricing, /for-testers)
    (auth)/        login (Google + GitHub)
    (dev)/app/     developer dashboard (campaigns, billing)
    (tester)/t/    tester mobile webapp (tasks, wallet)
    (admin)/admin/ internal QA queue
    api/
      auth/        Auth.js v5 handlers
      inngest/     Inngest handler
      stripe/      Stripe webhook
  components/
    marketing/     bespoke marketing components
  lib/
    db.ts          Prisma client
    auth.ts        Auth.js + session helpers (node)
    stripe.ts      Stripe client (lazy)
    resend.ts      Email client
    anthropic.ts   Claude client for QA
    inngest.ts     Inngest client
    pricing.ts     $ / slot / duration constants
    utils.ts       cn(), formatCurrency()
  server/
    actions/       server actions (DB writes)
    services/      domain logic
    inngest/       durable workflow functions
  auth.config.ts   edge-safe Auth.js config (used by proxy)
  proxy.ts         Auth.js-backed route guard
  types/           global type augmentations
prisma/
  schema.prisma    source-of-truth data model
docker-compose.dev.yml    Local Postgres for development
.claude/
  skills/frontend-design/  design tokens + patterns
```

## Design

All visual work must follow `.claude/skills/frontend-design/`. Core rules:

- Navy `#1e3a5f` hero backgrounds, teal `#14b8a6` CTAs, amber `#f59e0b` focus
- Sharp corners on cards. Buttons/inputs get `rounded` (4px), nothing more.
- DM Sans display, Inter body
- GSAP scroll reveals with `.gsap-reveal` / `.gsap-feature` elements

## Running on the Hetzner dev VM

The dev server binds to `0.0.0.0:3333` so it is reachable from outside the VM.

```bash
pnpm dev -H 0.0.0.0 -p 3333
```

**Before you can hit it from your laptop**, open port `3333/tcp` in both the
Hetzner Cloud Firewall *and* the on-host `ufw`.

```bash
sudo ufw allow 3333/tcp
```

Hetzner web console rule: inbound TCP port `3333`, source `0.0.0.0/0, ::/0`
(or a narrower CIDR while testing).

Once open: <http://89.167.43.92:3333>.

## Production deployment

Crewqa deploys alongside BotView on a shared Hetzner box. Runbook:

> [`DEPLOY-ON-BOTVIEW-SERVER.md`](../sun/DEPLOY-ON-BOTVIEW-SERVER.md)

Key rules from that doc:

- Caddy already owns 80/443 — we reverse-proxy through it.
- We bring our own Postgres container — never share BotView's.
- Project files live under `/opt/crewqa/` on prod.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run production build |
| `pnpm lint` | ESLint |
| `pnpm db:up` / `db:down` / `db:logs` | Manage local Postgres container |
| `pnpm db:generate` | Regenerate Prisma client |
| `pnpm db:migrate` | Create + apply a migration (dev) |
| `pnpm db:push` | Sync schema without migration |
| `pnpm db:studio` | Launch Prisma Studio |

## Status

Sprint 2 in progress: auth pivot to Auth.js, local Postgres, campaign creation
flow wired to Stripe Checkout. Inngest 14-day workflow + tester UI + admin QA
queue next.
