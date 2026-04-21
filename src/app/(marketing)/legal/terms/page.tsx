import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Crewqa",
  description: "Placeholder terms of service for Crewqa. Final version pending legal review.",
  alternates: { canonical: "/legal/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="bg-white py-16">
      <article className="container-page max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="font-display text-3xl font-bold text-neutral-900 md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-neutral-500">Last updated: 21 April 2026</p>

        <div className="mt-8 border border-highlight-400 bg-highlight-300/30 p-5 text-sm leading-relaxed text-primary-700">
          <strong>Placeholder.</strong> Crewqa is in pre-launch. The binding
          Terms of Service will be published before the public launch. Until
          then, this page exists as a placeholder so links and navigation stay
          working. Reach out at{" "}
          <a href="mailto:legal@crewqa.com" className="underline">
            legal@crewqa.com
          </a>{" "}
          for any questions.
        </div>

        <Section title="1. What Crewqa does">
          Crewqa matches indie Android developers with KYC-verified testers for
          14-day closed-testing campaigns on Google Play. We handle tester
          recruitment, moderation, and payouts, and deliver a consolidated
          report at the end of each campaign.
        </Section>

        <Section title="2. Who can use the service">
          Developers must have a valid Google Play Console account and own or
          lawfully distribute the apps they submit. Testers must be 18+, have a
          real Android device, pass Stripe Identity KYC before their first
          cashout, and not run multiple accounts.
        </Section>

        <Section title="3. Payments and refunds">
          Campaign fees are charged upfront via Stripe. If Crewqa cannot match
          the required number of qualified testers within 72 hours of funding,
          the full fee is refunded. Partial refunds for mid-campaign
          cancellations are pro-rated against completed deliverables. No
          refunds after campaign day 14.
        </Section>

        <Section title="4. Acceptable use">
          Developers may not use Crewqa to inflate installs for apps that
          violate Google Play policies, distribute malware, or evade an
          existing account suspension. Testers may not submit fake, AI-generated,
          or boilerplate feedback.
        </Section>

        <Section title="5. Disclaimer">
          Crewqa provides a testing service. Crewqa does not guarantee Play
          Console production approval — that decision is Google&apos;s and
          depends on factors outside Crewqa&apos;s control.
        </Section>

        <Section title="6. Governing law">
          To be specified in the final terms.
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
      <p className="mt-3 text-sm leading-relaxed text-neutral-700">{children}</p>
    </section>
  );
}
