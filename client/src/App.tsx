import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Landing from "./pages/landing";
import QuickCheck from "./pages/quick-check";
import Settings from "./pages/settings";
import GrowthDashboard from "./pages/growth-dashboard";
import Trust from "./pages/trust";

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{
        width: "42px", height: "42px", borderRadius: "14px",
        background: "var(--primary)", border: "3px solid var(--border-dark)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "var(--shadow-clay)",
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <span style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: "22px", fontWeight: 700, color: "var(--text)" }}>ScholarGuide</span>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isQuickCheck = location.pathname === "/quick-check";

  const navLinks = [
    { label: "Lesson Planner", href: "#lesson-planner" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Benchmarks", href: "#benchmarks" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      <Helmet>
        <title>ScholarGuide — Reading Fluency & Curriculum for K-8</title>
        <meta name="description" content="Track your child's reading fluency, get AI-generated grade-level curriculum, and watch them grow. Free reading speed check — no signup needed." />
      </Helmet>

      {/* Floating claymorphism nav */}
      <nav style={{ position: "fixed", top: "16px", left: "16px", right: "16px", zIndex: 50 }}>
        <div className="clay-card" style={{
          padding: "10px 20px",
          maxWidth: "1120px", margin: "0 auto",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
        }}>
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}><Logo /></Link>

          {/* Desktop tabs — only show anchor tabs on landing */}
          {isLanding && (
            <div className="nav-tabs" style={{ display: "none", gap: "4px", alignItems: "center" }}>
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} className="btn-ghost">{l.label}</a>
              ))}
              <Link to="/quick-check" className="btn-ghost" style={{ color: "var(--cta)", fontWeight: 700 }}>Free Reading Check</Link>
            </div>
          )}
          {!isLanding && (
            <div className="nav-tabs" style={{ display: "none", gap: "4px", alignItems: "center" }}>
              <Link to="/" className="btn-ghost">Home</Link>
              <Link to="/quick-check" className="btn-ghost" style={{ color: "var(--cta)", fontWeight: 700 }}>Free Reading Check</Link>
            </div>
          )}

          <Link to="/settings" className="btn-primary" style={{ fontSize: "14px", padding: "8px 18px", flexShrink: 0 }}>
            Login
          </Link>

          {/* Mobile menu button */}
          <button className="nav-burger" aria-label="Toggle menu" style={{
            display: "flex", width: "44px", height: "44px", borderRadius: "12px",
            background: "var(--secondary-soft)", border: "3px solid var(--border-dark)",
            alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      <div style={{ paddingTop: "96px" }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quick-check" element={<QuickCheck />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/growth-dashboard" element={<GrowthDashboard />} />
          <Route path="/trust" element={<Trust />} />
        </Routes>
      </div>

      {!isLanding && (
        <footer style={{ background: "var(--bg-cream)", padding: "40px 20px", borderTop: "3px solid var(--border)" }}>
          <div className="sg-container" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 600 }}>ScholarGuide — K-8 reading fluency & curriculum</p>
            <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "24px" }}>
              <Link to="/quick-check" style={{ color: "var(--text-muted)", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>Free Reading Check</Link>
              <Link to="/growth-dashboard" style={{ color: "var(--text-muted)", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>Growth Dashboard</Link>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
