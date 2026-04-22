// Single source of truth for dev-mode toggles. Any path gated on these MUST
// also refuse to run in production — the checks here fail closed.
export function devBypassStripe(): boolean {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.DEV_BYPASS_STRIPE === "true"
  );
}

export function devToolsEnabled(): boolean {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.DEV_BYPASS_STRIPE === "true"
  );
}
