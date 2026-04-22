import { z } from "zod";
import { db } from "@/lib/db";
import {
  STANDARD_CAMPAIGN_PRICE_CENTS,
  TESTER_REWARD_PER_DELIVERABLE_CENTS,
} from "@/lib/pricing";
import { TaskType } from "@prisma/client";

// ---------- Validation ----------

export const createCampaignInput = z.object({
  appName: z.string().min(2).max(80),
  appPackage: z
    .string()
    .regex(/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/i, "Must be a valid package name")
    .max(120),
  playStoreUrl: z.string().url().optional().or(z.literal("")),
  targetRegion: z.string().min(2).max(40),
  targetLanguage: z.string().min(2).max(40),
});

export type CreateCampaignInput = z.infer<typeof createCampaignInput>;

// ---------- Mutations ----------

export async function createDraftCampaign(
  developerId: string,
  input: CreateCampaignInput
) {
  return db.campaign.create({
    data: {
      developerId,
      appName: input.appName,
      appPackage: input.appPackage,
      playStoreUrl: input.playStoreUrl || null,
      targetRegion: input.targetRegion,
      targetLanguage: input.targetLanguage,
      status: "DRAFT",
      totalFundedCents: STANDARD_CAMPAIGN_PRICE_CENTS,
    },
  });
}

export async function attachPaymentIntent(
  campaignId: string,
  stripePaymentIntentId: string
) {
  return db.campaign.update({
    where: { id: campaignId },
    data: { stripePaymentIntentId, status: "AWAITING_PAYMENT" },
  });
}

const DELIVERABLE_TEMPLATES: Array<{
  dayIndex: number;
  type: TaskType;
  description: string;
}> = [
  {
    dayIndex: 1,
    type: "INSTALL",
    description:
      "Install the app from the closed-testing track, create an account, and confirm the first-run onboarding completes without crashes.",
  },
  {
    dayIndex: 4,
    type: "TEXT_REVIEW",
    description:
      "Write a three-sentence review of the onboarding UI: what was clear, what confused you, one concrete suggestion.",
  },
  {
    dayIndex: 9,
    type: "SCREEN_RECORDING",
    description:
      "Record a 30–90 second screen recording walking through the app's core feature end-to-end.",
  },
  {
    dayIndex: 13,
    type: "BUG_REPORT",
    description:
      "Submit a formal bug, performance observation, or feature request. Include reproduction steps or screenshots where relevant.",
  },
];

export async function markCampaignFunded(campaignId: string) {
  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000);

  return db.$transaction(async (tx) => {
    const campaign = await tx.campaign.update({
      where: { id: campaignId },
      data: {
        status: "FUNDED",
        startDate,
        endDate,
        escrowBalanceCents: STANDARD_CAMPAIGN_PRICE_CENTS,
      },
    });

    await tx.task.createMany({
      data: DELIVERABLE_TEMPLATES.map((t) => ({
        campaignId: campaign.id,
        dayIndex: t.dayIndex,
        type: t.type,
        description: t.description,
        rewardCents: TESTER_REWARD_PER_DELIVERABLE_CENTS,
      })),
    });

    return campaign;
  });
}

const CAMPAIGN_TESTER_COUNT = 12;

// Picks up to 12 KYC-verified testers and attaches them as CampaignTester slots.
// Prefers region+language matches but falls back to any verified tester so the
// dev loop can't stall because a seed combo wasn't populated. Returns the count
// actually assigned (may be < 12 if DB is underpopulated).
export async function assignTestersToCampaign(campaignId: string) {
  const campaign = await db.campaign.findUniqueOrThrow({
    where: { id: campaignId },
  });

  const matched = await db.tester.findMany({
    where: {
      kycStatus: "VERIFIED",
      region: campaign.targetRegion,
      language: campaign.targetLanguage,
      campaignTesters: { none: { campaignId } },
    },
    take: CAMPAIGN_TESTER_COUNT,
    orderBy: { createdAt: "asc" },
  });

  let chosen = matched;
  if (chosen.length < CAMPAIGN_TESTER_COUNT) {
    const fallback = await db.tester.findMany({
      where: {
        kycStatus: "VERIFIED",
        id: { notIn: chosen.map((t) => t.id) },
        campaignTesters: { none: { campaignId } },
      },
      take: CAMPAIGN_TESTER_COUNT - chosen.length,
      orderBy: { createdAt: "asc" },
    });
    chosen = [...chosen, ...fallback];
  }

  if (chosen.length === 0) return { assigned: 0 };

  await db.campaignTester.createMany({
    data: chosen.map((t, i) => ({
      campaignId,
      testerId: t.id,
      gmailAddress: `tester${i + 1}.${campaignId.slice(-6)}@crewqa.test`,
      status: "ASSIGNED",
    })),
    skipDuplicates: true,
  });

  return { assigned: chosen.length };
}

// ---------- Reads ----------

export async function listDeveloperCampaigns(developerId: string) {
  return db.campaign.findMany({
    where: { developerId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { campaignTesters: true, tasks: true } },
    },
  });
}

export async function getCampaignForDeveloper(
  developerId: string,
  campaignId: string
) {
  return db.campaign.findFirst({
    where: { id: campaignId, developerId },
    include: {
      tasks: {
        orderBy: { dayIndex: "asc" },
        include: {
          assignments: {
            include: {
              submission: true,
              tester: { include: { user: true } },
            },
          },
        },
      },
      campaignTesters: {
        include: { tester: { include: { user: true } } },
        orderBy: { assignedAt: "asc" },
      },
    },
  });
}
