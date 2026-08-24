import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { QUICK_CHECK_PASSAGES } from "@shared/quickCheckPassages";
import {
  computeFluencyMetrics,
  statusLabel,
  getBenchmarkForGrade,
  type FluencyResult,
} from "@shared/readingFluencyBenchmarks";
import { trackEvent } from "../lib/analytics";

type Step = "grade" | "instructions" | "reading" | "result";

export default function QuickCheck() {
  const [step, setStep] = useState<Step>("grade");
  const [grade, setGrade] = useState<number>(3);
  const [seconds, setSeconds] = useState(0);
  const [wordsMissed, setWordsMissed] = useState(0);
  const [result, setResult] = useState<FluencyResult | null>(null);
  const timerRef = useRef<number | null>(null);
  const [timing, setTiming] = useState(false);

  const passage = QUICK_CHECK_PASSAGES.find((p) => p.grade === grade) || QUICK_CHECK_PASSAGES[2];
  const benchmark = getBenchmarkForGrade(grade);

  function startTimer() {
    setTiming(true);
    setSeconds(0);
    const startTime = Date.now();
    timerRef.current = window.setInterval(() => {
      setSeconds(Math.round((Date.now() - startTime) / 1000));
    }, 100);
    trackEvent("quick_check_started", { grade });
  }

  function stopTimer() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setTiming(false);
  }

  function handleFinish() {
    stopTimer();
    const r = computeFluencyMetrics(passage.wordCount, wordsMissed, seconds, grade);
    setResult(r);
    setStep("result");
    trackEvent("quick_check_completed", { grade, wpm: r.wpm, accuracy: r.accuracy, status: r.status });
  }

  return (
    <>
      <Helmet>
        <title>Free Reading Speed Check — Is My Child Reading at Grade Level? | ScholarGuide</title>
        <meta name="description" content="Free 2-minute reading speed check. Pick your child's grade, read a short passage, and get instant WPM results compared against real grade-level reading benchmarks. No signup required." />
      </Helmet>

      <div className="sg-container" style={{ padding: "32px 16px", maxWidth: "720px" }}>
        {step === "grade" && (
          <div style={{ textAlign: "center" }}>
            <span className="badge-pill" style={{ background: "var(--accent-mint)", marginBottom: "20px" }}>Step 1 of 4</span>
            <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px", color: "var(--text)" }}>Pick your child's grade</h1>
            <p style={{ fontSize: "18px", color: "var(--text-muted)", marginBottom: "32px" }}>
              They'll read a short passage while you time them. You'll get instant results compared to grade-level benchmarks.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "32px" }} className="grade-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                <button key={g} onClick={() => setGrade(g)}
                  className="clay-card clay-card-hover"
                  style={{
                    padding: "16px", textAlign: "center", cursor: "pointer",
                    background: grade === g ? "var(--primary)" : "#fff",
                    color: grade === g ? "#fff" : "var(--text)",
                    borderColor: grade === g ? "var(--primary)" : "var(--border-dark)",
                    fontSize: "16px", fontWeight: 700,
                  }}>
                  Grade {g}
                </button>
              ))}
            </div>
            <button onClick={() => setStep("instructions")} className="btn-primary" style={{ fontSize: "16px", padding: "12px 28px" }}>
              Continue
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}

        {step === "instructions" && (
          <div>
            <span className="badge-pill" style={{ background: "var(--accent-mint)", marginBottom: "20px" }}>Step 2 of 4</span>
            <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "20px", color: "var(--text)" }}>How it works</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
              {[
                "Ask your child to read the passage below aloud.",
                "Press Start Timer when they begin reading.",
                "Press Finished when they're done.",
                "Estimate words missed (mispronounced, skipped, or 3+ second hesitation).",
                "Get instant results — no signup needed.",
              ].map((text, i) => (
                <div key={i} className="clay-card" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div className="icon-box-sm" style={{ background: "var(--primary)", width: "36px", height: "36px", borderRadius: "10px" }}>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: "16px", color: "var(--text-muted)" }}>{text}</span>
                </div>
              ))}
            </div>
            <div className="clay-card" style={{ padding: "16px", background: "var(--accent-purple)", marginBottom: "24px" }}>
              <p style={{ fontSize: "15px", color: "var(--text)" }}>
                <strong>Target for Grade {grade}:</strong> {benchmark?.springWpm} WPM by end of year.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setStep("grade")} className="btn-secondary" style={{ fontSize: "15px" }}>Back</button>
              <button onClick={() => setStep("reading")} className="btn-primary" style={{ fontSize: "15px" }}>I'm Ready</button>
            </div>
          </div>
        )}

        {step === "reading" && (
          <div>
            <span className="badge-pill" style={{ background: "var(--accent-mint)", marginBottom: "20px" }}>Step 3 of 4</span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text)" }}>Grade {grade} — "{passage.title}"</h1>
              <div style={{
                fontSize: "28px", fontWeight: 700, fontFamily: "Source Code Pro, monospace",
                color: "var(--primary)", fontFeatureSettings: '"tnum"',
              }}>{seconds}s</div>
            </div>
            <div className="clay-card" style={{ padding: "28px", marginBottom: "24px", lineHeight: 1.7, fontSize: "18px", color: "var(--text)" }}>
              {passage.text}
            </div>
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              {!timing ? (
                <button onClick={startTimer} className="btn-primary" style={{ fontSize: "16px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Timer
                </button>
              ) : (
                <button onClick={handleFinish} className="btn-cta" style={{ fontSize: "16px" }}>
                  Finished Reading
                </button>
              )}
            </div>
            {timing && (
              <div className="clay-card" style={{ padding: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>
                  Words missed (approximate): {wordsMissed}
                </label>
                <input type="range" min={0} max={passage.wordCount} value={wordsMissed}
                  onChange={(e) => setWordsMissed(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--primary)" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--text-muted)" }}>
                  <span>0 (perfect)</span>
                  <span>{passage.wordCount} (all missed)</span>
                </div>
              </div>
            )}
          </div>
        )}

        {step === "result" && result && (
          <div style={{ textAlign: "center" }}>
            <span className="badge-pill" style={{ background: "var(--accent-mint)", marginBottom: "20px" }}>Step 4 of 4 — Results</span>
            <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "24px", color: "var(--text)" }}>Your Results</h1>

            <div className="clay-card" style={{ padding: "32px", marginBottom: "24px" }}>
              <div style={{ fontSize: "56px", fontWeight: 700, color: "var(--primary)", marginBottom: "4px", fontFeatureSettings: '"tnum"' }}>
                {result.wpm}
              </div>
              <p style={{ fontSize: "16px", color: "var(--text-muted)", marginBottom: "24px" }}>Words Per Minute</p>

              <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginBottom: "24px" }}>
                <div>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--text)", fontFeatureSettings: '"tnum"' }}>{result.accuracy}%</div>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>Accuracy</p>
                </div>
                <div>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--text)", fontFeatureSettings: '"tnum"' }}>{result.gradeBenchmark}</div>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>Grade Target</p>
                </div>
              </div>

              <div className="badge-pill" style={{
                fontSize: "16px", padding: "8px 20px",
                background: result.status === "below" ? "rgba(234,34,97,0.1)" : result.status === "on_track" ? "var(--accent-mint)" : "var(--accent-blue)",
                color: result.status === "below" ? "var(--ruby)" : result.status === "on_track" ? "var(--success-text)" : "var(--primary)",
              }}>
                {statusLabel(result.status)}
              </div>
            </div>

            <div className="clay-card" style={{ padding: "24px", background: "var(--accent-purple)", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", color: "var(--text)" }}>Want a full curriculum plan?</h2>
              <p style={{ fontSize: "16px", color: "var(--text-muted)", marginBottom: "16px" }}>
                Sign up free to get AI-generated curriculum, quarterly diagnostics, and growth tracking.
              </p>
              <Link to="/settings" className="btn-primary" style={{ fontSize: "16px" }}
                onClick={() => trackEvent("quick_check_signup_clicked", { grade, wpm: result.wpm })}>
                Get Free Curriculum
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <button onClick={() => { setStep("grade"); setResult(null); setSeconds(0); setWordsMissed(0); }}
              style={{ fontSize: "14px", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
              Try again
            </button>
          </div>
        )}
      </div>
    </>
  );
}
