// shared/readingFluencyBenchmarks.ts — Grade-level reading fluency benchmarks
// Used by both the client-only Quick Check tool and the account-backed fluency check.
// Source: Hasbrouck & Tindal ORF benchmarks (2017 update), widely used in US schools.

export interface FluencyBenchmark {
  grade: number;
  fallWpm: number;
  winterWpm: number;
  springWpm: number;
}

export const FLUENCY_BENCHMARKS: FluencyBenchmark[] = [
  { grade: 1, fallWpm: 0, winterWpm: 9, springWpm: 23 },
  { grade: 2, fallWpm: 13, winterWpm: 38, springWpm: 52 },
  { grade: 3, fallWpm: 44, winterWpm: 71, springWpm: 86 },
  { grade: 4, fallWpm: 62, winterWpm: 86, springWpm: 95 },
  { grade: 5, fallWpm: 79, winterWpm: 99, springWpm: 104 },
  { grade: 6, fallWpm: 95, winterWpm: 114, springWpm: 120 },
  { grade: 7, fallWpm: 106, winterWpm: 122, springWpm: 128 },
  { grade: 8, fallWpm: 115, winterWpm: 126, springWpm: 133 },
];

export interface FluencyResult {
  wpm: number;
  accuracy: number;
  gradeBenchmark: number;
  status: "below" | "on_track" | "above";
}

/**
 * Compute fluency metrics from raw reading data.
 * @param wordsRead - Total words in the passage
 * @param wordsMissed - Number of words missed (mispronounced, skipped, or hesitated > 3s)
 * @param secondsElapsed - Time to read the passage
 * @param gradeLevel - Student's current grade (1-8)
 */
export function computeFluencyMetrics(
  wordsRead: number,
  wordsMissed: number,
  secondsElapsed: number,
  gradeLevel: number,
): FluencyResult {
  const wordsCorrect = Math.max(0, wordsRead - wordsMissed);
  const minutes = secondsElapsed / 60;
  const wpm = minutes > 0 ? Math.round(wordsCorrect / minutes) : 0;
  const accuracy = wordsRead > 0 ? Math.round((wordsCorrect / wordsRead) * 100) : 0;

  const benchmark = FLUENCY_BENCHMARKS.find((b) => b.grade === gradeLevel);
  if (!benchmark) {
    return { wpm, accuracy, gradeBenchmark: 0, status: "on_track" as const };
  }

  // Use spring benchmark as the target — that's the end-of-year standard
  const target = benchmark.springWpm;
  let status: "below" | "on_track" | "above" = "on_track";
  if (wpm < target * 0.85) status = "below";
  else if (wpm > target * 1.15) status = "above";

  return { wpm, accuracy, gradeBenchmark: target, status };
}

/**
 * Get the benchmark for a specific grade.
 */
export function getBenchmarkForGrade(grade: number): FluencyBenchmark | undefined {
  return FLUENCY_BENCHMARKS.find((b) => b.grade === grade);
}

/**
 * Get a human-readable status label.
 */
export function statusLabel(status: FluencyResult["status"]): string {
  switch (status) {
    case "below":
      return "Below Grade Level";
    case "on_track":
      return "On Track";
    case "above":
      return "Above Grade Level";
  }
}
