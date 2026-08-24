import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Landing from "./pages/landing";
import QuickCheck from "./pages/quick-check";
import Settings from "./pages/settings";
import GrowthDashboard from "./pages/growth-dashboard";
import Trust from "./pages/trust";

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <>
      <Helmet>
        <title>ScholarGuide — Reading Fluency & Curriculum for K-8</title>
        <meta name="description" content="Track your child's reading fluency, get AI-generated grade-level curriculum, and watch them grow." />
      </Helmet>
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">ScholarGuide</Link>
        <div className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/quick-check" className="hover:text-indigo-600">Free Reading Check</Link>
          <Link to="/trust" className="hover:text-indigo-600">Data & Trust</Link>
          <Link to="/settings" className="hover:text-indigo-600">Settings</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quick-check" element={<QuickCheck />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/growth-dashboard" element={<GrowthDashboard />} />
        <Route path="/trust" element={<Trust />} />
      </Routes>
      {!isLanding && (
        <footer className="bg-white border-t border-gray-200 px-6 py-8 mt-12 text-center text-sm text-gray-500">
          <p>ScholarGuide — K-8 reading fluency & curriculum</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link to="/trust" className="hover:text-indigo-600">How we protect your data</Link>
            <span>·</span>
            <Link to="/quick-check" className="hover:text-indigo-600">Free Reading Check</Link>
          </div>
        </footer>
      )}
    </>
  );
}
