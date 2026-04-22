"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireDeveloper } from "@/lib/auth";
import { devToolsEnabled } from "@/lib/dev-flags";
import {
  closeCampaign,
  markCampaignRunning,
  sendDayReminder,
} from "@/server/services/lifecycle";
import type { TaskType } from "@prisma/client";

// Dev-only server actions. Every one fails closed via devToolsEnabled() so a
// prod deploy cannot invoke them by URL fuzzing.
function assertDev() {
  if (!devToolsEnabled()) {
    throw new Error("Dev tools disabled");
  }
}

async function assertOwns(campaignId: string) {
  const { developer } = await requireDeveloper();
  const campaign = await db.campaign.findFirst({
    where: { id: campaignId, developerId: developer.id },
    select: { id: true },
  });
  if (!campaign) throw new Error("Not found");
}

// Fires the day-N lifecycle step inline. Mirrors the Inngest function body
// minus the sleep — lets the developer walk the timeline in seconds.
export async function devAdvanceToDay(
  campaignId: string,
  dayIndex: 1 | 4 | 9 | 13 | 14
) {
  assertDev();
  await assertOwns(campaignId);

  if (dayIndex === 14) {
    await closeCampaign(campaignId);
    revalidatePath(`/app/campaigns/${campaignId}`);
    return { ok: true, at: "CLOSED" };
  }

  // Day 1 also transitions RECRUITING → RUNNING the first time it's hit.
  if (dayIndex === 1) {
    await markCampaignRunning(campaignId);
  }

  const typeByDay: Record<number, TaskType> = {
    1: "INSTALL",
    4: "TEXT_REVIEW",
    9: "SCREEN_RECORDING",
    13: "BUG_REPORT",
  };
  const result = await sendDayReminder(campaignId, typeByDay[dayIndex]);
  revalidatePath(`/app/campaigns/${campaignId}`);
  return { ok: true, at: typeByDay[dayIndex], recipients: result.recipients.length };
}

// Simulates a tester submitting a deliverable. Creates (or refreshes) the
// Submission row with placeholder content and auto-approves — good enough to
// exercise the downstream QA/report UI without touching R2 or Claude yet.
export async function devFakeSubmit(assignmentId: string) {
  assertDev();
  const assignment = await db.assignment.findUniqueOrThrow({
    where: { id: assignmentId },
    include: { task: { include: { campaign: true } } },
  });
  const { developer } = await requireDeveloper();
  if (assignment.task.campaign.developerId !== developer.id) {
    throw new Error("Not found");
  }

  const contentText =
    assignment.task.type === "TEXT_REVIEW"
      ? "Onboarding was mostly clear — the signup flow felt fast. One friction point was the permission prompt on step 3; it wasn't obvious why location was needed. Suggestion: inline explainer copy above each permission."
      : assignment.task.type === "BUG_REPORT"
        ? "Bug: app crashes on rotation from portrait → landscape on the settings screen. Repro: open settings, rotate device. Expected: layout reflows. Actual: black screen, app backgrounds itself. Pixel 7, Android 15."
        : `Simulated ${assignment.task.type} submission for dev iteration.`;

  const contentUrl =
    assignment.task.type === "SCREEN_RECORDING"
      ? "https://example.test/fake-recording.mp4"
      : assignment.task.type === "INSTALL"
        ? "https://example.test/fake-install-screenshot.png"
        : null;

  await db.submission.upsert({
    where: { assignmentId },
    create: {
      assignmentId,
      contentType: assignment.task.type,
      contentText,
      contentUrl,
      qaStatus: "LLM_APPROVED",
      llmScore: 0.92,
      llmRationale: "Dev stub — skipped Claude grading.",
      reviewedAt: new Date(),
    },
    update: {
      contentText,
      contentUrl,
      qaStatus: "LLM_APPROVED",
      reviewedAt: new Date(),
    },
  });

  await db.assignment.update({
    where: { id: assignmentId },
    data: { status: "APPROVED" },
  });

  revalidatePath(`/app/campaigns/${assignment.task.campaignId}`);
  return { ok: true };
}

// Nukes all derived state for a campaign (assignments, submissions, tester
// slots, tasks) so the developer can re-run the full loop without creating a
// new campaign each time.
export async function devResetCampaign(campaignId: string) {
  assertDev();
  await assertOwns(campaignId);

  await db.$transaction(async (tx) => {
    await tx.submission.deleteMany({
      where: { assignment: { task: { campaignId } } },
    });
    await tx.assignment.deleteMany({ where: { task: { campaignId } } });
    await tx.task.deleteMany({ where: { campaignId } });
    await tx.campaignTester.deleteMany({ where: { campaignId } });
    await tx.campaign.update({
      where: { id: campaignId },
      data: {
        status: "DRAFT",
        startDate: null,
        endDate: null,
        escrowBalanceCents: 0,
      },
    });
  });

  revalidatePath(`/app/campaigns/${campaignId}`);
  return { ok: true };
}
