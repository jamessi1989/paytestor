import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Default model for QA triage. Update as newer models ship.
export const QA_MODEL = "claude-sonnet-4-6";
