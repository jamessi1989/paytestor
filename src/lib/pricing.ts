// Campaign pricing. Cents everywhere.

export const STANDARD_CAMPAIGN_PRICE_CENTS = 34_900; // $349
export const TESTER_SLOTS_PER_CAMPAIGN = 12;
export const CAMPAIGN_DURATION_DAYS = 14;

// Tester reward per deliverable (4 deliverables × 12 testers = 48 tasks)
// $19 per full campaign / 4 deliverables ≈ $4.75/deliverable.
// Store as a per-deliverable rate; total tester payout = 4 × rate × 12 = $228.
export const TESTER_REWARD_PER_DELIVERABLE_CENTS = 475;
