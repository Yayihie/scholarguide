import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { apiRequest } from "../lib/api";

export default function Settings() {
  const [plan, setPlan] = useState<string>("free");
  const [interval, setInterval] = useState<string>("monthly");
  const [emailPrefs, setEmailPrefs] = useState({ weeklyDigest: true, quarterEndNudge: true, weeklyPractice: true });
  const [loading, setLoading] = useState(true);
  const [portalUrl, setPortalUrl] = useState<string | null>(null);
  const [annualSavings, setAnnualSavings] = useState<{ eligible: boolean; savings: number } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const profile = await apiRequest("/users/profile");
        setPlan(profile.planTier);
        setInterval(profile.subscriptionInterval || "monthly");
        const prefs = await apiRequest("/email-preferences");
        setEmailPrefs(prefs);
        const savings = await apiRequest("/billing/annual-savings");
        setAnnualSavings(savings);
      } catch {
        // Not logged in — show defaults
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleUpgrade(plan: "basic" | "pro", interval: "monthly" | "annual") {
    const data = await apiRequest("/billing/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ plan, interval }),
    });
    window.location.href = data.url;
  }

  async function openPortal() {
    const data = await apiRequest("/billing/portal-session", { method: "POST" });
    window.location.href = data.url;
  }

  async function updateEmailPref(key: keyof typeof emailPrefs, value: boolean) {
    const updated = { ...emailPrefs, [key]: value };
    setEmailPrefs(updated);
    await apiRequest("/email-preferences", { method: "PUT", body: JSON.stringify(updated) });
  }

  if (loading) return <div className="max-w-2xl mx-auto px-6 py-8">Loading...</div>;

  return (
    <>
      <Helmet>
        <title>Settings — ScholarGuide</title>
      </Helmet>
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Current Plan */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Current Plan</h2>
          <p className="text-gray-600 mb-2">
            Plan: <strong className="capitalize">{plan}</strong> ({interval})
          </p>

          {/* Annual upsell card — shown to monthly subscribers */}
          {plan !== "free" && interval === "monthly" && annualSavings?.eligible && (
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg mt-4">
              <h3 className="font-semibold text-indigo-900">Switch to Annual & Save ${annualSavings.savings}/year</h3>
              <p className="text-sm text-indigo-700 mt-1 mb-3">
                You're currently on monthly billing. Switch to annual and save ${annualSavings.savings} per year —
                that's like getting over a month free.
              </p>
              <button
                onClick={openPortal}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700"
              >
                Switch to Annual
              </button>
              <p className="text-xs text-indigo-500 mt-2">Opens Stripe Customer Portal to change your plan.</p>
            </div>
          )}

          {plan === "free" && (
            <div className="flex gap-3 mt-4">
              <button onClick={() => handleUpgrade("basic", "monthly")} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
                Upgrade to Basic ($14/mo)
              </button>
              <button onClick={() => handleUpgrade("pro", "monthly")} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
                Upgrade to Pro ($24/mo)
              </button>
            </div>
          )}

          {plan !== "free" && (
            <button onClick={openPortal} className="text-sm text-indigo-600 underline mt-3">
              Manage subscription in Stripe Portal
            </button>
          )}
        </section>

        {/* Email Preferences */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Email Preferences</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span>Weekly digest (what my child worked on this week)</span>
              <input
                type="checkbox"
                checked={emailPrefs.weeklyDigest}
                onChange={(e) => updateEmailPref("weeklyDigest", e.target.checked)}
                className="w-5 h-5"
              />
            </label>
            <label className="flex items-center justify-between">
              <span>Quarter-end nudge (time for new diagnostic)</span>
              <input
                type="checkbox"
                checked={emailPrefs.quarterEndNudge}
                onChange={(e) => updateEmailPref("quarterEndNudge", e.target.checked)}
                className="w-5 h-5"
              />
            </label>
            <label className="flex items-center justify-between">
              <span>Weekly practice reminder</span>
              <input
                type="checkbox"
                checked={emailPrefs.weeklyPractice}
                onChange={(e) => updateEmailPref("weeklyPractice", e.target.checked)}
                className="w-5 h-5"
              />
            </label>
          </div>
        </section>

        {/* Account */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.href = "/api/account/export"}
              className="text-sm text-indigo-600 underline"
            >
              Export my data
            </button>
            <button
              onClick={async () => {
                if (confirm("This permanently deletes your account and all data. This cannot be undone.")) {
                  await apiRequest("/account", { method: "DELETE" });
                  localStorage.removeItem("sg_token");
                  window.location.href = "/";
                }
              }}
              className="text-sm text-red-600 underline"
            >
              Delete my account
            </button>
          </div>
        </section>

        {/* Integrations note */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Integrations</h2>
          <p className="text-sm text-gray-500">PostHog analytics, Resend email, Stripe billing, Gemini AI — configured server-side.</p>
        </section>
      </div>
    </>
  );
}
