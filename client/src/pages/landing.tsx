import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { trackEvent } from "../lib/analytics";

export default function Landing() {
  return (
    <>
      <Helmet>
        <title>ScholarGuide — AI Lesson Plans & Reading Fluency Tracking for K-8</title>
        <meta name="description" content="AI-generated lesson plans for educators. Track your child's reading fluency with quarterly diagnostics and grade-level curriculum. Free reading speed check — no signup needed." />
        <meta name="keywords" content="reading fluency, K-8 education, lesson plans, grade level reading, reading benchmark, homeschool curriculum" />
        <meta property="og:title" content="ScholarGuide — K-8 Reading Fluency & Curriculum" />
        <meta property="og:description" content="Track your child's reading fluency, get AI-generated grade-level curriculum, and watch them grow." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero — Teacher-focused */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Lesson Plans for K-8 Educators</h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8">
            Generate grade-level lesson plans in seconds. Track student progress with quarterly diagnostics.
            Built for teachers and parents.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50"
              onClick={() => trackEvent("landing_signup_clicked")}
            >
              Get Started Free
            </Link>
            <Link
              to="/quick-check"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10"
            >
              Free Reading Check
            </Link>
          </div>
        </div>
      </section>

      {/* Parent-facing CTA section — first parent-facing moment on the page */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Is your child reading at grade level?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Take our free 2-minute reading speed check. Pick your child's grade, read a short passage,
            and get instant results compared against real grade-level benchmarks. No signup required.
          </p>
          <Link
            to="/quick-check"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700"
            onClick={() => trackEvent("landing_quick_check_clicked")}
          >
            Check Now — It's Free
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-2">Educator Planner</h3>
            <p className="text-gray-600">
              AI-generated lesson plans for any grade K-8 and subject. Materials, procedures,
              assessments, and differentiation — in seconds.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-2">Student Tracker</h3>
            <p className="text-gray-600">
              Quarterly diagnostics, AI-generated curriculum, and oral reading fluency checks.
              See exactly where your child stands and what to work on next.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2">Free</h3>
              <p className="text-2xl font-bold mb-4">$0<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>1 student</li>
                <li>Quarterly diagnostics</li>
                <li>Basic curriculum</li>
              </ul>
            </div>
            <div className="border-2 border-indigo-600 p-6 rounded-xl relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">Popular</span>
              <h3 className="text-lg font-bold mb-2">Basic</h3>
              <p className="text-2xl font-bold mb-4">$14<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>3 students</li>
                <li>All diagnostics</li>
                <li>Full curriculum</li>
                <li>Practice sessions</li>
                <li>Growth tracking</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2">Pro</h3>
              <p className="text-2xl font-bold mb-4">$24<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>10 students</li>
                <li>Everything in Basic</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 px-6 text-center text-sm">
        <p>ScholarGuide — K-8 reading fluency & curriculum</p>
        <div className="mt-2">
          <Link to="/trust" className="text-gray-400 hover:text-white">How we protect your data</Link>
        </div>
      </footer>
    </>
  );
}
