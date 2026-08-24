import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Landing from "./pages/landing";
import QuickCheck from "./pages/quick-check";
import Settings from "./pages/settings";
import GrowthDashboard from "./pages/growth-dashboard";
import Trust from "./pages/trust";

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{
        width: "40px", height: "40px", borderRadius: "12px",
        background: "var(--primary)", border: "3px solid var(--border-dark)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--text)" }}>ScholarGuide</span>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <>
      <Helmet>
        <title>ScholarGuide — Reading Fluency & Curriculum for K-8</title>
        <meta name="description" content="Track your child's reading fluency, get AI-generated grade-level curriculum, and watch them grow." />
      </Helmet>

      {/* Floating claymorphism nav */}
      <nav style={{
        position: "fixed", top: "16px", left: "16px", right: "16px", zIndex: 50,
      }}>
        <div className="clay-card" style={{
          padding: "12px 24px", maxWidth: "1080px", margin: "0 auto", background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <Link to="/" style={{ textDecoration: "none" }}><Logo /></Link>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Link to="/quick-check" style={{
              fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", textDecoration: "none",
            }}>Free Reading Check</Link>
            <a href="#trusted-by" style={{
              fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", textDecoration: "none",
            }}>Trusted By</a>
            <Link to="/settings" className="btn-primary" style={{ fontSize: "14px", padding: "8px 16px" }}>
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: "88px" }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quick-check" element={<QuickCheck />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/growth-dashboard" element={<GrowthDashboard />} />
          <Route path="/trust" element={<Trust />} />
        </Routes>
      </div>

      {!isLanding && (
        <footer style={{ background: "var(--bg-cream)", padding: "48px 16px", borderTop: "3px solid var(--border)" }}>
          <div className="sg-container" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>ScholarGuide — K-8 reading fluency & curriculum</p>
            <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "24px" }}>
              <Link to="/quick-check" style={{ color: "var(--text-muted)", fontSize: "14px", textDecoration: "none" }}>Free Reading Check</Link>
              <Link to="/growth-dashboard" style={{ color: "var(--text-muted)", fontSize: "14px", textDecoration: "none" }}>Growth Dashboard</Link>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
