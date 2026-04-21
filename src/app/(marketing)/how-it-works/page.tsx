import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  ClipboardCheck,
  FileCheck2,
  MessageSquare,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";
import { Faq } from "@/components/marketing/faq";
import { JsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title: "How Crewqa runs a 14-day closed test — the full mechanism",
  description:
    "Exact day-by-day of a Crewqa campaign: 12 KYC-verified testers, four staggered deliverables, LLM-assisted QA, an exportable report Google Play reviewers accept.",
  alternates: { canonical: "/how-it-works" },
};

const FAQ_ITEMS = [
  {
    q: "Why does Google Play require 14 days of testing?",
    a: "Personal developer accounts opened after November 2023 must run a closed test with at least 12 opted-in testers for 14 continuous days before requesting production access. Google's stated goal is to reduce low-quality and scam app listings — they want evidence that real users have exercised the app over a non-trivial window.",
  },
  {
    q: "What exactly does a tester do on Crewqa?",
    a: "Four structured deliverables across 14 days: (1) install and complete your onboarding on day 1, (2) submit a written review of the onboarding on day 4, (3) record a short screen capture of your core feature on day 9, (4) submit a structured bug report, feature request, or performance note on day 13. Each deliverable is timestamped and attached to the campaign report.",
  },
  {
    q: "Are Crewqa testers real people or bots?",
    a: "Real people on real Android devices. Every tester passes a KYC check before their first cashout (Stripe Identity under the hood). Emulators are blocked by a device-fingerprint check at signup. Repeat farms are detected by IP, device, and submission-content heuristics — repeat offenders forfeit any pending payout.",
  },
  {
    q: "What does the exported report contain?",
    a: "A timestamped log of every install event, every tester submission, every LLM QA score, every human QA note, and every developer response. Formatted as PDF + CSV so you can attach it directly to Play Console's production questionnaire.",
  },
  {
    q: "What happens if a tester drops out?",
    a: "Crewqa automatically reassigns the slot within 24 hours, pulling from a warm bench of testers in the same region/language. You do not lose time on your 14-day window — the campaign continues while we backfill.",
  },
  {
    q: "Can I reject a submission I don't like?",
    a: "You can respond to any submission, and low-quality submissions are rejected before they reach you. You can't retaliate against a tester who gave honest negative feedback — the anti-retaliation policy is what keeps the report credible to Google's reviewer.",
  },
  {
    q: "Do testers get to keep your app installed?",
    a: "For the 14-day window, yes. After the campaign closes, testers are not required to keep the app installed. Google's requirement is participation during the window, not permanent installs.",
  },
  {
    q: "How long until I can ship to production after a campaign ends?",
    a: "Crewqa delivers the report within 24 hours of day 14 ending. The Play Console review after you submit is Google's process and typically takes 1–7 days. Crewqa doesn't control that timeline, but the report is designed to minimise back-and-forth.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Pass Google Play's 14-day closed testing requirement with Crewqa",
          description:
            "End-to-end process for running a compliant 14-day closed test on Google Play using Crewqa.",
          totalTime: "P14D",
          step: [
            {
              "@type": "HowToStep",
              name: "Create a campaign",
              text: "Submit your app package name and target region. Pay the flat fee. Campaign opens immediately.",
            },
            {
              "@type": "HowToStep",
              name: "Tester assignment",
              text: "Twelve KYC-verified testers matched to your region and language within 24 hours.",
            },
            {
              "@type": "HowToStep",
              name: "Day 1 — Install and onboarding",
              text: "Testers install your app from the closed-testing track and complete your onboarding flow.",
            },
            {
              "@type": "HowToStep",
              name: "Day 4 — Written review",
              text: "A three-sentence review of your onboarding UI, graded by an LLM rubric and rejected if thin.",
            },
            {
              "@type": "HowToStep",
              name: "Day 9 — Screen recording",
              text: "A 30–90 second screen capture of your core feature, so you see how real users hold the app.",
            },
            {
              "@type": "HowToStep",
              name: "Day 13 — Bug report",
              text: "A structured bug, performance note, or feature request with your responses appended.",
            },
            {
              "@type": "HowToStep",
              name: "Day 14 — Report delivery",
              text: "Within 24 hours of day 14 ending, you receive a PDF + CSV report ready to attach to Play Console's production questionnaire.",
            },
          ],
        }}
      />

      {/* -------- Hero -------- */}
      <section className="bg-primary-500 text-white">
        <div className="container-page py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-300">How it works</span>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Fourteen days, four deliverables, one credible report.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-100">
              A Crewqa campaign is a structured workflow, not a favour exchange.
              Every step is timestamped, graded, and included in the artefact
              you hand to Google Play&apos;s reviewer.
            </p>
          </div>
        </div>
      </section>

      {/* -------- Step 1: campaign creation -------- */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">Step 1</span>
            <h2 className="section-heading">You fund a campaign.</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              One flat fee covers 12 testers × 4 deliverables (48 paid
              assignments) plus moderation, payout processing, and the final
              report. The fee is held in escrow — testers only draw from it as
              they complete verified work.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <DetailBlock
                icon={<ClipboardCheck className="h-5 w-5 text-accent-500" />}
                label="You submit"
                value="App package, Play Store URL, target region, language"
              />
              <DetailBlock
                icon={<ShieldCheck className="h-5 w-5 text-accent-500" />}
                label="Payment"
                value="Held in escrow via Stripe. Refundable if we can't match."
              />
              <DetailBlock
                icon={<Users className="h-5 w-5 text-accent-500" />}
                label="Matching"
                value="12 testers assigned within 24 hours of funding"
              />
            </div>
          </div>
        </div>
      </section>

      {/* -------- Step 2: the 14-day timeline -------- */}
      <section className="bg-neutral-50 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">Step 2</span>
            <h2 className="section-heading">Four staggered deliverables.</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Spacing matters. A test-for-test forum gets you 12 installs on
              day 1 and silence for the rest of the window — a pattern Play
              Console reviewers flag. Crewqa produces engagement Google can
              read as organic.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-3xl space-y-6">
            <TimelineStep
              day="Day 1"
              title="Install & onboarding"
              icon={<CalendarClock className="h-5 w-5 text-accent-500" />}
              body="Every tester installs the app from your closed-testing track and finishes your onboarding. Install events are captured via the Google Play Console opt-in telemetry — no SDK required."
            />
            <TimelineStep
              day="Day 4"
              title="Written onboarding review"
              icon={<MessageSquare className="h-5 w-5 text-accent-500" />}
              body="A three-sentence review covering: the first impression, one thing that confused them, one thing they'd change. Every review is graded by an LLM rubric that rejects thin or boilerplate answers."
            />
            <TimelineStep
              day="Day 9"
              title="Core-feature screen recording"
              icon={<Video className="h-5 w-5 text-accent-500" />}
              body="A 30–90 second screen capture of the tester exercising a core feature you nominate. You watch real users hold your app — and see friction that survey data never surfaces."
            />
            <TimelineStep
              day="Day 13"
              title="Structured bug / perf / feature report"
              icon={<FileCheck2 className="h-5 w-5 text-accent-500" />}
              body="Testers file one structured entry — steps to reproduce, expected vs actual, device + OS version. You can respond to any entry, and your responses appear in the final report."
            />
          </div>
        </div>
      </section>

      {/* -------- Step 3: quality controls -------- */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">Step 3</span>
            <h2 className="section-heading">Three layers of quality control.</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Tester farms and free swap-forums pollute submissions with
              template answers. Crewqa filters at three layers before anything
              reaches your dashboard.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3 lg:gap-8">
            <QualityLayer
              step="1"
              title="Device + identity"
              body="Emulators blocked at signup via device fingerprint. Every tester passes Stripe Identity KYC before their first cashout — real name, real ID, real face."
            />
            <QualityLayer
              step="2"
              title="LLM rubric"
              body="Every submission is scored by Claude against a strict rubric — specificity, relevance, effort. Boilerplate answers and obvious templates score below threshold and are rejected."
            />
            <QualityLayer
              step="3"
              title="Human review"
              body="LLM-flagged submissions land in an admin queue where a human Crewqa reviewer approves or rejects. Rejections forfeit the tester's payment for that task."
            />
          </div>
        </div>
      </section>

      {/* -------- Step 4: report -------- */}
      <section className="bg-neutral-50 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">Step 4</span>
            <h2 className="section-heading">
              An exportable report your Play Console reviewer will respect.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Within 24 hours of day 14, you get a single report covering every
              install, submission, QA decision, and developer response.
              Formatted for Google&apos;s production-access questionnaire —
              attach it directly and move on.
            </p>

            <ul className="mt-8 space-y-3 text-sm leading-relaxed text-neutral-700">
              <ReportItem text="Tester count with anonymised IDs and KYC-verification status" />
              <ReportItem text="Install timestamps for all 12 testers" />
              <ReportItem text="Written reviews + LLM QA scores + human override notes" />
              <ReportItem text="Screen recording URLs (private, 30-day retention)" />
              <ReportItem text="Structured bug reports with your responses threaded" />
              <ReportItem text="PDF for the Play Console reviewer, CSV for your records" />
            </ul>
          </div>
        </div>
      </section>

      {/* -------- FAQ -------- */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">FAQ</span>
            <h2 className="section-heading">Questions developers actually ask.</h2>
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
                Ready to run your 14 days?
              </h2>
              <p className="mt-3 text-primary-100">
                Fund a campaign in five minutes, reviewers matched within 24
                hours.
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

function DetailBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-neutral-200 bg-white p-5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-neutral-800">{value}</p>
    </div>
  );
}

function TimelineStep({
  day,
  title,
  icon,
  body,
}: {
  day: string;
  title: string;
  icon: React.ReactNode;
  body: string;
}) {
  return (
    <article className="flex items-start gap-5 border border-neutral-200 bg-white p-6">
      <div className="flex h-12 w-12 flex-none items-center justify-center bg-primary-500 font-display text-xs font-bold text-white">
        {day.replace("Day ", "D")}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-500">
          {icon}
          {day}
        </div>
        <h3 className="mt-1 font-display text-xl font-bold text-neutral-900">
          {title}
        </h3>
        <p className="mt-2 leading-relaxed text-neutral-600">{body}</p>
      </div>
    </article>
  );
}

function QualityLayer({
  step,
  title,
  body,
}: {
  step: string;
  title: string;
  body: string;
}) {
  return (
    <article className="feature-card">
      <div className="inline-flex h-10 w-10 items-center justify-center bg-accent-400 font-display text-sm font-bold text-white">
        {step}
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-neutral-900">
        {title}
      </h3>
      <p className="mt-3 leading-relaxed text-neutral-600">{body}</p>
    </article>
  );
}

function ReportItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-accent-400" />
      <span>{text}</span>
    </li>
  );
}
