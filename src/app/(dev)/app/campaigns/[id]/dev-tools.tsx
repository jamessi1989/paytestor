"use client";

import { useState, useTransition } from "react";
import { Zap, Check, RotateCcw } from "lucide-react";
import {
  devAdvanceToDay,
  devFakeSubmit,
  devResetCampaign,
} from "@/server/actions/dev";

type Assignment = {
  id: string;
  taskType: string;
  dayIndex: number;
  status: string;
  testerName: string;
};

type Props = {
  campaignId: string;
  status: string;
  hasTasks: boolean;
  assignments: Assignment[];
};

const DAYS: Array<{ day: 1 | 4 | 9 | 13 | 14; label: string }> = [
  { day: 1, label: "Day 1 — remind INSTALL" },
  { day: 4, label: "Day 4 — remind TEXT_REVIEW" },
  { day: 9, label: "Day 9 — remind SCREEN_RECORDING" },
  { day: 13, label: "Day 13 — remind BUG_REPORT" },
  { day: 14, label: "Day 14 — close campaign" },
];

export function DevTools({ campaignId, hasTasks, assignments }: Props) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const dueAssignments = assignments.filter(
    (a) => a.status === "DUE" || a.status === "SCHEDULED"
  );

  function run(label: string, fn: () => Promise<unknown>) {
    setMessage(null);
    startTransition(async () => {
      try {
        await fn();
        setMessage(`✓ ${label}`);
      } catch (e) {
        setMessage(`✗ ${label}: ${(e as Error).message}`);
      }
    });
  }

  return (
    <section className="mt-8 border-2 border-dashed border-accent-500 bg-accent-300/20 p-5">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-accent-500" />
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-primary-700">
          Dev tools · DEV_BYPASS_STRIPE active
        </h3>
      </div>
      <p className="mt-1 text-xs text-neutral-600">
        Skips real Stripe + Inngest sleeps. None of this runs in production.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Advance lifecycle
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {DAYS.map((d) => (
              <button
                key={d.day}
                type="button"
                disabled={pending || !hasTasks}
                onClick={() =>
                  run(d.label, () => devAdvanceToDay(campaignId, d.day))
                }
                className="group flex items-center justify-between border border-neutral-200 bg-white px-3 py-2 text-left text-xs hover:border-accent-500 disabled:opacity-50"
              >
                <span>{d.label}</span>
                <Check className="h-3 w-3 opacity-0 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Fake submissions ({dueAssignments.length} available)
            </div>
            {dueAssignments.length > 0 && (
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  run(`Submitted ${dueAssignments.length}`, async () => {
                    for (const a of dueAssignments) await devFakeSubmit(a.id);
                  })
                }
                className="text-[10px] font-bold uppercase tracking-wider text-accent-500 hover:text-primary-500"
              >
                Submit all
              </button>
            )}
          </div>
          <div className="mt-2 max-h-48 overflow-y-auto border border-neutral-200 bg-white">
            {dueAssignments.length === 0 ? (
              <div className="p-3 text-xs text-neutral-500">
                No DUE / SCHEDULED assignments. Advance a day first.
              </div>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {dueAssignments.slice(0, 10).map((a) => (
                  <li key={a.id} className="flex items-center justify-between p-2 text-xs">
                    <span className="truncate">
                      D{a.dayIndex} · {a.taskType} · {a.testerName}
                    </span>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() =>
                        run(`Submitted ${a.testerName}`, () =>
                          devFakeSubmit(a.id)
                        )
                      }
                      className="ml-2 border border-neutral-300 px-2 py-0.5 text-[10px] font-semibold hover:border-accent-500"
                    >
                      Submit
                    </button>
                  </li>
                ))}
                {dueAssignments.length > 10 && (
                  <li className="p-2 text-center text-[10px] text-neutral-400">
                    +{dueAssignments.length - 10} more
                  </li>
                )}
              </ul>
            )}
          </div>

          <button
            type="button"
            disabled={pending}
            onClick={() =>
              run("Reset campaign", () => devResetCampaign(campaignId))
            }
            className="mt-3 inline-flex items-center gap-1.5 border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
          >
            <RotateCcw className="h-3 w-3" />
            Reset campaign (wipe tasks + submissions)
          </button>
        </div>
      </div>

      {message && (
        <div className="mt-3 text-xs font-mono text-neutral-700">{message}</div>
      )}
    </section>
  );
}
