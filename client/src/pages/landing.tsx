import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { trackEvent } from "../lib/analytics";

export default function Landing() {
  return (
    <>
      <Helmet>
        <title>ScholarGuide — AI Lesson Plans & Reading Fluency Tracking for K-8</title>
        <meta name="description" content="AI-generated lesson plans for educators. Track your child's reading fluency with quarterly diagnostics and grade-level curriculum. Free reading speed check — no signup needed." />
      </Helmet>

      {/* ===== HERO ===== */}
      <section style={{ background: "var(--bg-cream)", padding: "48px 16px 64px", overflow: "hidden" }}>
        <div className="sg-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", alignItems: "center" }} className="hero-grid">
            {/* Left: copy */}
            <div style={{ textAlign: "center" }} className="hero-left">
              <div className="badge-pill" style={{ background: "var(--accent-mint)", marginBottom: "24px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--cta)" }} />
                AI-Powered Learning
              </div>
              <h1 style={{ fontSize: "36px", fontWeight: 700, lineHeight: 1.1, marginBottom: "16px", color: "var(--text)" }} className="hero-title">
                Is your child reading at grade level?
              </h1>
              <p style={{ fontSize: "18px", color: "var(--text-muted)", marginBottom: "32px", maxWidth: "480px", margin: "0 auto 32px" }}>
                Free 2-minute reading speed check. Get instant results compared to real grade-level benchmarks. No signup required.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
                <Link to="/quick-check" className="btn-primary" style={{ fontSize: "16px", padding: "12px 24px" }}
                  onClick={() => trackEvent("landing_quick_check_clicked")}>
                  Check Now — Free
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link to="/growth-dashboard" className="btn-secondary" style={{ fontSize: "16px", padding: "12px 24px" }}>
                  See Growth Stories
                </Link>
              </div>
              {/* Stats */}
              <div style={{ display: "flex", gap: "32px", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div className="stat-number">8</div>
                  <div className="stat-label">Grade levels</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Free to check</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div className="stat-number">2 min</div>
                  <div className="stat-label">To results</div>
                </div>
              </div>
            </div>

            {/* Right: visual card — reading progress demo */}
            <div style={{ position: "relative" }} className="hero-right">
              <div className="clay-card" style={{ padding: "24px", position: "relative", zIndex: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                  <div className="icon-box" style={{ background: "var(--accent-blue)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text)" }}>Grade 3 — Reading Fluency</div>
                    <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>Emma · Spring Benchmark</div>
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px" }}>
                    <span style={{ color: "var(--text-muted)" }}>Words Per Minute</span>
                    <span style={{ fontWeight: 700, color: "var(--cta)" }}>86 WPM</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: "100%" }} />
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px" }}>
                    <span style={{ color: "var(--text-muted)" }}>Accuracy</span>
                    <span style={{ fontWeight: 700, color: "var(--success)" }}>96%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: "96%", background: "var(--success)" }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                  <span className="badge-pill" style={{ background: "var(--accent-mint)", fontSize: "12px", padding: "4px 10px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success-text)" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    On Track
                  </span>
                  <span className="badge-pill" style={{ background: "var(--accent-purple)", fontSize: "12px", padding: "4px 10px" }}>
                    Grade 3 Target: 86 WPM
                  </span>
                </div>
                <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Start Free Reading Check
                </button>
              </div>

              {/* Floating decorative icons — SVG, not emoji */}
              <div style={{
                position: "absolute", top: "-16px", right: "-16px", zIndex: 20,
                width: "64px", height: "64px", borderRadius: "16px",
                background: "var(--primary)", border: "3px solid var(--border-dark)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "var(--shadow-clay)",
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div style={{
                position: "absolute", bottom: "-16px", left: "-16px", zIndex: 20,
                width: "52px", height: "52px", borderRadius: "14px",
                background: "var(--cta)", border: "3px solid var(--border-dark)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "var(--shadow-clay)",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <section id="trusted-by" className="sg-section" style={{ background: "#fff" }}>
        <div className="sg-container" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "32px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Trusted by parents and educators
          </p>
          <div style={{ display: "flex", gap: "40px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            {["Homeschool Co-ops", "K-8 Classrooms", "Reading Specialists", "Parent Groups"].map((label) => (
              <div key={label} style={{
                fontSize: "18px", fontWeight: 700, color: "var(--text-muted)",
                opacity: 0.7, fontFeatureSettings: '"ss01"',
              }}>{label}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="sg-section" style={{ background: "var(--bg)" }}>
        <div className="sg-container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="badge-pill" style={{ background: "var(--secondary)", marginBottom: "16px" }}>
              Two Tools in One
            </span>
            <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px", color: "var(--text)" }}>
              For Parents and Educators
            </h2>
            <p style={{ fontSize: "18px", color: "var(--text-muted)", maxWidth: "560px", margin: "0 auto" }}>
              Whether you're teaching in a classroom or tracking your own child's growth at home.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="features-grid">
            <div className="clay-card clay-card-hover" style={{ padding: "28px" }}>
              <div className="icon-box" style={{ background: "var(--primary)", marginBottom: "20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L6 17l1.5-3-1.5-3 3.75 0M14.25 17l3.75 0L16.5 14l1.5-3-3.75 0M12 3v18M3 7h18" />
                </svg>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", color: "var(--text)" }}>Educator Planner</h3>
              <p style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                AI-generated lesson plans for any grade K-8 and subject. Materials, procedures, assessments, and differentiation — in seconds.
              </p>
            </div>
            <div className="clay-card clay-card-hover" style={{ padding: "28px" }}>
              <div className="icon-box" style={{ background: "var(--cta)", marginBottom: "20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l4-4 4 4 5-5 3 3M3 21h18M3 10V7a2 2 0 012-2h2m14 5V7a2 2 0 00-2-2h-2" />
                </svg>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", color: "var(--text)" }}>Student Tracker</h3>
              <p style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                Quarterly diagnostics, AI-generated curriculum, and oral reading fluency checks. See exactly where your child stands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="sg-section" style={{ background: "#fff" }}>
        <div className="sg-container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px", color: "var(--text)" }}>Simple Pricing</h2>
            <p style={{ fontSize: "18px", color: "var(--text-muted)" }}>Start free. Upgrade when you're ready.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="pricing-grid">
            {/* Free */}
            <div className="clay-card" style={{ padding: "28px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Free</h3>
              <p style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px", color: "var(--text)" }}>$0<span style={{ fontSize: "16px", fontWeight: 400, color: "var(--text-muted)" }}>/mo</span></p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {["1 student", "Quarterly diagnostics", "Basic curriculum", "Free reading check"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "var(--text-muted)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Basic — popular */}
            <div className="clay-card" style={{ padding: "28px", position: "relative", borderColor: "var(--primary)", borderWidth: "3px" }}>
              <span className="badge-pill" style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "var(--primary)", color: "#fff" }}>
                Popular
              </span>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Basic</h3>
              <p style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px", color: "var(--text)" }}>$14<span style={{ fontSize: "16px", fontWeight: 400, color: "var(--text-muted)" }}>/mo</span></p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {["3 students", "All diagnostics", "Full curriculum", "Practice sessions", "Growth tracking"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "var(--text-muted)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Pro */}
            <div className="clay-card" style={{ padding: "28px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Pro</h3>
              <p style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px", color: "var(--text)" }}>$24<span style={{ fontSize: "16px", fontWeight: 400, color: "var(--text-muted)" }}>/mo</span></p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {["10 students", "Everything in Basic", "Advanced analytics", "Priority support", "All subjects"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "var(--text-muted)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="sg-section" style={{ background: "var(--bg-cream)" }}>
        <div className="sg-container" style={{ maxWidth: "640px" }}>
          <div className="clay-card" style={{ padding: "40px", textAlign: "center" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "12px", color: "var(--text)" }}>
              Ready to see your child's growth?
            </h2>
            <p style={{ fontSize: "18px", color: "var(--text-muted)", marginBottom: "28px", maxWidth: "400px", margin: "0 auto 28px" }}>
              Take the free 2-minute reading check. No signup, no credit card, no commitment.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
              <Link to="/quick-check" className="btn-cta" style={{ fontSize: "16px", padding: "12px 28px" }}
                onClick={() => trackEvent("landing_cta_clicked")}>
                Start Free Reading Check
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "var(--text-muted)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                No signup required
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "var(--text-muted)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Results in 2 minutes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "var(--bg-cream)", padding: "48px 16px", borderTop: "3px solid var(--border)" }}>
        <div className="sg-container">
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "32px", marginBottom: "32px" }} className="footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "var(--primary)", border: "3px solid var(--border-dark)" }} />
                <span style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)" }}>ScholarGuide</span>
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "280px" }}>
                K-8 reading fluency & curriculum platform for parents and educators.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px", color: "var(--text)" }}>Product</h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li><Link to="/quick-check" style={{ fontSize: "14px", color: "var(--text-muted)", textDecoration: "none" }}>Free Reading Check</Link></li>
                <li><Link to="/growth-dashboard" style={{ fontSize: "14px", color: "var(--text-muted)", textDecoration: "none" }}>Growth Dashboard</Link></li>
                <li><Link to="/settings" style={{ fontSize: "14px", color: "var(--text-muted)", textDecoration: "none" }}>Settings</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px", color: "var(--text)" }}>About</h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li><Link to="/trust" style={{ fontSize: "14px", color: "var(--text-muted)", textDecoration: "none" }}>Data & Trust</Link></li>
              </ul>
            </div>
          </div>
          <div style={{ paddingTop: "24px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>© 2026 ScholarGuide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
