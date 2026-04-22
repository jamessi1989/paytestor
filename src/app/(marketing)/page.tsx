import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, FileText, Users } from "lucide-react";
import { JourneyAnimation } from "@/components/marketing/journey-animation";

export default function LandingPage() {
  return (
    <>
      {/* -------- Hero -------- */}
      <section className="relative bg-primary-500 text-white">
        <div className="container-page py-24 lg:py-32">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-300">
              Closed testing · 14 days · 12 testers
            </span>
            <h1 className="text-4xl font-bold font-display leading-tight md:text-5xl lg:text-6xl">
              Pass your Play Console review with a crew that actually tests.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-100">
              Google requires 12 opted-in testers over 14 continuous days before a
              new personal developer account can ship to production. Crewqa
              supplies verified humans on real Android devices and hands you an
              exportable report your reviewer will respect.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/signup" className="btn-premium text-lg">
                Start a campaign
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center text-sm font-semibold text-white hover:text-accent-300"
              >
                See how it works
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-primary-100">
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-accent-300" />
                Real Android devices only
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-accent-300" />
                KYC-verified testers
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-accent-300" />
                Exportable testing report
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* -------- The problem -------- */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">The problem</span>
            <h2 className="section-heading">
              You can&apos;t ship until twelve strangers test for two weeks.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              Personal accounts opened after November 2023 must run a closed test
              with at least 12 opted-in testers for 14 continuous days. Free
              test-for-test forums drop off. Tester farms get you banned. Crewqa
              is neither.
            </p>
          </div>
        </div>
      </section>

      {/* -------- How it works — animated journey -------- */}
      <JourneyAnimation />

      {/* -------- What you get -------- */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">What you get</span>
            <h2 className="section-heading">A campaign, not a head-count.</h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
            <FeatureCard
              icon={<Users className="h-6 w-6 text-accent-400" />}
              title="Twelve verified testers"
              body="Region and language matched. KYC at cashout. No emulators, no repeats, no farms."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6 text-accent-400" />}
              title="Moderated QA, not spam"
              body="Every submission passes an LLM rubric and, if flagged, human review. Spammers forfeit."
            />
            <FeatureCard
              icon={<FileText className="h-6 w-6 text-accent-400" />}
              title="An exportable report"
              body="Every bug, every dev response, every timestamp — formatted for Google's production questionnaire."
            />
          </div>
        </div>
      </section>

      {/* -------- CTA band -------- */}
      <section className="bg-primary-500 text-white">
        <div className="container-page py-16 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold font-display lg:text-4xl">
                Ship the app. Skip the Discord begging.
              </h2>
              <p className="mt-3 text-primary-100">
                One flat fee, fourteen days, one report. Fund your first campaign
                in under five minutes.
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

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="feature-card">
      <div className="mb-5 flex h-12 w-12 items-center justify-center bg-accent-400/10">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-neutral-900">{title}</h3>
      <p className="leading-relaxed text-neutral-600">{body}</p>
    </div>
  );
}
