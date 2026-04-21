import { inngest } from "@/lib/inngest";

// Placeholder — real 14-day state machine lands in Sprint 2.
// Each step will be a durable Inngest function so retries and delays survive
// deploys and crashes.

export const campaignStarted = inngest.createFunction(
  {
    id: "campaign-started",
    triggers: [{ event: "campaign/started" }],
  },
  async ({ event, step }) => {
    await step.run("log", async () => {
      console.log("campaign started", event.data);
    });
    return { ok: true };
  }
);

export const functions = [campaignStarted];
