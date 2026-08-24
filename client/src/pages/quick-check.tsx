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
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTiming(false);
  }

  function handleFinish() {
    stopTimer();
    const r = computeFluencyMetrics(passage.wordCount, wordsMissed, seconds, grade);
    setResult(r);
    setStep("result");
    trackEvent("quick_check_completed", {
      grade,
      wpm: r.wpm,
      accuracy: r.accuracy,
      status: r.status,
    });
  }

  const benchmark = getBenchmarkForGrade(grade);

  return (
    <>
      <Helmet>
        <title>Free Reading Speed Check — Is My Child Reading at Grade Level? | ScholarGuide</title>
        <meta name="description" content="Free 2-minute reading speed check. Pick your child's grade, read a short passage, and get instant WPM results compared against real grade-level reading benchmarks. No signup required." />
        <meta name="keywords" content="reading speed check, reading fluency, grade level reading, WPM test, reading benchmark, is my child reading at grade level, 3rd grade reading benchmark" />
        <meta property="og:title" content="Free Reading Speed Check — ScholarGuide" />
        <meta property="og:description" content="Is your child reading at grade level? Find out in 2 minutes — no signup required." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://scholarguide.app/quick-check" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {step === "grade" && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Free Reading Speed Check</h1>
            <p className="text-gray-600 mb-8">
              Pick your child's grade level. They'll read a short passage while you time them.
              You'll get instant results compared to grade-level benchmarks.
            </p>
            <div className="grid grid-cols-4 gap-3 mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`py-4 rounded-lg font-semibold ${grade === g ? "bg-indigo-600 text-white" : "bg-white border border-gray-300 hover:border-indigo-400"}`}
                >
                  Grade {g}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep("instructions")}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700"
            >
              Continue
            </button>
          </div>
        )}

        {step === "instructions" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Instructions</h1>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
              <li>Ask your child to read the passage below aloud.</li>
              <li>Press "Start Timer" when they begin reading.</li>
              <li>Press "Finished" when they're done.</li>
              <li>Estimate how many words they missed (mispronounced, skipped, or hesitated on for 3+ seconds).</li>
              <li>Get instant results — no signup needed.</li>
            </ol>
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg mb-6">
              <p className="text-sm text-indigo-700">
                Target for Grade {grade}: <strong>{benchmark?.springWpm} WPM</strong> by end of year.
              </p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep("grade")} className="text-gray-500 px-4 py-2">Back</button>
              <button
                onClick={() => setStep("reading")}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                I'm Ready
              </button>
            </div>
          </div>
        )}

        {step === "reading" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Grade {grade} — "{passage.title}"</h1>
              <div className="text-2xl font-mono font-bold text-indigo-600">{seconds}s</div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 leading-relaxed text-lg">
              {passage.text}
            </div>
            <div className="flex gap-4 mb-6">
              {!timing ? (
                <button onClick={startTimer} className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
                  Start Timer
                </button>
              ) : (
                <button onClick={handleFinish} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold">
                  Finished Reading
                </button>
              )}
            </div>
            {timing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Words missed (approximate): {wordsMissed}
                </label>
                <input
                  type="range"
                  min={0}
                  max={passage.wordCount}
                  value={wordsMissed}
                  onChange={(e) => setWordsMissed(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </div>
        )}

        {step === "result" && result && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Results</h1>
            <div className="bg-white border border-gray-200 p-8 rounded-xl my-6">
              <div className="text-5xl font-bold text-indigo-600 mb-2">{result.wpm}</div>
              <p className="text-gray-500 mb-4">Words Per Minute</p>
              <div className="flex justify-center gap-8 mb-4">
                <div>
                  <p className="text-2xl font-bold">{result.accuracy}%</p>
                  <p className="text-sm text-gray-500">Accuracy</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{result.gradeBenchmark}</p>
                  <p className="text-sm text-gray-500">Grade Target</p>
                </div>
              </div>
              <div className={`inline-block px-4 py-2 rounded-full font-semibold ${result.status === "below" ? "bg-red-100 text-red-700" : result.status === "on_track" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                {statusLabel(result.status)}
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-bold mb-2">Want a full curriculum plan?</h2>
              <p className="text-gray-600 mb-4">
                Sign up free to get AI-generated curriculum, quarterly diagnostics, and growth tracking for {passage.wordCount > 0 ? "your child" : "your students"}.
              </p>
              <Link
                to="/signup"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700"
                onClick={() => trackEvent("quick_check_signup_clicked", { grade, wpm: result.wpm })}
              >
                Get Free Curriculum
              </Link>
            </div>
            <button
              onClick={() => { setStep("grade"); setResult(null); setSeconds(0); setWordsMissed(0); }}
              className="text-gray-500 underline"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </>
  );
}
