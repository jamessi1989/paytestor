import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NewCampaignForm } from "./new-campaign-form";
import { STANDARD_CAMPAIGN_PRICE_CENTS } from "@/lib/pricing";
import { formatCurrency } from "@/lib/utils";

export default function NewCampaignPage() {
  return (
    <div className="container-page py-10">
      <Link
        href="/app"
        className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-primary-500"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to campaigns
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">
            New campaign
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Start a fourteen-day closed test. You&apos;ll pay{" "}
            {formatCurrency(STANDARD_CAMPAIGN_PRICE_CENTS)} upfront — refunded if
            we can&apos;t source 12 testers within 48 hours.
          </p>

          <div className="mt-8">
            <NewCampaignForm />
          </div>
        </div>

        <aside className="bg-white border border-neutral-200 p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-900">
            What happens next
          </h2>
          <ol className="mt-4 space-y-4 text-sm text-neutral-600">
            <Step
              n={1}
              text="We charge your card through Stripe. Funds are held in escrow."
            />
            <Step
              n={2}
              text="Within 24–48 hours, 12 verified testers are matched to your region and language."
            />
            <Step
              n={3}
              text="You upload their Gmail addresses to Play Console's closed-testing track."
            />
            <Step
              n={4}
              text="Testers complete 4 staggered deliverables over 14 days. You respond in-app."
            />
            <Step
              n={5}
              text="On day 14, we generate a PDF report for your Play Console review."
            />
          </ol>
        </aside>
      </div>
    </div>
  );
}

function Step({ n, text }: { n: number; text: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center bg-accent-400 text-xs font-bold text-white">
        {n}
      </span>
      <span className="leading-relaxed">{text}</span>
    </li>
  );
}
