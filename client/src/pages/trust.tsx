import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Trust() {
  return (
    <>
      <Helmet>
        <title>How We Protect Your Child's Data — ScholarGuide</title>
        <meta name="description" content="Plain-language explanation of how ScholarGuide protects your child's data." />
      </Helmet>
      <div className="sg-container" style={{ padding: "32px 16px", maxWidth: "640px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px", color: "var(--text)" }}>How We Protect Your Child's Data</h1>
        <p style={{ fontSize: "18px", color: "var(--text-muted)", marginBottom: "32px" }}>
          We know you're trusting us with information about your child. This page explains what we do with that information in plain language.
        </p>

        {[
          { title: "What we collect", items: [
            "Your email and password (encrypted) for account access.",
            "Your child's first name and grade level — that's it.",
            "Diagnostic results and practice session data for growth tracking.",
            "Billing information is handled by Stripe — we never see your card.",
          ]},
          { title: "What we never do", items: [
            "We never sell your data. Not to anyone, ever.",
            "We never share your child's data with advertisers or data brokers.",
            "We never use your child's data to train AI models.",
            "We never post anything publicly about your child.",
          ]},
          { title: "How to delete everything", items: [
            "Go to Settings → Delete my account.",
            "You'll see a confirmation dialog. Once confirmed, all data is deleted within seconds.",
            "You can also export all your data as a JSON file before deleting.",
          ]},
        ].map((section) => (
          <div key={section.title} className="clay-card" style={{ padding: "24px", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px", color: "var(--text)" }}>{section.title}</h2>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {section.items.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "15px", color: "var(--text-muted)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* COPPA/FERPA */}
        <div className="clay-card" style={{ padding: "24px", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px", color: "var(--text)" }}>COPPA & FERPA</h2>
          <p style={{ fontSize: "15px", color: "var(--text-muted)", marginBottom: "12px" }}>
            <strong style={{ color: "var(--text)" }}>COPPA:</strong> ScholarGuide is designed for parents and educators to use on behalf of children. We don't collect personal information directly from children under 13. We only store the child's first name and grade level.
          </p>
          <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--text)" }}>FERPA:</strong> ScholarGuide is not a school and doesn't receive educational records from schools. We don't maintain educational records in the FERPA sense.
          </p>
        </div>

        {/* Security */}
        <div className="clay-card" style={{ padding: "24px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px", color: "var(--text)" }}>Data Security</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {["Passwords hashed with bcrypt", "All traffic encrypted (HTTPS)", "Helmet security headers", "Rate limiting on auth", "Access-controlled database", "No card data stored"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="clay-card" style={{ padding: "28px", textAlign: "center", background: "var(--accent-purple)" }}>
          <p style={{ fontSize: "16px", color: "var(--text)", marginBottom: "16px" }}>Ready to see your child's growth?</p>
          <Link to="/quick-check" className="btn-primary" style={{ fontSize: "15px" }}>Try the Free Reading Check</Link>
        </div>
      </div>
    </>
  );
}
