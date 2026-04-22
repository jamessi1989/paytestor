<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Crewqa — pick-up guide

Boutique closed-testing QA platform for indie Android devs (Google Play's 14-day / 12-tester rule). Stack: Next.js 16 (Turbopack) + Prisma 7 + Auth.js v5 + Postgres + Stripe (deferred) + Inngest.

## Dev URL and quick start
- **Dev URL:** https://crewqa.botview.app (Cloudflare named tunnel → `127.0.0.1:3333`)
- **Sign-in:** Google OAuth (`AUTH_URL` + `AUTH_TRUST_HOST` in `.env` are load-bearing; without them Auth.js generates `0.0.0.0` callback URLs).
- **DB:** Postgres in Docker on `127.0.0.1:5435`, user/pass `crewqa`/`crewqa`.
- **Seed 24 testers:** `node prisma/seed.mjs` (idempotent on `user.email`).
- **Open tasks:** `gh issue list` — tagged by `area:` label.

## What's live end-to-end
- Auth (Google OAuth, JWT sessions).
- Developer flow: create campaign → auto-assigns 12 testers → walk 14-day timeline via DevTools panel → fake-submit deliverables → close campaign.
- Full Prisma schema and service layer. Migration `20260421164850_init` is the baseline.
- Inngest functions exist (`campaignLifecycle`, `handleDropOut`) but the Inngest dev server is **not** running, so real lifecycle events don't fire. The DevTools panel replaces it in dev mode.

## Dev-only shortcuts (gated fail-closed on `DEV_BYPASS_STRIPE=true` AND `NODE_ENV !== "production"`)
- `createCampaignAndCheckout` skips Stripe Checkout, marks campaign FUNDED, assigns 12 testers, materializes assignments.
- Inngest `campaign/started` emission is skipped on the bypass path to avoid double-advance if the Inngest dev server is ever started.
- `devFakeSubmit` lands submissions as auto-`APPROVED` (Sprint 4 changes this to `LLM_APPROVED` so human QA is the real gate).
- Campaign-creation form passes labels like `"United States"` / `"English"`; seed uses ISO codes (`"US"` / `"en"`). `assignTestersToCampaign` falls back to any verified tester to keep the loop working. Sprint 3 fixes the parity.

## Architecture conventions
- **Service layer:** `src/server/services/` — pure async functions, DB writes, no framework. Unit-testable.
- **Server actions:** `src/server/actions/` — thin; validate input, call services, redirect/revalidate.
- **Dev actions:** `src/server/actions/dev.ts` — gated via `src/lib/dev-flags.ts`. Every function calls `assertDev()` first.
- **Inngest functions:** `src/server/inngest/functions.ts` — durable workflows. Never reference `new Date()` inside a `step.run` body; use step inputs so retries are deterministic.
- **Always regenerate Prisma client after schema changes:** `pnpm exec prisma generate`. The `@auth/prisma-adapter` will throw `Cannot read properties of undefined (reading 'findUnique')` if the client is stale (Account/Session models not generated).
- **Prisma migrate requires consent when invoked by Claude:** `PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION=sure pnpm exec prisma migrate ...`.

---

# Roadmap

Every sprint ends with a pushable, usable demo. Cut scope ruthlessly to keep sprints shippable.

## Sprint 3 (current) — Tester-side marketplace loop

**Goal:** a stranger can sign in, pick `TESTER`, browse open campaigns, join one, submit all 4 deliverables, and see earnings. This sells the product's flywheel in a demo.

### Tasks
1. **Role selection on first login.** Dedicated route `/onboarding`. Server action sets `User.role` + creates matching `Developer` or `Tester` row. Bookmarkable, easier to revisit than a modal.
2. **Tester route group** at `src/app/(tester)/tester/` with its own layout.
3. **`/tester`** — dashboard: joined campaigns grouped by status, due/overdue deliverable counts.
4. **`/tester/campaigns`** — browse open: `FUNDED` campaigns with fewer than 12 slots filled. Shows region, language, reward per deliverable. "Join this crew" button creates `CampaignTester` + materializes that tester's 4 assignments.
5. **`/tester/campaigns/[id]`** — submit deliverables: text input + optional URL (no R2 uploads yet). Lands as `LLM_APPROVED` for now.
6. **`/tester/wallet`** — read-only balance: sum of `rewardCents` for that tester's APPROVED assignments.
7. **Bypass change:** `createCampaignAndCheckout` in dev mode now creates campaigns with **zero** testers assigned (status `FUNDED`). Add an "Auto-fill with 11 seeded testers" button to the DevTools panel so the developer-side demo can populate the grid fast when wanted. Leaves 1 slot open for a real tester to join. (Decided: option (a).)
8. **ISO parity:** change form `<option value>` to ISO codes; pretty labels in display only. Removes reliance on the fallback.
9. **Dev-only self-role switcher** on DevTools panel so a single Google account can play both sides while iterating.

### Closes / partially closes
- #2 role selection — **fully**
- #8 tester dashboard — **fully** (MVP)
- #9 tester submission UI — **partial** (text + URL, no R2)
- #10 tester wallet — **partial** (read-only)

### Explicitly deferred
KYC (#7), QA queue (#11), PDF report (#16), R2 uploads (#18), real Stripe (#3), Tremendous (#17), Resend email (#15), Inngest dev server, file uploads.

---

## Sprint 4 — QA curation ("signal, not noise")

**Goal:** make the value prop real. Right now every submission auto-approves; that undermines the "we curate, not just roster" pitch. An admin walks a queue, rejects junk, developer sees only the good stuff.

1. `/admin/qa` route behind `Role.ADMIN` gate. Dev-mode self-promotion toggle.
2. QA queue UI — one list of `LLM_APPROVED` submissions across campaigns, approve/reject with notes. Flips `qaStatus` to `HUMAN_APPROVED` or `REJECTED`, updates `Assignment.status`.
3. Vary fake-submit content per (tester, task) so the queue has realistic material to review.
4. Submission detail modal on developer campaign detail page — click a filled cell, see content + qaStatus.

Closes: #11 fully, #12 partial.

---

## Sprint 5 — Lifecycle realness

1. Inngest dev server wiring (separate process in a second terminal/systemd unit). Bypass path already skips firing events — keep that gate so runs don't double-advance when the dev server is up.
2. Day-14 PDF report generation → `CampaignReport.pdfUrl`.
3. Tester payout trigger via Tremendous (stubbed API for now).
4. Resend email templates wired into `sendDayReminder`.

Closes: #15, #16, #17.

---

## Sprint 6 — Real integrations

1. Stripe Checkout end-to-end (Stripe CLI forwards webhook to local tunnel).
2. Stripe Identity for tester KYC.
3. R2 bucket + presigned upload for screen recordings.
4. Claude grading function for `TEXT_REVIEW` rubric.

Closes: #3, #7, #9 fully, #14, #18.

---

## Sprint 7 — Polish + ship

1. Fix non-standard `NODE_ENV` warning.
2. Avatar decision: CDN vs baked SVGs.
3. Production deploy to botview server.

Closes: #19, #21, #22.

---

# Pending issues cross-reference

Issues are tracked in GitHub. Run `gh issue list` for current state. Sprint mapping above shows which issues each sprint closes.
