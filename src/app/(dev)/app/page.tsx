import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { requireDeveloper } from "@/lib/auth";
import { listDeveloperCampaigns } from "@/server/services/campaigns";
import { formatCurrency } from "@/lib/utils";

export default async function DevDashboard() {
  const configured = isSupabaseConfigured();
  let campaigns: Awaited<ReturnType<typeof listDeveloperCampaigns>> = [];
  if (configured) {
    const { developer } = await requireDeveloper();
    campaigns = await listDeveloperCampaigns(developer.id);
  }

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

      {!configured ? (
        <InfraBanner />
      ) : campaigns.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="mt-10 divide-y divide-neutral-200 border border-neutral-200 bg-white">
          {campaigns.map((c) => (
            <li key={c.id}>
              <Link
                href={`/app/campaigns/${c.id}`}
                className="flex items-center justify-between p-5 hover:bg-neutral-50"
              >
                <div>
                  <div className="font-display font-bold text-neutral-900">
                    {c.appName}
                  </div>
                  <div className="mt-0.5 font-mono text-xs text-neutral-500">
                    {c.appPackage}
                  </div>
                </div>
                <div className="flex items-center gap-6 text-xs text-neutral-600">
                  <span>{c._count.campaignTesters}/12 testers</span>
                  <span>{formatCurrency(c.escrowBalanceCents)} escrow</span>
                  <span className="bg-neutral-100 px-2 py-1 font-semibold uppercase tracking-wider text-neutral-700">
                    {c.status.replace("_", " ")}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EmptyState() {
  return (
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
  );
}

function InfraBanner() {
  return (
    <div className="mt-10 border border-highlight-400 bg-highlight-300/30 p-6">
      <h2 className="font-display text-base font-bold text-primary-700">
        Infrastructure pending setup
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-neutral-700">
        Supabase and Postgres aren&apos;t configured yet, so the campaigns list
        has nothing to show. Fill{" "}
        <code className="bg-white px-1 py-0.5 text-xs">.env</code> with real
        values and restart the dev server to activate the real flow.
      </p>
    </div>
  );
}
