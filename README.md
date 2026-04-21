# Crewqa

Rigorous closed-testing for indie Android developers. Twelve verified testers,
four structured deliverables over fourteen days, one exportable report a Play
Console reviewer will respect.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind v4)
- **Prisma 7** + **Postgres** (Neon)
- **Supabase Auth** (email/password + magic link)
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

# 3. generate Prisma client
pnpm db:generate

# 4. push schema to your Postgres
pnpm db:push

# 5. dev
pnpm dev
```

Open <http://localhost:3000>.

## Repo layout

```
src/
  app/
    (marketing)/   public site (/, /how-it-works, /pricing, /for-testers)
    (auth)/        login, signup
    (dev)/app/     developer dashboard (campaigns, billing)
    (tester)/t/    tester mobile webapp (tasks, wallet)
    (admin)/admin/ internal QA queue
    api/
      inngest/     Inngest handler
  components/
    marketing/     bespoke marketing components
    ui/            shadcn-flavored primitives (customized)
  lib/
    db.ts          Prisma client
    supabase/      server + browser helpers
    stripe.ts      Stripe client
    resend.ts      Email client
    anthropic.ts   Claude client for QA
    inngest.ts     Inngest client
    utils.ts       cn(), formatCurrency()
  server/
    actions/       server actions (DB writes)
    services/      domain logic
    inngest/       durable workflow functions
prisma/
  schema.prisma    source-of-truth data model
.claude/
  skills/frontend-design/   design tokens + patterns
```

## Design

All visual work must follow `.claude/skills/frontend-design/`. Core rules:

- Navy `#1e3a5f` hero backgrounds, teal `#14b8a6` CTAs, amber `#f59e0b` focus
- Sharp corners on cards. Buttons/inputs get `rounded` (4px), nothing more.
- DM Sans display, Inter body
- GSAP scroll reveals with `.gsap-reveal` / `.gsap-feature` elements

## Running on the Hetzner VM

The dev server is configured to bind to `0.0.0.0:3333` so it is reachable from
outside the VM.

```bash
pnpm dev -H 0.0.0.0 -p 3333
# or
pnpm dev  # defaults back to localhost:3000
```

**Before you can hit it from your laptop**, open port `3333/tcp` in the Hetzner
firewall.

### Option A — Hetzner Cloud Firewall (web console)

1. Hetzner Cloud → your project → *Firewalls* → the firewall attached to this
   VM.
2. Add an *inbound* rule:
   - Protocol: `TCP`
   - Port: `3333`
   - Source: your laptop IP (use a CIDR like `203.0.113.4/32`) or `0.0.0.0/0,
     ::/0` for anywhere (less safe — only while testing).
3. Save.

### Option B — Hetzner Cloud Firewall (hcloud CLI)

```bash
hcloud firewall add-rule <FIREWALL_NAME> \
  --direction in \
  --protocol tcp \
  --port 3333 \
  --source-ips 0.0.0.0/0 --source-ips ::/0
```

### Option C — on-host ufw (if no Hetzner firewall attached)

```bash
sudo ufw allow 3333/tcp
sudo ufw reload
```

Once the port is open, the app is reachable at `http://<VM_PUBLIC_IP>:3333`.

**Current VM public IP:** `89.167.43.92` → <http://89.167.43.92:3333>

### Background / foreground

The server is started in a background process by Claude during scaffolding.
To check or stop it:

```bash
# find the process
ss -tlnp | grep :3333

# stop
pkill -f "next dev -H 0.0.0.0 -p 3333"
```

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run production build |
| `pnpm lint` | ESLint |
| `pnpm db:generate` | Regenerate Prisma client |
| `pnpm db:migrate` | Create + apply a migration (dev) |
| `pnpm db:push` | Sync schema without migration |
| `pnpm db:studio` | Launch Prisma Studio |

## Status

Sprint 1 skeleton. Auth wiring, campaign creation flow, and Inngest workflows
land in Sprint 2.
