import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FLUENCY_BENCHMARKS } from "@shared/readingFluencyBenchmarks";
import { trackEvent } from "../lib/analytics";

export default function Landing() {
  return (
    <>
      <Helmet>
        <title>ScholarGuide — AI Lesson Plans & Reading Fluency Tracking for K-8</title>
        <meta name="description" content="AI-generated lesson plans for educators. Track your child's reading fluency with quarterly diagnostics and grade-level curriculum. Free reading speed check — no signup needed." />
      </Helmet>

      {/* ===== HERO ===== */}
      <section style={{ background: "var(--bg-cream)", padding: "40px 20px 56px", overflow: "hidden" }}>
        <div className="sg-container">
          <div className="hero-grid">
            {/* Left: copy */}
            <div>
              <div className="badge-pill" style={{ background: "var(--accent-mint)", marginBottom: "20px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--success)" }} />
                Free 2-minute reading check
              </div>
              <h1 style={{ fontSize: "40px", lineHeight: 1.12, marginBottom: "14px", letterSpacing: "-0.5px" }}>
                Is your child reading at <span style={{ color: "var(--primary)" }}>grade level</span>?
              </h1>
              <p style={{ fontSize: "17px", color: "var(--text-muted)", marginBottom: "24px", maxWidth: "460px" }}>
                Get instant WPM results compared to real grade-level benchmarks used in US schools. Then get a curriculum plan that actually fits.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}>
                <Link to="/quick-check" className="btn-primary" style={{ fontSize: "16px", padding: "12px 24px" }}
                  onClick={() => trackEvent("landing_quick_check_clicked")}>
                  Check Reading Speed — Free
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a href="#how-it-works" className="btn-secondary" style={{ fontSize: "16px", padding: "12px 24px" }}>
                  How It Works
                </a>
              </div>
              {/* Inline stats — replaces big empty stats row */}
              <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
                <div>
                  <div className="stat-number">Grades 1–8</div>
                  <div className="stat-label">Benchmarks</div>
                </div>
                <div>
                  <div className="stat-number">2 min</div>
                  <div className="stat-label">To results</div>
                </div>
                <div>
                  <div className="stat-number">No signup</div>
                                 <div className="stat-label">To start</div>
                </div>
              </div>
            </div>

            {/* Right: visual card */}
            <div style={{ position: "relative" }}>
              <div className="clay-card" style={{ padding: "24px", position: "relative", zIndex: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                  <div className="icon-box" style={{ background: "var(--primary-soft)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text)" }}>Grade 3 — Reading Fluency</div>
                    <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>Emma · Spring Benchmark</div>
                  </div>
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px" }}>
                    <span style={{ color: "var(--text-muted)" }}>Words Per Minute</span>
                    <span style={{ fontWeight: 700, color: "var(--cta)" }}>86 WPM</span>
                  </div>
                  <div className="progress-track"><div className="progress-fill" style={{ width: "100%" }} /></div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px" }}>
                    <span style={{ color: "var(--text-muted)" }}>Accuracy</span>
                    <span style={{ fontWeight: 700, color: "var(--success)" }}>96%</span>
                  </div>
                  <div className="progress-track"><div className="progress-fill" style={{ width: "96%", background: "var(--success)" }} /></div>
                </div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <span className="badge-pill" style={{ background: "var(--accent-mint)", fontSize: "12px", padding: "4px 12px", color: "var(--success-text)" }}>
                    On Track
                  </span>
                  <span className="badge-pill" style={{ background: "var(--primary-soft)", fontSize: "12px", padding: "4px 12px", color: "var(--primary)" }}>
                    Grade 3 Target: 86 WPM
                  </span>
                </div>
                <Link to="/quick-check" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "15px" }}>
                  Start Free Reading Check
                </Link>
              </div>

              {/* Floating decorative icons */}
              <div style={{ position: "absolute", top: "-14px", right: "-14px", zIndex: 20, width: "56px", height: "56px", borderRadius: "16px", background: "var(--primary)", border: "3px solid var(--border-dark)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-clay)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div style={{ position: "absolute", bottom: "-14px", left: "-14px", zIndex: 20, width: "48px", height: "48px", borderRadius: "14px", background: "var(--cta)", border: "3px solid var(--border-dark)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-clay)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <section id="trusted-by" style={{ padding: "32px 20px", background: "#fff" }}>
        <div className="sg-container" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Trusted by parents and educators
          </p>
          <div style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            {["Homeschool Co-ops", "K-8 Classrooms", "Reading Specialists", "Parent Groups"].map((label) => (
              <div key={label} style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: "17px", fontWeight: 700, color: "var(--text-muted)", opacity: 0.65 }}>{label}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="sg-section" style={{ background: "var(--bg-cream)" }}>
        <div className="sg-container">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>How It Works</h2>
            <p style={{ fontSize: "17px", color: "var(--text-muted)" }}>Three steps to know exactly where your child stands.</p>
          </div>
          <div className="grid-3">
            {[
              { n: "1", title: "Take the 2-minute check", text: "Your child reads a short grade-level passage aloud. You time it and mark missed words.", bg: "var(--primary-soft)", icon: <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /> },
              { n: "2", title: "See instant results", text: "Get WPM, accuracy, and grade-level status compared to Hasbrouck & Tindal benchmarks used in US schools.", bg: "var(--secondary-soft)", icon: <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> },
              { n: "3", title: "Get a growth plan", text: "AI-generated curriculum matched to their level. Track quarter-over-quarter growth in the dashboard.", bg: "var(--cta-soft)", icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" /> },
            ].map((s) => (
              <div key={s.n} className="clay-card" style={{ padding: "24px" }}>
                <div className="icon-box" style={{ background: s.bg, marginBottom: "16px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {s.icon}
                  </svg>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: "15px", fontWeight: 700, color: "var(--primary)" }}>STEP {s.n}</span>
                </div>
                <h3 style={{ fontSize: "19px", marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENCHMARKS ===== */}
      <section id="benchmarks" className="sg-section" style={{ background: "#fff" }}>
        <div className="sg-container">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>Grade-Level Reading Benchmarks</h2>
            <p style={{ fontSize: "17px", color: "var(--text-muted)", maxWidth: "560px", margin: "0 auto" }}>
              Real oral reading fluency targets from Hasbrouck & Tindal research — the same benchmarks US schools use.
            </p>
          </div>
          <div className="clay-card" style={{ padding: "0", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table className="bench-table">
                <thead>
                  <tr>
                    <th>Grade</th>
                    <th>Fall WPM</th>
                    <th>Winter WPM</th>
                    <th>Spring WPM (Target)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {FLUENCY_BENCHMARKS.map((b) => (
                    <tr key={b.grade}>
                      <td style={{ fontWeight: 700, color: "var(--text)" }}>Grade {b.grade}</td>
                      <td>{b.fallWpm}</td>
                      <td>{b.winterWpm}</td>
                      <td style={{ fontWeight: 700, color: "var(--primary)" }}>{b.springWpm}</td>
                      <td style={{ textAlign: "right" }}>
                        <Link to={`/quick-check?grade=${b.grade}`} className="btn-ghost" style={{ fontSize: "13px", padding: "6px 12px" }}>
                          Test {b.grade} →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="sg-section" style={{ background: "var(--bg-cream)" }}>
        <div className="sg-container">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>Built for Parents & Educators</h2>
            <p style={{ fontSize: "17px", color: "var(--text-muted)" }}>Two tools, one goal — reading growth you can see.</p>
          </div>
          <div className="grid-2">
            <div className="clay-card clay-card-hover" style={{ padding: "28px" }}>
              <div className="icon-box" style={{ background: "var(--primary)", marginBottom: "18px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9.75 17L6 17l1.5-3-1.5-3 3.75 0M14.25 17l3.75 0L16.5 14l1.5-3-3.75 0M12 3v18M3 7h18" />
                </svg>
              </div>
              <h3 style={{ fontSize: "21px", marginBottom: "8px" }}>Educator Planner</h3>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", marginBottom: "16px" }}>
                AI-generated lesson plans for any grade K-8 and subject. Materials, procedures, assessments, differentiation — in seconds.
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {["Any subject, any grade", "Materials + assessments included", "Differentiation built in"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="clay-card clay-card-hover" style={{ padding: "28px" }}>
              <div className="icon-box" style={{ background: "var(--cta)", marginBottom: "18px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 13.5l4-4 4 4 5-5 3 3M3 21h18M3 10V7a2 2 0 012-2h2m14 5V7a2 2 0 00-2-2h-2" />
                </svg>
              </div>
              <h3 style={{ fontSize: "21px", marginBottom: "8px" }}>Student Tracker</h3>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", marginBottom: "16px" }}>
                Quarterly diagnostics, AI-generated curriculum, oral reading fluency checks. See exactly where your child stands.
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {["Quarterly fluency diagnostics", "Growth dashboard + shareable cards", "Benchmark-aligned practice"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="sg-section" style={{ background: "#fff" }}>
        <div className="sg-container">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>What Parents Say</h2>
            <p style={{ fontSize: "17px", color: "var(--text-muted)" }}>Real feedback from families using ScholarGuide.</p>
          </div>
          <div className="grid-3">
            {[
              { name: "Sarah M.", role: "Mom of 2nd grader", quote: "The free check told us in 2 minutes what I'd been wondering for months. His teacher confirmed the results.", bg: "var(--primary-soft)" },
              { name: "David K.", role: "Homeschool dad", quote: "We test quarterly now. Seeing the WPM trend line climb every quarter is the motivation my daughter needed.", bg: "var(--cta-soft)" },
              { name: "Maria G.", role: "Reading specialist", quote: "I use the benchmarks table with every parent conference. It's the same data I show them, presented better.", bg: "var(--secondary-soft)" },
            ].map((t) => (
              <div key={t.name} className="clay-card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "12px" }} aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--secondary)" aria-hidden="true">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                <p style={{ fontSize: "15px", color: "var(--text-muted)", fontStyle: "italic", marginBottom: "16px" }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "12px", background: t.bg, border: "3px solid var(--border-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, color: "var(--text)" }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--text)" }}>{t.name}</div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="sg-section" style={{ background: "var(--bg-cream)" }}>
        <div className="sg-container">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>Simple Pricing</h2>
            <p style={{ fontSize: "17px", color: "var(--text-muted)" }}>The reading check is always free. Upgrade when you're ready.</p>
          </div>
          <div className="grid-3">
            {/* Free */}
            <div className="clay-card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "4px" }}>Free</h3>
              <p style={{ fontSize: "30px", fontWeight: 700, color: "var(--text)", marginBottom: "16px", fontFamily: "'Baloo 2', sans-serif" }}>$0<span style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-muted)" }}>/mo</span></p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
                {["1 student", "Quarterly diagnostics", "Basic curriculum", "Free reading check"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Basic */}
            <div className="clay-card" style={{ padding: "24px", position: "relative", borderColor: "var(--primary)" }}>
              <span className="badge-pill" style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "var(--primary)", color: "#fff", fontSize: "12px", padding: "4px 14px" }}>Popular</span>
              <h3 style={{ fontSize: "18px", marginBottom: "4px" }}>Basic</h3>
              <p style={{ fontSize: "30px", fontWeight: 700, marginBottom: "16px", fontFamily: "'Baloo 2', sans-serif", color: "var(--text)" }}>$14<span style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-muted)" }}>/mo</span></p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
                {["3 students", "All diagnostics", "Full curriculum", "Growth tracking"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Pro */}
            <div className="clay-card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "4px" }}>Pro</h3>
              <p style={{ fontSize: "30px", fontWeight: 700, color: "var(--text)", marginBottom: "16px", fontFamily: "'Baloo 2', sans-serif" }}>$24<span style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-muted)" }}>/mo</span></p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
                {["10 students", "Everything in Basic", "Advanced analytics", "Priority support"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p style={{ textAlign: "center", fontSize: "14px", color: "var(--text-muted)", marginTop: "20px" }}>
            Have a classroom? <Link to="/settings" style={{ color: "var(--primary)", fontWeight: 700 }}>Contact us for school pricing →</Link>
          </p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="sg-section" style={{ background: "#fff", paddingBottom: "72px" }}>
        <div className="sg-container" style={{ maxWidth: "680px" }}>
          <div className="clay-card" style={{ padding: "36px", textAlign: "center", background: "var(--primary)" }}>
            <h2 style={{ fontSize: "26px", marginBottom: "10px", color: "#fff" }}>Ready to see your child's growth?</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", marginBottom: "24px" }}>
              Take the free 2-minute reading check. No signup, no credit card.
            </p>
            <Link to="/quick-check" className="btn-cta" style={{ fontSize: "16px", padding: "12px 28px" }}
              onClick={() => trackEvent("landing_cta_clicked")}>
              Start Free Reading Check
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "var(--bg-cream)", padding: "48px 20px", borderTop: "3px solid var(--border)" }}>
        <div className="sg-container">
          <div className="footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "var(--primary)", border: "3px solid var(--border-dark)" }} />
                <span style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--text)" }}>ScholarGuide</span>
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "260px" }}>
                K-8 reading fluency & curriculum platform for parents and educators.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "15px", marginBottom: "12px" }}>Product</h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li><Link to="/quick-check" style={{ fontSize: "14px", color: "var(--text-muted)", textDecoration: "none", fontWeight: 600 }}>Free Reading Check</Link></li>
                <li><a href="#how-it-works" style={{ fontSize: "14px", color: "var(--text-muted)", textDecoration: "none", fontWeight: 600 }}>How It Works</a></li>
                <li><a href="#benchmarks" style={{ fontSize: "14px", color: "var(--text-muted)", textDecoration: "none", fontWeight: 600 }}>Benchmarks</a></li>
                <li><a href="#pricing" style={{ fontSize: "14px", color: "var(--text-muted)", textDecoration: "none", fontWeight: 600 }}>Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "15px", marginBottom: "12px" }}>Growth</h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li><Link to="/growth-dashboard" style={{ fontSize: "14px", color: "var(--text-muted)", textDecoration: "none", fontWeight: 600 }}>Growth Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "15px", marginBottom: "12px" }}>Trust</h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li><Link to="/trust" style={{ fontSize: "14px", color: "var(--text-muted)", textDecoration: "none", fontWeight: 600 }}>Data & Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div style={{ paddingTop: "24px", borderTop: "1px solid var(--border)", textAlign: "center", marginTop: "32px" }}>
            <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>© 2026 ScholarGuide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
