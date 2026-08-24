import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { apiRequest } from "../lib/api";

export default function Settings() {
  const [plan, setPlan] = useState("free");
  const [interval, setInterval] = useState("monthly");
  const [emailPrefs, setEmailPrefs] = useState({ weeklyDigest: true, quarterEndNudge: true, weeklyPractice: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const profile = await apiRequest("/users/profile");
        setPlan(profile.planTier);
        setInterval(profile.subscriptionInterval || "monthly");
        const prefs = await apiRequest("/email-preferences");
        setEmailPrefs(prefs);
      } catch { /* not logged in */ }
      finally { setLoading(false); }
    }
    load();
  }, []);

  async function handleUpgrade(p: "basic" | "pro", i: "monthly" | "annual") {
    const data = await apiRequest("/billing/create-checkout-session", { method: "POST", body: JSON.stringify({ plan: p, interval: i }) });
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

  if (loading) return <div className="sg-container" style={{ padding: "32px" }}>Loading...</div>;

  return (
    <>
      <Helmet><title>Settings — ScholarGuide</title></Helmet>
      <div className="sg-container" style={{ padding: "32px 16px", maxWidth: "640px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "24px", color: "var(--text)" }}>Settings</h1>

        {/* Current Plan */}
        <div className="clay-card" style={{ padding: "24px", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px", color: "var(--text)" }}>Current Plan</h2>
          <p style={{ fontSize: "16px", color: "var(--text-muted)", marginBottom: "16px" }}>
            Plan: <strong style={{ color: "var(--text)" }} className="capitalize">{plan}</strong> ({interval})
          </p>
          {plan === "free" && (
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button onClick={() => handleUpgrade("basic", "monthly")} className="btn-primary" style={{ fontSize: "14px" }}>Upgrade to Basic — $14/mo</button>
              <button onClick={() => handleUpgrade("pro", "monthly")} className="btn-cta" style={{ fontSize: "14px" }}>Upgrade to Pro — $24/mo</button>
            </div>
          )}
          {plan !== "free" && (
            <button onClick={openPortal} className="btn-secondary" style={{ fontSize: "14px" }}>Manage in Stripe Portal</button>
          )}
        </div>

        {/* Email Preferences */}
        <div className="clay-card" style={{ padding: "24px", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px", color: "var(--text)" }}>Email Preferences</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {([
              ["weeklyDigest", "Weekly digest (what my child worked on this week)"],
              ["quarterEndNudge", "Quarter-end nudge (time for new diagnostic)"],
              ["weeklyPractice", "Weekly practice reminder"],
            ] as const).map(([key, label]) => (
              <label key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "15px", color: "var(--text)", cursor: "pointer", minHeight: "44px" }}>
                <span>{label}</span>
                <input type="checkbox" checked={emailPrefs[key]}
                  onChange={(e) => updateEmailPref(key, e.target.checked)}
                  style={{ width: "20px", height: "20px", accentColor: "var(--primary)" }} />
              </label>
            ))}
          </div>
        </div>

        {/* Account */}
        <div className="clay-card" style={{ padding: "24px", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px", color: "var(--text)" }}>Account</h2>
          <div style={{ display: "flex", gap: "16px" }}>
            <button onClick={() => window.location.href = "/api/account/export"} className="btn-secondary" style={{ fontSize: "14px" }}>Export my data</button>
            <button onClick={async () => {
              if (confirm("This permanently deletes your account and all data. This cannot be undone.")) {
                await apiRequest("/account", { method: "DELETE" });
                localStorage.removeItem("sg_token");
                window.location.href = "/";
              }
            }} style={{
              fontSize: "14px", padding: "10px 16px", borderRadius: "12px", cursor: "pointer",
              background: "rgba(234,34,97,0.1)", color: "var(--ruby)", border: "3px solid var(--border-dark)",
            }}>Delete my account</button>
          </div>
        </div>
      </div>
    </>
  );
}
