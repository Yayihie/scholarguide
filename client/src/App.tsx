import { useState } from "react";
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

/** Shared nav link — active state + consistent styling */
function NavLink({ to, children, accent = false }: { to: string; children: React.ReactNode; accent?: boolean }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className="btn-ghost"
      style={active
        ? { background: accent ? "var(--cta-soft)" : "var(--primary-soft)", color: accent ? "var(--cta-hover)" : "var(--primary)" }
        : accent ? { color: "var(--cta-hover)", fontWeight: 700 } : undefined}
    >
      {children}
    </Link>
  );
}

/** Anchor link for on-page sections (landing only) */
function AnchorLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} className="btn-ghost">{children}</a>;
}

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const landingTabs = [
    { label: "Lesson Planner", href: "#lesson-planner" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Benchmarks", href: "#benchmarks" },
    { label: "Pricing", href: "#pricing" },
  ];

  const pageTabs = [
    { to: "/", label: "Home" },
    { to: "/quick-check", label: "Free Reading Check", accent: true },
    { to: "/growth-dashboard", label: "Growth" },
    { to: "/trust", label: "Data & Privacy" },
  ];

  return (
    <>
      <Helmet>
        <title>ScholarGuide — K-8 Lesson Plans & Student Growth Tracking in Every Subject</title>
        <meta name="description" content="Ready-to-teach K-8 lesson plans in seconds for teachers. Free reading check plus growth tracking in math, writing, science, reading comprehension, and tech for parents. Watch kids grow quarter after quarter." />
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
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }} onClick={() => setMenuOpen(false)}><Logo /></Link>

          {/* Desktop tabs */}
          <div className="nav-tabs" style={{ display: "none", gap: "4px", alignItems: "center" }}>
            {isLanding ? (
              <>
                {landingTabs.map((l) => <AnchorLink key={l.label} href={l.href}>{l.label}</AnchorLink>)}
                <NavLink to="/quick-check" accent>Free Reading Check</NavLink>
              </>
            ) : (
              <>
                {pageTabs.map((t) => <NavLink key={t.to} to={t.to} accent={t.accent}>{t.label}</NavLink>)}
              </>
            )}
          </div>

          {/* Desktop Login — hidden on mobile (shown in burger menu instead) */}
          <Link
            to="/settings"
            className="btn-primary nav-login"
            style={{ fontSize: "14px", padding: "8px 18px", flexShrink: 0 }}
          >
            Login
          </Link>

          {/* Mobile menu button — hidden on desktop */}
          <button className="nav-burger" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} style={{
            display: "flex", width: "44px", height: "44px", borderRadius: "12px",
            background: menuOpen ? "var(--primary-soft)" : "var(--secondary-soft)", border: "3px solid var(--border-dark)",
            alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
          }}>
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="clay-card" style={{
            maxWidth: "1120px", margin: "10px auto 0", padding: "12px",
            background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
            display: "flex", flexDirection: "column", gap: "4px",
          }}>
            {isLanding ? (
              <>
                {landingTabs.map((l) => (
                  <a key={l.label} href={l.href} className="btn-ghost" onClick={() => setMenuOpen(false)}
                    style={{ justifyContent: "flex-start", padding: "12px 16px", fontSize: "15px" }}>{l.label}</a>
                ))}
                <Link to="/quick-check" className="btn-ghost" onClick={() => setMenuOpen(false)}
                  style={{ justifyContent: "flex-start", padding: "12px 16px", fontSize: "15px", color: "var(--cta-hover)", fontWeight: 700 }}>Free Reading Check</Link>
              </>
            ) : (
              <>
                {pageTabs.map((t) => (
                  <Link key={t.to} to={t.to} className="btn-ghost" onClick={() => setMenuOpen(false)}
                    style={{ justifyContent: "flex-start", padding: "12px 16px", fontSize: "15px", color: t.accent ? "var(--cta-hover)" : undefined, fontWeight: t.accent ? 700 : undefined }}>{t.label}</Link>
                ))}
                {/* Login — full-width primary CTA in mobile menu */}
                <div style={{ height: "1px", background: "var(--border)", margin: "8px 4px" }} />
                <Link
                  to="/settings"
                  className="btn-primary"
                  onClick={() => setMenuOpen(false)}
                  style={{ justifyContent: "center", padding: "12px 16px", fontSize: "15px", marginTop: "4px" }}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        )}
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
            <p style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 600 }}>ScholarGuide — K-8 lesson planning & reading growth</p>
            <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
              <Link to="/quick-check" style={{ color: "var(--text-muted)", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>Free Reading Check</Link>
              <Link to="/growth-dashboard" style={{ color: "var(--text-muted)", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>Growth Dashboard</Link>
              <Link to="/trust" style={{ color: "var(--text-muted)", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>Data & Privacy</Link>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
