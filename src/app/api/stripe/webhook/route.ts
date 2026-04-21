import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { inngest } from "@/lib/inngest";
import { markCampaignFunded } from "@/server/services/campaigns";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe webhook secret not configured" },
      { status: 500 }
    );
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "bad signature";
    return NextResponse.json({ error: `Webhook error: ${msg}` }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const campaignId =
        session.metadata?.campaignId ?? session.client_reference_id;
      if (!campaignId) {
        return NextResponse.json(
          { error: "No campaign id on session" },
          { status: 400 }
        );
      }
      await markCampaignFunded(campaignId);
      await inngest.send({
        name: "campaign/started",
        data: { campaignId },
      });
      break;
    }
    default:
      // Unhandled event types are fine; Stripe expects a 2xx regardless.
      break;
  }

  return NextResponse.json({ received: true });
}
