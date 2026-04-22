import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Circle, Clock } from "lucide-react";
import { requireDeveloper } from "@/lib/auth";
import { getCampaignForDeveloper } from "@/server/services/campaigns";
import { formatCurrency } from "@/lib/utils";
import { CAMPAIGN_DURATION_DAYS } from "@/lib/pricing";
import { devToolsEnabled } from "@/lib/dev-flags";
import { DevTools } from "./dev-tools";

type Props = { params: Promise<{ id: string }> };

export default async function CampaignDetailPage({ params }: Props) {
  const { id } = await params;
  const { developer } = await requireDeveloper();
  const campaign = await getCampaignForDeveloper(developer.id, id);
  if (!campaign) notFound();

  const showDev = devToolsEnabled();

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

      {showDev && (
        <DevTools
          campaignId={campaign.id}
          status={campaign.status}
          hasTasks={campaign.tasks.length > 0}
          assignments={campaign.tasks.flatMap((t) =>
            t.assignments.map((a) => ({
              id: a.id,
              taskType: t.type,
              dayIndex: t.dayIndex,
              status: a.status,
              testerName: a.tester.user.name ?? a.tester.user.email,
            }))
          )}
        />
      )}

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
            campaign.tasks.map((task) => {
              const submitted = task.assignments.filter(
                (a) => a.status === "SUBMITTED" || a.status === "APPROVED"
              ).length;
              const due = task.assignments.filter((a) => a.status === "DUE").length;
              return (
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
                    {task.assignments.length > 0 && (
                      <div className="mt-3 flex gap-3 text-xs text-neutral-500">
                        <span>{submitted} submitted</span>
                        <span>·</span>
                        <span>{due} due</span>
                        <span>·</span>
                        <span>{task.assignments.length} total</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-neutral-500">
                    {formatCurrency(task.rewardCents)} / tester
                  </span>
                </div>
              );
            })
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          Crew ({campaign.campaignTesters.length})
        </h2>
        {campaign.campaignTesters.length === 0 ? (
          <div className="mt-4 border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-600">
            No testers assigned yet.
            <br />
            Matching begins once your payment is confirmed.
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto border border-neutral-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="p-3">Tester</th>
                  <th className="p-3">Region</th>
                  {campaign.tasks.map((t) => (
                    <th key={t.id} className="p-3 text-center">
                      D{t.dayIndex}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {campaign.campaignTesters.map((ct) => (
                  <tr key={ct.id}>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(ct.tester.user.name ?? ct.tester.user.email)}`}
                          alt=""
                          className="h-7 w-7"
                          loading="lazy"
                        />
                        <div>
                          <div className="font-medium text-neutral-900">
                            {ct.tester.user.name ?? "—"}
                          </div>
                          <div className="font-mono text-xs text-neutral-500">
                            {ct.gmailAddress}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-xs text-neutral-600">
                      {ct.tester.region} · {ct.tester.language}
                    </td>
                    {campaign.tasks.map((t) => {
                      const a = t.assignments.find(
                        (x) => x.testerId === ct.testerId
                      );
                      return (
                        <td key={t.id} className="p-3 text-center">
                          <AssignmentCell status={a?.status ?? null} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function AssignmentCell({ status }: { status: string | null }) {
  if (!status) return <span className="text-xs text-neutral-300">—</span>;
  const tone: Record<string, string> = {
    SCHEDULED: "bg-neutral-100 text-neutral-600",
    DUE: "bg-highlight-300 text-primary-700",
    SUBMITTED: "bg-accent-300 text-primary-700",
    APPROVED: "bg-accent-400 text-white",
    REJECTED: "bg-red-200 text-red-800",
    EXPIRED: "bg-neutral-200 text-neutral-500",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${tone[status] ?? "bg-neutral-100"}`}
    >
      {status}
    </span>
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
