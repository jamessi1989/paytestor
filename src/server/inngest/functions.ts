import { inngest } from "@/lib/inngest";
import { db } from "@/lib/db";
import {
  assignReplacement,
  closeCampaign,
  findReplacementTester,
  markCampaignRunning,
  markTesterDropped,
  materializeAssignments,
  sendDayReminder,
} from "@/server/services/lifecycle";

const DAY_MS = 24 * 60 * 60 * 1000;

// Google's closed-testing rule: 12 testers for 14 continuous days. We send
// structured nudges at day 1, 4, 9, 13 — spaced so telemetry looks organic
// to Play's review pipeline — then close on day 14.
//
// Durable execution: Inngest persists the step results, so sleeps survive
// deploys and crashes. Never reference `new Date()` or wall-clock in step
// bodies that could run on a retry — use step inputs instead.
export const campaignLifecycle = inngest.createFunction(
  { id: "campaign-lifecycle", triggers: [{ event: "campaign/started" }] },
  async ({ event, step }) => {
    const campaignId = event.data.campaignId as string;

    const startAt = await step.run("load-start-date", async () => {
      const c = await db.campaign.findUniqueOrThrow({
        where: { id: campaignId },
        select: { startDate: true },
      });
      if (!c.startDate) throw new Error(`Campaign ${campaignId} has no startDate`);
      return c.startDate.toISOString();
    });

    const start = new Date(startAt);

    await step.run("materialize-assignments", () =>
      materializeAssignments(campaignId)
    );
    await step.run("mark-running", () => markCampaignRunning(campaignId));

    await step.sleepUntil("wait-day-1", new Date(start.getTime() + 1 * DAY_MS));
    await step.run("remind-install", () =>
      sendDayReminder(campaignId, "INSTALL")
    );

    await step.sleepUntil("wait-day-4", new Date(start.getTime() + 4 * DAY_MS));
    await step.run("remind-text-review", () =>
      sendDayReminder(campaignId, "TEXT_REVIEW")
    );

    await step.sleepUntil("wait-day-9", new Date(start.getTime() + 9 * DAY_MS));
    await step.run("remind-recording", () =>
      sendDayReminder(campaignId, "SCREEN_RECORDING")
    );

    await step.sleepUntil(
      "wait-day-13",
      new Date(start.getTime() + 13 * DAY_MS)
    );
    await step.run("remind-bug-report", () =>
      sendDayReminder(campaignId, "BUG_REPORT")
    );

    await step.sleepUntil(
      "wait-day-14",
      new Date(start.getTime() + 14 * DAY_MS)
    );
    await step.run("close", () => closeCampaign(campaignId));

    return { campaignId, status: "COMPLETE" };
  }
);

// Drop-outs are reported by the admin or inferred by missed deadlines. We
// mark the slot DROPPED and attempt a region/language-matched replacement;
// if none available the campaign runs short and the report reflects it.
export const handleDropOut = inngest.createFunction(
  { id: "tester-drop-out", triggers: [{ event: "tester/dropped-out" }] },
  async ({ event, step }) => {
    const { campaignId, testerId, replacementGmail } = event.data as {
      campaignId: string;
      testerId: string;
      replacementGmail?: string;
    };

    await step.run("mark-dropped", () => markTesterDropped(campaignId, testerId));

    const replacement = await step.run("find-replacement", () =>
      findReplacementTester(campaignId)
    );

    if (!replacement || !replacementGmail) {
      return { replaced: false, reason: "no-eligible-tester-or-gmail" };
    }

    await step.run("assign-replacement", () =>
      assignReplacement(campaignId, replacement.id, replacementGmail)
    );

    return { replaced: true, replacementTesterId: replacement.id };
  }
);

export const functions = [campaignLifecycle, handleDropOut];
