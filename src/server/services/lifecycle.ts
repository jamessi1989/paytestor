import { db } from "@/lib/db";
import { TaskType } from "@prisma/client";

// Lifecycle operations invoked by Inngest durable workflows.
// Email sending is stubbed — real Resend wiring lands once tester accounts
// exist. The DB writes are real so admin/dev UIs reflect accurate state.

export async function markCampaignRunning(campaignId: string) {
  return db.campaign.update({
    where: { id: campaignId },
    data: { status: "RUNNING" },
  });
}

// Create Assignments for every (Task × CampaignTester) pair in a campaign.
// Idempotent via the unique(taskId, testerId) index: re-runs skip dupes.
export async function materializeAssignments(campaignId: string) {
  const campaign = await db.campaign.findUniqueOrThrow({
    where: { id: campaignId },
    include: {
      tasks: true,
      campaignTesters: { where: { status: { in: ["ASSIGNED", "ACTIVE"] } } },
    },
  });

  if (!campaign.startDate) {
    throw new Error(`Campaign ${campaignId} has no startDate`);
  }

  const dayMs = 24 * 60 * 60 * 1000;
  const rows = campaign.tasks.flatMap((task) =>
    campaign.campaignTesters.map((ct) => ({
      taskId: task.id,
      testerId: ct.testerId,
      dueAt: new Date(campaign.startDate!.getTime() + task.dayIndex * dayMs),
    }))
  );

  if (rows.length === 0) return { created: 0 };

  const result = await db.assignment.createMany({
    data: rows,
    skipDuplicates: true,
  });
  return { created: result.count };
}

export async function sendDayReminder(campaignId: string, taskType: TaskType) {
  const assignments = await db.assignment.findMany({
    where: {
      task: { campaignId, type: taskType },
      status: { in: ["SCHEDULED", "DUE"] },
    },
    include: { tester: { include: { user: true } }, task: true },
  });

  // Real email send via Resend slots in here once we have tester email +
  // template. For now mark them DUE and log — Inngest captures the output.
  await db.assignment.updateMany({
    where: { id: { in: assignments.map((a) => a.id) } },
    data: { status: "DUE" },
  });

  return {
    campaignId,
    taskType,
    recipients: assignments.map((a) => a.tester.user.email),
  };
}

export async function closeCampaign(campaignId: string) {
  // Expire any still-scheduled assignments; the report is generated separately.
  await db.assignment.updateMany({
    where: {
      task: { campaignId },
      status: { in: ["SCHEDULED", "DUE"] },
    },
    data: { status: "EXPIRED" },
  });

  return db.campaign.update({
    where: { id: campaignId },
    data: { status: "COMPLETE" },
  });
}

// Tester replacement: pick the first KYC-verified tester matching the
// campaign's region/language who isn't already on this campaign.
export async function findReplacementTester(campaignId: string) {
  const campaign = await db.campaign.findUniqueOrThrow({
    where: { id: campaignId },
  });

  return db.tester.findFirst({
    where: {
      kycStatus: "VERIFIED",
      region: campaign.targetRegion,
      language: campaign.targetLanguage,
      campaignTesters: { none: { campaignId } },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function markTesterDropped(
  campaignId: string,
  testerId: string
) {
  return db.campaignTester.updateMany({
    where: { campaignId, testerId },
    data: { status: "DROPPED", droppedAt: new Date() },
  });
}

export async function assignReplacement(
  campaignId: string,
  testerId: string,
  gmailAddress: string
) {
  await db.campaignTester.create({
    data: {
      campaignId,
      testerId,
      gmailAddress,
      status: "ASSIGNED",
    },
  });
  // Re-materialize assignments so the new tester picks up every remaining day.
  return materializeAssignments(campaignId);
}
