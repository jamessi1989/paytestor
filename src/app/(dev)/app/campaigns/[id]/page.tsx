import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Circle, Clock } from "lucide-react";
import { requireDeveloper } from "@/lib/auth";
import { getCampaignForDeveloper } from "@/server/services/campaigns";
import { formatCurrency } from "@/lib/utils";
import { CAMPAIGN_DURATION_DAYS } from "@/lib/pricing";

type Props = { params: Promise<{ id: string }> };

export default async function CampaignDetailPage({ params }: Props) {
  const { id } = await params;
  const { developer } = await requireDeveloper();
  const campaign = await getCampaignForDeveloper(developer.id, id);
  if (!campaign) notFound();

  return (
    <div className="container-page py-10">
      <Link
        href="/app"
        className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-primary-500"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to campaigns
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">
            {campaign.appName}
          </h1>
          <p className="mt-1 font-mono text-xs text-neutral-500">
            {campaign.appPackage}
          </p>
        </div>
        <StatusPill status={campaign.status} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Stat label="Testers" value={`${campaign.campaignTesters.length} / 12`} />
        <Stat label="Deliverables" value={`${campaign.tasks.length}`} />
        <Stat
          label="Escrow"
          value={formatCurrency(campaign.escrowBalanceCents)}
        />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          {CAMPAIGN_DURATION_DAYS}-day timeline
        </h2>
        <div className="mt-4 divide-y divide-neutral-200 border border-neutral-200 bg-white">
          {campaign.tasks.length === 0 ? (
            <p className="p-6 text-sm text-neutral-600">
              Tasks will be scheduled once payment clears.
            </p>
          ) : (
            campaign.tasks.map((task) => (
              <div key={task.id} className="flex items-start gap-4 p-5">
                <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center bg-primary-500 text-xs font-bold text-white">
                  D{task.dayIndex}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold uppercase tracking-wider text-accent-500">
                    {task.type.replace("_", " ").toLowerCase()}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-700">
                    {task.description}
                  </p>
                </div>
                <span className="text-xs text-neutral-500">
                  {formatCurrency(task.rewardCents)} / tester
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          Testers
        </h2>
        <div className="mt-4 border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-600">
          {campaign.campaignTesters.length === 0 ? (
            <>
              No testers assigned yet.
              <br />
              Matching begins once your payment is confirmed.
            </>
          ) : (
            <>Tester list UI ships in Sprint 3.</>
          )}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-neutral-200 bg-white p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {label}
      </div>
      <div className="mt-2 font-display text-2xl font-bold text-neutral-900">
        {value}
      </div>
    </div>
  );
}

const STATUS_TONE: Record<string, { label: string; tone: string; icon: React.ReactNode }> = {
  DRAFT: { label: "Draft", tone: "bg-neutral-200 text-neutral-700", icon: <Circle className="h-3 w-3" /> },
  AWAITING_PAYMENT: { label: "Awaiting payment", tone: "bg-highlight-300 text-primary-700", icon: <Clock className="h-3 w-3" /> },
  FUNDED: { label: "Funded", tone: "bg-accent-300 text-primary-700", icon: <Check className="h-3 w-3" /> },
  RECRUITING: { label: "Recruiting", tone: "bg-accent-300 text-primary-700", icon: <Clock className="h-3 w-3" /> },
  RUNNING: { label: "Running", tone: "bg-accent-400 text-white", icon: <Clock className="h-3 w-3" /> },
  COMPLETE: { label: "Complete", tone: "bg-primary-500 text-white", icon: <Check className="h-3 w-3" /> },
  CANCELLED: { label: "Cancelled", tone: "bg-neutral-200 text-neutral-600", icon: <Circle className="h-3 w-3" /> },
};

function StatusPill({ status }: { status: string }) {
  const s = STATUS_TONE[status] ?? STATUS_TONE.DRAFT;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold ${s.tone}`}
    >
      {s.icon}
      {s.label}
    </span>
  );
}
