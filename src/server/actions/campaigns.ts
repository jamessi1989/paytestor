"use server";

import { redirect } from "next/navigation";
import { requireDeveloper } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { devBypassStripe } from "@/lib/dev-flags";
import {
  createCampaignInput,
  createDraftCampaign,
  attachPaymentIntent,
  markCampaignFunded,
  assignTestersToCampaign,
} from "@/server/services/campaigns";
import { materializeAssignments } from "@/server/services/lifecycle";
import { STANDARD_CAMPAIGN_PRICE_CENTS } from "@/lib/pricing";

export async function createCampaignAndCheckout(
  prevState: unknown,
  formData: FormData
) {
  const parsed = createCampaignInput.safeParse({
    appName: formData.get("appName"),
    appPackage: formData.get("appPackage"),
    playStoreUrl: formData.get("playStoreUrl"),
    targetRegion: formData.get("targetRegion"),
    targetLanguage: formData.get("targetLanguage"),
  });
  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues.map((i) => i.message).join("; "),
    };
  }

  const { developer } = await requireDeveloper();
  const campaign = await createDraftCampaign(developer.id, parsed.data);

  // Dev loop: skip Stripe, flip the campaign to FUNDED, assign testers,
  // materialize per-tester assignments. The Inngest lifecycle event is
  // intentionally NOT fired — the dev-tools panel on the detail page walks
  // the timeline manually, and firing it would double-advance state if the
  // Inngest dev server is also running.
  if (devBypassStripe()) {
    await markCampaignFunded(campaign.id);
    await assignTestersToCampaign(campaign.id);
    await materializeAssignments(campaign.id);
    redirect(`/app/campaigns/${campaign.id}?paid=1&bypass=1`);
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Crewqa 14-day closed test — ${campaign.appName}`,
            description:
              "12 verified testers, 4 structured deliverables, 1 exportable report.",
          },
          unit_amount: STANDARD_CAMPAIGN_PRICE_CENTS,
        },
        quantity: 1,
      },
    ],
    client_reference_id: campaign.id,
    metadata: { campaignId: campaign.id },
    success_url: `${baseUrl}/app/campaigns/${campaign.id}?paid=1`,
    cancel_url: `${baseUrl}/app/campaigns/new?cancelled=1`,
  });

  if (session.payment_intent) {
    await attachPaymentIntent(campaign.id, session.payment_intent as string);
  }

  if (!session.url) {
    return { ok: false as const, error: "Stripe did not return a checkout URL" };
  }

  redirect(session.url);
}
