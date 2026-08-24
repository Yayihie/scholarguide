import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FLUENCY_BENCHMARKS } from "@shared/readingFluencyBenchmarks";
import { trackEvent } from "../lib/analytics";

export default function Landing() {
  return (
    <>
      <Helmet>
        <title>ScholarGuide — Lesson Plans for Educators, Reading Growth for Parents | K-8</title>
        <meta name="description" content="Ready-to-teach K-8 lesson plans in seconds for teachers. Free two-minute reading check for parents, measured against the fluency benchmarks US schools use. Watch kids grow quarter after quarter." />
      </Helmet>

      {/* ===== HERO — dual product ===== */}
      <section style={{ background: "var(--bg-cream)", padding: "40px 20px 48px", overflow: "hidden" }}>
        <div className="sg-container">
          {/* Centered headline for both audiences */}
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 36px" }}>
            <div className="badge-pill" style={{ background: "var(--accent-mint)", marginBottom: "18px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--success)" }} />
              Built for K-8 classrooms and homes
            </div>
            <h1 style={{ fontSize: "40px", lineHeight: 1.12, marginBottom: "14px", letterSpacing: "-0.5px" }}>
              Every lesson planned. <span style={{ color: "var(--primary)" }}>Every reader on track.</span>
            </h1>
            <p style={{ fontSize: "17px", color: "var(--text-muted)", maxWidth: "560px", margin: "0 auto" }}>
              ScholarGuide gives K-8 teachers ready-to-teach lesson plans in seconds — and gives parents a
              free two-minute reading check measured against the benchmarks US schools actually use.
              One platform, one goal: kids who keep growing.
            </p>
          </div>

          {/* Dual product cards */}
          <div className="grid-2">
            {/* TEACHERS: Lesson Planner */}
            <div className="clay-card clay-card-hover" style={{ padding: "28px", borderColor: "var(--primary)" }}>
              <div className="icon-box" style={{ background: "var(--primary)", marginBottom: "16px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9.75 17L6 17l1.5-3-1.5-3 3.75 0M14.25 17l3.75 0L16.5 14l1.5-3-3.75 0M12 3v18M3 7h18" />
                </svg>
              </div>
              <span className="badge-pill" style={{ background: "var(--primary-soft)", color: "var(--primary)", fontSize: "12px", padding: "4px 12px", marginBottom: "12px" }}>
                For Educators
              </span>
              <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>AI Lesson Planner</h2>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", marginBottom: "18px" }}>
                Generate a full lesson plan for any grade K-8 and subject in seconds — materials, procedures, assessments, differentiation.
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "7px", marginBottom: "20px" }}>
                {["Any subject, any grade K-8", "Materials + assessments included", "Differentiation built in", "Standards-aligned"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/settings" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Plan a Lesson
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </div>

            {/* PARENTS: Reading Tracker */}
            <div className="clay-card clay-card-hover" style={{ padding: "28px", borderColor: "var(--cta)" }}>
              <div className="icon-box" style={{ background: "var(--cta)", marginBottom: "16px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 13.5l4-4 4 4 5-5 3 3M3 21h18M3 10V7a2 2 0 012-2h2m14 5V7a2 2 0 00-2-2h-2" />
                </svg>
              </div>
              <span className="badge-pill" style={{ background: "var(--cta-soft)", color: "var(--cta-hover)", fontSize: "12px", padding: "4px 12px", marginBottom: "12px" }}>
                For Parents
              </span>
              <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Reading Fluency Tracker</h2>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", marginBottom: "18px" }}>
                Free 2-minute check shows if your child reads at grade level. Then get a curriculum plan matched to their level.
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "7px", marginBottom: "20px" }}>
                {["Free 2-minute reading check", "Real grade-level benchmarks", "Quarterly growth tracking", "AI curriculum matched to level"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/quick-check" className="btn-cta" style={{ width: "100%", justifyContent: "center" }}>
                Check Reading Level — Free
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
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
            <p style={{ fontSize: "17px", color: "var(--text-muted)" }}>Three steps — whether you're planning lessons or tracking a reader.</p>
          </div>
          <div className="grid-3">
            {[
              { n: "1", title: "Pick your path", text: "Educators generate lesson plans. Parents run the free reading check. Both take under 2 minutes.", bg: "var(--primary-soft)", icon: <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
              { n: "2", title: "Get instant results", text: "A complete lesson plan — or WPM, accuracy, and grade-level status vs school benchmarks.", bg: "var(--secondary-soft)", icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" /> },
              { n: "3", title: "Track the growth", text: "Quarterly diagnostics and a growth dashboard show progress you can see — and share.", bg: "var(--cta-soft)", icon: <path d="M3 13.5l4-4 4 4 5-5 3 3M3 21h18" /> },
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

      {/* ===== LESSON PLANNER SHOWCASE ===== */}
      <section id="lesson-planner" className="sg-section" style={{ background: "var(--bg-cream)" }}>
        <div className="sg-container">
          <div className="hero-grid" style={{ alignItems: "start" }}>
            <div>
              <span className="badge-pill" style={{ background: "var(--primary-soft)", color: "var(--primary)", marginBottom: "16px" }}>For Educators</span>
              <h2 style={{ fontSize: "28px", marginBottom: "12px" }}>Lesson plans in seconds, not Sundays</h2>
              <p style={{ fontSize: "16px", color: "var(--text-muted)", marginBottom: "20px" }}>
                Tell it the grade and subject. Get a complete plan: objectives, materials, procedures, assessment, and differentiation for struggling and advanced students.
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                {["Grade + subject in, full plan out", "Differentiation for every lesson", "Assessment ideas included", "Homeschool-friendly formats"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "var(--text-muted)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/settings" className="btn-primary">
                Plan a Lesson
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </div>
            {/* Lesson plan mock */}
            <div className="clay-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div className="icon-box-sm" style={{ background: "var(--primary-soft)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--text)" }}>Lesson Plan — Grade 3 Science</div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>Generated in 4 seconds</div>
                  </div>
                </div>
                <span className="badge-pill" style={{ background: "var(--accent-mint)", color: "var(--success-text)", fontSize: "11px", padding: "3px 10px" }}>Ready</span>
              </div>
              {[
                { label: "Objective", val: "Explain the water cycle" },
                { label: "Materials", val: "Diagram, cups, ice" },
                { label: "Duration", val: "45 min" },
                { label: "Assessment", val: "Exit ticket: draw the cycle" },
                { label: "Differentiation", val: "Sentence starters + extension" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", gap: "12px", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--primary)", minWidth: "110px" }}>{row.label}</span>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== READING TRACKER SHOWCASE ===== */}
      <section className="sg-section" style={{ background: "#fff" }}>
        <div className="sg-container">
          <div className="hero-grid" style={{ alignItems: "start" }}>
            {/* Reading progress mock — left on mobile-first order */}
            <div className="clay-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                <div className="icon-box" style={{ background: "var(--cta-soft)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span className="badge-pill" style={{ background: "var(--accent-mint)", fontSize: "12px", padding: "4px 12px", color: "var(--success-text)" }}>On Track</span>
                <span className="badge-pill" style={{ background: "var(--primary-soft)", fontSize: "12px", padding: "4px 12px", color: "var(--primary)" }}>Target: 86 WPM</span>
              </div>
            </div>
            <div>
              <span className="badge-pill" style={{ background: "var(--cta-soft)", color: "var(--cta-hover)", marginBottom: "16px" }}>For Parents</span>
              <h2 style={{ fontSize: "28px", marginBottom: "12px" }}>Know if your child is on track</h2>
              <p style={{ fontSize: "16px", color: "var(--text-muted)", marginBottom: "20px" }}>
                The free 2-minute check compares your child's reading speed and accuracy against the same benchmarks US schools use. No signup, no cost.
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                {["Instant WPM + accuracy results", "Grade-level status vs real benchmarks", "Quarterly growth tracking", "Shareable growth story cards"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "var(--text-muted)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/quick-check" className="btn-cta">
                Check Reading Level — Free
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="sg-section" style={{ background: "var(--bg-cream)" }}>
        <div className="sg-container">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>What Parents & Teachers Say</h2>
            <p style={{ fontSize: "17px", color: "var(--text-muted)" }}>Real feedback from families and classrooms using ScholarGuide.</p>
          </div>
          <div className="grid-3">
            {[
              { name: "Sarah M.", role: "Mom of 2nd grader", quote: "The free check told us in 2 minutes what I'd been wondering for months. His teacher confirmed the results.", bg: "var(--primary-soft)" },
              { name: "James T.", role: "3rd grade teacher", quote: "I used to spend Sunday nights writing plans. Now I generate them in seconds and spend the time actually teaching.", bg: "var(--cta-soft)" },
              { name: "Maria G.", role: "Reading specialist", quote: "I use the benchmarks table with every parent conference. It's the same data I show them, presented better.", bg: "var(--secondary-soft)" },
            ].map((t) => (
              <div key={t.name} className="clay-card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "12px" }} aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--secondary)" aria-hidden="true">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.796-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
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
      <section id="pricing" className="sg-section" style={{ background: "#fff" }}>
        <div className="sg-container">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>Simple Pricing</h2>
            <p style={{ fontSize: "17px", color: "var(--text-muted)" }}>The reading check is always free. Upgrade when you're ready.</p>
          </div>
          <div className="grid-3">
            {/* Free */}
            <div className="clay-card" style={{ padding: "26px", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "19px", marginBottom: "4px" }}>Free</h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "14px" }}>For trying it out</p>
              <p style={{ fontSize: "32px", fontWeight: 700, color: "var(--text)", marginBottom: "18px", fontFamily: "'Baloo 2', sans-serif" }}>$0<span style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-muted)" }}>/mo</span></p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {["Free reading speed check", "1 student profile", "Quarterly diagnostics", "Basic curriculum plan"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/quick-check" className="btn-secondary" style={{ marginTop: "auto", justifyContent: "center" }}>Start Free</Link>
            </div>

            {/* Basic — popular */}
            <div className="clay-card" style={{ padding: "26px", position: "relative", borderColor: "var(--primary)", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-clay-hover)" }}>
              <span className="badge-pill" style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "var(--primary)", color: "#fff", fontSize: "12px", padding: "4px 14px" }}>Most Popular</span>
              <h3 style={{ fontSize: "19px", marginBottom: "4px" }}>Basic</h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "14px" }}>For parents tracking growth</p>
              <p style={{ fontSize: "32px", fontWeight: 700, marginBottom: "18px", fontFamily: "'Baloo 2', sans-serif", color: "var(--text)" }}>$14<span style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-muted)" }}>/mo</span></p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {["Everything in Free", "3 student profiles", "AI lesson planner", "Full curriculum library", "Growth dashboard + share cards"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/settings" className="btn-primary" style={{ marginTop: "auto", justifyContent: "center" }}>Get Basic</Link>
            </div>

            {/* Pro */}
            <div className="clay-card" style={{ padding: "26px", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "19px", marginBottom: "4px" }}>Pro</h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "14px" }}>For classrooms & tutors</p>
              <p style={{ fontSize: "32px", fontWeight: 700, color: "var(--text)", marginBottom: "18px", fontFamily: "'Baloo 2', sans-serif" }}>$24<span style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-muted)" }}>/mo</span></p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {["Everything in Basic", "10 student profiles", "Unlimited lesson plans", "Advanced analytics", "Priority support"].map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/settings" className="btn-cta" style={{ marginTop: "auto", justifyContent: "center" }}>Get Pro</Link>
            </div>
          </div>

          {/* Annual toggle note */}
          <div className="clay-card" style={{ padding: "16px 24px", marginTop: "20px", background: "var(--secondary-soft)", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p style={{ fontSize: "14px", color: "var(--text)", fontWeight: 600 }}>
              Pay annually and get 2 months free — $140/yr Basic, $240/yr Pro.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="sg-section" style={{ background: "var(--bg-cream)", paddingBottom: "72px" }}>
        <div className="sg-container" style={{ maxWidth: "760px" }}>
          <div className="clay-card" style={{ padding: "36px", textAlign: "center", background: "var(--primary)" }}>
            <h2 style={{ fontSize: "26px", marginBottom: "10px", color: "#fff" }}>Start with either — free</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", marginBottom: "24px" }}>
              Run the free reading check or generate your first lesson plan. No credit card for either.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/quick-check" className="btn-cta" style={{ fontSize: "16px", padding: "12px 28px" }}
                onClick={() => trackEvent("landing_cta_clicked")}>
                Free Reading Check
              </Link>
              <Link to="/settings" className="btn-secondary" style={{ fontSize: "16px", padding: "12px 28px" }}>
                Plan a Lesson
              </Link>
            </div>
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
                K-8 lesson planning for educators and reading growth tracking for parents.
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
