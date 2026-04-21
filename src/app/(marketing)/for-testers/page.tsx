import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Globe2,
  Shield,
  Smartphone,
  Wallet,
} from "lucide-react";
import { Faq } from "@/components/marketing/faq";
import { JsonLd } from "@/components/marketing/json-ld";
import {
  CAMPAIGN_DURATION_DAYS,
  TESTER_REWARD_PER_DELIVERABLE_CENTS,
} from "@/lib/pricing";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Test Android apps and get paid — Crewqa for testers",
  description: `Earn ${formatCurrency(TESTER_REWARD_PER_DELIVERABLE_CENTS * 4)} per 14-day closed-testing campaign. Four structured tasks, real Android app, paid in gift cards or PayPal once KYC passes. Apply to the tester pool.`,
  alternates: { canonical: "/for-testers" },
};

const PER_CAMPAIGN_CENTS = TESTER_REWARD_PER_DELIVERABLE_CENTS * 4;

const FAQ_ITEMS = [
  {
    q: "How much can I earn per campaign?",
    a: `Crewqa pays ${formatCurrency(TESTER_REWARD_PER_DELIVERABLE_CENTS)} per approved deliverable. Each campaign has four deliverables, so a completed campaign pays ${formatCurrency(PER_CAMPAIGN_CENTS)}. Running two campaigns in a month is normal for active testers.`,
  },
  {
    q: "How do I qualify?",
    a: "You need a real Android phone (no emulators), a Gmail account for the Google Play closed-testing opt-in, and the ability to pass Stripe Identity KYC before your first cashout. No prior QA experience required — Crewqa grades submissions on effort and specificity, not expertise.",
  },
  {
    q: "What does each task actually involve?",
    a: "Four tasks over 14 days. Day 1: install the app and complete onboarding. Day 4: write a three-sentence review of the onboarding. Day 9: record a 30–90 second screen capture of the core feature. Day 13: file one structured bug report, feature request, or performance note. Total time investment is roughly 45–60 minutes across the full campaign.",
  },
  {
    q: "How do I get paid?",
    a: "Via Tremendous — you pick at cashout: gift card (Amazon, Visa prepaid, hundreds more), PayPal, or direct ACH depending on your country. Crewqa doesn't hold your money in a wallet forever; you can cash out as soon as you pass KYC, which unlocks on your first campaign.",
  },
  {
    q: "Why is there a KYC step?",
    a: "Two reasons. One: Google Play's review process looks for tester farms, and KYC lets Crewqa prove testers are unique humans. Two: payout processors require identity verification for anti-fraud. KYC is run by Stripe Identity — Crewqa never sees your ID document directly.",
  },
  {
    q: "What happens if a submission is rejected?",
    a: "You don't get paid for that specific deliverable, and repeat low-quality submissions remove you from the tester pool. Honest negative feedback is never rejected — rejections are for thin, boilerplate, or off-topic submissions (things like 'great app' with no specifics).",
  },
  {
    q: "Can I test from any country?",
    a: "Crewqa launches with United States, United Kingdom, Canada, Germany, France, and Australia. Payout availability depends on Tremendous's coverage in your country. We expand regions as developer demand warrants.",
  },
  {
    q: "Is this like a survey app?",
    a: "No. You're not collecting points toward a nebulous reward. Each approved deliverable is a discrete cash-equivalent payment, processed through a real payout rail, paid out on your schedule.",
  },
  {
    q: "Can I keep the apps I test?",
    a: "You're only required to keep the app installed during the 14-day campaign window. After that it's your choice — most testers uninstall to free up space.",
  },
  {
    q: "How often will I get assigned to a campaign?",
    a: "Depends on developer demand in your region + language. Early tester-pool members typically see 1–2 campaigns per month. We don't spam you — assignments are opt-in, so you can skip a campaign if you're busy without any impact on your pool status.",
  },
];

export default function ForTestersPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: "Android closed-testing participant (contract, remote)",
          description:
            "Paid Android app testing across 14-day closed-testing campaigns. Four structured deliverables per campaign. KYC required for cashout.",
          employmentType: "CONTRACTOR",
          hiringOrganization: {
            "@type": "Organization",
            name: "Crewqa",
            sameAs: "https://crewqa.com",
          },
          jobLocationType: "TELECOMMUTE",
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: {
              "@type": "QuantitativeValue",
              value: PER_CAMPAIGN_CENTS / 100,
              unitText: "per completed 14-day campaign",
            },
          },
        }}
      />

      {/* -------- Hero -------- */}
      <section className="bg-primary-500 text-white">
        <div className="container-page py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-300">For testers</span>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Test Android apps. Get paid. No surveys, no points.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-100">
              Crewqa pays testers real money —{" "}
              <strong className="font-semibold text-white">
                {formatCurrency(PER_CAMPAIGN_CENTS)} per completed{" "}
                {CAMPAIGN_DURATION_DAYS}-day campaign
              </strong>{" "}
              — to help indie developers clear Google Play&apos;s closed-testing
              requirement. Real apps, real feedback, real payouts.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/signup?as=tester" className="btn-premium text-lg">
                Apply as a tester
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center text-sm font-semibold text-white hover:text-accent-300"
              >
                See what you&apos;d do
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* -------- What you earn -------- */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <span className="eyebrow">The numbers</span>
              <h2 className="section-heading">What you&apos;ll earn.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <NumberBlock
                big={formatCurrency(TESTER_REWARD_PER_DELIVERABLE_CENTS)}
                label="per approved deliverable"
              />
              <NumberBlock
                big={formatCurrency(PER_CAMPAIGN_CENTS)}
                label="per completed campaign"
              />
              <NumberBlock big="14 days" label="window per campaign" />
              <NumberBlock
                big="~45 min"
                label="total tester time per campaign"
              />
            </div>
          </div>
        </div>
      </section>

      {/* -------- Requirements -------- */}
      <section className="bg-neutral-50 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">Requirements</span>
            <h2 className="section-heading">What you need to qualify.</h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Requirement
              icon={<Smartphone className="h-5 w-5 text-accent-500" />}
              title="A real Android phone"
              body="Any modern Android device is fine. Emulators are blocked at signup via device fingerprint — no workarounds."
            />
            <Requirement
              icon={<Globe2 className="h-5 w-5 text-accent-500" />}
              title="A Gmail address"
              body="Google Play's closed-testing opt-in requires a Google account. You'll supply a Gmail at signup — it doesn't need to be your primary address."
            />
            <Requirement
              icon={<BadgeCheck className="h-5 w-5 text-accent-500" />}
              title="Stripe Identity KYC"
              body="Required before your first cashout. Runs once. Takes ~3 minutes. Crewqa never sees your ID document directly."
            />
            <Requirement
              icon={<Shield className="h-5 w-5 text-accent-500" />}
              title="One account, one person"
              body="Duplicate accounts are detected by IP, device, and payout details and are permanently removed from the pool."
            />
            <Requirement
              icon={<Wallet className="h-5 w-5 text-accent-500" />}
              title="Payout-ready in your country"
              body="Tremendous supports most of North America, Europe, and Australia. If payouts don't reach you, you're not eligible yet."
            />
            <Requirement
              icon={<CreditCard className="h-5 w-5 text-accent-500" />}
              title="Good faith"
              body="Thin reviews and boilerplate submissions don't get paid. Honest negative feedback always does."
            />
          </div>
        </div>
      </section>

      {/* -------- What you actually do -------- */}
      <section id="how" className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">The four tasks</span>
            <h2 className="section-heading">What a campaign looks like.</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              One app, 14 days, four deliverables. Spaced out so you&apos;re
              spending ~10 minutes at a time, not blocking off an afternoon.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <TaskCard
              day="Day 1"
              title="Install & onboard"
              body="Install the app from the closed-testing track, complete the developer's onboarding flow. ~10 min."
            />
            <TaskCard
              day="Day 4"
              title="Written review"
              body="Three sentences about the onboarding: first impression, confusion, one change you'd make. ~5 min."
            />
            <TaskCard
              day="Day 9"
              title="Screen recording"
              body="30–90 second screen capture of you using the core feature, uploaded via the tester dashboard. ~15 min."
            />
            <TaskCard
              day="Day 13"
              title="Bug report"
              body="File a structured bug, performance note, or feature request — steps to reproduce, device + OS. ~15 min."
            />
          </div>
        </div>
      </section>

      {/* -------- Payout -------- */}
      <section className="bg-neutral-50 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">Payouts</span>
            <h2 className="section-heading">How you actually get the money.</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Crewqa pays out through Tremendous, a payout rail that covers
              hundreds of redemption options. Once you pass KYC, you pick your
              payout type at cashout — not at signup, not before you&apos;ve
              earned anything.
            </p>

            <ul className="mt-8 space-y-3 text-sm leading-relaxed text-neutral-700">
              <PayoutOption text="Amazon, Walmart, Target gift cards (US)" />
              <PayoutOption text="Visa / Mastercard prepaid cards" />
              <PayoutOption text="PayPal direct transfer" />
              <PayoutOption text="Bank transfer (ACH in the US, SEPA in EU)" />
              <PayoutOption text="Crypto if you insist (USDC, where supported)" />
              <PayoutOption text="Hundreds of regional retailer options via Tremendous" />
            </ul>
          </div>
        </div>
      </section>

      {/* -------- Code of conduct -------- */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">Standards</span>
            <h2 className="section-heading">The rules that keep the pool clean.</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Crewqa&apos;s entire value depends on developers trusting that
              submissions are honest human work. We enforce that strictly.
            </p>

            <ul className="mt-8 space-y-4">
              <Rule
                title="One account per person"
                body="Duplicate detection runs on every signup. A second account forfeits any pending balance on all linked accounts."
              />
              <Rule
                title="Specific, effortful feedback"
                body="Three sentences is fine. Three sentences of 'great app, 5 stars, love it' is not — it fails the LLM rubric and the deliverable doesn't pay."
              />
              <Rule
                title="Honest negative feedback always pays"
                body="Developers cannot retaliate against testers who gave honest criticism. The anti-retaliation policy is what makes our reports credible to Google."
              />
              <Rule
                title="No SDK or data collection"
                body="Crewqa does not ship an SDK into your phone. We see the submissions you upload — that's it. No background tracking, no location, no contacts."
              />
            </ul>
          </div>
        </div>
      </section>

      {/* -------- FAQ -------- */}
      <section className="bg-neutral-50 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">FAQ</span>
            <h2 className="section-heading">Tester FAQ.</h2>
            <div className="mt-10">
              <Faq items={FAQ_ITEMS} />
            </div>
          </div>
        </div>
      </section>

      {/* -------- CTA -------- */}
      <section className="bg-primary-500 text-white">
        <div className="container-page py-16 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold lg:text-4xl">
                Apply to the tester pool.
              </h2>
              <p className="mt-3 text-primary-100">
                Free to join. Campaigns come to you once you&apos;re matched.
              </p>
            </div>
            <Link href="/signup?as=tester" className="btn-premium text-lg">
              Apply as a tester
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function NumberBlock({ big, label }: { big: string; label: string }) {
  return (
    <div className="border border-neutral-200 bg-white p-6 text-center">
      <div className="font-display text-3xl font-bold text-neutral-900 lg:text-4xl">
        {big}
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {label}
      </div>
    </div>
  );
}

function Requirement({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article className="feature-card">
      <div className="mb-4 flex h-10 w-10 items-center justify-center bg-accent-400/10">
        {icon}
      </div>
      <h3 className="font-display text-lg font-bold text-neutral-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{body}</p>
    </article>
  );
}

function TaskCard({
  day,
  title,
  body,
}: {
  day: string;
  title: string;
  body: string;
}) {
  return (
    <article className="feature-card">
      <div className="font-display text-sm font-bold uppercase tracking-wider text-accent-500">
        {day}
      </div>
      <h3 className="mt-2 font-display text-lg font-bold text-neutral-900">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{body}</p>
    </article>
  );
}

function PayoutOption({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-accent-400" />
      <span>{text}</span>
    </li>
  );
}

function Rule({ title, body }: { title: string; body: string }) {
  return (
    <li className="border-l-2 border-accent-400 pl-4">
      <h3 className="font-display text-base font-bold text-neutral-900">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-neutral-600">{body}</p>
    </li>
  );
}
