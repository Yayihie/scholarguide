// client/src/lib/analytics.ts — PostHog analytics wrapper
// Uses trackEvent for all events; gracefully no-ops if PostHog isn't loaded.

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.capture(eventName, properties);
  } else {
    console.log(`[analytics] ${eventName}`, properties || "");
  }
}
