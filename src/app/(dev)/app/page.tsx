import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DevDashboard() {
  return (
    <div className="container-page py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">
            Campaigns
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Fourteen-day closed-testing engagements you&apos;ve launched.
          </p>
        </div>
        <Link href="/app/campaigns/new" className="btn-primary text-sm">
          New campaign
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 border border-dashed border-neutral-300 bg-white p-12 text-center">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          No campaigns yet
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Spin up your first fourteen-day test. Funding happens through Stripe,
          testers are matched within 24 hours.
        </p>
        <Link
          href="/app/campaigns/new"
          className="mt-6 btn-primary inline-flex text-sm"
        >
          Create campaign
        </Link>
      </div>
    </div>
  );
}
