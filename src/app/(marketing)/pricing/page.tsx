import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Faq } from "@/components/marketing/faq";
import { JsonLd } from "@/components/marketing/json-ld";
import {
  STANDARD_CAMPAIGN_PRICE_CENTS,
  TESTER_SLOTS_PER_CAMPAIGN,
  CAMPAIGN_DURATION_DAYS,
} from "@/lib/pricing";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Crewqa pricing — one flat fee for a compliant 14-day closed test`,
  description: `One plan. ${formatCurrency(STANDARD_CAMPAIGN_PRICE_CENTS)} per campaign. Twelve KYC-verified testers, four deliverables, an exportable report. No subscriptions, no per-seat pricing.`,
  alternates: { canonical: "/pricing" },
};

const FAQ_ITEMS = [
  {
    q: `Why is Crewqa ${formatCurrency(STANDARD_CAMPAIGN_PRICE_CENTS)} when other services charge less?`,
    a: "Because real testers on KYC-verified devices cost money. Crewqa pays testers directly for 48 completed deliverables per campaign (12 testers × 4 tasks), plus moderation, payout processing, Stripe fees, and the final report. Cheaper services skip one of those layers — usually the KYC layer — which is what gets apps rejected.",
  },
  {
    q: "Are there any extra fees?",
    a: "No. The campaign price is the total price. Stripe fees, tester payouts, KYC checks, LLM QA, and the final report are all included. If Crewqa can't match 12 qualified testers in your region within 72 hours, you're refunded in full.",
  },
  {
    q: "Do I pay per tester or per campaign?",
    a: "Per campaign. One fee covers one 14-day test with 12 testers. You don't assemble a tester list — Crewqa does.",
  },
  {
    q: "Can I run multiple apps at the same price?",
    a: "Each app is a separate campaign. You can run multiple campaigns in parallel (useful if you have more than one app awaiting Play Console production access), and each is priced independently.",
  },
  {
    q: "What if my app fails the internal QA process?",
    a: "Crewqa's QA only filters tester submissions, not your app. If your app is too broken to onboard (app crashes before onboarding completes, for example), testers file the crash as a day-1 bug report and we contact you — but the campaign continues. You should fix the blocker and cut a new build to the closed-testing track quickly.",
  },
  {
    q: "Do you offer refunds?",
    a: "Full refund if we can't match 12 qualified testers within 72 hours of funding. Partial refund (pro-rated to completed deliverables) if you cancel mid-campaign. No refunds after day 14 — at that point, testers have been paid and the report has been generated.",
  },
  {
    q: "Is there a subscription or annual plan?",
    a: "No. One-off purchase per campaign. Closed testing is a one-time regulatory hurdle, not a recurring need — pricing reflects that.",
  },
  {
    q: "Do you offer discounts for agencies or studios with multiple apps?",
    a: "Email hello@crewqa.com if you need more than five campaigns in a month. Standard pricing applies below that.",
  },
];

export default function PricingPage() {
  const priceUsd = STANDARD_CAMPAIGN_PRICE_CENTS / 100;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Crewqa 14-day closed-testing campaign",
          description:
            "Managed closed-testing for Google Play. 12 KYC-verified testers on real Android devices, 4 structured deliverables over 14 days, exportable report for the Play Console production questionnaire.",
          brand: { "@type": "Brand", name: "Crewqa" },
          offers: {
            "@type": "Offer",
            price: priceUsd.toFixed(2),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: "https://crewqa.com/pricing",
          },
        }}
      />

      {/* -------- Hero -------- */}
      <section className="bg-primary-500 text-white">
        <div className="container-page py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow text-accent-300">Pricing</span>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              One plan. Flat fee. Nothing recurring.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-100">
              Closed testing is a one-time hurdle. Crewqa charges one price per
              campaign, pays {TESTER_SLOTS_PER_CAMPAIGN} KYC-verified testers on
              your behalf, and hands you the report at the end.
            </p>
          </div>
        </div>
      </section>

      {/* -------- Pricing card -------- */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 bg-neutral-50 p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <div className="eyebrow">Standard campaign</div>
                  <h2 className="mt-2 font-display text-3xl font-bold text-neutral-900">
                    {formatCurrency(STANDARD_CAMPAIGN_PRICE_CENTS)}{" "}
                    <span className="text-base font-medium text-neutral-500">
                      / campaign
                    </span>
                  </h2>
                </div>
                <Link href="/signup" className="btn-primary">
                  Start a campaign
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <p className="mt-3 text-sm text-neutral-600">
                One 14-day closed test. Funded in full on day zero, escrowed,
                paid out to testers as deliverables land.
              </p>
            </div>

            <div className="grid gap-8 p-8 md:grid-cols-2">
              <IncludedList
                title="What's included"
                items={[
                  `${TESTER_SLOTS_PER_CAMPAIGN} KYC-verified testers`,
                  `${CAMPAIGN_DURATION_DAYS} days of continuous participation`,
                  "4 structured deliverables per tester",
                  "Region + language matching",
                  "LLM-graded QA on every submission",
                  "Human review of flagged submissions",
                  "Automatic slot reassignment on drop-out",
                  "PDF + CSV report for Play Console",
                  "Dev response thread on every bug report",
                  "Stripe escrow — refundable if we can't match",
                ]}
              />
              <NotIncludedList
                title="Not included"
                items={[
                  "Recurring subscription (there isn't one)",
                  "Per-tester fees (it's a flat campaign price)",
                  "App development or bug-fixing",
                  "Play Console submission fees (Google's, not ours)",
                  "Store listing copy or ASO",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* -------- Comparison -------- */}
      <section className="bg-neutral-50 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">Honest comparison</span>
            <h2 className="section-heading">
              Why not use the free alternatives?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Because the free options have a cost — it&apos;s just paid in
              risk, time, or a Play Console rejection. Here&apos;s a
              no-nonsense breakdown.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl overflow-x-auto border border-neutral-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="p-4 font-semibold text-neutral-700">Option</th>
                  <th className="p-4 font-semibold text-neutral-700">Cost</th>
                  <th className="p-4 font-semibold text-neutral-700">Risk</th>
                  <th className="p-4 font-semibold text-neutral-700">
                    Time for you
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <CompareRow
                  option="Test-for-test forums (Reddit, Discord)"
                  cost="Free"
                  risk="High — testers drop off, fake participation flagged"
                  time="10–20 hrs/week over 14 days"
                />
                <CompareRow
                  option="Tester farms / pay-per-install services"
                  cost="Low ($50–150)"
                  risk="Very high — Google bans accounts for this"
                  time="Minimal, but you're gambling your account"
                />
                <CompareRow
                  option="Recruit friends & family"
                  cost="Free (or social debt)"
                  risk="Medium — hard to get 12, hard to keep them engaged"
                  time="Ongoing nagging"
                />
                <CompareRow
                  option="Crewqa"
                  cost={formatCurrency(STANDARD_CAMPAIGN_PRICE_CENTS)}
                  risk="Low — KYC'd testers, moderated submissions, audit trail"
                  time="~30 min across 14 days"
                  highlight
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* -------- FAQ -------- */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">FAQ</span>
            <h2 className="section-heading">Pricing questions, answered.</h2>
            <div className="mt-10">
              <Faq items={FAQ_ITEMS} />
            </div>
          </div>
        </div>
      </section>

      {/* -------- CTA band -------- */}
      <section className="bg-primary-500 text-white">
        <div className="container-page py-16 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold lg:text-4xl">
                {formatCurrency(STANDARD_CAMPAIGN_PRICE_CENTS)} — funded once,
                done in fourteen days.
              </h2>
              <p className="mt-3 text-primary-100">
                Refundable if we can&apos;t match your region within 72 hours.
              </p>
            </div>
            <Link href="/signup" className="btn-premium text-lg">
              Start a campaign
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function IncludedList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-900">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm text-neutral-700">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 flex-none text-accent-500" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NotIncludedList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-900">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm text-neutral-500">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-3">
            <X className="mt-0.5 h-4 w-4 flex-none text-neutral-400" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompareRow({
  option,
  cost,
  risk,
  time,
  highlight,
}: {
  option: string;
  cost: string;
  risk: string;
  time: string;
  highlight?: boolean;
}) {
  return (
    <tr className={highlight ? "bg-accent-300/30 font-medium" : ""}>
      <td className="p-4 text-neutral-800">{option}</td>
      <td className="p-4 text-neutral-700">{cost}</td>
      <td className="p-4 text-neutral-700">{risk}</td>
      <td className="p-4 text-neutral-700">{time}</td>
    </tr>
  );
}
