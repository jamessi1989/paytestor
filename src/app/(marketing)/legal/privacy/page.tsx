import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Crewqa",
  description: "Placeholder privacy policy for Crewqa. Final version pending legal review.",
  alternates: { canonical: "/legal/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="bg-white py-16">
      <article className="container-page max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="font-display text-3xl font-bold text-neutral-900 md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-neutral-500">Last updated: 21 April 2026</p>

        <div className="mt-8 border border-highlight-400 bg-highlight-300/30 p-5 text-sm leading-relaxed text-primary-700">
          <strong>Placeholder.</strong> The binding Privacy Policy will be
          published before the public launch. Until then this page outlines the
          principles we operate under. Questions:{" "}
          <a href="mailto:privacy@crewqa.com" className="underline">
            privacy@crewqa.com
          </a>
          .
        </div>

        <Section title="1. What we collect">
          <ul className="mt-3 space-y-2 pl-5 list-disc">
            <li>
              <strong>Developers:</strong> account email, company name,
              submitted app metadata, Stripe customer identifier.
            </li>
            <li>
              <strong>Testers:</strong> account email, region, language, device
              fingerprint, Gmail address used for Play Store opt-in, KYC status
              from Stripe Identity (we do not store your ID document),
              submission content (text, screen recordings), payout recipient
              identifier from Tremendous.
            </li>
          </ul>
        </Section>

        <Section title="2. What we don't collect">
          <ul className="mt-3 space-y-2 pl-5 list-disc">
            <li>We do not ship any SDK into your phone.</li>
            <li>We do not collect background location, contacts, or usage telemetry.</li>
            <li>We do not store KYC identity documents — Stripe holds those.</li>
          </ul>
        </Section>

        <Section title="3. How we use it">
          To run campaigns, match testers to developers, process payments and
          payouts, prevent fraud and duplicate accounts, and generate the
          campaign report. Nothing else.
        </Section>

        <Section title="4. Who we share with">
          <ul className="mt-3 space-y-2 pl-5 list-disc">
            <li>
              <strong>Stripe</strong> — payments and Identity verification.
            </li>
            <li>
              <strong>Tremendous</strong> — tester payouts.
            </li>
            <li>
              <strong>Resend</strong> — transactional email delivery.
            </li>
            <li>
              <strong>Anthropic</strong> — automated QA scoring of tester
              submissions (LLM inputs are subject to Anthropic&apos;s
              commercial terms, not used for training).
            </li>
            <li>
              <strong>Cloudflare R2</strong> — private storage of screen
              recordings (30-day retention).
            </li>
          </ul>
        </Section>

        <Section title="5. Data retention">
          Campaign data, including submissions and reports, is retained for 2
          years to support Google Play audit requests. Screen recordings are
          deleted 30 days after campaign close unless you explicitly request
          longer retention.
        </Section>

        <Section title="6. Your rights">
          You can request export or deletion of your account data at any time
          by emailing privacy@crewqa.com. We will respond within 30 days.
          EU/UK users have the full rights set out in GDPR; California users
          have CCPA rights.
        </Section>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold text-neutral-900">
        {title}
      </h2>
      <div className="mt-3 text-sm leading-relaxed text-neutral-700">{children}</div>
    </section>
  );
}
